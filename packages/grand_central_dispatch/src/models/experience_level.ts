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

export interface ExperienceLevel {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListExperienceLevelsRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListExperienceLevelsResponse {
  success: boolean;
  experienceLevels: ExperienceLevel[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetExperienceLevelRequest {
  experienceLevelId: string;
}

export interface GetExperienceLevelResponse {
  success: boolean;
  message: string | undefined;
  experienceLevel?: ExperienceLevel | undefined;
}

export interface CreateExperienceLevelRequest {
  requestId: string;
  name: string;
  description: string;
}

export interface CreateExperienceLevelResponse {
  success: boolean;
  message: string | undefined;
  experienceLevel?: ExperienceLevel | undefined;
}

export interface DeleteExperienceLevelRequest {
  requestId: string;
  experienceLevelId: string;
}

export interface DeleteExperienceLevelResponse {
  success: boolean;
  message: string | undefined;
  experienceLevel?: ExperienceLevel | undefined;
}

export interface UpdateExperienceLevelRequest {
  requestId: string;
  experienceLevelId: string;
  name?: string | undefined;
  description?: string | undefined;
}

export interface UpdateExperienceLevelResponse {
  success: boolean;
  message: string | undefined;
  experienceLevel?: ExperienceLevel | undefined;
}

const baseExperienceLevel: object = { id: "", name: "", description: "" };

export const ExperienceLevel = {
  encode(message: ExperienceLevel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ExperienceLevel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseExperienceLevel } as ExperienceLevel;
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

  fromJSON(object: any): ExperienceLevel {
    const message = { ...baseExperienceLevel } as ExperienceLevel;
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

  toJSON(message: ExperienceLevel): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<ExperienceLevel>): ExperienceLevel {
    const message = { ...baseExperienceLevel } as ExperienceLevel;
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListExperienceLevelsRequest: object = { pageSize: 0, pageToken: "" };

export const ListExperienceLevelsRequest = {
  encode(
    message: ListExperienceLevelsRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListExperienceLevelsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListExperienceLevelsRequest } as ListExperienceLevelsRequest;
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

  fromJSON(object: any): ListExperienceLevelsRequest {
    const message = { ...baseListExperienceLevelsRequest } as ListExperienceLevelsRequest;
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

  toJSON(message: ListExperienceLevelsRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListExperienceLevelsRequest>,
  ): ListExperienceLevelsRequest {
    const message = { ...baseListExperienceLevelsRequest } as ListExperienceLevelsRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListExperienceLevelsResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListExperienceLevelsResponse = {
  encode(
    message: ListExperienceLevelsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.experienceLevels) {
      ExperienceLevel.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListExperienceLevelsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListExperienceLevelsResponse,
    } as ListExperienceLevelsResponse;
    message.experienceLevels = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.experienceLevels.push(ExperienceLevel.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListExperienceLevelsResponse {
    const message = {
      ...baseListExperienceLevelsResponse,
    } as ListExperienceLevelsResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.experienceLevels = (object.experienceLevels ?? []).map((e: any) =>
      ExperienceLevel.fromJSON(e),
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

  toJSON(message: ListExperienceLevelsResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.experienceLevels) {
      obj.experienceLevels = message.experienceLevels.map((e) =>
        e ? ExperienceLevel.toJSON(e) : undefined,
      );
    } else {
      obj.experienceLevels = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListExperienceLevelsResponse>,
  ): ListExperienceLevelsResponse {
    const message = {
      ...baseListExperienceLevelsResponse,
    } as ListExperienceLevelsResponse;
    message.success = object.success ?? false;
    message.experienceLevels = (object.experienceLevels ?? []).map((e) =>
      ExperienceLevel.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetExperienceLevelRequest: object = { experienceLevelId: "" };

export const GetExperienceLevelRequest = {
  encode(
    message: GetExperienceLevelRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.experienceLevelId !== "") {
      writer.uint32(10).string(message.experienceLevelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetExperienceLevelRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetExperienceLevelRequest } as GetExperienceLevelRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.experienceLevelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetExperienceLevelRequest {
    const message = { ...baseGetExperienceLevelRequest } as GetExperienceLevelRequest;
    message.experienceLevelId =
      object.experienceLevelId !== undefined && object.experienceLevelId !== null
        ? String(object.experienceLevelId)
        : "";
    return message;
  },

  toJSON(message: GetExperienceLevelRequest): unknown {
    const obj: any = {};
    message.experienceLevelId !== undefined &&
      (obj.experienceLevelId = message.experienceLevelId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetExperienceLevelRequest>): GetExperienceLevelRequest {
    const message = { ...baseGetExperienceLevelRequest } as GetExperienceLevelRequest;
    message.experienceLevelId = object.experienceLevelId ?? "";
    return message;
  },
};

const baseGetExperienceLevelResponse: object = { success: false };

export const GetExperienceLevelResponse = {
  encode(
    message: GetExperienceLevelResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.experienceLevel !== undefined) {
      ExperienceLevel.encode(message.experienceLevel, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetExperienceLevelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetExperienceLevelResponse } as GetExperienceLevelResponse;
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
          message.experienceLevel = ExperienceLevel.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetExperienceLevelResponse {
    const message = { ...baseGetExperienceLevelResponse } as GetExperienceLevelResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.experienceLevel =
      object.experienceLevel !== undefined && object.experienceLevel !== null
        ? ExperienceLevel.fromJSON(object.experienceLevel)
        : undefined;
    return message;
  },

  toJSON(message: GetExperienceLevelResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.experienceLevel !== undefined &&
      (obj.experienceLevel = message.experienceLevel
        ? ExperienceLevel.toJSON(message.experienceLevel)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetExperienceLevelResponse>,
  ): GetExperienceLevelResponse {
    const message = { ...baseGetExperienceLevelResponse } as GetExperienceLevelResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.experienceLevel =
      object.experienceLevel !== undefined && object.experienceLevel !== null
        ? ExperienceLevel.fromPartial(object.experienceLevel)
        : undefined;
    return message;
  },
};

const baseCreateExperienceLevelRequest: object = {
  requestId: "",
  name: "",
  description: "",
};

export const CreateExperienceLevelRequest = {
  encode(
    message: CreateExperienceLevelRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateExperienceLevelRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseCreateExperienceLevelRequest,
    } as CreateExperienceLevelRequest;
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

  fromJSON(object: any): CreateExperienceLevelRequest {
    const message = {
      ...baseCreateExperienceLevelRequest,
    } as CreateExperienceLevelRequest;
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

  toJSON(message: CreateExperienceLevelRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateExperienceLevelRequest>,
  ): CreateExperienceLevelRequest {
    const message = {
      ...baseCreateExperienceLevelRequest,
    } as CreateExperienceLevelRequest;
    message.requestId = object.requestId ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

const baseCreateExperienceLevelResponse: object = { success: false };

export const CreateExperienceLevelResponse = {
  encode(
    message: CreateExperienceLevelResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.experienceLevel !== undefined) {
      ExperienceLevel.encode(message.experienceLevel, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateExperienceLevelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseCreateExperienceLevelResponse,
    } as CreateExperienceLevelResponse;
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
          message.experienceLevel = ExperienceLevel.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateExperienceLevelResponse {
    const message = {
      ...baseCreateExperienceLevelResponse,
    } as CreateExperienceLevelResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.experienceLevel =
      object.experienceLevel !== undefined && object.experienceLevel !== null
        ? ExperienceLevel.fromJSON(object.experienceLevel)
        : undefined;
    return message;
  },

  toJSON(message: CreateExperienceLevelResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.experienceLevel !== undefined &&
      (obj.experienceLevel = message.experienceLevel
        ? ExperienceLevel.toJSON(message.experienceLevel)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateExperienceLevelResponse>,
  ): CreateExperienceLevelResponse {
    const message = {
      ...baseCreateExperienceLevelResponse,
    } as CreateExperienceLevelResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.experienceLevel =
      object.experienceLevel !== undefined && object.experienceLevel !== null
        ? ExperienceLevel.fromPartial(object.experienceLevel)
        : undefined;
    return message;
  },
};

const baseDeleteExperienceLevelRequest: object = { requestId: "", experienceLevelId: "" };

export const DeleteExperienceLevelRequest = {
  encode(
    message: DeleteExperienceLevelRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.experienceLevelId !== "") {
      writer.uint32(10).string(message.experienceLevelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteExperienceLevelRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteExperienceLevelRequest,
    } as DeleteExperienceLevelRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.experienceLevelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteExperienceLevelRequest {
    const message = {
      ...baseDeleteExperienceLevelRequest,
    } as DeleteExperienceLevelRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.experienceLevelId =
      object.experienceLevelId !== undefined && object.experienceLevelId !== null
        ? String(object.experienceLevelId)
        : "";
    return message;
  },

  toJSON(message: DeleteExperienceLevelRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.experienceLevelId !== undefined &&
      (obj.experienceLevelId = message.experienceLevelId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteExperienceLevelRequest>,
  ): DeleteExperienceLevelRequest {
    const message = {
      ...baseDeleteExperienceLevelRequest,
    } as DeleteExperienceLevelRequest;
    message.requestId = object.requestId ?? "";
    message.experienceLevelId = object.experienceLevelId ?? "";
    return message;
  },
};

const baseDeleteExperienceLevelResponse: object = { success: false };

export const DeleteExperienceLevelResponse = {
  encode(
    message: DeleteExperienceLevelResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.experienceLevel !== undefined) {
      ExperienceLevel.encode(message.experienceLevel, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteExperienceLevelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteExperienceLevelResponse,
    } as DeleteExperienceLevelResponse;
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
          message.experienceLevel = ExperienceLevel.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteExperienceLevelResponse {
    const message = {
      ...baseDeleteExperienceLevelResponse,
    } as DeleteExperienceLevelResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.experienceLevel =
      object.experienceLevel !== undefined && object.experienceLevel !== null
        ? ExperienceLevel.fromJSON(object.experienceLevel)
        : undefined;
    return message;
  },

  toJSON(message: DeleteExperienceLevelResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.experienceLevel !== undefined &&
      (obj.experienceLevel = message.experienceLevel
        ? ExperienceLevel.toJSON(message.experienceLevel)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteExperienceLevelResponse>,
  ): DeleteExperienceLevelResponse {
    const message = {
      ...baseDeleteExperienceLevelResponse,
    } as DeleteExperienceLevelResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.experienceLevel =
      object.experienceLevel !== undefined && object.experienceLevel !== null
        ? ExperienceLevel.fromPartial(object.experienceLevel)
        : undefined;
    return message;
  },
};

const baseUpdateExperienceLevelRequest: object = { requestId: "", experienceLevelId: "" };

export const UpdateExperienceLevelRequest = {
  encode(
    message: UpdateExperienceLevelRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.experienceLevelId !== "") {
      writer.uint32(10).string(message.experienceLevelId);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateExperienceLevelRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateExperienceLevelRequest,
    } as UpdateExperienceLevelRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.experienceLevelId = reader.string();
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

  fromJSON(object: any): UpdateExperienceLevelRequest {
    const message = {
      ...baseUpdateExperienceLevelRequest,
    } as UpdateExperienceLevelRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.experienceLevelId =
      object.experienceLevelId !== undefined && object.experienceLevelId !== null
        ? String(object.experienceLevelId)
        : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : undefined;
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : undefined;
    return message;
  },

  toJSON(message: UpdateExperienceLevelRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.experienceLevelId !== undefined &&
      (obj.experienceLevelId = message.experienceLevelId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateExperienceLevelRequest>,
  ): UpdateExperienceLevelRequest {
    const message = {
      ...baseUpdateExperienceLevelRequest,
    } as UpdateExperienceLevelRequest;
    message.requestId = object.requestId ?? "";
    message.experienceLevelId = object.experienceLevelId ?? "";
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    return message;
  },
};

const baseUpdateExperienceLevelResponse: object = { success: false };

export const UpdateExperienceLevelResponse = {
  encode(
    message: UpdateExperienceLevelResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.experienceLevel !== undefined) {
      ExperienceLevel.encode(message.experienceLevel, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateExperienceLevelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateExperienceLevelResponse,
    } as UpdateExperienceLevelResponse;
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
          message.experienceLevel = ExperienceLevel.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateExperienceLevelResponse {
    const message = {
      ...baseUpdateExperienceLevelResponse,
    } as UpdateExperienceLevelResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.experienceLevel =
      object.experienceLevel !== undefined && object.experienceLevel !== null
        ? ExperienceLevel.fromJSON(object.experienceLevel)
        : undefined;
    return message;
  },

  toJSON(message: UpdateExperienceLevelResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.experienceLevel !== undefined &&
      (obj.experienceLevel = message.experienceLevel
        ? ExperienceLevel.toJSON(message.experienceLevel)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateExperienceLevelResponse>,
  ): UpdateExperienceLevelResponse {
    const message = {
      ...baseUpdateExperienceLevelResponse,
    } as UpdateExperienceLevelResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.experienceLevel =
      object.experienceLevel !== undefined && object.experienceLevel !== null
        ? ExperienceLevel.fromPartial(object.experienceLevel)
        : undefined;
    return message;
  },
};

export const ExperienceLevelServiceService = {
  listExperienceLevels: {
    path: "/ea.ExperienceLevelService/ListExperienceLevels",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListExperienceLevelsRequest) =>
      Buffer.from(ListExperienceLevelsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListExperienceLevelsRequest.decode(value),
    responseSerialize: (value: ListExperienceLevelsResponse) =>
      Buffer.from(ListExperienceLevelsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListExperienceLevelsResponse.decode(value),
  },
  getExperienceLevel: {
    path: "/ea.ExperienceLevelService/GetExperienceLevel",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetExperienceLevelRequest) =>
      Buffer.from(GetExperienceLevelRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetExperienceLevelRequest.decode(value),
    responseSerialize: (value: GetExperienceLevelResponse) =>
      Buffer.from(GetExperienceLevelResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetExperienceLevelResponse.decode(value),
  },
  createExperienceLevel: {
    path: "/ea.ExperienceLevelService/CreateExperienceLevel",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateExperienceLevelRequest) =>
      Buffer.from(CreateExperienceLevelRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateExperienceLevelRequest.decode(value),
    responseSerialize: (value: CreateExperienceLevelResponse) =>
      Buffer.from(CreateExperienceLevelResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateExperienceLevelResponse.decode(value),
  },
  deleteExperienceLevel: {
    path: "/ea.ExperienceLevelService/DeleteExperienceLevel",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteExperienceLevelRequest) =>
      Buffer.from(DeleteExperienceLevelRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteExperienceLevelRequest.decode(value),
    responseSerialize: (value: DeleteExperienceLevelResponse) =>
      Buffer.from(DeleteExperienceLevelResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteExperienceLevelResponse.decode(value),
  },
  updateExperienceLevel: {
    path: "/ea.ExperienceLevelService/UpdateExperienceLevel",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateExperienceLevelRequest) =>
      Buffer.from(UpdateExperienceLevelRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateExperienceLevelRequest.decode(value),
    responseSerialize: (value: UpdateExperienceLevelResponse) =>
      Buffer.from(UpdateExperienceLevelResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateExperienceLevelResponse.decode(value),
  },
} as const;

export interface ExperienceLevelServiceServer extends UntypedServiceImplementation {
  listExperienceLevels: handleUnaryCall<
    ListExperienceLevelsRequest,
    ListExperienceLevelsResponse
  >;
  getExperienceLevel: handleUnaryCall<
    GetExperienceLevelRequest,
    GetExperienceLevelResponse
  >;
  createExperienceLevel: handleUnaryCall<
    CreateExperienceLevelRequest,
    CreateExperienceLevelResponse
  >;
  deleteExperienceLevel: handleUnaryCall<
    DeleteExperienceLevelRequest,
    DeleteExperienceLevelResponse
  >;
  updateExperienceLevel: handleUnaryCall<
    UpdateExperienceLevelRequest,
    UpdateExperienceLevelResponse
  >;
}

export interface ExperienceLevelServiceClient extends Client {
  listExperienceLevels(
    request: ListExperienceLevelsRequest,
    callback: (
      error: ServiceError | null,
      response: ListExperienceLevelsResponse,
    ) => void,
  ): ClientUnaryCall;
  listExperienceLevels(
    request: ListExperienceLevelsRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: ListExperienceLevelsResponse,
    ) => void,
  ): ClientUnaryCall;
  listExperienceLevels(
    request: ListExperienceLevelsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: ListExperienceLevelsResponse,
    ) => void,
  ): ClientUnaryCall;
  getExperienceLevel(
    request: GetExperienceLevelRequest,
    callback: (error: ServiceError | null, response: GetExperienceLevelResponse) => void,
  ): ClientUnaryCall;
  getExperienceLevel(
    request: GetExperienceLevelRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetExperienceLevelResponse) => void,
  ): ClientUnaryCall;
  getExperienceLevel(
    request: GetExperienceLevelRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetExperienceLevelResponse) => void,
  ): ClientUnaryCall;
  createExperienceLevel(
    request: CreateExperienceLevelRequest,
    callback: (
      error: ServiceError | null,
      response: CreateExperienceLevelResponse,
    ) => void,
  ): ClientUnaryCall;
  createExperienceLevel(
    request: CreateExperienceLevelRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: CreateExperienceLevelResponse,
    ) => void,
  ): ClientUnaryCall;
  createExperienceLevel(
    request: CreateExperienceLevelRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: CreateExperienceLevelResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteExperienceLevel(
    request: DeleteExperienceLevelRequest,
    callback: (
      error: ServiceError | null,
      response: DeleteExperienceLevelResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteExperienceLevel(
    request: DeleteExperienceLevelRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: DeleteExperienceLevelResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteExperienceLevel(
    request: DeleteExperienceLevelRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: DeleteExperienceLevelResponse,
    ) => void,
  ): ClientUnaryCall;
  updateExperienceLevel(
    request: UpdateExperienceLevelRequest,
    callback: (
      error: ServiceError | null,
      response: UpdateExperienceLevelResponse,
    ) => void,
  ): ClientUnaryCall;
  updateExperienceLevel(
    request: UpdateExperienceLevelRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: UpdateExperienceLevelResponse,
    ) => void,
  ): ClientUnaryCall;
  updateExperienceLevel(
    request: UpdateExperienceLevelRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: UpdateExperienceLevelResponse,
    ) => void,
  ): ClientUnaryCall;
}

export const ExperienceLevelServiceClient = makeGenericClientConstructor(
  ExperienceLevelServiceService,
  "ea.ExperienceLevelService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): ExperienceLevelServiceClient;
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
