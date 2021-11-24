/* eslint-disable */
import Long from "long";
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export interface Address {
  id: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  countryId: string;
  postalCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListAddressesRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListAddressesResponse {
  success: boolean;
  addresses: Address[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetAddressRequest {
  addressId: string;
}

export interface GetAddressResponse {
  success: boolean;
  message: string | undefined;
  address?: Address | undefined;
}

export interface CreateAddressRequest {
  requestId: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  countryId: string;
  postalCode: string;
}

export interface CreateAddressResponse {
  success: boolean;
  message: string | undefined;
  address?: Address | undefined;
}

export interface DeleteAddressRequest {
  requestId: string;
  addressId: string;
}

export interface DeleteAddressResponse {
  success: boolean;
  message: string | undefined;
  address?: Address | undefined;
}

export interface UpdateAddressRequest {
  requestId: string;
  addressId: string;
  address1?: string | undefined;
  address2?: string | undefined;
  city?: string | undefined;
  state?: string | undefined;
  countryId?: string | undefined;
  postalCode?: string | undefined;
}

export interface UpdateAddressResponse {
  success: boolean;
  message: string | undefined;
  address?: Address | undefined;
}

const baseAddress: object = {
  id: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  countryId: "",
  postalCode: "",
};

export const Address = {
  encode(message: Address, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.address1 !== "") {
      writer.uint32(18).string(message.address1);
    }
    if (message.address2 !== "") {
      writer.uint32(26).string(message.address2);
    }
    if (message.city !== "") {
      writer.uint32(34).string(message.city);
    }
    if (message.state !== "") {
      writer.uint32(42).string(message.state);
    }
    if (message.countryId !== "") {
      writer.uint32(50).string(message.countryId);
    }
    if (message.postalCode !== "") {
      writer.uint32(58).string(message.postalCode);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Address {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAddress } as Address;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.address1 = reader.string();
          break;
        case 3:
          message.address2 = reader.string();
          break;
        case 4:
          message.city = reader.string();
          break;
        case 5:
          message.state = reader.string();
          break;
        case 6:
          message.countryId = reader.string();
          break;
        case 7:
          message.postalCode = reader.string();
          break;
        case 11:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 12:
          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Address {
    const message = { ...baseAddress } as Address;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.address1 =
      object.address1 !== undefined && object.address1 !== null
        ? String(object.address1)
        : "";
    message.address2 =
      object.address2 !== undefined && object.address2 !== null
        ? String(object.address2)
        : "";
    message.city =
      object.city !== undefined && object.city !== null ? String(object.city) : "";
    message.state =
      object.state !== undefined && object.state !== null ? String(object.state) : "";
    message.countryId =
      object.countryId !== undefined && object.countryId !== null
        ? String(object.countryId)
        : "";
    message.postalCode =
      object.postalCode !== undefined && object.postalCode !== null
        ? String(object.postalCode)
        : "";
    message.createdAt =
      object.createdAt !== undefined && object.createdAt !== null
        ? fromJsonTimestamp(object.createdAt)
        : undefined;
    message.updatedAt =
      object.updatedAt !== undefined && object.updatedAt !== null
        ? fromJsonTimestamp(object.updatedAt)
        : undefined;
    return message;
  },

  toJSON(message: Address): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.address1 !== undefined && (obj.address1 = message.address1);
    message.address2 !== undefined && (obj.address2 = message.address2);
    message.city !== undefined && (obj.city = message.city);
    message.state !== undefined && (obj.state = message.state);
    message.countryId !== undefined && (obj.countryId = message.countryId);
    message.postalCode !== undefined && (obj.postalCode = message.postalCode);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Address>): Address {
    const message = { ...baseAddress } as Address;
    message.id = object.id ?? "";
    message.address1 = object.address1 ?? "";
    message.address2 = object.address2 ?? "";
    message.city = object.city ?? "";
    message.state = object.state ?? "";
    message.countryId = object.countryId ?? "";
    message.postalCode = object.postalCode ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListAddressesRequest: object = { pageSize: 0, pageToken: "" };

export const ListAddressesRequest = {
  encode(
    message: ListAddressesRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pageSize !== 0) {
      writer.uint32(16).int32(message.pageSize);
    }
    if (message.pageToken !== "") {
      writer.uint32(26).string(message.pageToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAddressesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListAddressesRequest } as ListAddressesRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.pageSize = reader.int32();
          break;
        case 3:
          message.pageToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListAddressesRequest {
    const message = { ...baseListAddressesRequest } as ListAddressesRequest;
    message.pageSize =
      object.pageSize !== undefined && object.pageSize !== null
        ? Number(object.pageSize)
        : 0;
    message.pageToken =
      object.pageToken !== undefined && object.pageToken !== null
        ? String(object.pageToken)
        : "";
    return message;
  },

  toJSON(message: ListAddressesRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListAddressesRequest>): ListAddressesRequest {
    const message = { ...baseListAddressesRequest } as ListAddressesRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListAddressesResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListAddressesResponse = {
  encode(
    message: ListAddressesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.addresses) {
      Address.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAddressesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListAddressesResponse } as ListAddressesResponse;
    message.addresses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.addresses.push(Address.decode(reader, reader.uint32()));
          break;
        case 5:
          message.nextPageToken = reader.string();
          break;
        case 6:
          message.totalSize = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListAddressesResponse {
    const message = { ...baseListAddressesResponse } as ListAddressesResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.addresses = (object.addresses ?? []).map((e: any) => Address.fromJSON(e));
    message.nextPageToken =
      object.nextPageToken !== undefined && object.nextPageToken !== null
        ? String(object.nextPageToken)
        : "";
    message.totalSize =
      object.totalSize !== undefined && object.totalSize !== null
        ? Number(object.totalSize)
        : 0;
    return message;
  },

  toJSON(message: ListAddressesResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.addresses) {
      obj.addresses = message.addresses.map((e) => (e ? Address.toJSON(e) : undefined));
    } else {
      obj.addresses = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListAddressesResponse>): ListAddressesResponse {
    const message = { ...baseListAddressesResponse } as ListAddressesResponse;
    message.success = object.success ?? false;
    message.addresses = (object.addresses ?? []).map((e) => Address.fromPartial(e));
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetAddressRequest: object = { addressId: "" };

export const GetAddressRequest = {
  encode(
    message: GetAddressRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.addressId !== "") {
      writer.uint32(10).string(message.addressId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetAddressRequest } as GetAddressRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addressId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAddressRequest {
    const message = { ...baseGetAddressRequest } as GetAddressRequest;
    message.addressId =
      object.addressId !== undefined && object.addressId !== null
        ? String(object.addressId)
        : "";
    return message;
  },

  toJSON(message: GetAddressRequest): unknown {
    const obj: any = {};
    message.addressId !== undefined && (obj.addressId = message.addressId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetAddressRequest>): GetAddressRequest {
    const message = { ...baseGetAddressRequest } as GetAddressRequest;
    message.addressId = object.addressId ?? "";
    return message;
  },
};

const baseGetAddressResponse: object = { success: false };

export const GetAddressResponse = {
  encode(
    message: GetAddressResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetAddressResponse } as GetAddressResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.message = reader.string();
          break;
        case 4:
          message.address = Address.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAddressResponse {
    const message = { ...baseGetAddressResponse } as GetAddressResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.address =
      object.address !== undefined && object.address !== null
        ? Address.fromJSON(object.address)
        : undefined;
    return message;
  },

  toJSON(message: GetAddressResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.address !== undefined &&
      (obj.address = message.address ? Address.toJSON(message.address) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetAddressResponse>): GetAddressResponse {
    const message = { ...baseGetAddressResponse } as GetAddressResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.address =
      object.address !== undefined && object.address !== null
        ? Address.fromPartial(object.address)
        : undefined;
    return message;
  },
};

const baseCreateAddressRequest: object = {
  requestId: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  countryId: "",
  postalCode: "",
};

export const CreateAddressRequest = {
  encode(
    message: CreateAddressRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.address1 !== "") {
      writer.uint32(18).string(message.address1);
    }
    if (message.address2 !== "") {
      writer.uint32(26).string(message.address2);
    }
    if (message.city !== "") {
      writer.uint32(34).string(message.city);
    }
    if (message.state !== "") {
      writer.uint32(42).string(message.state);
    }
    if (message.countryId !== "") {
      writer.uint32(50).string(message.countryId);
    }
    if (message.postalCode !== "") {
      writer.uint32(58).string(message.postalCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateAddressRequest } as CreateAddressRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 2:
          message.address1 = reader.string();
          break;
        case 3:
          message.address2 = reader.string();
          break;
        case 4:
          message.city = reader.string();
          break;
        case 5:
          message.state = reader.string();
          break;
        case 6:
          message.countryId = reader.string();
          break;
        case 7:
          message.postalCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateAddressRequest {
    const message = { ...baseCreateAddressRequest } as CreateAddressRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.address1 =
      object.address1 !== undefined && object.address1 !== null
        ? String(object.address1)
        : "";
    message.address2 =
      object.address2 !== undefined && object.address2 !== null
        ? String(object.address2)
        : "";
    message.city =
      object.city !== undefined && object.city !== null ? String(object.city) : "";
    message.state =
      object.state !== undefined && object.state !== null ? String(object.state) : "";
    message.countryId =
      object.countryId !== undefined && object.countryId !== null
        ? String(object.countryId)
        : "";
    message.postalCode =
      object.postalCode !== undefined && object.postalCode !== null
        ? String(object.postalCode)
        : "";
    return message;
  },

  toJSON(message: CreateAddressRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.address1 !== undefined && (obj.address1 = message.address1);
    message.address2 !== undefined && (obj.address2 = message.address2);
    message.city !== undefined && (obj.city = message.city);
    message.state !== undefined && (obj.state = message.state);
    message.countryId !== undefined && (obj.countryId = message.countryId);
    message.postalCode !== undefined && (obj.postalCode = message.postalCode);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateAddressRequest>): CreateAddressRequest {
    const message = { ...baseCreateAddressRequest } as CreateAddressRequest;
    message.requestId = object.requestId ?? "";
    message.address1 = object.address1 ?? "";
    message.address2 = object.address2 ?? "";
    message.city = object.city ?? "";
    message.state = object.state ?? "";
    message.countryId = object.countryId ?? "";
    message.postalCode = object.postalCode ?? "";
    return message;
  },
};

const baseCreateAddressResponse: object = { success: false };

export const CreateAddressResponse = {
  encode(
    message: CreateAddressResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateAddressResponse } as CreateAddressResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.message = reader.string();
          break;
        case 4:
          message.address = Address.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateAddressResponse {
    const message = { ...baseCreateAddressResponse } as CreateAddressResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.address =
      object.address !== undefined && object.address !== null
        ? Address.fromJSON(object.address)
        : undefined;
    return message;
  },

  toJSON(message: CreateAddressResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.address !== undefined &&
      (obj.address = message.address ? Address.toJSON(message.address) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateAddressResponse>): CreateAddressResponse {
    const message = { ...baseCreateAddressResponse } as CreateAddressResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.address =
      object.address !== undefined && object.address !== null
        ? Address.fromPartial(object.address)
        : undefined;
    return message;
  },
};

const baseDeleteAddressRequest: object = { requestId: "", addressId: "" };

export const DeleteAddressRequest = {
  encode(
    message: DeleteAddressRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.addressId !== "") {
      writer.uint32(10).string(message.addressId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteAddressRequest } as DeleteAddressRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.addressId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteAddressRequest {
    const message = { ...baseDeleteAddressRequest } as DeleteAddressRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.addressId =
      object.addressId !== undefined && object.addressId !== null
        ? String(object.addressId)
        : "";
    return message;
  },

  toJSON(message: DeleteAddressRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.addressId !== undefined && (obj.addressId = message.addressId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteAddressRequest>): DeleteAddressRequest {
    const message = { ...baseDeleteAddressRequest } as DeleteAddressRequest;
    message.requestId = object.requestId ?? "";
    message.addressId = object.addressId ?? "";
    return message;
  },
};

const baseDeleteAddressResponse: object = { success: false };

export const DeleteAddressResponse = {
  encode(
    message: DeleteAddressResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteAddressResponse } as DeleteAddressResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.message = reader.string();
          break;
        case 4:
          message.address = Address.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteAddressResponse {
    const message = { ...baseDeleteAddressResponse } as DeleteAddressResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.address =
      object.address !== undefined && object.address !== null
        ? Address.fromJSON(object.address)
        : undefined;
    return message;
  },

  toJSON(message: DeleteAddressResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.address !== undefined &&
      (obj.address = message.address ? Address.toJSON(message.address) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteAddressResponse>): DeleteAddressResponse {
    const message = { ...baseDeleteAddressResponse } as DeleteAddressResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.address =
      object.address !== undefined && object.address !== null
        ? Address.fromPartial(object.address)
        : undefined;
    return message;
  },
};

const baseUpdateAddressRequest: object = { requestId: "", addressId: "" };

export const UpdateAddressRequest = {
  encode(
    message: UpdateAddressRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.addressId !== "") {
      writer.uint32(10).string(message.addressId);
    }
    if (message.address1 !== undefined) {
      writer.uint32(18).string(message.address1);
    }
    if (message.address2 !== undefined) {
      writer.uint32(26).string(message.address2);
    }
    if (message.city !== undefined) {
      writer.uint32(34).string(message.city);
    }
    if (message.state !== undefined) {
      writer.uint32(42).string(message.state);
    }
    if (message.countryId !== undefined) {
      writer.uint32(50).string(message.countryId);
    }
    if (message.postalCode !== undefined) {
      writer.uint32(58).string(message.postalCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateAddressRequest } as UpdateAddressRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.addressId = reader.string();
          break;
        case 2:
          message.address1 = reader.string();
          break;
        case 3:
          message.address2 = reader.string();
          break;
        case 4:
          message.city = reader.string();
          break;
        case 5:
          message.state = reader.string();
          break;
        case 6:
          message.countryId = reader.string();
          break;
        case 7:
          message.postalCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateAddressRequest {
    const message = { ...baseUpdateAddressRequest } as UpdateAddressRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.addressId =
      object.addressId !== undefined && object.addressId !== null
        ? String(object.addressId)
        : "";
    message.address1 =
      object.address1 !== undefined && object.address1 !== null
        ? String(object.address1)
        : undefined;
    message.address2 =
      object.address2 !== undefined && object.address2 !== null
        ? String(object.address2)
        : undefined;
    message.city =
      object.city !== undefined && object.city !== null ? String(object.city) : undefined;
    message.state =
      object.state !== undefined && object.state !== null
        ? String(object.state)
        : undefined;
    message.countryId =
      object.countryId !== undefined && object.countryId !== null
        ? String(object.countryId)
        : undefined;
    message.postalCode =
      object.postalCode !== undefined && object.postalCode !== null
        ? String(object.postalCode)
        : undefined;
    return message;
  },

  toJSON(message: UpdateAddressRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.addressId !== undefined && (obj.addressId = message.addressId);
    message.address1 !== undefined && (obj.address1 = message.address1);
    message.address2 !== undefined && (obj.address2 = message.address2);
    message.city !== undefined && (obj.city = message.city);
    message.state !== undefined && (obj.state = message.state);
    message.countryId !== undefined && (obj.countryId = message.countryId);
    message.postalCode !== undefined && (obj.postalCode = message.postalCode);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateAddressRequest>): UpdateAddressRequest {
    const message = { ...baseUpdateAddressRequest } as UpdateAddressRequest;
    message.requestId = object.requestId ?? "";
    message.addressId = object.addressId ?? "";
    message.address1 = object.address1 ?? undefined;
    message.address2 = object.address2 ?? undefined;
    message.city = object.city ?? undefined;
    message.state = object.state ?? undefined;
    message.countryId = object.countryId ?? undefined;
    message.postalCode = object.postalCode ?? undefined;
    return message;
  },
};

const baseUpdateAddressResponse: object = { success: false };

export const UpdateAddressResponse = {
  encode(
    message: UpdateAddressResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateAddressResponse } as UpdateAddressResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.message = reader.string();
          break;
        case 4:
          message.address = Address.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateAddressResponse {
    const message = { ...baseUpdateAddressResponse } as UpdateAddressResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.address =
      object.address !== undefined && object.address !== null
        ? Address.fromJSON(object.address)
        : undefined;
    return message;
  },

  toJSON(message: UpdateAddressResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.address !== undefined &&
      (obj.address = message.address ? Address.toJSON(message.address) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateAddressResponse>): UpdateAddressResponse {
    const message = { ...baseUpdateAddressResponse } as UpdateAddressResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.address =
      object.address !== undefined && object.address !== null
        ? Address.fromPartial(object.address)
        : undefined;
    return message;
  },
};

export const AddressServiceService = {
  listAddresses: {
    path: "/ea.AddressService/ListAddresses",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListAddressesRequest) =>
      Buffer.from(ListAddressesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListAddressesRequest.decode(value),
    responseSerialize: (value: ListAddressesResponse) =>
      Buffer.from(ListAddressesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListAddressesResponse.decode(value),
  },
  getAddress: {
    path: "/ea.AddressService/GetAddress",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetAddressRequest) =>
      Buffer.from(GetAddressRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetAddressRequest.decode(value),
    responseSerialize: (value: GetAddressResponse) =>
      Buffer.from(GetAddressResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetAddressResponse.decode(value),
  },
  createAddress: {
    path: "/ea.AddressService/CreateAddress",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateAddressRequest) =>
      Buffer.from(CreateAddressRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateAddressRequest.decode(value),
    responseSerialize: (value: CreateAddressResponse) =>
      Buffer.from(CreateAddressResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateAddressResponse.decode(value),
  },
  deleteAddress: {
    path: "/ea.AddressService/DeleteAddress",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteAddressRequest) =>
      Buffer.from(DeleteAddressRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteAddressRequest.decode(value),
    responseSerialize: (value: DeleteAddressResponse) =>
      Buffer.from(DeleteAddressResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteAddressResponse.decode(value),
  },
  updateAddress: {
    path: "/ea.AddressService/UpdateAddress",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateAddressRequest) =>
      Buffer.from(UpdateAddressRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateAddressRequest.decode(value),
    responseSerialize: (value: UpdateAddressResponse) =>
      Buffer.from(UpdateAddressResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateAddressResponse.decode(value),
  },
} as const;

export interface AddressServiceServer extends UntypedServiceImplementation {
  listAddresses: handleUnaryCall<ListAddressesRequest, ListAddressesResponse>;
  getAddress: handleUnaryCall<GetAddressRequest, GetAddressResponse>;
  createAddress: handleUnaryCall<CreateAddressRequest, CreateAddressResponse>;
  deleteAddress: handleUnaryCall<DeleteAddressRequest, DeleteAddressResponse>;
  updateAddress: handleUnaryCall<UpdateAddressRequest, UpdateAddressResponse>;
}

export interface AddressServiceClient extends Client {
  listAddresses(
    request: ListAddressesRequest,
    callback: (error: ServiceError | null, response: ListAddressesResponse) => void,
  ): ClientUnaryCall;
  listAddresses(
    request: ListAddressesRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListAddressesResponse) => void,
  ): ClientUnaryCall;
  listAddresses(
    request: ListAddressesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListAddressesResponse) => void,
  ): ClientUnaryCall;
  getAddress(
    request: GetAddressRequest,
    callback: (error: ServiceError | null, response: GetAddressResponse) => void,
  ): ClientUnaryCall;
  getAddress(
    request: GetAddressRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetAddressResponse) => void,
  ): ClientUnaryCall;
  getAddress(
    request: GetAddressRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetAddressResponse) => void,
  ): ClientUnaryCall;
  createAddress(
    request: CreateAddressRequest,
    callback: (error: ServiceError | null, response: CreateAddressResponse) => void,
  ): ClientUnaryCall;
  createAddress(
    request: CreateAddressRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateAddressResponse) => void,
  ): ClientUnaryCall;
  createAddress(
    request: CreateAddressRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateAddressResponse) => void,
  ): ClientUnaryCall;
  deleteAddress(
    request: DeleteAddressRequest,
    callback: (error: ServiceError | null, response: DeleteAddressResponse) => void,
  ): ClientUnaryCall;
  deleteAddress(
    request: DeleteAddressRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteAddressResponse) => void,
  ): ClientUnaryCall;
  deleteAddress(
    request: DeleteAddressRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteAddressResponse) => void,
  ): ClientUnaryCall;
  updateAddress(
    request: UpdateAddressRequest,
    callback: (error: ServiceError | null, response: UpdateAddressResponse) => void,
  ): ClientUnaryCall;
  updateAddress(
    request: UpdateAddressRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateAddressResponse) => void,
  ): ClientUnaryCall;
  updateAddress(
    request: UpdateAddressRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateAddressResponse) => void,
  ): ClientUnaryCall;
}

export const AddressServiceClient = makeGenericClientConstructor(
  AddressServiceService,
  "ea.AddressService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): AddressServiceClient;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
