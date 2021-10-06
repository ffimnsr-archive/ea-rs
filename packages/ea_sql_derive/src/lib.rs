mod internals;

use proc_macro::TokenStream;
use proc_macro2::Span;
use quote::quote;
use syn::{Data, DataStruct, DeriveInput, Fields, Ident, parse_macro_input};

use crate::internals::{attr::is_included_in, symbol::*};

#[proc_macro_derive(Arbiter, attributes(ea_sql))]
pub fn derive_arbiter(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let struct_name = &ast.ident;
    let target_name = quote::format_ident!("{}Raw", struct_name);

    let fields = match &ast.data {
        Data::Struct(DataStruct {
            fields: Fields::Named(it),
            ..
        }) => &it.named,
        _ => unimplemented!(),
    };

    let field_names = fields.iter()
        .map(|f| {
            let name = &f.ident;
            let ty = &f.ty;

            quote! { pub #name: #ty }
        });

    let expanded = quote! {
        #[derive(Debug, Clone, PartialEq, FromRow, IntoProtoPayload)]
        pub struct #target_name {
            pub row_num: i64,
            #(#field_names,)*
        }
    };

    TokenStream::from(expanded)
}

#[proc_macro_derive(FromRow, attributes(ea_sql))]
pub fn derive_from_row(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let struct_name = &ast.ident;

    let fields = match &ast.data {
        Data::Struct(DataStruct {
            fields: Fields::Named(it),
            ..
        }) => &it.named,
        _ => unimplemented!(),
    };

    let field_names = fields.iter()
        .map(|field| &field.ident);
    let field_names_2 = field_names.clone();

    let expanded = quote! {
        impl From<&::tokio_postgres::Row> for #struct_name {
            fn from(row: &::tokio_postgres::Row) -> Self {
                Self {
                    #(#field_names: row.get(stringify!(#field_names)),)*
                }
            }
        }

        impl From<::tokio_postgres::Row> for #struct_name {
            fn from(row: ::tokio_postgres::Row) -> Self {
                Self {
                    #(#field_names_2: row.get(stringify!(#field_names_2)),)*
                }
            }
        }

        impl ::ea_core::MyriadExt<::tokio_postgres::Row> for #struct_name {
            fn from_vec(data: Vec<::tokio_postgres::Row>) -> Vec<Self> {
                data.iter().map(Self::from).collect()
            }
        }
    };

    TokenStream::from(expanded)
}

#[proc_macro_derive(IntoBaseEntity, attributes(ea_sql))]
pub fn derive_into_base_entity(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let struct_name = &ast.ident;

    let fields = match &ast.data {
        Data::Struct(DataStruct {
            fields: Fields::Named(it),
            ..
        }) => &it.named,
        _ => unimplemented!(),
    };

    let field_names = fields.iter()
        .map(|field| &field.ident);

    let expanded = quote! {
        impl ::ea_core::BaseEntity for #struct_name {
            fn get_table_name() -> ::std::borrow::Cow<'static, str> {
                use ::inflector::Inflector;

                let name = stringify!(#struct_name);
                name
                    .to_snake_case()
                    .into()
            }

            fn get_required_fields_str() -> ::std::borrow::Cow<'static, str> {
                let fields = Self::get_required_fields();
                fields.join(", ").into()
            }

            fn get_required_fields() -> ::std::vec::Vec<String> {
                let fields = [
                    #(stringify!(#field_names).to_owned(),)*
                ];

                fields.to_vec()
            }
        }
    };

    TokenStream::from(expanded)
}

