use std::{env, fs, io, path::{Path, PathBuf}};

macro_rules! copy_file {
    ($file:expr, $destination:expr) => {
        match fs::copy($file, $destination) {
            Ok(file) => file,
            Err(error) => panic!("Problem copying the file {:?} to {:?}: {:?}", $file, $destination, error),
        };
    }
}

fn copy_dir<U: AsRef<Path>, V: AsRef<Path>>(src: U, dst: V) -> io::Result<()> {
    fs::create_dir_all(&dst)?;
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let ty = entry.file_type()?;
        if ty.is_dir() {
            copy_dir(entry.path(), dst.as_ref().join(entry.file_name()))?;
        } else {
            copy_file!(entry.path(), dst.as_ref().join(entry.file_name()));
        }
    }
    Ok(())
}

/// Get output directory in the following format.
/// <root or manifest path>/target/<profile>/
fn get_output_path() -> PathBuf {
    let out_dir_string = env::var("OUT_DIR").expect("Output directory is not set");
    let build_type = env::var("PROFILE").expect("Build profile is not set");
    let path = Path::new(&out_dir_string).join("target").join(build_type);
    return PathBuf::from(path);
}

fn get_origin_path() -> PathBuf {
    let manifest_dir_string = env::var("CARGO_MANIFEST_DIR").expect("Cargo manifest directory is not set");
    let path = Path::new(&manifest_dir_string).join("public");
    return PathBuf::from(path);
}

fn main() -> io::Result<()> {
    let origin_dir = get_origin_path();
    let output_dir = get_output_path();
    copy_dir(origin_dir, output_dir)?;
    Ok(())
}
