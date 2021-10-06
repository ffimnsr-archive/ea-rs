#![allow(dead_code)]

use std::fmt::{self, Display};
use syn::{Ident, Path};

#[derive(Debug, Copy, Clone)]
pub struct Symbol(&'static str);

pub const EA_SQL: Symbol = Symbol("ea_sql");
pub const INCLUDE_IN: Symbol = Symbol("include_in");
pub const SKIP: Symbol = Symbol("skip");
pub const CREATE: Symbol = Symbol("create");
pub const UPDATE: Symbol = Symbol("update");
pub const COL_ROW_NUM: Symbol = Symbol("row_num");
pub const UUID: Symbol = Symbol("Uuid");
pub const DATETIME: Symbol = Symbol("DateTime");

impl PartialEq<Symbol> for Ident {
    fn eq(&self, word: &Symbol) -> bool {
        self == word.0
    }
}

impl<'a> PartialEq<Symbol> for &'a Ident {
    fn eq(&self, word: &Symbol) -> bool {
        *self == word.0
    }
}

impl PartialEq<Symbol> for Path {
    fn eq(&self, word: &Symbol) -> bool {
        self.is_ident(word.0)
    }
}

impl<'a> PartialEq<Symbol> for &'a Path {
    fn eq(&self, word: &Symbol) -> bool {
        self.is_ident(word.0)
    }
}

impl Display for Symbol {
    fn fmt(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str(self.0)
    }
}
