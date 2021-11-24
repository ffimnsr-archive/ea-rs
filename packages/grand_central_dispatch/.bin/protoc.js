const path = require("path");
const shell = require("shelljs");
const rimraf = require("rimraf");

const PROTO_DIR = path.join(__dirname, "../../../proto");
const MODELS_DIR = path.join(__dirname, "../src/models");
const PROTOC_PATH = path.join(__dirname, "../node_modules/grpc-tools/bin/protoc");
const PLUGIN_PATH = path.join(__dirname, "../node_modules/.bin/protoc-gen-ts_proto");

rimraf.sync(`${MODELS_DIR}/*`);

const protoConfig = [
  `--plugin=${PLUGIN_PATH}`,
  "--ts_proto_opt=outputServices=grpc-js,env=node,useOptionals=true,exportCommonSymbols=false,esModuleInterop=true",
  `--ts_proto_out=${MODELS_DIR}`,
  `--proto_path ${PROTO_DIR} ${PROTO_DIR}/*.proto`,
];

shell.exec(`${PROTOC_PATH} ${protoConfig.join(" ")}`, (code, stdout, stderr) => console.log(code, stdout, stderr));
