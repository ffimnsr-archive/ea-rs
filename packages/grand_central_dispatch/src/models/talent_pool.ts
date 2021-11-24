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

export interface TalentPool {
  id: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListTalentPoolsRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListTalentPoolsResponse {
  success: boolean;
  talentPools: TalentPool[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetTalentPoolRequest {
  talentPoolId: string;
}

export interface GetTalentPoolResponse {
  success: boolean;
  message: string | undefined;
  talentPool?: TalentPool | undefined;
}

export interface CreateTalentPoolRequest {
  requestId: string;
  userId: string;
}

export interface CreateTalentPoolResponse {
  success: boolean;
  message: string | undefined;
  talentPool?: TalentPool | undefined;
}

export interface DeleteTalentPoolRequest {
  requestId: string;
  talentPoolId: string;
}

export interface DeleteTalentPoolResponse {
  success: boolean;
  message: string | undefined;
  talentPool?: TalentPool | undefined;
}

export interface UpdateTalentPoolRequest {
  requestId: string;
  talentPoolId: string;
  userId?: string | undefined;
}

export interface UpdateTalentPoolResponse {
  success: boolean;
  message: string | undefined;
  talentPool?: TalentPool | undefined;
}

const baseTalentPool: object = { id: "", userId: "" };

export const TalentPool = {
  encode(message: TalentPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TalentPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTalentPool } as TalentPool;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.userId = reader.string();
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

  fromJSON(object: any): TalentPool {
    const message = { ...baseTalentPool } as TalentPool;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
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

  toJSON(message: TalentPool): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.userId !== undefined && (obj.userId = message.userId);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<TalentPool>): TalentPool {
    const message = { ...baseTalentPool } as TalentPool;
    message.id = object.id ?? "";
    message.userId = object.userId ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListTalentPoolsRequest: object = { pageSize: 0, pageToken: "" };

export const ListTalentPoolsRequest = {
  encode(
    message: ListTalentPoolsRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTalentPoolsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListTalentPoolsRequest } as ListTalentPoolsRequest;
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

  fromJSON(object: any): ListTalentPoolsRequest {
    const message = { ...baseListTalentPoolsRequest } as ListTalentPoolsRequest;
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

  toJSON(message: ListTalentPoolsRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListTalentPoolsRequest>): ListTalentPoolsRequest {
    const message = { ...baseListTalentPoolsRequest } as ListTalentPoolsRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListTalentPoolsResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListTalentPoolsResponse = {
  encode(
    message: ListTalentPoolsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.talentPools) {
      TalentPool.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTalentPoolsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListTalentPoolsResponse } as ListTalentPoolsResponse;
    message.talentPools = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.talentPools.push(TalentPool.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListTalentPoolsResponse {
    const message = { ...baseListTalentPoolsResponse } as ListTalentPoolsResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.talentPools = (object.talentPools ?? []).map((e: any) =>
      TalentPool.fromJSON(e),
    );
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

  toJSON(message: ListTalentPoolsResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.talentPools) {
      obj.talentPools = message.talentPools.map((e) =>
        e ? TalentPool.toJSON(e) : undefined,
      );
    } else {
      obj.talentPools = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListTalentPoolsResponse>): ListTalentPoolsResponse {
    const message = { ...baseListTalentPoolsResponse } as ListTalentPoolsResponse;
    message.success = object.success ?? false;
    message.talentPools = (object.talentPools ?? []).map((e) =>
      TalentPool.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetTalentPoolRequest: object = { talentPoolId: "" };

export const GetTalentPoolRequest = {
  encode(
    message: GetTalentPoolRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.talentPoolId !== "") {
      writer.uint32(10).string(message.talentPoolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTalentPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetTalentPoolRequest } as GetTalentPoolRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.talentPoolId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTalentPoolRequest {
    const message = { ...baseGetTalentPoolRequest } as GetTalentPoolRequest;
    message.talentPoolId =
      object.talentPoolId !== undefined && object.talentPoolId !== null
        ? String(object.talentPoolId)
        : "";
    return message;
  },

  toJSON(message: GetTalentPoolRequest): unknown {
    const obj: any = {};
    message.talentPoolId !== undefined && (obj.talentPoolId = message.talentPoolId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetTalentPoolRequest>): GetTalentPoolRequest {
    const message = { ...baseGetTalentPoolRequest } as GetTalentPoolRequest;
    message.talentPoolId = object.talentPoolId ?? "";
    return message;
  },
};

const baseGetTalentPoolResponse: object = { success: false };

export const GetTalentPoolResponse = {
  encode(
    message: GetTalentPoolResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.talentPool !== undefined) {
      TalentPool.encode(message.talentPool, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTalentPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetTalentPoolResponse } as GetTalentPoolResponse;
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
          message.talentPool = TalentPool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTalentPoolResponse {
    const message = { ...baseGetTalentPoolResponse } as GetTalentPoolResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.talentPool =
      object.talentPool !== undefined && object.talentPool !== null
        ? TalentPool.fromJSON(object.talentPool)
        : undefined;
    return message;
  },

  toJSON(message: GetTalentPoolResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.talentPool !== undefined &&
      (obj.talentPool = message.talentPool
        ? TalentPool.toJSON(message.talentPool)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetTalentPoolResponse>): GetTalentPoolResponse {
    const message = { ...baseGetTalentPoolResponse } as GetTalentPoolResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.talentPool =
      object.talentPool !== undefined && object.talentPool !== null
        ? TalentPool.fromPartial(object.talentPool)
        : undefined;
    return message;
  },
};

const baseCreateTalentPoolRequest: object = { requestId: "", userId: "" };

export const CreateTalentPoolRequest = {
  encode(
    message: CreateTalentPoolRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTalentPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateTalentPoolRequest } as CreateTalentPoolRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateTalentPoolRequest {
    const message = { ...baseCreateTalentPoolRequest } as CreateTalentPoolRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    return message;
  },

  toJSON(message: CreateTalentPoolRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateTalentPoolRequest>): CreateTalentPoolRequest {
    const message = { ...baseCreateTalentPoolRequest } as CreateTalentPoolRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

const baseCreateTalentPoolResponse: object = { success: false };

export const CreateTalentPoolResponse = {
  encode(
    message: CreateTalentPoolResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.talentPool !== undefined) {
      TalentPool.encode(message.talentPool, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTalentPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateTalentPoolResponse } as CreateTalentPoolResponse;
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
          message.talentPool = TalentPool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateTalentPoolResponse {
    const message = { ...baseCreateTalentPoolResponse } as CreateTalentPoolResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.talentPool =
      object.talentPool !== undefined && object.talentPool !== null
        ? TalentPool.fromJSON(object.talentPool)
        : undefined;
    return message;
  },

  toJSON(message: CreateTalentPoolResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.talentPool !== undefined &&
      (obj.talentPool = message.talentPool
        ? TalentPool.toJSON(message.talentPool)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateTalentPoolResponse>): CreateTalentPoolResponse {
    const message = { ...baseCreateTalentPoolResponse } as CreateTalentPoolResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.talentPool =
      object.talentPool !== undefined && object.talentPool !== null
        ? TalentPool.fromPartial(object.talentPool)
        : undefined;
    return message;
  },
};

const baseDeleteTalentPoolRequest: object = { requestId: "", talentPoolId: "" };

export const DeleteTalentPoolRequest = {
  encode(
    message: DeleteTalentPoolRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.talentPoolId !== "") {
      writer.uint32(10).string(message.talentPoolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteTalentPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteTalentPoolRequest } as DeleteTalentPoolRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.talentPoolId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteTalentPoolRequest {
    const message = { ...baseDeleteTalentPoolRequest } as DeleteTalentPoolRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.talentPoolId =
      object.talentPoolId !== undefined && object.talentPoolId !== null
        ? String(object.talentPoolId)
        : "";
    return message;
  },

  toJSON(message: DeleteTalentPoolRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.talentPoolId !== undefined && (obj.talentPoolId = message.talentPoolId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteTalentPoolRequest>): DeleteTalentPoolRequest {
    const message = { ...baseDeleteTalentPoolRequest } as DeleteTalentPoolRequest;
    message.requestId = object.requestId ?? "";
    message.talentPoolId = object.talentPoolId ?? "";
    return message;
  },
};

const baseDeleteTalentPoolResponse: object = { success: false };

export const DeleteTalentPoolResponse = {
  encode(
    message: DeleteTalentPoolResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.talentPool !== undefined) {
      TalentPool.encode(message.talentPool, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteTalentPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteTalentPoolResponse } as DeleteTalentPoolResponse;
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
          message.talentPool = TalentPool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteTalentPoolResponse {
    const message = { ...baseDeleteTalentPoolResponse } as DeleteTalentPoolResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.talentPool =
      object.talentPool !== undefined && object.talentPool !== null
        ? TalentPool.fromJSON(object.talentPool)
        : undefined;
    return message;
  },

  toJSON(message: DeleteTalentPoolResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.talentPool !== undefined &&
      (obj.talentPool = message.talentPool
        ? TalentPool.toJSON(message.talentPool)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteTalentPoolResponse>): DeleteTalentPoolResponse {
    const message = { ...baseDeleteTalentPoolResponse } as DeleteTalentPoolResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.talentPool =
      object.talentPool !== undefined && object.talentPool !== null
        ? TalentPool.fromPartial(object.talentPool)
        : undefined;
    return message;
  },
};

const baseUpdateTalentPoolRequest: object = { requestId: "", talentPoolId: "" };

export const UpdateTalentPoolRequest = {
  encode(
    message: UpdateTalentPoolRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.talentPoolId !== "") {
      writer.uint32(10).string(message.talentPoolId);
    }
    if (message.userId !== undefined) {
      writer.uint32(18).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTalentPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateTalentPoolRequest } as UpdateTalentPoolRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.talentPoolId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateTalentPoolRequest {
    const message = { ...baseUpdateTalentPoolRequest } as UpdateTalentPoolRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.talentPoolId =
      object.talentPoolId !== undefined && object.talentPoolId !== null
        ? String(object.talentPoolId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : undefined;
    return message;
  },

  toJSON(message: UpdateTalentPoolRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.talentPoolId !== undefined && (obj.talentPoolId = message.talentPoolId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateTalentPoolRequest>): UpdateTalentPoolRequest {
    const message = { ...baseUpdateTalentPoolRequest } as UpdateTalentPoolRequest;
    message.requestId = object.requestId ?? "";
    message.talentPoolId = object.talentPoolId ?? "";
    message.userId = object.userId ?? undefined;
    return message;
  },
};

const baseUpdateTalentPoolResponse: object = { success: false };

export const UpdateTalentPoolResponse = {
  encode(
    message: UpdateTalentPoolResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.talentPool !== undefined) {
      TalentPool.encode(message.talentPool, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTalentPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateTalentPoolResponse } as UpdateTalentPoolResponse;
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
          message.talentPool = TalentPool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateTalentPoolResponse {
    const message = { ...baseUpdateTalentPoolResponse } as UpdateTalentPoolResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.talentPool =
      object.talentPool !== undefined && object.talentPool !== null
        ? TalentPool.fromJSON(object.talentPool)
        : undefined;
    return message;
  },

  toJSON(message: UpdateTalentPoolResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.talentPool !== undefined &&
      (obj.talentPool = message.talentPool
        ? TalentPool.toJSON(message.talentPool)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateTalentPoolResponse>): UpdateTalentPoolResponse {
    const message = { ...baseUpdateTalentPoolResponse } as UpdateTalentPoolResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.talentPool =
      object.talentPool !== undefined && object.talentPool !== null
        ? TalentPool.fromPartial(object.talentPool)
        : undefined;
    return message;
  },
};

export const TalentPoolServiceService = {
  listTalentPools: {
    path: "/ea.TalentPoolService/ListTalentPools",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListTalentPoolsRequest) =>
      Buffer.from(ListTalentPoolsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListTalentPoolsRequest.decode(value),
    responseSerialize: (value: ListTalentPoolsResponse) =>
      Buffer.from(ListTalentPoolsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListTalentPoolsResponse.decode(value),
  },
  getTalentPool: {
    path: "/ea.TalentPoolService/GetTalentPool",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetTalentPoolRequest) =>
      Buffer.from(GetTalentPoolRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetTalentPoolRequest.decode(value),
    responseSerialize: (value: GetTalentPoolResponse) =>
      Buffer.from(GetTalentPoolResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetTalentPoolResponse.decode(value),
  },
  createTalentPool: {
    path: "/ea.TalentPoolService/CreateTalentPool",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateTalentPoolRequest) =>
      Buffer.from(CreateTalentPoolRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateTalentPoolRequest.decode(value),
    responseSerialize: (value: CreateTalentPoolResponse) =>
      Buffer.from(CreateTalentPoolResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateTalentPoolResponse.decode(value),
  },
  deleteTalentPool: {
    path: "/ea.TalentPoolService/DeleteTalentPool",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteTalentPoolRequest) =>
      Buffer.from(DeleteTalentPoolRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteTalentPoolRequest.decode(value),
    responseSerialize: (value: DeleteTalentPoolResponse) =>
      Buffer.from(DeleteTalentPoolResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteTalentPoolResponse.decode(value),
  },
  updateTalentPool: {
    path: "/ea.TalentPoolService/UpdateTalentPool",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateTalentPoolRequest) =>
      Buffer.from(UpdateTalentPoolRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateTalentPoolRequest.decode(value),
    responseSerialize: (value: UpdateTalentPoolResponse) =>
      Buffer.from(UpdateTalentPoolResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateTalentPoolResponse.decode(value),
  },
} as const;

export interface TalentPoolServiceServer extends UntypedServiceImplementation {
  listTalentPools: handleUnaryCall<ListTalentPoolsRequest, ListTalentPoolsResponse>;
  getTalentPool: handleUnaryCall<GetTalentPoolRequest, GetTalentPoolResponse>;
  createTalentPool: handleUnaryCall<CreateTalentPoolRequest, CreateTalentPoolResponse>;
  deleteTalentPool: handleUnaryCall<DeleteTalentPoolRequest, DeleteTalentPoolResponse>;
  updateTalentPool: handleUnaryCall<UpdateTalentPoolRequest, UpdateTalentPoolResponse>;
}

export interface TalentPoolServiceClient extends Client {
  listTalentPools(
    request: ListTalentPoolsRequest,
    callback: (error: ServiceError | null, response: ListTalentPoolsResponse) => void,
  ): ClientUnaryCall;
  listTalentPools(
    request: ListTalentPoolsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListTalentPoolsResponse) => void,
  ): ClientUnaryCall;
  listTalentPools(
    request: ListTalentPoolsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListTalentPoolsResponse) => void,
  ): ClientUnaryCall;
  getTalentPool(
    request: GetTalentPoolRequest,
    callback: (error: ServiceError | null, response: GetTalentPoolResponse) => void,
  ): ClientUnaryCall;
  getTalentPool(
    request: GetTalentPoolRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetTalentPoolResponse) => void,
  ): ClientUnaryCall;
  getTalentPool(
    request: GetTalentPoolRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetTalentPoolResponse) => void,
  ): ClientUnaryCall;
  createTalentPool(
    request: CreateTalentPoolRequest,
    callback: (error: ServiceError | null, response: CreateTalentPoolResponse) => void,
  ): ClientUnaryCall;
  createTalentPool(
    request: CreateTalentPoolRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateTalentPoolResponse) => void,
  ): ClientUnaryCall;
  createTalentPool(
    request: CreateTalentPoolRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateTalentPoolResponse) => void,
  ): ClientUnaryCall;
  deleteTalentPool(
    request: DeleteTalentPoolRequest,
    callback: (error: ServiceError | null, response: DeleteTalentPoolResponse) => void,
  ): ClientUnaryCall;
  deleteTalentPool(
    request: DeleteTalentPoolRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteTalentPoolResponse) => void,
  ): ClientUnaryCall;
  deleteTalentPool(
    request: DeleteTalentPoolRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteTalentPoolResponse) => void,
  ): ClientUnaryCall;
  updateTalentPool(
    request: UpdateTalentPoolRequest,
    callback: (error: ServiceError | null, response: UpdateTalentPoolResponse) => void,
  ): ClientUnaryCall;
  updateTalentPool(
    request: UpdateTalentPoolRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateTalentPoolResponse) => void,
  ): ClientUnaryCall;
  updateTalentPool(
    request: UpdateTalentPoolRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateTalentPoolResponse) => void,
  ): ClientUnaryCall;
}

export const TalentPoolServiceClient = makeGenericClientConstructor(
  TalentPoolServiceService,
  "ea.TalentPoolService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): TalentPoolServiceClient;
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
