#[macro_export]
macro_rules! spawn_health_reporter {
    ($reporter:ident $(,$cls:literal)+) => {
        $(
            paste! {
                $reporter
                    .set_serving::<pb::[<$cls _service_server>]::[<$cls:camel ServiceServer>]<CoreImpl>>()
                    .await;

                tokio::spawn(::ea_core::flip_service_status::<pb::[<$cls _service_server>]::[<$cls:camel ServiceServer>]<CoreImpl>>($reporter.clone()));
            }
        )*
    }
}

#[macro_export]
macro_rules! get_count {
    ($self:ident, $cls:literal) => {{
        paste! {
            let conn = $self.pool.get().await?;

            let query = format!(
                "SELECT COUNT(id) FROM {} WHERE is_deleted = false",
                [<$cls:camel>]::get_table_name(),
            );

            trace!("Count {} entries statement: {}", [<$cls:camel>]::get_table_name(), &query);

            let result = conn
                .query_one(query.as_str(), &[])
                .await
                .map_err(|err| err.into())
                .map(|row| row.get(0));

            result
        }
    }};
}

#[macro_export]
macro_rules! list_items {
    ($self:expr, $data:ident, $page_size:ident, $cls:literal) => {{
        paste! {
            let conn = $self.pool.get().await?;

            if let Some(token_context) = parse_token(&$data.page_token) {
                let query = format!(
                    "SELECT row_num, {} FROM (
                        SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS row_num, {} FROM {} WHERE is_deleted = false ORDER BY created_at ASC
                    ) AS constrained_result
                    WHERE row_num > $1
                    FETCH FIRST $2 ROWS ONLY",
                    [<$cls:camel>]::get_required_fields_str(),
                    [<$cls:camel>]::get_required_fields_str(),
                    [<$cls:camel>]::get_table_name(),
                );

                trace!("List {} statement: {}", $cls, &query);
                trace!("List {} variables: $1 = {}, $2 = {}", $cls, token_context.offset, $page_size);

                let result = conn
                    .query(query.as_str(), &[
                        &token_context.offset,
                        &$page_size,
                    ])
                    .await
                    .map_err(|err| err.into())
                    .map(entities::[<$cls:camel Raw>]::from_vec);

                result
            } else {
                let query = format!(
                    "SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS row_num, {} FROM {} WHERE is_deleted = false ORDER BY created_at ASC
                    FETCH FIRST $1 ROWS ONLY",
                    [<$cls:camel>]::get_required_fields_str(),
                    [<$cls:camel>]::get_table_name(),
                );

                trace!("List {} statement: {}", $cls, &query);

                let result = conn
                    .query(query.as_str(), &[
                        &$page_size,
                    ])
                    .await
                    .map_err(|err| err.into())
                    .map(entities::[<$cls:camel Raw>]::from_vec);

                result
            }
        }
    }};
}

#[macro_export]
macro_rules! get_item {
    ($self:ident, $data:ident, $cls:literal) => {{
        paste! {
            let conn = $self.pool.get().await?;

            let query = format!(
                "SELECT {} FROM {} WHERE id = $1 AND is_deleted = false",
                [<$cls:camel>]::get_required_fields_str(),
                [<$cls:camel>]::get_table_name(),
            );

            trace!("Get {} statement: {}", $cls, &query);

            paste! {
                let item_id = Uuid::parse_str(&$data.[<$cls _id>])?;
            }

            let result = conn
                .query_one(query.as_str(), &[&item_id])
                .await
                .map_err(|err| err.into())
                .map([<$cls:camel>]::from);

            result
        }
    }};
}

#[macro_export]
macro_rules! create_item {
    ($self:ident, $data:ident, $cls:literal $(,$fields:literal)+) => {{
        paste! {
            let conn = $self.pool.get().await?;

            let field_placeholder = |num: usize| {
                let mut placeholder = String::new();
                for i in 1..num {
                    placeholder.push_str(&format!("${}, ", i));
                }
                placeholder.push_str(&format!("${}", num));
                placeholder
            };

            let query = format!("INSERT INTO {} ({}) VALUES ({}) RETURNING id, created_at, updated_at",
                [<$cls:camel>]::get_table_name(),
                [<$cls:camel>]::get_required_create_fields_str(),
                field_placeholder([<$cls:camel>]::create_field_count()),
            );

            trace!("Create {} statement: {}", $cls, &query);

            let result: Result<[<$cls:camel>], Box<dyn std::error::Error + 'static>> = conn
                .query_one(
                    query.as_str(),
                    &[
                        $(&$data.[<$fields>],)*
                    ],
                )
                .await
                .map_err(|err| err.into())
                .and_then(|row| {
                    Ok([<$cls:camel>] {
                        id: row.get("id"),
                        $([<$fields>]: $data.[<$fields>].clone(),)*
                        created_at: row.get("created_at"),
                        updated_at: row.get("updated_at"),
                    })
                });

            result
        }
    }};
}

