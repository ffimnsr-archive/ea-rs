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

export interface WorkPreference {
  id: string;
  userId: string;
  workFunctionId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListWorkPreferencesRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListWorkPreferencesResponse {
  success: boolean;
  workPreferences: WorkPreference[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetWorkPreferenceRequest {
  workPreferenceId: string;
}

export interface GetWorkPreferenceResponse {
  success: boolean;
  message: string | undefined;
  workPreference?: WorkPreference | undefined;
}

export interface CreateWorkPreferenceRequest {
  requestId: string;
  userId: string;
  workFunctionId: string;
}

export interface CreateWorkPreferenceResponse {
  success: boolean;
  message: string | undefined;
  workPreference?: WorkPreference | undefined;
}

export interface DeleteWorkPreferenceRequest {
  requestId: string;
  workPreferenceId: string;
}

export interface DeleteWorkPreferenceResponse {
  success: boolean;
  message: string | undefined;
  workPreference?: WorkPreference | undefined;
}

export interface UpdateWorkPreferenceRequest {
  requestId: string;
  workPreferenceId: string;
  userId?: string | undefined;
  workFunctionId?: string | undefined;
}

export interface UpdateWorkPreferenceResponse {
  success: boolean;
  message: string | undefined;
  workPreference?: WorkPreference | undefined;
}

const baseWorkPreference: object = { id: "", userId: "", workFunctionId: "" };

export const WorkPreference = {
  encode(message: WorkPreference, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.workFunctionId !== "") {
      writer.uint32(26).string(message.workFunctionId);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkPreference {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWorkPreference } as WorkPreference;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.workFunctionId = reader.string();
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

  fromJSON(object: any): WorkPreference {
    const message = { ...baseWorkPreference } as WorkPreference;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.workFunctionId =
      object.workFunctionId !== undefined && object.workFunctionId !== null
        ? String(object.workFunctionId)
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

  toJSON(message: WorkPreference): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.userId !== undefined && (obj.userId = message.userId);
    message.workFunctionId !== undefined && (obj.workFunctionId = message.workFunctionId);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<WorkPreference>): WorkPreference {
    const message = { ...baseWorkPreference } as WorkPreference;
    message.id = object.id ?? "";
    message.userId = object.userId ?? "";
    message.workFunctionId = object.workFunctionId ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListWorkPreferencesRequest: object = { pageSize: 0, pageToken: "" };

export const ListWorkPreferencesRequest = {
  encode(
    message: ListWorkPreferencesRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkPreferencesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListWorkPreferencesRequest } as ListWorkPreferencesRequest;
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

  fromJSON(object: any): ListWorkPreferencesRequest {
    const message = { ...baseListWorkPreferencesRequest } as ListWorkPreferencesRequest;
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

  toJSON(message: ListWorkPreferencesRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListWorkPreferencesRequest>,
  ): ListWorkPreferencesRequest {
    const message = { ...baseListWorkPreferencesRequest } as ListWorkPreferencesRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListWorkPreferencesResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListWorkPreferencesResponse = {
  encode(
    message: ListWorkPreferencesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.workPreferences) {
      WorkPreference.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkPreferencesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListWorkPreferencesResponse } as ListWorkPreferencesResponse;
    message.workPreferences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.workPreferences.push(WorkPreference.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListWorkPreferencesResponse {
    const message = { ...baseListWorkPreferencesResponse } as ListWorkPreferencesResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.workPreferences = (object.workPreferences ?? []).map((e: any) =>
      WorkPreference.fromJSON(e),
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

  toJSON(message: ListWorkPreferencesResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.workPreferences) {
      obj.workPreferences = message.workPreferences.map((e) =>
        e ? WorkPreference.toJSON(e) : undefined,
      );
    } else {
      obj.workPreferences = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListWorkPreferencesResponse>,
  ): ListWorkPreferencesResponse {
    const message = { ...baseListWorkPreferencesResponse } as ListWorkPreferencesResponse;
    message.success = object.success ?? false;
    message.workPreferences = (object.workPreferences ?? []).map((e) =>
      WorkPreference.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetWorkPreferenceRequest: object = { workPreferenceId: "" };

export const GetWorkPreferenceRequest = {
  encode(
    message: GetWorkPreferenceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.workPreferenceId !== "") {
      writer.uint32(10).string(message.workPreferenceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWorkPreferenceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWorkPreferenceRequest } as GetWorkPreferenceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.workPreferenceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWorkPreferenceRequest {
    const message = { ...baseGetWorkPreferenceRequest } as GetWorkPreferenceRequest;
    message.workPreferenceId =
      object.workPreferenceId !== undefined && object.workPreferenceId !== null
        ? String(object.workPreferenceId)
        : "";
    return message;
  },

  toJSON(message: GetWorkPreferenceRequest): unknown {
    const obj: any = {};
    message.workPreferenceId !== undefined &&
      (obj.workPreferenceId = message.workPreferenceId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWorkPreferenceRequest>): GetWorkPreferenceRequest {
    const message = { ...baseGetWorkPreferenceRequest } as GetWorkPreferenceRequest;
    message.workPreferenceId = object.workPreferenceId ?? "";
    return message;
  },
};

const baseGetWorkPreferenceResponse: object = { success: false };

export const GetWorkPreferenceResponse = {
  encode(
    message: GetWorkPreferenceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workPreference !== undefined) {
      WorkPreference.encode(message.workPreference, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWorkPreferenceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWorkPreferenceResponse } as GetWorkPreferenceResponse;
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
          message.workPreference = WorkPreference.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWorkPreferenceResponse {
    const message = { ...baseGetWorkPreferenceResponse } as GetWorkPreferenceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workPreference =
      object.workPreference !== undefined && object.workPreference !== null
        ? WorkPreference.fromJSON(object.workPreference)
        : undefined;
    return message;
  },

  toJSON(message: GetWorkPreferenceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workPreference !== undefined &&
      (obj.workPreference = message.workPreference
        ? WorkPreference.toJSON(message.workPreference)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWorkPreferenceResponse>): GetWorkPreferenceResponse {
    const message = { ...baseGetWorkPreferenceResponse } as GetWorkPreferenceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workPreference =
      object.workPreference !== undefined && object.workPreference !== null
        ? WorkPreference.fromPartial(object.workPreference)
        : undefined;
    return message;
  },
};

const baseCreateWorkPreferenceRequest: object = {
  requestId: "",
  userId: "",
  workFunctionId: "",
};

export const CreateWorkPreferenceRequest = {
  encode(
    message: CreateWorkPreferenceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.workFunctionId !== "") {
      writer.uint32(26).string(message.workFunctionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWorkPreferenceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateWorkPreferenceRequest } as CreateWorkPreferenceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.workFunctionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWorkPreferenceRequest {
    const message = { ...baseCreateWorkPreferenceRequest } as CreateWorkPreferenceRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.workFunctionId =
      object.workFunctionId !== undefined && object.workFunctionId !== null
        ? String(object.workFunctionId)
        : "";
    return message;
  },

  toJSON(message: CreateWorkPreferenceRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.workFunctionId !== undefined && (obj.workFunctionId = message.workFunctionId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateWorkPreferenceRequest>,
  ): CreateWorkPreferenceRequest {
    const message = { ...baseCreateWorkPreferenceRequest } as CreateWorkPreferenceRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    message.workFunctionId = object.workFunctionId ?? "";
    return message;
  },
};

const baseCreateWorkPreferenceResponse: object = { success: false };

export const CreateWorkPreferenceResponse = {
  encode(
    message: CreateWorkPreferenceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workPreference !== undefined) {
      WorkPreference.encode(message.workPreference, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWorkPreferenceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseCreateWorkPreferenceResponse,
    } as CreateWorkPreferenceResponse;
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
          message.workPreference = WorkPreference.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWorkPreferenceResponse {
    const message = {
      ...baseCreateWorkPreferenceResponse,
    } as CreateWorkPreferenceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workPreference =
      object.workPreference !== undefined && object.workPreference !== null
        ? WorkPreference.fromJSON(object.workPreference)
        : undefined;
    return message;
  },

  toJSON(message: CreateWorkPreferenceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workPreference !== undefined &&
      (obj.workPreference = message.workPreference
        ? WorkPreference.toJSON(message.workPreference)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateWorkPreferenceResponse>,
  ): CreateWorkPreferenceResponse {
    const message = {
      ...baseCreateWorkPreferenceResponse,
    } as CreateWorkPreferenceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workPreference =
      object.workPreference !== undefined && object.workPreference !== null
        ? WorkPreference.fromPartial(object.workPreference)
        : undefined;
    return message;
  },
};

const baseDeleteWorkPreferenceRequest: object = { requestId: "", workPreferenceId: "" };

export const DeleteWorkPreferenceRequest = {
  encode(
    message: DeleteWorkPreferenceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.workPreferenceId !== "") {
      writer.uint32(10).string(message.workPreferenceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWorkPreferenceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteWorkPreferenceRequest } as DeleteWorkPreferenceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.workPreferenceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWorkPreferenceRequest {
    const message = { ...baseDeleteWorkPreferenceRequest } as DeleteWorkPreferenceRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.workPreferenceId =
      object.workPreferenceId !== undefined && object.workPreferenceId !== null
        ? String(object.workPreferenceId)
        : "";
    return message;
  },

  toJSON(message: DeleteWorkPreferenceRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.workPreferenceId !== undefined &&
      (obj.workPreferenceId = message.workPreferenceId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteWorkPreferenceRequest>,
  ): DeleteWorkPreferenceRequest {
    const message = { ...baseDeleteWorkPreferenceRequest } as DeleteWorkPreferenceRequest;
    message.requestId = object.requestId ?? "";
    message.workPreferenceId = object.workPreferenceId ?? "";
    return message;
  },
};

const baseDeleteWorkPreferenceResponse: object = { success: false };

export const DeleteWorkPreferenceResponse = {
  encode(
    message: DeleteWorkPreferenceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workPreference !== undefined) {
      WorkPreference.encode(message.workPreference, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWorkPreferenceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteWorkPreferenceResponse,
    } as DeleteWorkPreferenceResponse;
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
          message.workPreference = WorkPreference.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWorkPreferenceResponse {
    const message = {
      ...baseDeleteWorkPreferenceResponse,
    } as DeleteWorkPreferenceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workPreference =
      object.workPreference !== undefined && object.workPreference !== null
        ? WorkPreference.fromJSON(object.workPreference)
        : undefined;
    return message;
  },

  toJSON(message: DeleteWorkPreferenceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workPreference !== undefined &&
      (obj.workPreference = message.workPreference
        ? WorkPreference.toJSON(message.workPreference)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteWorkPreferenceResponse>,
  ): DeleteWorkPreferenceResponse {
    const message = {
      ...baseDeleteWorkPreferenceResponse,
    } as DeleteWorkPreferenceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workPreference =
      object.workPreference !== undefined && object.workPreference !== null
        ? WorkPreference.fromPartial(object.workPreference)
        : undefined;
    return message;
  },
};

const baseUpdateWorkPreferenceRequest: object = { requestId: "", workPreferenceId: "" };

export const UpdateWorkPreferenceRequest = {
  encode(
    message: UpdateWorkPreferenceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.workPreferenceId !== "") {
      writer.uint32(10).string(message.workPreferenceId);
    }
    if (message.userId !== undefined) {
      writer.uint32(18).string(message.userId);
    }
    if (message.workFunctionId !== undefined) {
      writer.uint32(26).string(message.workFunctionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWorkPreferenceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateWorkPreferenceRequest } as UpdateWorkPreferenceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.workPreferenceId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.workFunctionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateWorkPreferenceRequest {
    const message = { ...baseUpdateWorkPreferenceRequest } as UpdateWorkPreferenceRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.workPreferenceId =
      object.workPreferenceId !== undefined && object.workPreferenceId !== null
        ? String(object.workPreferenceId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : undefined;
    message.workFunctionId =
      object.workFunctionId !== undefined && object.workFunctionId !== null
        ? String(object.workFunctionId)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWorkPreferenceRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.workPreferenceId !== undefined &&
      (obj.workPreferenceId = message.workPreferenceId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.workFunctionId !== undefined && (obj.workFunctionId = message.workFunctionId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateWorkPreferenceRequest>,
  ): UpdateWorkPreferenceRequest {
    const message = { ...baseUpdateWorkPreferenceRequest } as UpdateWorkPreferenceRequest;
    message.requestId = object.requestId ?? "";
    message.workPreferenceId = object.workPreferenceId ?? "";
    message.userId = object.userId ?? undefined;
    message.workFunctionId = object.workFunctionId ?? undefined;
    return message;
  },
};

const baseUpdateWorkPreferenceResponse: object = { success: false };

export const UpdateWorkPreferenceResponse = {
  encode(
    message: UpdateWorkPreferenceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workPreference !== undefined) {
      WorkPreference.encode(message.workPreference, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWorkPreferenceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateWorkPreferenceResponse,
    } as UpdateWorkPreferenceResponse;
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
          message.workPreference = WorkPreference.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateWorkPreferenceResponse {
    const message = {
      ...baseUpdateWorkPreferenceResponse,
    } as UpdateWorkPreferenceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workPreference =
      object.workPreference !== undefined && object.workPreference !== null
        ? WorkPreference.fromJSON(object.workPreference)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWorkPreferenceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workPreference !== undefined &&
      (obj.workPreference = message.workPreference
        ? WorkPreference.toJSON(message.workPreference)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateWorkPreferenceResponse>,
  ): UpdateWorkPreferenceResponse {
    const message = {
      ...baseUpdateWorkPreferenceResponse,
    } as UpdateWorkPreferenceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workPreference =
      object.workPreference !== undefined && object.workPreference !== null
        ? WorkPreference.fromPartial(object.workPreference)
        : undefined;
    return message;
  },
};

export const WorkPreferenceServiceService = {
  listWorkPreferences: {
    path: "/ea.WorkPreferenceService/ListWorkPreferences",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListWorkPreferencesRequest) =>
      Buffer.from(ListWorkPreferencesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListWorkPreferencesRequest.decode(value),
    responseSerialize: (value: ListWorkPreferencesResponse) =>
      Buffer.from(ListWorkPreferencesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListWorkPreferencesResponse.decode(value),
  },
  getWorkPreference: {
    path: "/ea.WorkPreferenceService/GetWorkPreference",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetWorkPreferenceRequest) =>
      Buffer.from(GetWorkPreferenceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetWorkPreferenceRequest.decode(value),
    responseSerialize: (value: GetWorkPreferenceResponse) =>
      Buffer.from(GetWorkPreferenceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetWorkPreferenceResponse.decode(value),
  },
  createWorkPreference: {
    path: "/ea.WorkPreferenceService/CreateWorkPreference",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateWorkPreferenceRequest) =>
      Buffer.from(CreateWorkPreferenceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateWorkPreferenceRequest.decode(value),
    responseSerialize: (value: CreateWorkPreferenceResponse) =>
      Buffer.from(CreateWorkPreferenceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateWorkPreferenceResponse.decode(value),
  },
  deleteWorkPreference: {
    path: "/ea.WorkPreferenceService/DeleteWorkPreference",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteWorkPreferenceRequest) =>
      Buffer.from(DeleteWorkPreferenceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteWorkPreferenceRequest.decode(value),
    responseSerialize: (value: DeleteWorkPreferenceResponse) =>
      Buffer.from(DeleteWorkPreferenceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteWorkPreferenceResponse.decode(value),
  },
  updateWorkPreference: {
    path: "/ea.WorkPreferenceService/UpdateWorkPreference",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateWorkPreferenceRequest) =>
      Buffer.from(UpdateWorkPreferenceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateWorkPreferenceRequest.decode(value),
    responseSerialize: (value: UpdateWorkPreferenceResponse) =>
      Buffer.from(UpdateWorkPreferenceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateWorkPreferenceResponse.decode(value),
  },
} as const;

export interface WorkPreferenceServiceServer extends UntypedServiceImplementation {
  listWorkPreferences: handleUnaryCall<
    ListWorkPreferencesRequest,
    ListWorkPreferencesResponse
  >;
  getWorkPreference: handleUnaryCall<GetWorkPreferenceRequest, GetWorkPreferenceResponse>;
  createWorkPreference: handleUnaryCall<
    CreateWorkPreferenceRequest,
    CreateWorkPreferenceResponse
  >;
  deleteWorkPreference: handleUnaryCall<
    DeleteWorkPreferenceRequest,
    DeleteWorkPreferenceResponse
  >;
  updateWorkPreference: handleUnaryCall<
    UpdateWorkPreferenceRequest,
    UpdateWorkPreferenceResponse
  >;
}

export interface WorkPreferenceServiceClient extends Client {
  listWorkPreferences(
    request: ListWorkPreferencesRequest,
    callback: (error: ServiceError | null, response: ListWorkPreferencesResponse) => void,
  ): ClientUnaryCall;
  listWorkPreferences(
    request: ListWorkPreferencesRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListWorkPreferencesResponse) => void,
  ): ClientUnaryCall;
  listWorkPreferences(
    request: ListWorkPreferencesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListWorkPreferencesResponse) => void,
  ): ClientUnaryCall;
  getWorkPreference(
    request: GetWorkPreferenceRequest,
    callback: (error: ServiceError | null, response: GetWorkPreferenceResponse) => void,
  ): ClientUnaryCall;
  getWorkPreference(
    request: GetWorkPreferenceRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetWorkPreferenceResponse) => void,
  ): ClientUnaryCall;
  getWorkPreference(
    request: GetWorkPreferenceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetWorkPreferenceResponse) => void,
  ): ClientUnaryCall;
  createWorkPreference(
    request: CreateWorkPreferenceRequest,
    callback: (
      error: ServiceError | null,
      response: CreateWorkPreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  createWorkPreference(
    request: CreateWorkPreferenceRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: CreateWorkPreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  createWorkPreference(
    request: CreateWorkPreferenceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: CreateWorkPreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteWorkPreference(
    request: DeleteWorkPreferenceRequest,
    callback: (
      error: ServiceError | null,
      response: DeleteWorkPreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteWorkPreference(
    request: DeleteWorkPreferenceRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: DeleteWorkPreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteWorkPreference(
    request: DeleteWorkPreferenceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: DeleteWorkPreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  updateWorkPreference(
    request: UpdateWorkPreferenceRequest,
    callback: (
      error: ServiceError | null,
      response: UpdateWorkPreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  updateWorkPreference(
    request: UpdateWorkPreferenceRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: UpdateWorkPreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  updateWorkPreference(
    request: UpdateWorkPreferenceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: UpdateWorkPreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
}

export const WorkPreferenceServiceClient = makeGenericClientConstructor(
  WorkPreferenceServiceService,
  "ea.WorkPreferenceService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): WorkPreferenceServiceClient;
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
