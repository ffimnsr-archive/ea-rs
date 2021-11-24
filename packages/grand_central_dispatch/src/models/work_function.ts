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

export interface WorkFunction {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListWorkFunctionsRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListWorkFunctionsResponse {
  success: boolean;
  workFunctions: WorkFunction[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetWorkFunctionRequest {
  workFunctionId: string;
}

export interface GetWorkFunctionResponse {
  success: boolean;
  message: string | undefined;
  workFunction?: WorkFunction | undefined;
}

export interface CreateWorkFunctionRequest {
  requestId: string;
  name: string;
  description: string;
}

export interface CreateWorkFunctionResponse {
  success: boolean;
  message: string | undefined;
  workFunction?: WorkFunction | undefined;
}

export interface DeleteWorkFunctionRequest {
  requestId: string;
  workFunctionId: string;
}

export interface DeleteWorkFunctionResponse {
  success: boolean;
  message: string | undefined;
  workFunction?: WorkFunction | undefined;
}

export interface UpdateWorkFunctionRequest {
  requestId: string;
  workFunctionId: string;
  name?: string | undefined;
  description?: string | undefined;
}

export interface UpdateWorkFunctionResponse {
  success: boolean;
  message: string | undefined;
  workFunction?: WorkFunction | undefined;
}

const baseWorkFunction: object = { id: "", name: "", description: "" };

export const WorkFunction = {
  encode(message: WorkFunction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkFunction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWorkFunction } as WorkFunction;
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

  fromJSON(object: any): WorkFunction {
    const message = { ...baseWorkFunction } as WorkFunction;
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

  toJSON(message: WorkFunction): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<WorkFunction>): WorkFunction {
    const message = { ...baseWorkFunction } as WorkFunction;
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListWorkFunctionsRequest: object = { pageSize: 0, pageToken: "" };

export const ListWorkFunctionsRequest = {
  encode(
    message: ListWorkFunctionsRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkFunctionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListWorkFunctionsRequest } as ListWorkFunctionsRequest;
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

  fromJSON(object: any): ListWorkFunctionsRequest {
    const message = { ...baseListWorkFunctionsRequest } as ListWorkFunctionsRequest;
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

  toJSON(message: ListWorkFunctionsRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListWorkFunctionsRequest>): ListWorkFunctionsRequest {
    const message = { ...baseListWorkFunctionsRequest } as ListWorkFunctionsRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListWorkFunctionsResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListWorkFunctionsResponse = {
  encode(
    message: ListWorkFunctionsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.workFunctions) {
      WorkFunction.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkFunctionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListWorkFunctionsResponse } as ListWorkFunctionsResponse;
    message.workFunctions = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.workFunctions.push(WorkFunction.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListWorkFunctionsResponse {
    const message = { ...baseListWorkFunctionsResponse } as ListWorkFunctionsResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.workFunctions = (object.workFunctions ?? []).map((e: any) =>
      WorkFunction.fromJSON(e),
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

  toJSON(message: ListWorkFunctionsResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.workFunctions) {
      obj.workFunctions = message.workFunctions.map((e) =>
        e ? WorkFunction.toJSON(e) : undefined,
      );
    } else {
      obj.workFunctions = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListWorkFunctionsResponse>): ListWorkFunctionsResponse {
    const message = { ...baseListWorkFunctionsResponse } as ListWorkFunctionsResponse;
    message.success = object.success ?? false;
    message.workFunctions = (object.workFunctions ?? []).map((e) =>
      WorkFunction.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetWorkFunctionRequest: object = { workFunctionId: "" };

export const GetWorkFunctionRequest = {
  encode(
    message: GetWorkFunctionRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.workFunctionId !== "") {
      writer.uint32(10).string(message.workFunctionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWorkFunctionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWorkFunctionRequest } as GetWorkFunctionRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.workFunctionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWorkFunctionRequest {
    const message = { ...baseGetWorkFunctionRequest } as GetWorkFunctionRequest;
    message.workFunctionId =
      object.workFunctionId !== undefined && object.workFunctionId !== null
        ? String(object.workFunctionId)
        : "";
    return message;
  },

  toJSON(message: GetWorkFunctionRequest): unknown {
    const obj: any = {};
    message.workFunctionId !== undefined && (obj.workFunctionId = message.workFunctionId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWorkFunctionRequest>): GetWorkFunctionRequest {
    const message = { ...baseGetWorkFunctionRequest } as GetWorkFunctionRequest;
    message.workFunctionId = object.workFunctionId ?? "";
    return message;
  },
};

const baseGetWorkFunctionResponse: object = { success: false };

export const GetWorkFunctionResponse = {
  encode(
    message: GetWorkFunctionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workFunction !== undefined) {
      WorkFunction.encode(message.workFunction, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWorkFunctionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWorkFunctionResponse } as GetWorkFunctionResponse;
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
          message.workFunction = WorkFunction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWorkFunctionResponse {
    const message = { ...baseGetWorkFunctionResponse } as GetWorkFunctionResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workFunction =
      object.workFunction !== undefined && object.workFunction !== null
        ? WorkFunction.fromJSON(object.workFunction)
        : undefined;
    return message;
  },

  toJSON(message: GetWorkFunctionResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workFunction !== undefined &&
      (obj.workFunction = message.workFunction
        ? WorkFunction.toJSON(message.workFunction)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWorkFunctionResponse>): GetWorkFunctionResponse {
    const message = { ...baseGetWorkFunctionResponse } as GetWorkFunctionResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workFunction =
      object.workFunction !== undefined && object.workFunction !== null
        ? WorkFunction.fromPartial(object.workFunction)
        : undefined;
    return message;
  },
};

const baseCreateWorkFunctionRequest: object = {
  requestId: "",
  name: "",
  description: "",
};

export const CreateWorkFunctionRequest = {
  encode(
    message: CreateWorkFunctionRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWorkFunctionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateWorkFunctionRequest } as CreateWorkFunctionRequest;
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

  fromJSON(object: any): CreateWorkFunctionRequest {
    const message = { ...baseCreateWorkFunctionRequest } as CreateWorkFunctionRequest;
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

  toJSON(message: CreateWorkFunctionRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateWorkFunctionRequest>): CreateWorkFunctionRequest {
    const message = { ...baseCreateWorkFunctionRequest } as CreateWorkFunctionRequest;
    message.requestId = object.requestId ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

const baseCreateWorkFunctionResponse: object = { success: false };

export const CreateWorkFunctionResponse = {
  encode(
    message: CreateWorkFunctionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workFunction !== undefined) {
      WorkFunction.encode(message.workFunction, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWorkFunctionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateWorkFunctionResponse } as CreateWorkFunctionResponse;
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
          message.workFunction = WorkFunction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWorkFunctionResponse {
    const message = { ...baseCreateWorkFunctionResponse } as CreateWorkFunctionResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workFunction =
      object.workFunction !== undefined && object.workFunction !== null
        ? WorkFunction.fromJSON(object.workFunction)
        : undefined;
    return message;
  },

  toJSON(message: CreateWorkFunctionResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workFunction !== undefined &&
      (obj.workFunction = message.workFunction
        ? WorkFunction.toJSON(message.workFunction)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateWorkFunctionResponse>,
  ): CreateWorkFunctionResponse {
    const message = { ...baseCreateWorkFunctionResponse } as CreateWorkFunctionResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workFunction =
      object.workFunction !== undefined && object.workFunction !== null
        ? WorkFunction.fromPartial(object.workFunction)
        : undefined;
    return message;
  },
};

const baseDeleteWorkFunctionRequest: object = { requestId: "", workFunctionId: "" };

export const DeleteWorkFunctionRequest = {
  encode(
    message: DeleteWorkFunctionRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.workFunctionId !== "") {
      writer.uint32(10).string(message.workFunctionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWorkFunctionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteWorkFunctionRequest } as DeleteWorkFunctionRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.workFunctionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWorkFunctionRequest {
    const message = { ...baseDeleteWorkFunctionRequest } as DeleteWorkFunctionRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.workFunctionId =
      object.workFunctionId !== undefined && object.workFunctionId !== null
        ? String(object.workFunctionId)
        : "";
    return message;
  },

  toJSON(message: DeleteWorkFunctionRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.workFunctionId !== undefined && (obj.workFunctionId = message.workFunctionId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteWorkFunctionRequest>): DeleteWorkFunctionRequest {
    const message = { ...baseDeleteWorkFunctionRequest } as DeleteWorkFunctionRequest;
    message.requestId = object.requestId ?? "";
    message.workFunctionId = object.workFunctionId ?? "";
    return message;
  },
};

const baseDeleteWorkFunctionResponse: object = { success: false };

export const DeleteWorkFunctionResponse = {
  encode(
    message: DeleteWorkFunctionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workFunction !== undefined) {
      WorkFunction.encode(message.workFunction, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWorkFunctionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteWorkFunctionResponse } as DeleteWorkFunctionResponse;
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
          message.workFunction = WorkFunction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWorkFunctionResponse {
    const message = { ...baseDeleteWorkFunctionResponse } as DeleteWorkFunctionResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workFunction =
      object.workFunction !== undefined && object.workFunction !== null
        ? WorkFunction.fromJSON(object.workFunction)
        : undefined;
    return message;
  },

  toJSON(message: DeleteWorkFunctionResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workFunction !== undefined &&
      (obj.workFunction = message.workFunction
        ? WorkFunction.toJSON(message.workFunction)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteWorkFunctionResponse>,
  ): DeleteWorkFunctionResponse {
    const message = { ...baseDeleteWorkFunctionResponse } as DeleteWorkFunctionResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workFunction =
      object.workFunction !== undefined && object.workFunction !== null
        ? WorkFunction.fromPartial(object.workFunction)
        : undefined;
    return message;
  },
};

const baseUpdateWorkFunctionRequest: object = { requestId: "", workFunctionId: "" };

export const UpdateWorkFunctionRequest = {
  encode(
    message: UpdateWorkFunctionRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.workFunctionId !== "") {
      writer.uint32(10).string(message.workFunctionId);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWorkFunctionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateWorkFunctionRequest } as UpdateWorkFunctionRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.workFunctionId = reader.string();
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

  fromJSON(object: any): UpdateWorkFunctionRequest {
    const message = { ...baseUpdateWorkFunctionRequest } as UpdateWorkFunctionRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.workFunctionId =
      object.workFunctionId !== undefined && object.workFunctionId !== null
        ? String(object.workFunctionId)
        : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : undefined;
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWorkFunctionRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.workFunctionId !== undefined && (obj.workFunctionId = message.workFunctionId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateWorkFunctionRequest>): UpdateWorkFunctionRequest {
    const message = { ...baseUpdateWorkFunctionRequest } as UpdateWorkFunctionRequest;
    message.requestId = object.requestId ?? "";
    message.workFunctionId = object.workFunctionId ?? "";
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    return message;
  },
};

const baseUpdateWorkFunctionResponse: object = { success: false };

export const UpdateWorkFunctionResponse = {
  encode(
    message: UpdateWorkFunctionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workFunction !== undefined) {
      WorkFunction.encode(message.workFunction, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWorkFunctionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateWorkFunctionResponse } as UpdateWorkFunctionResponse;
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
          message.workFunction = WorkFunction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateWorkFunctionResponse {
    const message = { ...baseUpdateWorkFunctionResponse } as UpdateWorkFunctionResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workFunction =
      object.workFunction !== undefined && object.workFunction !== null
        ? WorkFunction.fromJSON(object.workFunction)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWorkFunctionResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workFunction !== undefined &&
      (obj.workFunction = message.workFunction
        ? WorkFunction.toJSON(message.workFunction)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateWorkFunctionResponse>,
  ): UpdateWorkFunctionResponse {
    const message = { ...baseUpdateWorkFunctionResponse } as UpdateWorkFunctionResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workFunction =
      object.workFunction !== undefined && object.workFunction !== null
        ? WorkFunction.fromPartial(object.workFunction)
        : undefined;
    return message;
  },
};

export const WorkFunctionServiceService = {
  listWorkFunctions: {
    path: "/ea.WorkFunctionService/ListWorkFunctions",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListWorkFunctionsRequest) =>
      Buffer.from(ListWorkFunctionsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListWorkFunctionsRequest.decode(value),
    responseSerialize: (value: ListWorkFunctionsResponse) =>
      Buffer.from(ListWorkFunctionsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListWorkFunctionsResponse.decode(value),
  },
  getWorkFunction: {
    path: "/ea.WorkFunctionService/GetWorkFunction",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetWorkFunctionRequest) =>
      Buffer.from(GetWorkFunctionRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetWorkFunctionRequest.decode(value),
    responseSerialize: (value: GetWorkFunctionResponse) =>
      Buffer.from(GetWorkFunctionResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetWorkFunctionResponse.decode(value),
  },
  createWorkFunction: {
    path: "/ea.WorkFunctionService/CreateWorkFunction",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateWorkFunctionRequest) =>
      Buffer.from(CreateWorkFunctionRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateWorkFunctionRequest.decode(value),
    responseSerialize: (value: CreateWorkFunctionResponse) =>
      Buffer.from(CreateWorkFunctionResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateWorkFunctionResponse.decode(value),
  },
  deleteWorkFunction: {
    path: "/ea.WorkFunctionService/DeleteWorkFunction",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteWorkFunctionRequest) =>
      Buffer.from(DeleteWorkFunctionRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteWorkFunctionRequest.decode(value),
    responseSerialize: (value: DeleteWorkFunctionResponse) =>
      Buffer.from(DeleteWorkFunctionResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteWorkFunctionResponse.decode(value),
  },
  updateWorkFunction: {
    path: "/ea.WorkFunctionService/UpdateWorkFunction",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateWorkFunctionRequest) =>
      Buffer.from(UpdateWorkFunctionRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateWorkFunctionRequest.decode(value),
    responseSerialize: (value: UpdateWorkFunctionResponse) =>
      Buffer.from(UpdateWorkFunctionResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateWorkFunctionResponse.decode(value),
  },
} as const;

export interface WorkFunctionServiceServer extends UntypedServiceImplementation {
  listWorkFunctions: handleUnaryCall<ListWorkFunctionsRequest, ListWorkFunctionsResponse>;
  getWorkFunction: handleUnaryCall<GetWorkFunctionRequest, GetWorkFunctionResponse>;
  createWorkFunction: handleUnaryCall<
    CreateWorkFunctionRequest,
    CreateWorkFunctionResponse
  >;
  deleteWorkFunction: handleUnaryCall<
    DeleteWorkFunctionRequest,
    DeleteWorkFunctionResponse
  >;
  updateWorkFunction: handleUnaryCall<
    UpdateWorkFunctionRequest,
    UpdateWorkFunctionResponse
  >;
}

export interface WorkFunctionServiceClient extends Client {
  listWorkFunctions(
    request: ListWorkFunctionsRequest,
    callback: (error: ServiceError | null, response: ListWorkFunctionsResponse) => void,
  ): ClientUnaryCall;
  listWorkFunctions(
    request: ListWorkFunctionsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListWorkFunctionsResponse) => void,
  ): ClientUnaryCall;
  listWorkFunctions(
    request: ListWorkFunctionsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListWorkFunctionsResponse) => void,
  ): ClientUnaryCall;
  getWorkFunction(
    request: GetWorkFunctionRequest,
    callback: (error: ServiceError | null, response: GetWorkFunctionResponse) => void,
  ): ClientUnaryCall;
  getWorkFunction(
    request: GetWorkFunctionRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetWorkFunctionResponse) => void,
  ): ClientUnaryCall;
  getWorkFunction(
    request: GetWorkFunctionRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetWorkFunctionResponse) => void,
  ): ClientUnaryCall;
  createWorkFunction(
    request: CreateWorkFunctionRequest,
    callback: (error: ServiceError | null, response: CreateWorkFunctionResponse) => void,
  ): ClientUnaryCall;
  createWorkFunction(
    request: CreateWorkFunctionRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateWorkFunctionResponse) => void,
  ): ClientUnaryCall;
  createWorkFunction(
    request: CreateWorkFunctionRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateWorkFunctionResponse) => void,
  ): ClientUnaryCall;
  deleteWorkFunction(
    request: DeleteWorkFunctionRequest,
    callback: (error: ServiceError | null, response: DeleteWorkFunctionResponse) => void,
  ): ClientUnaryCall;
  deleteWorkFunction(
    request: DeleteWorkFunctionRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteWorkFunctionResponse) => void,
  ): ClientUnaryCall;
  deleteWorkFunction(
    request: DeleteWorkFunctionRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteWorkFunctionResponse) => void,
  ): ClientUnaryCall;
  updateWorkFunction(
    request: UpdateWorkFunctionRequest,
    callback: (error: ServiceError | null, response: UpdateWorkFunctionResponse) => void,
  ): ClientUnaryCall;
  updateWorkFunction(
    request: UpdateWorkFunctionRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateWorkFunctionResponse) => void,
  ): ClientUnaryCall;
  updateWorkFunction(
    request: UpdateWorkFunctionRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateWorkFunctionResponse) => void,
  ): ClientUnaryCall;
}

export const WorkFunctionServiceClient = makeGenericClientConstructor(
  WorkFunctionServiceService,
  "ea.WorkFunctionService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): WorkFunctionServiceClient;
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
