use super::symbol::*;

/// This method returns only the filtered field attributes if its
/// present in the structured.
pub fn proto_of(f: &syn::DeriveInput) -> Option<&syn::Attribute> {
    for attr in &f.attrs {
        if attr.path == EA_PROTO {
            return Some(attr);
        }
    }

    None
}
