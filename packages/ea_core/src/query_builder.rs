#[derive(Default, Clone, Debug)]
pub struct PostgresQueryBuilder {
    sql: String,
    bind_idx: u32,
}

#[allow(dead_code)]
impl PostgresQueryBuilder {
    pub fn new() -> Self {
        PostgresQueryBuilder::default()
    }

    pub fn push_sql(&mut self, sql: &str) {
        self.sql.push_str(sql);
    }

    pub fn push_identifier(&mut self, identifier: &str) {
        self.push_sql(&identifier.replace('"', "\"\""));
    }

    pub fn push_bind_param(&mut self) {
        self.bind_idx += 1;
        let sql = format!("${}", self.bind_idx);
        self.push_sql(&sql);
    }

    pub fn pop(&mut self, count: i32) {
        for _ in 0..count {
            self.sql.pop();
        }
    }

    pub fn finish(self) -> String {
        self.sql
    }
}
