# syntax=docker/dockerfile:1

##
## STEP 1 - BUILD
##
ARG rustc_version=1.64.0

FROM rust:${rustc_version} AS base

ENV USER=root

# specify build working directory
WORKDIR /code/app

# initialize needed packages and component
RUN rustup component add rustfmt \
  && cargo init /code/app \
  && cargo init /code/ea_trident

# copy cargo meta file
COPY ./packages/account/Cargo.toml /code/app
COPY ./packages/ea_trident/Cargo.toml /code/ea_trident

# vendor third party packages
RUN mkdir -p .cargo \
  && cargo fetch \
  && cargo vendor >> .cargo/config.toml

# pre-build deps
RUN cargo build --release --offline

##
## STEP 2 - BUILD
##
FROM base AS builder

# copy source only
COPY ./packages/ea_trident /code/ea_trident
COPY ./packages/account /code/app

# compile app
RUN cargo build --release --offline

##
## STEP 3 - DEPLOY
##
FROM debian:bullseye-slim

# set args defaults
ARG service_version=unspecified
ARG service_name=unspecified
ARG service_description=unspecified
ARG service_documentation=unspecified
ARG service_homepage=unspecified
ARG service_repository=unspecified
ARG service_license=unspecified
ARG service_build_date=unspecified
ARG service_vcs_ref=unspecified

# set maintainer
LABEL maintainer="ffimnsr <ffimnsr@gmail.com>"

# set opencontainers labels
LABEL org.opencontainers.image.created="${service_build_date}"
LABEL org.opencontainers.image.url="${service_homepage}"
LABEL org.opencontainers.image.source="${service_repository}"
LABEL org.opencontainers.image.version="${service_version}"
LABEL org.opencontainers.image.revision="${service_vcs_ref}"
LABEL org.opencontainers.image.title="${service_name}"
LABEL org.opencontainers.image.description="${service_description}"
LABEL org.opencontainers.image.documentation="${service_documentation}"
LABEL org.opencontainers.image.licenses="${service_license}"
LABEL org.opencontainers.image.vendor="ffimnsr"
LABEL org.opencontainers.image.authors="ffimnsr <ffimnsr@gmail.com>"

# install ca-certificates
RUN bash -c "apt-get update &> /dev/null \
  && apt-get install -y ca-certificates libssl1.1 libc6 libgcc1 &> /dev/null \
  && apt-get clean &> /dev/null"

# specify working directory for deployment image
WORKDIR /app

# copy app from build to deployment image
COPY --chown=nobody:nogroup --from=builder /code/app/target/release/ea_account /app/ea_account

# set user to non-root
USER nobody

# expose server port
EXPOSE 8081

# run the app
CMD [ "/app/ea_account" ]
