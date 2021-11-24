/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface BigDecimal {
  scale: number;
  precision: number;
  value: Buffer;
}

const baseBigDecimal: object = { scale: 0, precision: 0 };

export const BigDecimal = {
  encode(message: BigDecimal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scale !== 0) {
      writer.uint32(8).uint32(message.scale);
    }
    if (message.precision !== 0) {
      writer.uint32(16).uint32(message.precision);
    }
    if (message.value.length !== 0) {
      writer.uint32(26).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BigDecimal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBigDecimal } as BigDecimal;
    message.value = Buffer.alloc(0);
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.scale = reader.uint32();
          break;
        case 2:
          message.precision = reader.uint32();
          break;
        case 3:
          message.value = reader.bytes() as Buffer;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BigDecimal {
    const message = { ...baseBigDecimal } as BigDecimal;
    message.scale =
      object.scale !== undefined && object.scale !== null ? Number(object.scale) : 0;
    message.precision =
      object.precision !== undefined && object.precision !== null
        ? Number(object.precision)
        : 0;
    message.value =
      object.value !== undefined && object.value !== null
        ? Buffer.from(bytesFromBase64(object.value))
        : Buffer.alloc(0);
    return message;
  },

  toJSON(message: BigDecimal): unknown {
    const obj: any = {};
    message.scale !== undefined && (obj.scale = message.scale);
    message.precision !== undefined && (obj.precision = message.precision);
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : Buffer.alloc(0),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<BigDecimal>): BigDecimal {
    const message = { ...baseBigDecimal } as BigDecimal;
    message.scale = object.scale ?? 0;
    message.precision = object.precision ?? 0;
    message.value = object.value ?? Buffer.alloc(0);
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
