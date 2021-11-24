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

export interface Rank {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListRanksRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListRanksResponse {
  success: boolean;
  Ranks: Rank[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetRankRequest {
  rankId: string;
}

export interface GetRankResponse {
  success: boolean;
  message: string | undefined;
  rank?: Rank | undefined;
}

export interface CreateRankRequest {
  requestId: string;
  name: string;
  description: string;
}

export interface CreateRankResponse {
  success: boolean;
  message: string | undefined;
  rank?: Rank | undefined;
}

export interface DeleteRankRequest {
  requestId: string;
  rankId: string;
}

export interface DeleteRankResponse {
  success: boolean;
  message: string | undefined;
  rank?: Rank | undefined;
}

export interface UpdateRankRequest {
  requestId: string;
  rankId: string;
  name?: string | undefined;
  description?: string | undefined;
}

export interface UpdateRankResponse {
  success: boolean;
  message: string | undefined;
  rank?: Rank | undefined;
}

const baseRank: object = { id: "", name: "", description: "" };

export const Rank = {
  encode(message: Rank, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rank {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRank } as Rank;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
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

  fromJSON(object: any): Rank {
    const message = { ...baseRank } as Rank;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : "";
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
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

  toJSON(message: Rank): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Rank>): Rank {
    const message = { ...baseRank } as Rank;
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListRanksRequest: object = { pageSize: 0, pageToken: "" };

export const ListRanksRequest = {
  encode(
    message: ListRanksRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRanksRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListRanksRequest } as ListRanksRequest;
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

  fromJSON(object: any): ListRanksRequest {
    const message = { ...baseListRanksRequest } as ListRanksRequest;
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

  toJSON(message: ListRanksRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListRanksRequest>): ListRanksRequest {
    const message = { ...baseListRanksRequest } as ListRanksRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListRanksResponse: object = { success: false, nextPageToken: "", totalSize: 0 };

export const ListRanksResponse = {
  encode(
    message: ListRanksResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.Ranks) {
      Rank.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRanksResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListRanksResponse } as ListRanksResponse;
    message.Ranks = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.Ranks.push(Rank.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListRanksResponse {
    const message = { ...baseListRanksResponse } as ListRanksResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.Ranks = (object.Ranks ?? []).map((e: any) => Rank.fromJSON(e));
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

  toJSON(message: ListRanksResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.Ranks) {
      obj.Ranks = message.Ranks.map((e) => (e ? Rank.toJSON(e) : undefined));
    } else {
      obj.Ranks = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListRanksResponse>): ListRanksResponse {
    const message = { ...baseListRanksResponse } as ListRanksResponse;
    message.success = object.success ?? false;
    message.Ranks = (object.Ranks ?? []).map((e) => Rank.fromPartial(e));
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetRankRequest: object = { rankId: "" };

export const GetRankRequest = {
  encode(message: GetRankRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rankId !== "") {
      writer.uint32(10).string(message.rankId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetRankRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetRankRequest } as GetRankRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rankId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRankRequest {
    const message = { ...baseGetRankRequest } as GetRankRequest;
    message.rankId =
      object.rankId !== undefined && object.rankId !== null ? String(object.rankId) : "";
    return message;
  },

  toJSON(message: GetRankRequest): unknown {
    const obj: any = {};
    message.rankId !== undefined && (obj.rankId = message.rankId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetRankRequest>): GetRankRequest {
    const message = { ...baseGetRankRequest } as GetRankRequest;
    message.rankId = object.rankId ?? "";
    return message;
  },
};

const baseGetRankResponse: object = { success: false };

export const GetRankResponse = {
  encode(message: GetRankResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.rank !== undefined) {
      Rank.encode(message.rank, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetRankResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetRankResponse } as GetRankResponse;
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
          message.rank = Rank.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetRankResponse {
    const message = { ...baseGetRankResponse } as GetRankResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.rank =
      object.rank !== undefined && object.rank !== null
        ? Rank.fromJSON(object.rank)
        : undefined;
    return message;
  },

  toJSON(message: GetRankResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.rank !== undefined &&
      (obj.rank = message.rank ? Rank.toJSON(message.rank) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetRankResponse>): GetRankResponse {
    const message = { ...baseGetRankResponse } as GetRankResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.rank =
      object.rank !== undefined && object.rank !== null
        ? Rank.fromPartial(object.rank)
        : undefined;
    return message;
  },
};

const baseCreateRankRequest: object = { requestId: "", name: "", description: "" };

export const CreateRankRequest = {
  encode(
    message: CreateRankRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateRankRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateRankRequest } as CreateRankRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateRankRequest {
    const message = { ...baseCreateRankRequest } as CreateRankRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : "";
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : "";
    return message;
  },

  toJSON(message: CreateRankRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateRankRequest>): CreateRankRequest {
    const message = { ...baseCreateRankRequest } as CreateRankRequest;
    message.requestId = object.requestId ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

const baseCreateRankResponse: object = { success: false };

export const CreateRankResponse = {
  encode(
    message: CreateRankResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.rank !== undefined) {
      Rank.encode(message.rank, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateRankResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateRankResponse } as CreateRankResponse;
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
          message.rank = Rank.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateRankResponse {
    const message = { ...baseCreateRankResponse } as CreateRankResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.rank =
      object.rank !== undefined && object.rank !== null
        ? Rank.fromJSON(object.rank)
        : undefined;
    return message;
  },

  toJSON(message: CreateRankResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.rank !== undefined &&
      (obj.rank = message.rank ? Rank.toJSON(message.rank) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateRankResponse>): CreateRankResponse {
    const message = { ...baseCreateRankResponse } as CreateRankResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.rank =
      object.rank !== undefined && object.rank !== null
        ? Rank.fromPartial(object.rank)
        : undefined;
    return message;
  },
};

const baseDeleteRankRequest: object = { requestId: "", rankId: "" };

export const DeleteRankRequest = {
  encode(
    message: DeleteRankRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.rankId !== "") {
      writer.uint32(10).string(message.rankId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRankRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteRankRequest } as DeleteRankRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.rankId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteRankRequest {
    const message = { ...baseDeleteRankRequest } as DeleteRankRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.rankId =
      object.rankId !== undefined && object.rankId !== null ? String(object.rankId) : "";
    return message;
  },

  toJSON(message: DeleteRankRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.rankId !== undefined && (obj.rankId = message.rankId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteRankRequest>): DeleteRankRequest {
    const message = { ...baseDeleteRankRequest } as DeleteRankRequest;
    message.requestId = object.requestId ?? "";
    message.rankId = object.rankId ?? "";
    return message;
  },
};

const baseDeleteRankResponse: object = { success: false };

export const DeleteRankResponse = {
  encode(
    message: DeleteRankResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.rank !== undefined) {
      Rank.encode(message.rank, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRankResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteRankResponse } as DeleteRankResponse;
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
          message.rank = Rank.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteRankResponse {
    const message = { ...baseDeleteRankResponse } as DeleteRankResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.rank =
      object.rank !== undefined && object.rank !== null
        ? Rank.fromJSON(object.rank)
        : undefined;
    return message;
  },

  toJSON(message: DeleteRankResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.rank !== undefined &&
      (obj.rank = message.rank ? Rank.toJSON(message.rank) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteRankResponse>): DeleteRankResponse {
    const message = { ...baseDeleteRankResponse } as DeleteRankResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.rank =
      object.rank !== undefined && object.rank !== null
        ? Rank.fromPartial(object.rank)
        : undefined;
    return message;
  },
};

const baseUpdateRankRequest: object = { requestId: "", rankId: "" };

export const UpdateRankRequest = {
  encode(
    message: UpdateRankRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.rankId !== "") {
      writer.uint32(10).string(message.rankId);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateRankRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateRankRequest } as UpdateRankRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.rankId = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateRankRequest {
    const message = { ...baseUpdateRankRequest } as UpdateRankRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.rankId =
      object.rankId !== undefined && object.rankId !== null ? String(object.rankId) : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : undefined;
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : undefined;
    return message;
  },

  toJSON(message: UpdateRankRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.rankId !== undefined && (obj.rankId = message.rankId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateRankRequest>): UpdateRankRequest {
    const message = { ...baseUpdateRankRequest } as UpdateRankRequest;
    message.requestId = object.requestId ?? "";
    message.rankId = object.rankId ?? "";
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    return message;
  },
};

const baseUpdateRankResponse: object = { success: false };

export const UpdateRankResponse = {
  encode(
    message: UpdateRankResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.rank !== undefined) {
      Rank.encode(message.rank, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateRankResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateRankResponse } as UpdateRankResponse;
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
          message.rank = Rank.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateRankResponse {
    const message = { ...baseUpdateRankResponse } as UpdateRankResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.rank =
      object.rank !== undefined && object.rank !== null
        ? Rank.fromJSON(object.rank)
        : undefined;
    return message;
  },

  toJSON(message: UpdateRankResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.rank !== undefined &&
      (obj.rank = message.rank ? Rank.toJSON(message.rank) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateRankResponse>): UpdateRankResponse {
    const message = { ...baseUpdateRankResponse } as UpdateRankResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.rank =
      object.rank !== undefined && object.rank !== null
        ? Rank.fromPartial(object.rank)
        : undefined;
    return message;
  },
};

export const RankServiceService = {
  listRanks: {
    path: "/ea.RankService/ListRanks",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListRanksRequest) =>
      Buffer.from(ListRanksRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListRanksRequest.decode(value),
    responseSerialize: (value: ListRanksResponse) =>
      Buffer.from(ListRanksResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListRanksResponse.decode(value),
  },
  getRank: {
    path: "/ea.RankService/GetRank",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetRankRequest) =>
      Buffer.from(GetRankRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetRankRequest.decode(value),
    responseSerialize: (value: GetRankResponse) =>
      Buffer.from(GetRankResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetRankResponse.decode(value),
  },
  createRank: {
    path: "/ea.RankService/CreateRank",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateRankRequest) =>
      Buffer.from(CreateRankRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateRankRequest.decode(value),
    responseSerialize: (value: CreateRankResponse) =>
      Buffer.from(CreateRankResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateRankResponse.decode(value),
  },
  deleteRank: {
    path: "/ea.RankService/DeleteRank",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteRankRequest) =>
      Buffer.from(DeleteRankRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteRankRequest.decode(value),
    responseSerialize: (value: DeleteRankResponse) =>
      Buffer.from(DeleteRankResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteRankResponse.decode(value),
  },
  updateRank: {
    path: "/ea.RankService/UpdateRank",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateRankRequest) =>
      Buffer.from(UpdateRankRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateRankRequest.decode(value),
    responseSerialize: (value: UpdateRankResponse) =>
      Buffer.from(UpdateRankResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateRankResponse.decode(value),
  },
} as const;

export interface RankServiceServer extends UntypedServiceImplementation {
  listRanks: handleUnaryCall<ListRanksRequest, ListRanksResponse>;
  getRank: handleUnaryCall<GetRankRequest, GetRankResponse>;
  createRank: handleUnaryCall<CreateRankRequest, CreateRankResponse>;
  deleteRank: handleUnaryCall<DeleteRankRequest, DeleteRankResponse>;
  updateRank: handleUnaryCall<UpdateRankRequest, UpdateRankResponse>;
}

export interface RankServiceClient extends Client {
  listRanks(
    request: ListRanksRequest,
    callback: (error: ServiceError | null, response: ListRanksResponse) => void,
  ): ClientUnaryCall;
  listRanks(
    request: ListRanksRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListRanksResponse) => void,
  ): ClientUnaryCall;
  listRanks(
    request: ListRanksRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListRanksResponse) => void,
  ): ClientUnaryCall;
  getRank(
    request: GetRankRequest,
    callback: (error: ServiceError | null, response: GetRankResponse) => void,
  ): ClientUnaryCall;
  getRank(
    request: GetRankRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetRankResponse) => void,
  ): ClientUnaryCall;
  getRank(
    request: GetRankRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetRankResponse) => void,
  ): ClientUnaryCall;
  createRank(
    request: CreateRankRequest,
    callback: (error: ServiceError | null, response: CreateRankResponse) => void,
  ): ClientUnaryCall;
  createRank(
    request: CreateRankRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateRankResponse) => void,
  ): ClientUnaryCall;
  createRank(
    request: CreateRankRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateRankResponse) => void,
  ): ClientUnaryCall;
  deleteRank(
    request: DeleteRankRequest,
    callback: (error: ServiceError | null, response: DeleteRankResponse) => void,
  ): ClientUnaryCall;
  deleteRank(
    request: DeleteRankRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteRankResponse) => void,
  ): ClientUnaryCall;
  deleteRank(
    request: DeleteRankRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteRankResponse) => void,
  ): ClientUnaryCall;
  updateRank(
    request: UpdateRankRequest,
    callback: (error: ServiceError | null, response: UpdateRankResponse) => void,
  ): ClientUnaryCall;
  updateRank(
    request: UpdateRankRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateRankResponse) => void,
  ): ClientUnaryCall;
  updateRank(
    request: UpdateRankRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateRankResponse) => void,
  ): ClientUnaryCall;
}

export const RankServiceClient = makeGenericClientConstructor(
  RankServiceService,
  "ea.RankService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): RankServiceClient;
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
