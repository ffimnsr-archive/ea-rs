#[macro_export]
macro_rules! spawn_health_reporter {
    ($reporter:ident $(,$cls:literal)+) => {
        $(
            ::paste::paste! {
                $reporter
                    .set_serving::<pb::[<$cls _service_server>]::[<$cls:camel ServiceServer>]<CoreImpl>>()
                    .await;

                ::tokio::spawn(::ea_core::flip_service_status::<pb::[<$cls _service_server>]::[<$cls:camel ServiceServer>]<CoreImpl>>($reporter.clone()));
            }
        )*
    }
}

#[macro_export]
macro_rules! get_count {
    ($self:ident, $cls:literal) => {{
        ::paste::paste! {
            use ::ea_core::BaseEntity;

            let conn = $self.pool.get().await?;

            let query = format!(
                "SELECT COUNT(id) FROM {} WHERE is_deleted = false",
                entities::[<$cls:camel>]::get_table_name(),
            );

            ::log::trace!("Count {} entries statement: {}", entities::[<$cls:camel>]::get_table_name(), &query);

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
        ::paste::paste! {
            use ::ea_core::{BaseEntity, MyriadExt};

            let conn = $self.pool.get().await?;

            if let Some(token_context) = ::ea_core::token::parse_token(&$data.page_token) {
                let query = format!(
                    "SELECT row_num, {} FROM (
                        SELECT ROW_NUMBER() OVER (ORDER BY created_at) AS row_num, {} FROM {} WHERE is_deleted = false ORDER BY created_at ASC
                    ) AS constrained_result
                    WHERE row_num > $1
                    FETCH FIRST $2 ROWS ONLY",
                    entities::[<$cls:camel>]::get_required_fields_str(),
                    entities::[<$cls:camel>]::get_required_fields_str(),
                    entities::[<$cls:camel>]::get_table_name(),
                );

                ::log::trace!("List {} statement: {}", $cls, &query);
                ::log::trace!("List {} variables: $1 = {}, $2 = {}", $cls, token_context.offset, $page_size);

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
                    entities::[<$cls:camel>]::get_required_fields_str(),
                    entities::[<$cls:camel>]::get_table_name(),
                );

                ::log::trace!("List {} statement: {}", $cls, &query);

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
        ::paste::paste! {
            use ::ea_core::BaseEntity;

            let conn = $self.pool.get().await?;

            let query = format!(
                "SELECT {} FROM {} WHERE id = $1 AND is_deleted = false",
                entities::[<$cls:camel>]::get_required_fields_str(),
                entities::[<$cls:camel>]::get_table_name(),
            );

            ::log::trace!("Get {} statement: {}", $cls, &query);

            let item_id = uuid::Uuid::parse_str(&$data.[<$cls _id>])?;

            let result = conn
                .query_one(query.as_str(), &[&item_id])
                .await
                .map_err(|err| err.into())
                .map(entities::[<$cls:camel>]::from);

            result
        }
    }};
}

#[macro_export]
macro_rules! create_item {
    ($self:ident, $data:ident, $cls:literal, [$($id_fields:literal),* $(,)?], [$($fields:literal),* $(,)?] $(,)?) => {{
        ::paste::paste! {
            use ::ea_core::{MutateEntity, BaseEntity};

            let conn = $self.pool.get().await?;

            let field_placeholder = |num: usize| {
                let mut placeholder = String::new();
                for i in 1..num {
                    placeholder.push_str(&format!("${}, ", i));
                }
                placeholder.push_str(&format!("${}", num));
                placeholder
            };

            let query = format!("INSERT INTO {} ({}) VALUES ({}) RETURNING *",
                entities::[<$cls:camel>]::get_table_name(),
                entities::[<$cls:camel>]::get_required_create_fields_str(),
                field_placeholder(entities::[<$cls:camel>]::create_field_count()),
            );

            ::log::trace!("Create {} statement: {}", $cls, &query);

            $(let [<$id_fields>] = ::uuid::Uuid::parse_str(&$data.[<$id_fields>])?;)*

            let result: Result<entities::[<$cls:camel>], Box<dyn std::error::Error + 'static>> = conn
                .query_one(
                    query.as_str(),
                    &[
                        $(&$data.[<$fields>],)*
                        $(&[<$id_fields>],)*
                    ],
                )
                .await
                .map_err(|err| err.into())
                .and_then(|row| Ok(entities::[<$cls:camel>]::from(row)));

            result
        }
    }};
}

#[macro_export]
macro_rules! update_item {
    ($self:ident, $data:ident, $cls:literal, [$($id_fields:literal),* $(,)?], [$($fields:literal),* $(,)?] $(,)?) => {{
        ::paste::paste! {
            use ::ea_core::{MutateEntity, BaseEntity};

            let conn = $self.pool.get().await?;

            let field_placeholder = || {
                let mut placeholder = String::new();
                let mut count = 1i32;
                for field in entities::[<$cls:camel>]::get_required_update_fields().iter() {
                    placeholder.push_str(&format!("{} = COALESCE(${}, {}), ", field, count, field));
                    count += 1;
                }
                placeholder.pop();
                placeholder.pop();
                placeholder
            };

            let query = format!(
                "UPDATE {} SET {} WHERE id = ${} RETURNING *",
                entities::[<$cls:camel>]::get_table_name(),
                field_placeholder(),
                (entities::[<$cls:camel>]::update_field_count() + 1),
            );

            ::log::trace!("Update {} statement: {}", $cls, &query);

            let [<$cls _id>] = ::uuid::Uuid::parse_str(&$data.[<$cls _id>])?;

            $(
                let [<$id_fields>] = if let Some(f) = &$data.[<$id_fields>] {
                    ::uuid::Uuid::parse_str(f)?
                } else {
                    ::uuid::Uuid::new_v4()
                };
            )*

            let result: Result<entities::[<$cls:camel>], Box<dyn std::error::Error + 'static>> = conn
                .query_one(
                    query.as_str(),
                    &[
                        $(&$data.[<$fields>],)*
                        $(&[<$id_fields>],)*
                        &[<$cls _id>],
                    ],
                )
                .await
                .map_err(|err| err.into())
                .and_then(|row| Ok(entities::[<$cls:camel>]::from(row)));

            result
        }
    }};
}

#[macro_export]
macro_rules! soft_delete_item {
    ($self:ident, $data:ident, $cls:literal) => {{
        ::paste::paste! {
            use ::ea_core::BaseEntity;

            let conn = $self.pool.get().await?;

            let query = format!(
                "UPDATE {} SET is_deleted = true WHERE id = $1 RETURNING *",
                entities::[<$cls:camel>]::get_table_name()
            );

            ::log::trace!("Delete {} statement: {}", $cls, &query);

            let [<$cls _id>] = uuid::Uuid::parse_str(&$data.[<$cls _id>])?;

            let result: Result<entities::[<$cls:camel>], Box<dyn std::error::Error + 'static>> = conn
                .query_one(
                    query.as_str(),
                    &[&[<$cls _id>]],
                )
                .await
                .map_err(|err| err.into())
                .and_then(|row| Ok(entities::[<$cls:camel>]::from(row)));

            result
        }
    }};
}

#[macro_export]
macro_rules! impl_crud_for {
    (@skip_update_create_mutation $cls:literal, $clsp:literal $(,)?) => {
        ::paste::paste! {
            fn [<new_ $cls _service>](pool: &Pool) -> pb::[<$cls _service_server>]::[<$cls:camel ServiceServer>]<Self> {
                pb::[<$cls _service_server>]::[<$cls:camel ServiceServer>]::new(Self::new(&pool))
            }

            async fn [<count_ $cls _entries>](&self) -> ::ea_core::DbResult<i64> {
                ::ea_core::get_count!(self, $cls)
            }

            async fn [<list_ $clsp>](&self, data: &pb::[<List $clsp:camel Request>], page_size: i64) -> ::ea_core::DbResult<Vec<entities::[<$cls:camel Raw>]>> {
                ::ea_core::list_items!(self, data, page_size, $cls)
            }

            async fn [<get_ $cls>](&self, data: &pb::[<Get $cls:camel Request>]) -> ::ea_core::DbResult<entities::[<$cls:camel>]> {
                ::ea_core::get_item!(self, data, $cls)
            }

            async fn [<soft_delete_ $cls>](&self, data: &pb::[<Delete $cls:camel Request>]) -> ::ea_core::DbResult<entities::[<$cls:camel>]> {
                ::ea_core::soft_delete_item!(self, data, $cls)
            }
        }
    };
    ($cls:literal, $clsp:literal, $id_fields:tt, $create_fields:tt, $update_fields:tt $(,)?) => {
        ::paste::paste! {
            fn [<new_ $cls _service>](pool: &Pool) -> pb::[<$cls _service_server>]::[<$cls:camel ServiceServer>]<Self> {
                pb::[<$cls _service_server>]::[<$cls:camel ServiceServer>]::new(Self::new(&pool))
            }

            async fn [<count_ $cls _entries>](&self) -> ::ea_core::DbResult<i64> {
                ::ea_core::get_count!(self, $cls)
            }

            async fn [<list_ $clsp>](&self, data: &pb::[<List $clsp:camel Request>], page_size: i64) -> ::ea_core::DbResult<Vec<entities::[<$cls:camel Raw>]>> {
                ::ea_core::list_items!(self, data, page_size, $cls)
            }

            async fn [<get_ $cls>](&self, data: &pb::[<Get $cls:camel Request>]) -> ::ea_core::DbResult<entities::[<$cls:camel>]> {
                ::ea_core::get_item!(self, data, $cls)
            }

            async fn [<create_ $cls>](&self, data: &pb::[<Create $cls:camel Request>]) -> ::ea_core::DbResult<entities::[<$cls:camel>]> {
                ::ea_core::create_item!(self, data, $cls, $id_fields, $create_fields)
            }

            async fn [<soft_delete_ $cls>](&self, data: &pb::[<Delete $cls:camel Request>]) -> ::ea_core::DbResult<entities::[<$cls:camel>]> {
                ::ea_core::soft_delete_item!(self, data, $cls)
            }

            async fn [<update_ $cls>](&self, data: &pb::[<Update $cls:camel Request>]) -> ::ea_core::DbResult<entities::[<$cls:camel>]> {
                ::ea_core::update_item!(self, data, $cls, $id_fields, $update_fields)
            }
        }
    };
    ($({$cls:literal, $clsp:literal, $id_fields:tt, $create_fields:tt, $update_fields:tt $(,)?} $(,)?)+) => {
        $(
            ::ea_core::impl_crud_for!($cls, $clsp, $id_fields, $create_fields, $update_fields);
        )+
    };
    ($({$cls:literal, $clsp:literal, $id_fields:tt, $unified_fields:tt $(,)?} $(,)?)+) => {
        $(
            ::ea_core::impl_crud_for!($cls, $clsp, $id_fields, $unified_fields, $unified_fields);
        )+
    };
    ($({$cls:literal, $clsp:literal $(,)?} $(,)?)+) => {
        $(
            ::ea_core::impl_crud_for!(@skip_update_create_mutation $cls, $clsp);
        )+
    };
}
