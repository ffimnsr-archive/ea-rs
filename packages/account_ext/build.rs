use std::env;
use std::path::PathBuf;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let out_dir = PathBuf::from(env::var("OUT_DIR")?);
    tonic_build::configure()
        .file_descriptor_set_path(out_dir.join("account_ext_descriptor.bin"))
        .compile(
            &[
                "../../proto/experience_level.proto",
                "../../proto/rank.proto",
                "../../proto/site_preference.proto",
                "../../proto/work_experience.proto",
                "../../proto/work_function.proto",
                "../../proto/work_preference.proto",
            ],
            &["../../proto"],
        )?;
    Ok(())
}
