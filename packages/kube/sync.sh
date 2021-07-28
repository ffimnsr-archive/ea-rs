#!/usr/bin/env bash

set -x

rsync -avxzP --delete . sesame-dc1-tun1:~/kube
