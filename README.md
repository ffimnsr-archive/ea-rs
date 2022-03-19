# Ea

## Get The Docs

The command below will merge `std` library docs into the compiled docs of your crate. So it can be easily be viewed in one `cargo doc --open` command.
```
mkdir -p target/doc
cp -rl ~/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/share/doc/rust/html/* target/doc/
cargo doc --open
```

## Running Hydra

```
docker-compose run hydra migrate sql -e --yes
```

## License

Copyright (C) Open Sesame Pt. Ltd. - All Rights Reserved.

Unauthorized copying or distributing of this source code, via any medium is
strictly prohibited.