#[macro_export]
macro_rules! soft_delete_item {
    ($self:ident, $data:ident, $cls:literal) => {{
        paste! {
            let conn = $self.pool.get().await?;

            let query = format!(
                "UPDATE {} SET is_deleted = true WHERE id = $1 RETURNING *",
                [<$cls:camel>]::get_table_name()
            );

            trace!("Delete {} statement: {}", $cls, &query);

            let [<$cls _id>] = Uuid::parse_str(&$data.[<$cls _id>])?;

            let result: Result<[<$cls:camel>], Box<dyn std::error::Error + 'static>> = conn
                .query_one(
                    query.as_str(),
                    &[&[<$cls _id>]],
                )
                .await
                .map_err(|err| err.into())
                .and_then(|row| Ok([<$cls:camel>]::from(row)));

            result
        }
    }};
}

#[macro_export]
macro_rules! update_item {
    ($self:ident, $data:ident, $cls:literal $(,$fields:literal)+) => {{
        paste! {
            let conn = $self.pool.get().await?;

            let field_placeholder = || {
                let mut placeholder = String::new();
                let mut count = 1i32;
                for field in [<$cls:camel>]::get_required_update_fields().iter() {
                    placeholder.push_str(&format!("{} = COALESCE(${}, {}), ", field, count, field));
                    count += 1;
                }
                placeholder.pop();
                placeholder.pop();
                placeholder
            };

            let query = format!(
                "UPDATE {} SET {} WHERE id = ${} RETURNING *",
                [<$cls:camel>]::get_table_name(),
                field_placeholder(),
                ([<$cls:camel>]::update_field_count() + 1),
            );

            trace!("Update {} statement: {}", $cls, &query);

            let [<$cls _id>] = Uuid::parse_str(&$data.[<$cls _id>])?;

            let result: Result<[<$cls:camel>], Box<dyn std::error::Error + 'static>> = conn
                .query_one(
                    query.as_str(),
                    &[
                        $(&$data.[<$fields>],)*
                        &[<$cls _id>],
                    ],
                )
                .await
                .map_err(|err| err.into())
                .and_then(|row| Ok([<$cls:camel>]::from(row)));

            result
        }
    }};
}

#[macro_export]
macro_rules! impl_crud_for {
    ($cls:literal, $clsp:literal, [$($create_fields:literal),* $(,)?], [$($update_fields:literal),* $(,)?] $(,)?) => {
        paste! {
            fn [<new_ $cls _service>](pool: &Pool) -> pb::[<$cls _service_server>]::[<$cls:camel ServiceServer>]<Self> {
                pb::[<$cls _service_server>]:: [<$cls:camel ServiceServer>]::new(Self::new(&pool))
            }

            async fn [<count_ $cls _entries>](&self) -> ::ea_core::DbResult<i64> {
                ::ea_core::get_count!(self, $cls)
            }

            async fn [<list_ $clsp>](&self, data: &[<List $clsp:camel Request>], page_size: i64) -> ::ea_core::DbResult<Vec<entities::[<$cls:camel Raw>]>> {
                ::ea_core::list_items!(self, data, page_size, $cls)
            }

            async fn [<get_ $cls>](&self, data: &[<Get $cls:camel Request>]) -> ::ea_core::DbResult<[<$cls:camel>]> {
                ::ea_core::get_item!(self, data, $cls)
            }

            async fn [<create_ $cls>](&self, data: &[<Create $cls:camel Request>]) -> ::ea_core::DbResult<[<$cls:camel>]> {
                ::ea_core::create_item!(self, data, $cls $(,$create_fields)*)
            }

            async fn [<soft_delete_ $cls>](&self, data: &[<Delete $cls:camel Request>]) -> ::ea_core::DbResult<[<$cls:camel>]> {
                ::ea_core::soft_delete_item!(self, data, $cls)
            }

            async fn [<update_ $cls>](&self, data: &[<Update $cls:camel Request>]) -> ::ea_core::DbResult<[<$cls:camel>]> {
                ::ea_core::update_item!(self, data, $cls $(,$update_fields)*)
            }
        }
    };
    ($({$cls:literal, $clsp:literal, $create_fields:tt, $update_fields:tt $(,)?} $(,)?)+) => {
        $(
            impl_crud_for!($cls, $clsp, $create_fields, $update_fields);
        )+
    };
    ($({$cls:literal, $clsp:literal, $unified_fields:tt $(,)?} $(,)?)+) => {
        $(
            impl_crud_for!($cls, $clsp, $unified_fields, $unified_fields);
        )+
    };
}