#[proc_macro_derive(IntoMutateEntity, attributes(ea_sql))]
pub fn derive_into_mutate_entity(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let struct_name = &ast.ident;

    let fields = match &ast.data {
        Data::Struct(DataStruct {
            fields: Fields::Named(it),
            ..
        }) => &it.named,
        _ => unimplemented!(),
    };

    let create_field_names = fields.iter()
        .filter(|f| is_included_in(CREATE, f))
        .map(|field| &field.ident);

    let update_field_names = fields.iter()
        .filter(|f| is_included_in(UPDATE, f))
        .map(|field| &field.ident);

    let expanded = quote! {
        impl ::ea_core::MutateEntity for #struct_name {
            fn get_required_create_fields() -> Vec<String> {
                let fields = [
                    #(stringify!(#create_field_names).to_owned(),)*
                ];

                fields.to_vec()
            }

            fn get_required_update_fields() -> Vec<String> {
                let fields = [
                    #(stringify!(#update_field_names).to_owned(),)*
                ];

                fields.to_vec()
            }
        }
    };

    TokenStream::from(expanded)
}

#[proc_macro_derive(IntoProtoPayload, attributes(ea_sql))]
pub fn derive_into_proto_payload(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let struct_name = &ast.ident;

    let struct_canonical_name = ast.ident.to_string();
    let target_name = if struct_canonical_name.contains("Raw") {
        let pos = struct_canonical_name.len() - 3;
        Ident::new(&struct_canonical_name[..pos], Span::call_site())
    } else {
        struct_name.to_owned()
    };

    let fields = match &ast.data {
        Data::Struct(DataStruct {
            fields: Fields::Named(it),
            ..
        }) => &it.named,
        _ => unimplemented!(),
    };

    let field_converters = fields.iter()
        .filter(|f| !is_row_num(f))
        .map(|f| {
            let name = &f.ident;
            if is_datetime(&f.ty) {
                quote! { #name: Some(::prost_types::Timestamp::from_utc(payload.#name)) }
            } else if is_uuid(&f.ty) {
                quote! { #name: payload.#name.to_string() }
            } else {
                quote! { #name: payload.#name.clone() }
            }
        });

    let field_converters_2 = field_converters.clone();

    let expanded = quote! {
        impl #struct_name {
            pub fn to_payload(&self) -> crate::pb::#target_name {
                <crate::pb::#target_name>::from(self)
            }
        }

        impl From<&#struct_name> for crate::pb::#target_name {
            fn from(payload: &#struct_name) -> Self {
                use ::ea_core::FromDt;

                Self {
                    #(#field_converters,)*
                }
            }
        }

        impl From<#struct_name> for crate::pb::#target_name {
            fn from(payload: #struct_name) -> Self {
                use ::ea_core::FromDt;

                Self {
                    #(#field_converters_2,)*
                }
            }
        }

        impl ::ea_core::MyriadExt<#struct_name> for crate::pb::#target_name {
            fn from_vec(data: std::vec::Vec<#struct_name>) -> Vec<Self> {
                data.iter().map(Self::from).collect()
            }
        }
    };

    TokenStream::from(expanded)
}

fn is_row_num(f: &syn::Field) -> bool {
    let ident = f.ident.as_ref().unwrap();
    ident == COL_ROW_NUM
}

fn is_uuid(ty: &syn::Type) -> bool {
    if let syn::Type::Path(ref p) = ty {
        if p.path == UUID {
            return true;
        }
    }

    false
}

fn is_datetime(ty: &syn::Type) -> bool {
    if let syn::Type::Path(ref p) = ty {
        if p.path.segments[0].ident == DATETIME {
            return true;
        }
    }

    false
}

#[allow(dead_code)]
fn ty_inner_type<'a>(wrapper: &str, ty: &'a syn::Type) -> Option<&'a syn::Type> {
    if let syn::Type::Path(ref p) = ty {
        if p.path.segments.len() != 1 || p.path.segments[0].ident != wrapper {
            return None;
        }

        match p.path.segments[0].arguments {
            syn::PathArguments::AngleBracketed(ref inner_ty) => {
                match inner_ty.args[0] {
                    syn::GenericArgument::Type(ref t) => return Some(t),
                    _ => (),
                }
            }
            _ => (),
        }
    }

    None
}
