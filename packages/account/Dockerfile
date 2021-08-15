# The cache layer.
FROM rust:1.54 AS base

ENV USER=root

WORKDIR /code/app
COPY ./packages/account /code/app
COPY ./packages/ea_core /code/ea_core
COPY ./packages/ea_sql_derive /code/ea_sql_derive
COPY ./proto /proto
RUN rm -rf .cargo \
    && mkdir -p .cargo \
    && cargo fetch \
    && cargo vendor >> .cargo/config.toml

CMD [ "cargo", "test", "--offline" ]

# The builder.
FROM base AS builder

RUN rustup component add rustfmt
RUN cargo build --release --offline

# The final build.
FROM debian:buster-slim

ARG service_version=2.1.1
ARG build_date=unspecified
ARG vcs_ref=unspecified

LABEL maintainer="ffimnsr <ffimnsr@gmail.com>"
LABEL org.label-schema.description="${build_date}"
LABEL org.label-schema.description="This service provides grpc endpoint for account management"
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.name="ea.account_svc"
LABEL org.label-schema.version="${service_version}"
LABEL org.label-schema.usage="https://github.com/ffimnsr/ea-rs/blob/master/README.md"
LABEL org.label-schema.url="https://se-same.com"
LABEL org.label-schema.vcs-url="https://github.com/ffimnsr/ea-rs"
LABEL org.label-schema.vcs-ref="${vcs_ref}"
LABEL org.label-schema.vendor="Where It All Started"
LABEL org.label-schema.docker.cmd="docker run -d -p 28090:8090 account_svc"

RUN apt-get update && apt-get install -y libssl1.1 libc6 libgcc1 \
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /code/app/target/release/account_svc /usr/bin/account_svc
EXPOSE 8090
ENTRYPOINT [ "/usr/bin/account_svc" ]
