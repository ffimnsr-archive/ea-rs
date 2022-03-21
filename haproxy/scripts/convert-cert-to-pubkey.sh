#!/usr/bin/env bash

set -eou pipefail

openssl x509 -pubkey -noout -in ./cert.pem > pubkey.pem
