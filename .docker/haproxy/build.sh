#!/usr/bin/env bash

set -e

docker build --force-rm \
    -f ./Dockerfile \
    --build-arg haproxy_version=2.5.5-bullseye \
    -t 0x61c66847/haproxy:2.5.5 \
    -t 0x61c66847/haproxy:latest .
