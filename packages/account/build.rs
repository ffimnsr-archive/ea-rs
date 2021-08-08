use std::env;
use std::path::PathBuf;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let out_dir = PathBuf::from(env::var("OUT_DIR")?);
    tonic_build::configure()
    .file_descriptor_set_path(out_dir.join("accounts_descriptor.bin"))
    .compile(&["../../proto/accounts.proto"], &["../../proto"])?;
    Ok(())
}
