use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, Data, DataStruct, DeriveInput, Fields};

#[proc_macro_derive(FromRow)]
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

    let field_name_r1 = fields.iter().map(|field| &field.ident);
    let field_name_r2 = field_name_r1.clone();

    let expanded = quote! {
        use tokio_postgres::Row;

        impl From<&Row> for #struct_name {
            fn from(row: &Row) -> Self {
                Self {
                    #(#field_name_r1: row.get(stringify!(#field_name_r1)) ,)*
                }
            }
        }

        impl From<Row> for #struct_name {
            fn from(row: Row) -> Self {
                Self {
                    #(#field_name_r2: row.get(stringify!(#field_name_r2)) ,)*
                }
            }
        }
    };

    TokenStream::from(expanded)
}

#[proc_macro_derive(IntoBaseEntity)]
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

    let field_name_r1 = fields.iter().map(|field| &field.ident);
    let field_name_r2 = field_name_r1.clone();
    let field_count = fields.iter().count();

    let expanded = quote! {
        use inflector::Inflector;
        use std::borrow::Cow;

        impl BaseEntity for #struct_name {
            fn get_table_name() -> Cow<'static, str> {
                let name = stringify!(#struct_name);
                name
                    .to_snake_case()
                    .to_plural()
                    .into()
            }

            fn get_required_fields() -> Cow<'static, str> {
                let fields = [
                    #(stringify!(#field_name_r2) ,)*
                ];

                fields.join(", ").into()
            }

            fn get_required_fields_arr() -> Vec<String> {
                let fields = [
                    #(stringify!(#field_name_r1).to_owned() ,)*
                ];

                fields.to_vec()
            }

            fn field_count() -> usize {
                #field_count
            }
        }
    };

    TokenStream::from(expanded)
}
