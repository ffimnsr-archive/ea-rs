use super::symbol::*;

pub fn is_included_in(part_of: Symbol, f: &syn::Field) -> bool {

    pub fn includes_of(m: &syn::MetaList) -> Option<&syn::MetaList> {
        for nm in m.nested.iter() {
            if let syn::NestedMeta::Meta(syn::Meta::List(include_nvs)) = nm {
                if include_nvs.path == INCLUDE_IN {
                    return Some(include_nvs);
                }
            }
        }

        None
    }

    if let Some(g) = sql_of(f) {
        if let Ok(syn::Meta::List(nvs)) = g.parse_meta() {
            assert_eq!(nvs.path, EA_SQL);

            if nvs.nested.len() < 1 {
                return false;
            }

            if let Some(include_nvs) = includes_of(&nvs) {
                assert_eq!(include_nvs.path, INCLUDE_IN);

                for meta in include_nvs.nested.iter() {
                    if let syn::NestedMeta::Meta(syn::Meta::Path(p)) = meta {
                        if p == part_of {
                            return true;
                        }
                    }
                }
            }
        }
    }

    false
}

/// This method returns only the filtered field attributes if its
/// present in the structured.
pub fn sql_of(f: &syn::Field) -> Option<&syn::Attribute> {
    for attr in &f.attrs {
        if attr.path == EA_SQL {
            return Some(attr);
        }
    }

    None
}
