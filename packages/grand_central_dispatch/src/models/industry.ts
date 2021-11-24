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

export interface Industry {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListIndustriesRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListIndustriesResponse {
  success: boolean;
  industries: Industry[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetIndustryRequest {
  industryId: string;
}

export interface GetIndustryResponse {
  success: boolean;
  message: string | undefined;
  industry?: Industry | undefined;
}

export interface CreateIndustryRequest {
  requestId: string;
  name: string;
  description: string;
}

export interface CreateIndustryResponse {
  success: boolean;
  message: string | undefined;
  industry?: Industry | undefined;
}

export interface DeleteIndustryRequest {
  requestId: string;
  industryId: string;
}

export interface DeleteIndustryResponse {
  success: boolean;
  message: string | undefined;
  industry?: Industry | undefined;
}

export interface UpdateIndustryRequest {
  requestId: string;
  industryId: string;
  name?: string | undefined;
  description?: string | undefined;
}

export interface UpdateIndustryResponse {
  success: boolean;
  message: string | undefined;
  industry?: Industry | undefined;
}

const baseIndustry: object = { id: "", name: "", description: "" };

export const Industry = {
  encode(message: Industry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Industry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIndustry } as Industry;
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

  fromJSON(object: any): Industry {
    const message = { ...baseIndustry } as Industry;
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

  toJSON(message: Industry): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Industry>): Industry {
    const message = { ...baseIndustry } as Industry;
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListIndustriesRequest: object = { pageSize: 0, pageToken: "" };

export const ListIndustriesRequest = {
  encode(
    message: ListIndustriesRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListIndustriesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListIndustriesRequest } as ListIndustriesRequest;
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

  fromJSON(object: any): ListIndustriesRequest {
    const message = { ...baseListIndustriesRequest } as ListIndustriesRequest;
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

  toJSON(message: ListIndustriesRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListIndustriesRequest>): ListIndustriesRequest {
    const message = { ...baseListIndustriesRequest } as ListIndustriesRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListIndustriesResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListIndustriesResponse = {
  encode(
    message: ListIndustriesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.industries) {
      Industry.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListIndustriesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListIndustriesResponse } as ListIndustriesResponse;
    message.industries = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.industries.push(Industry.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListIndustriesResponse {
    const message = { ...baseListIndustriesResponse } as ListIndustriesResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.industries = (object.industries ?? []).map((e: any) => Industry.fromJSON(e));
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

  toJSON(message: ListIndustriesResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.industries) {
      obj.industries = message.industries.map((e) =>
        e ? Industry.toJSON(e) : undefined,
      );
    } else {
      obj.industries = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListIndustriesResponse>): ListIndustriesResponse {
    const message = { ...baseListIndustriesResponse } as ListIndustriesResponse;
    message.success = object.success ?? false;
    message.industries = (object.industries ?? []).map((e) => Industry.fromPartial(e));
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetIndustryRequest: object = { industryId: "" };

export const GetIndustryRequest = {
  encode(
    message: GetIndustryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.industryId !== "") {
      writer.uint32(10).string(message.industryId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetIndustryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetIndustryRequest } as GetIndustryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.industryId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetIndustryRequest {
    const message = { ...baseGetIndustryRequest } as GetIndustryRequest;
    message.industryId =
      object.industryId !== undefined && object.industryId !== null
        ? String(object.industryId)
        : "";
    return message;
  },

  toJSON(message: GetIndustryRequest): unknown {
    const obj: any = {};
    message.industryId !== undefined && (obj.industryId = message.industryId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetIndustryRequest>): GetIndustryRequest {
    const message = { ...baseGetIndustryRequest } as GetIndustryRequest;
    message.industryId = object.industryId ?? "";
    return message;
  },
};

const baseGetIndustryResponse: object = { success: false };

export const GetIndustryResponse = {
  encode(
    message: GetIndustryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.industry !== undefined) {
      Industry.encode(message.industry, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetIndustryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetIndustryResponse } as GetIndustryResponse;
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
          message.industry = Industry.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetIndustryResponse {
    const message = { ...baseGetIndustryResponse } as GetIndustryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.industry =
      object.industry !== undefined && object.industry !== null
        ? Industry.fromJSON(object.industry)
        : undefined;
    return message;
  },

  toJSON(message: GetIndustryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.industry !== undefined &&
      (obj.industry = message.industry ? Industry.toJSON(message.industry) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetIndustryResponse>): GetIndustryResponse {
    const message = { ...baseGetIndustryResponse } as GetIndustryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.industry =
      object.industry !== undefined && object.industry !== null
        ? Industry.fromPartial(object.industry)
        : undefined;
    return message;
  },
};

const baseCreateIndustryRequest: object = { requestId: "", name: "", description: "" };

export const CreateIndustryRequest = {
  encode(
    message: CreateIndustryRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateIndustryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateIndustryRequest } as CreateIndustryRequest;
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

  fromJSON(object: any): CreateIndustryRequest {
    const message = { ...baseCreateIndustryRequest } as CreateIndustryRequest;
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

  toJSON(message: CreateIndustryRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateIndustryRequest>): CreateIndustryRequest {
    const message = { ...baseCreateIndustryRequest } as CreateIndustryRequest;
    message.requestId = object.requestId ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

const baseCreateIndustryResponse: object = { success: false };

export const CreateIndustryResponse = {
  encode(
    message: CreateIndustryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.industry !== undefined) {
      Industry.encode(message.industry, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateIndustryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateIndustryResponse } as CreateIndustryResponse;
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
          message.industry = Industry.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateIndustryResponse {
    const message = { ...baseCreateIndustryResponse } as CreateIndustryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.industry =
      object.industry !== undefined && object.industry !== null
        ? Industry.fromJSON(object.industry)
        : undefined;
    return message;
  },

  toJSON(message: CreateIndustryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.industry !== undefined &&
      (obj.industry = message.industry ? Industry.toJSON(message.industry) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateIndustryResponse>): CreateIndustryResponse {
    const message = { ...baseCreateIndustryResponse } as CreateIndustryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.industry =
      object.industry !== undefined && object.industry !== null
        ? Industry.fromPartial(object.industry)
        : undefined;
    return message;
  },
};

const baseDeleteIndustryRequest: object = { requestId: "", industryId: "" };

export const DeleteIndustryRequest = {
  encode(
    message: DeleteIndustryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.industryId !== "") {
      writer.uint32(10).string(message.industryId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteIndustryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteIndustryRequest } as DeleteIndustryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.industryId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteIndustryRequest {
    const message = { ...baseDeleteIndustryRequest } as DeleteIndustryRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.industryId =
      object.industryId !== undefined && object.industryId !== null
        ? String(object.industryId)
        : "";
    return message;
  },

  toJSON(message: DeleteIndustryRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.industryId !== undefined && (obj.industryId = message.industryId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteIndustryRequest>): DeleteIndustryRequest {
    const message = { ...baseDeleteIndustryRequest } as DeleteIndustryRequest;
    message.requestId = object.requestId ?? "";
    message.industryId = object.industryId ?? "";
    return message;
  },
};

const baseDeleteIndustryResponse: object = { success: false };

export const DeleteIndustryResponse = {
  encode(
    message: DeleteIndustryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.industry !== undefined) {
      Industry.encode(message.industry, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteIndustryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteIndustryResponse } as DeleteIndustryResponse;
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
          message.industry = Industry.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteIndustryResponse {
    const message = { ...baseDeleteIndustryResponse } as DeleteIndustryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.industry =
      object.industry !== undefined && object.industry !== null
        ? Industry.fromJSON(object.industry)
        : undefined;
    return message;
  },

  toJSON(message: DeleteIndustryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.industry !== undefined &&
      (obj.industry = message.industry ? Industry.toJSON(message.industry) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteIndustryResponse>): DeleteIndustryResponse {
    const message = { ...baseDeleteIndustryResponse } as DeleteIndustryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.industry =
      object.industry !== undefined && object.industry !== null
        ? Industry.fromPartial(object.industry)
        : undefined;
    return message;
  },
};

const baseUpdateIndustryRequest: object = { requestId: "", industryId: "" };

export const UpdateIndustryRequest = {
  encode(
    message: UpdateIndustryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.industryId !== "") {
      writer.uint32(10).string(message.industryId);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateIndustryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateIndustryRequest } as UpdateIndustryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.industryId = reader.string();
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

  fromJSON(object: any): UpdateIndustryRequest {
    const message = { ...baseUpdateIndustryRequest } as UpdateIndustryRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.industryId =
      object.industryId !== undefined && object.industryId !== null
        ? String(object.industryId)
        : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : undefined;
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : undefined;
    return message;
  },

  toJSON(message: UpdateIndustryRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.industryId !== undefined && (obj.industryId = message.industryId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateIndustryRequest>): UpdateIndustryRequest {
    const message = { ...baseUpdateIndustryRequest } as UpdateIndustryRequest;
    message.requestId = object.requestId ?? "";
    message.industryId = object.industryId ?? "";
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    return message;
  },
};

const baseUpdateIndustryResponse: object = { success: false };

export const UpdateIndustryResponse = {
  encode(
    message: UpdateIndustryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.industry !== undefined) {
      Industry.encode(message.industry, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateIndustryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateIndustryResponse } as UpdateIndustryResponse;
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
          message.industry = Industry.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateIndustryResponse {
    const message = { ...baseUpdateIndustryResponse } as UpdateIndustryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.industry =
      object.industry !== undefined && object.industry !== null
        ? Industry.fromJSON(object.industry)
        : undefined;
    return message;
  },

  toJSON(message: UpdateIndustryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.industry !== undefined &&
      (obj.industry = message.industry ? Industry.toJSON(message.industry) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateIndustryResponse>): UpdateIndustryResponse {
    const message = { ...baseUpdateIndustryResponse } as UpdateIndustryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.industry =
      object.industry !== undefined && object.industry !== null
        ? Industry.fromPartial(object.industry)
        : undefined;
    return message;
  },
};

export const IndustryServiceService = {
  listIndustries: {
    path: "/ea.IndustryService/ListIndustries",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListIndustriesRequest) =>
      Buffer.from(ListIndustriesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListIndustriesRequest.decode(value),
    responseSerialize: (value: ListIndustriesResponse) =>
      Buffer.from(ListIndustriesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListIndustriesResponse.decode(value),
  },
  getIndustry: {
    path: "/ea.IndustryService/GetIndustry",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetIndustryRequest) =>
      Buffer.from(GetIndustryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetIndustryRequest.decode(value),
    responseSerialize: (value: GetIndustryResponse) =>
      Buffer.from(GetIndustryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetIndustryResponse.decode(value),
  },
  createIndustry: {
    path: "/ea.IndustryService/CreateIndustry",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateIndustryRequest) =>
      Buffer.from(CreateIndustryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateIndustryRequest.decode(value),
    responseSerialize: (value: CreateIndustryResponse) =>
      Buffer.from(CreateIndustryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateIndustryResponse.decode(value),
  },
  deleteIndustry: {
    path: "/ea.IndustryService/DeleteIndustry",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteIndustryRequest) =>
      Buffer.from(DeleteIndustryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteIndustryRequest.decode(value),
    responseSerialize: (value: DeleteIndustryResponse) =>
      Buffer.from(DeleteIndustryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteIndustryResponse.decode(value),
  },
  updateIndustry: {
    path: "/ea.IndustryService/UpdateIndustry",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateIndustryRequest) =>
      Buffer.from(UpdateIndustryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateIndustryRequest.decode(value),
    responseSerialize: (value: UpdateIndustryResponse) =>
      Buffer.from(UpdateIndustryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateIndustryResponse.decode(value),
  },
} as const;

export interface IndustryServiceServer extends UntypedServiceImplementation {
  listIndustries: handleUnaryCall<ListIndustriesRequest, ListIndustriesResponse>;
  getIndustry: handleUnaryCall<GetIndustryRequest, GetIndustryResponse>;
  createIndustry: handleUnaryCall<CreateIndustryRequest, CreateIndustryResponse>;
  deleteIndustry: handleUnaryCall<DeleteIndustryRequest, DeleteIndustryResponse>;
  updateIndustry: handleUnaryCall<UpdateIndustryRequest, UpdateIndustryResponse>;
}

export interface IndustryServiceClient extends Client {
  listIndustries(
    request: ListIndustriesRequest,
    callback: (error: ServiceError | null, response: ListIndustriesResponse) => void,
  ): ClientUnaryCall;
  listIndustries(
    request: ListIndustriesRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListIndustriesResponse) => void,
  ): ClientUnaryCall;
  listIndustries(
    request: ListIndustriesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListIndustriesResponse) => void,
  ): ClientUnaryCall;
  getIndustry(
    request: GetIndustryRequest,
    callback: (error: ServiceError | null, response: GetIndustryResponse) => void,
  ): ClientUnaryCall;
  getIndustry(
    request: GetIndustryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetIndustryResponse) => void,
  ): ClientUnaryCall;
  getIndustry(
    request: GetIndustryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetIndustryResponse) => void,
  ): ClientUnaryCall;
  createIndustry(
    request: CreateIndustryRequest,
    callback: (error: ServiceError | null, response: CreateIndustryResponse) => void,
  ): ClientUnaryCall;
  createIndustry(
    request: CreateIndustryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateIndustryResponse) => void,
  ): ClientUnaryCall;
  createIndustry(
    request: CreateIndustryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateIndustryResponse) => void,
  ): ClientUnaryCall;
  deleteIndustry(
    request: DeleteIndustryRequest,
    callback: (error: ServiceError | null, response: DeleteIndustryResponse) => void,
  ): ClientUnaryCall;
  deleteIndustry(
    request: DeleteIndustryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteIndustryResponse) => void,
  ): ClientUnaryCall;
  deleteIndustry(
    request: DeleteIndustryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteIndustryResponse) => void,
  ): ClientUnaryCall;
  updateIndustry(
    request: UpdateIndustryRequest,
    callback: (error: ServiceError | null, response: UpdateIndustryResponse) => void,
  ): ClientUnaryCall;
  updateIndustry(
    request: UpdateIndustryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateIndustryResponse) => void,
  ): ClientUnaryCall;
  updateIndustry(
    request: UpdateIndustryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateIndustryResponse) => void,
  ): ClientUnaryCall;
}

export const IndustryServiceClient = makeGenericClientConstructor(
  IndustryServiceService,
  "ea.IndustryService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): IndustryServiceClient;
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
