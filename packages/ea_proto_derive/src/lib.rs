mod internals;

use proc_macro::TokenStream;
use quote::{format_ident, quote};
use syn::{DeriveInput, parse_macro_input};
use inflector::Inflector;
use internals::symbol::*;

#[proc_macro_derive(ProtoAccessors, attributes(ea_proto))]
pub fn derive_proto_accessors(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let struct_name = &ast.ident;

    let proto = internals::attr::proto_of(&ast);
    let proto_attr = if let Some(attr) = proto {
        attr
    } else {
        return TokenStream::new();
    };

    fn mk_err<T: quote::ToTokens>(t: T) -> proc_macro2::TokenStream {
        syn::Error::new_spanned(t, "expected `ea_proto(name(\"...\"))`").to_compile_error()
    }

    let meta = match proto_attr.parse_meta() {
        Ok(syn::Meta::List(mut nvs)) => {
            assert_eq!(nvs.path, EA_PROTO);

            if nvs.nested.len() != 1 {
                return mk_err(nvs).into();
            }

            match nvs.nested.pop().unwrap().into_value() {
                // syn::NestedMeta::Meta(syn::Meta::NameValue(nv)) => {
                //     if nv.path != NAME {
                //         return mk_err(nvs).into();
                //     }
                //     nv
                // }
                syn::NestedMeta::Meta(syn::Meta::List(p)) => {
                    if p.path != NAME {
                        return mk_err(p).into();
                    }

                    p
                }
                meta => {
                    return mk_err(meta).into();
                }
            }
        }
        Ok(meta) => {
            return mk_err(meta).into();
        }
        Err(e) => return e.to_compile_error().into(),
    };

    let expanded = meta.nested.iter().map(|nm| {
        let (c, d, p, dp) = match nm {
            syn::NestedMeta::Lit(syn::Lit::Str(s)) => {
                let downcase = s.value().as_str().to_snake_case();
                let pluralize = s.value().as_str().to_plural();
                let downcase_pluralize = pluralize.clone().to_snake_case();

                let c = syn::Ident::new(&s.value(), s.span());
                let d = syn::Ident::new(&downcase, s.span());
                let p = syn::Ident::new(&pluralize, s.span());
                let dp = syn::Ident::new(&downcase_pluralize, s.span());
                (c, d, p, dp)
            }
            lit => panic!("expected string, found {:?}", lit),
        };

        proto_impl(&c, &d, &p, &dp, &struct_name)
    })
    .fold(quote! {}, |acc, x| {
        quote! {
            #acc
            #x
        }
    });

    TokenStream::from(expanded)
}

fn proto_impl(c: &syn::Ident, d: &syn::Ident, p: &syn::Ident, dp: &syn::Ident, sn: &syn::Ident) -> proc_macro2::TokenStream {
    let service_package = format_ident!("{}_service_server", d);
    let get_package_res_name = format_ident!("get_{}_response", d);
    let create_package_res_name = format_ident!("create_{}_response", d);
    let delete_package_res_name = format_ident!("delete_{}_response", d);
    let update_package_res_name = format_ident!("update_{}_response", d);
    let service_name = format_ident!("{}Service", c);
    let list_fn_name = format_ident!("list_{}", dp);
    let get_fn_name = format_ident!("get_{}", d);
    let create_fn_name = format_ident!("create_{}", d);
    let delete_fn_name = format_ident!("delete_{}", d);
    let soft_delete_fn_name = format_ident!("soft_delete_{}", d);
    let update_fn_name = format_ident!("update_{}", d);
    let count_fn_name = format_ident!("count_{}_entries", d);
    let list_req_name = format_ident!("List{}Request", p);
    let list_res_name = format_ident!("List{}Response", p);
    let get_req_name = format_ident!("Get{}Request", c);
    let get_res_name = format_ident!("Get{}Response", c);
    let create_req_name = format_ident!("Create{}Request", c);
    let create_res_name = format_ident!("Create{}Response", c);
    let delete_req_name = format_ident!("Delete{}Request", c);
    let delete_res_name = format_ident!("Delete{}Response", c);
    let update_req_name = format_ident!("Update{}Request", c);
    let update_res_name = format_ident!("Update{}Response", c);

    let expanded = quote! {
        #[::tonic::async_trait]
        impl pb::#service_package::#service_name for #sn {
            async fn #list_fn_name(&self, req: ::tonic::Request<pb::#list_req_name>) -> ::ea_core::ServiceResult<pb::#list_res_name> {
                use ::ea_core::MyriadExt;

                let data = req.into_inner();
                let total_size = self.#count_fn_name().await.unwrap();

                // Default the `page_size` to 10 if no value is present.
                let page_size: i64 = match data.page_size {
                    0 => 10i64,
                    n => i64::from(n),
                };

                let result = self.#list_fn_name(&data, page_size).await;

                match result {
                    ::std::result::Result::Ok(data) => {
                        if data.last().is_some() {
                            let last_entry = data.last().clone().unwrap();
                            let is_more_entries = total_size >= last_entry.row_num + page_size;
                            let next_page_token = if is_more_entries {
                                ::ea_core::token::generate_token(last_entry.row_num)
                            } else {
                                ::std::string::String::new()
                            };

                            Ok(::tonic::Response::new(pb::#list_res_name {
                                success: true,
                                #dp: pb::#c::from_vec(data),
                                next_page_token,
                                total_size,
                            }))
                        } else {
                            Ok(::tonic::Response::new(pb::#list_res_name {
                                success: true,
                                #dp: vec![],
                                next_page_token: ::std::string::String::new(),
                                total_size,
                            }))
                        }
                    }
                    ::std::result::Result::Err(err) => {
                        ::log::warn!("An non fatal error occurred in `{}` method: {}", stringify!(#list_fn_name), err.to_string());
                        Ok(::tonic::Response::new(pb::#list_res_name {
                            success: false,
                            #dp: vec![],
                            next_page_token: ::std::string::String::new(),
                            total_size,
                        }))
                    }
                }
            }

            async fn #get_fn_name(&self, req: ::tonic::Request<pb::#get_req_name>) -> ::ea_core::ServiceResult<pb::#get_res_name> {
                let data = req.into_inner();
                let result = self.#get_fn_name(&data).await;

                result
                    .map(|data| ::tonic::Response::new(pb::#get_res_name {
                        success: true,
                        data: ::std::option::Option::Some(
                            pb::#get_package_res_name::Data::#c(pb::#c::from(data))),
                    }))
                    .map_err(|err| {
                        ::log::error!("An error occurred in `{}` method: {}", stringify!(#get_fn_name), err.to_string());
                        ::tonic::Status::not_found(err.to_string())
                    })
            }

            async fn #create_fn_name(&self, req: ::tonic::Request<pb::#create_req_name>) -> ::ea_core::ServiceResult<pb::#create_res_name> {
                let data = req.into_inner();
                let result = self.#create_fn_name(&data).await;

                result
                    .map(|data| ::tonic::Response::new(pb::#create_res_name {
                        success: true,
                        data: ::std::option::Option::Some(
                            pb::#create_package_res_name::Data::#c(pb::#c::from(data))),
                    }))
                    .map_err(|err| {
                        ::log::error!("An error occurred in `{}` method: {}", stringify!(#create_fn_name), err.to_string());
                        ::tonic::Status::aborted(err.to_string())
                    })
            }

            async fn #delete_fn_name(&self, req: ::tonic::Request<pb::#delete_req_name>) -> ::ea_core::ServiceResult<pb::#delete_res_name> {
                let data = req.into_inner();
                let result = self.#soft_delete_fn_name(&data).await;

                result
                    .map(|data| ::tonic::Response::new(pb::#delete_res_name {
                        success: true,
                        data: ::std::option::Option::Some(
                            pb::#delete_package_res_name::Data::#c(pb::#c::from(data))),
                    }))
                    .map_err(|err| {
                        ::log::error!("An error occurred in `{}` method: {}", stringify!(#delete_fn_name), err.to_string());
                        ::tonic::Status::aborted(err.to_string())
                    })
            }

            async fn #update_fn_name(&self, req: ::tonic::Request<pb::#update_req_name>) -> ::ea_core::ServiceResult<pb::#update_res_name> {
                let data = req.into_inner();
                let result = self.#update_fn_name(&data).await;

                result
                    .map(|data| ::tonic::Response::new(pb::#update_res_name {
                        success: true,
                        data: ::std::option::Option::Some(
                            pb::#update_package_res_name::Data::#c(pb::#c::from(data))),
                    }))
                    .map_err(|err| {
                        ::log::error!("An error occurred in `{}` method: {}", stringify!(#update_fn_name), err.to_string());
                        ::tonic::Status::aborted(err.to_string())
                    })
            }
        }
    };

    expanded
}
