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

export interface WorkExperience {
  id: string;
  userId: string;
  title: string;
  organization: string;
  location: string;
  /**
   * google.protobuf.Timestamp from_date = 6;
   * google.protobuf.Timestamp to_date = 7;
   */
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListWorkExperiencesRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListWorkExperiencesResponse {
  success: boolean;
  workExperiences: WorkExperience[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetWorkExperienceRequest {
  workExperienceId: string;
}

export interface GetWorkExperienceResponse {
  success: boolean;
  message: string | undefined;
  workExperience?: WorkExperience | undefined;
}

export interface CreateWorkExperienceRequest {
  requestId: string;
  userId: string;
  title: string;
  organization: string;
  location: string;
  /**
   * google.protobuf.Timestamp from_date = 6;
   * google.protobuf.Timestamp to_date = 7;
   */
  description: string;
}

export interface CreateWorkExperienceResponse {
  success: boolean;
  message: string | undefined;
  workExperience?: WorkExperience | undefined;
}

export interface DeleteWorkExperienceRequest {
  requestId: string;
  workExperienceId: string;
}

export interface DeleteWorkExperienceResponse {
  success: boolean;
  message: string | undefined;
  workExperience?: WorkExperience | undefined;
}

export interface UpdateWorkExperienceRequest {
  requestId: string;
  workExperienceId: string;
  userId?: string | undefined;
  title?: string | undefined;
  organization?: string | undefined;
  location?: string | undefined;
  /**
   * optional google.protobuf.Timestamp from_date = 6;
   * optional google.protobuf.Timestamp to_date = 7;
   */
  description?: string | undefined;
}

export interface UpdateWorkExperienceResponse {
  success: boolean;
  message: string | undefined;
  workExperience?: WorkExperience | undefined;
}

const baseWorkExperience: object = {
  id: "",
  userId: "",
  title: "",
  organization: "",
  location: "",
  description: "",
};

export const WorkExperience = {
  encode(message: WorkExperience, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.organization !== "") {
      writer.uint32(34).string(message.organization);
    }
    if (message.location !== "") {
      writer.uint32(42).string(message.location);
    }
    if (message.description !== "") {
      writer.uint32(66).string(message.description);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WorkExperience {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWorkExperience } as WorkExperience;
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
          message.title = reader.string();
          break;
        case 4:
          message.organization = reader.string();
          break;
        case 5:
          message.location = reader.string();
          break;
        case 8:
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

  fromJSON(object: any): WorkExperience {
    const message = { ...baseWorkExperience } as WorkExperience;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.title =
      object.title !== undefined && object.title !== null ? String(object.title) : "";
    message.organization =
      object.organization !== undefined && object.organization !== null
        ? String(object.organization)
        : "";
    message.location =
      object.location !== undefined && object.location !== null
        ? String(object.location)
        : "";
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

  toJSON(message: WorkExperience): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.userId !== undefined && (obj.userId = message.userId);
    message.title !== undefined && (obj.title = message.title);
    message.organization !== undefined && (obj.organization = message.organization);
    message.location !== undefined && (obj.location = message.location);
    message.description !== undefined && (obj.description = message.description);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<WorkExperience>): WorkExperience {
    const message = { ...baseWorkExperience } as WorkExperience;
    message.id = object.id ?? "";
    message.userId = object.userId ?? "";
    message.title = object.title ?? "";
    message.organization = object.organization ?? "";
    message.location = object.location ?? "";
    message.description = object.description ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListWorkExperiencesRequest: object = { pageSize: 0, pageToken: "" };

export const ListWorkExperiencesRequest = {
  encode(
    message: ListWorkExperiencesRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkExperiencesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListWorkExperiencesRequest } as ListWorkExperiencesRequest;
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

  fromJSON(object: any): ListWorkExperiencesRequest {
    const message = { ...baseListWorkExperiencesRequest } as ListWorkExperiencesRequest;
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

  toJSON(message: ListWorkExperiencesRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListWorkExperiencesRequest>,
  ): ListWorkExperiencesRequest {
    const message = { ...baseListWorkExperiencesRequest } as ListWorkExperiencesRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListWorkExperiencesResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListWorkExperiencesResponse = {
  encode(
    message: ListWorkExperiencesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.workExperiences) {
      WorkExperience.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWorkExperiencesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListWorkExperiencesResponse } as ListWorkExperiencesResponse;
    message.workExperiences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.workExperiences.push(WorkExperience.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListWorkExperiencesResponse {
    const message = { ...baseListWorkExperiencesResponse } as ListWorkExperiencesResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.workExperiences = (object.workExperiences ?? []).map((e: any) =>
      WorkExperience.fromJSON(e),
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

  toJSON(message: ListWorkExperiencesResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.workExperiences) {
      obj.workExperiences = message.workExperiences.map((e) =>
        e ? WorkExperience.toJSON(e) : undefined,
      );
    } else {
      obj.workExperiences = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListWorkExperiencesResponse>,
  ): ListWorkExperiencesResponse {
    const message = { ...baseListWorkExperiencesResponse } as ListWorkExperiencesResponse;
    message.success = object.success ?? false;
    message.workExperiences = (object.workExperiences ?? []).map((e) =>
      WorkExperience.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetWorkExperienceRequest: object = { workExperienceId: "" };

export const GetWorkExperienceRequest = {
  encode(
    message: GetWorkExperienceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.workExperienceId !== "") {
      writer.uint32(10).string(message.workExperienceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWorkExperienceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWorkExperienceRequest } as GetWorkExperienceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.workExperienceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWorkExperienceRequest {
    const message = { ...baseGetWorkExperienceRequest } as GetWorkExperienceRequest;
    message.workExperienceId =
      object.workExperienceId !== undefined && object.workExperienceId !== null
        ? String(object.workExperienceId)
        : "";
    return message;
  },

  toJSON(message: GetWorkExperienceRequest): unknown {
    const obj: any = {};
    message.workExperienceId !== undefined &&
      (obj.workExperienceId = message.workExperienceId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWorkExperienceRequest>): GetWorkExperienceRequest {
    const message = { ...baseGetWorkExperienceRequest } as GetWorkExperienceRequest;
    message.workExperienceId = object.workExperienceId ?? "";
    return message;
  },
};

const baseGetWorkExperienceResponse: object = { success: false };

export const GetWorkExperienceResponse = {
  encode(
    message: GetWorkExperienceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workExperience !== undefined) {
      WorkExperience.encode(message.workExperience, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWorkExperienceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWorkExperienceResponse } as GetWorkExperienceResponse;
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
          message.workExperience = WorkExperience.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWorkExperienceResponse {
    const message = { ...baseGetWorkExperienceResponse } as GetWorkExperienceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workExperience =
      object.workExperience !== undefined && object.workExperience !== null
        ? WorkExperience.fromJSON(object.workExperience)
        : undefined;
    return message;
  },

  toJSON(message: GetWorkExperienceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workExperience !== undefined &&
      (obj.workExperience = message.workExperience
        ? WorkExperience.toJSON(message.workExperience)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWorkExperienceResponse>): GetWorkExperienceResponse {
    const message = { ...baseGetWorkExperienceResponse } as GetWorkExperienceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workExperience =
      object.workExperience !== undefined && object.workExperience !== null
        ? WorkExperience.fromPartial(object.workExperience)
        : undefined;
    return message;
  },
};

const baseCreateWorkExperienceRequest: object = {
  requestId: "",
  userId: "",
  title: "",
  organization: "",
  location: "",
  description: "",
};

export const CreateWorkExperienceRequest = {
  encode(
    message: CreateWorkExperienceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.organization !== "") {
      writer.uint32(34).string(message.organization);
    }
    if (message.location !== "") {
      writer.uint32(42).string(message.location);
    }
    if (message.description !== "") {
      writer.uint32(66).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWorkExperienceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateWorkExperienceRequest } as CreateWorkExperienceRequest;
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
          message.title = reader.string();
          break;
        case 4:
          message.organization = reader.string();
          break;
        case 5:
          message.location = reader.string();
          break;
        case 8:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWorkExperienceRequest {
    const message = { ...baseCreateWorkExperienceRequest } as CreateWorkExperienceRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.title =
      object.title !== undefined && object.title !== null ? String(object.title) : "";
    message.organization =
      object.organization !== undefined && object.organization !== null
        ? String(object.organization)
        : "";
    message.location =
      object.location !== undefined && object.location !== null
        ? String(object.location)
        : "";
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : "";
    return message;
  },

  toJSON(message: CreateWorkExperienceRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.title !== undefined && (obj.title = message.title);
    message.organization !== undefined && (obj.organization = message.organization);
    message.location !== undefined && (obj.location = message.location);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateWorkExperienceRequest>,
  ): CreateWorkExperienceRequest {
    const message = { ...baseCreateWorkExperienceRequest } as CreateWorkExperienceRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    message.title = object.title ?? "";
    message.organization = object.organization ?? "";
    message.location = object.location ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

const baseCreateWorkExperienceResponse: object = { success: false };

export const CreateWorkExperienceResponse = {
  encode(
    message: CreateWorkExperienceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workExperience !== undefined) {
      WorkExperience.encode(message.workExperience, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWorkExperienceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseCreateWorkExperienceResponse,
    } as CreateWorkExperienceResponse;
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
          message.workExperience = WorkExperience.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWorkExperienceResponse {
    const message = {
      ...baseCreateWorkExperienceResponse,
    } as CreateWorkExperienceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workExperience =
      object.workExperience !== undefined && object.workExperience !== null
        ? WorkExperience.fromJSON(object.workExperience)
        : undefined;
    return message;
  },

  toJSON(message: CreateWorkExperienceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workExperience !== undefined &&
      (obj.workExperience = message.workExperience
        ? WorkExperience.toJSON(message.workExperience)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateWorkExperienceResponse>,
  ): CreateWorkExperienceResponse {
    const message = {
      ...baseCreateWorkExperienceResponse,
    } as CreateWorkExperienceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workExperience =
      object.workExperience !== undefined && object.workExperience !== null
        ? WorkExperience.fromPartial(object.workExperience)
        : undefined;
    return message;
  },
};

const baseDeleteWorkExperienceRequest: object = { requestId: "", workExperienceId: "" };

export const DeleteWorkExperienceRequest = {
  encode(
    message: DeleteWorkExperienceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.workExperienceId !== "") {
      writer.uint32(10).string(message.workExperienceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWorkExperienceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteWorkExperienceRequest } as DeleteWorkExperienceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.workExperienceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWorkExperienceRequest {
    const message = { ...baseDeleteWorkExperienceRequest } as DeleteWorkExperienceRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.workExperienceId =
      object.workExperienceId !== undefined && object.workExperienceId !== null
        ? String(object.workExperienceId)
        : "";
    return message;
  },

  toJSON(message: DeleteWorkExperienceRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.workExperienceId !== undefined &&
      (obj.workExperienceId = message.workExperienceId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteWorkExperienceRequest>,
  ): DeleteWorkExperienceRequest {
    const message = { ...baseDeleteWorkExperienceRequest } as DeleteWorkExperienceRequest;
    message.requestId = object.requestId ?? "";
    message.workExperienceId = object.workExperienceId ?? "";
    return message;
  },
};

const baseDeleteWorkExperienceResponse: object = { success: false };

export const DeleteWorkExperienceResponse = {
  encode(
    message: DeleteWorkExperienceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workExperience !== undefined) {
      WorkExperience.encode(message.workExperience, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWorkExperienceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteWorkExperienceResponse,
    } as DeleteWorkExperienceResponse;
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
          message.workExperience = WorkExperience.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWorkExperienceResponse {
    const message = {
      ...baseDeleteWorkExperienceResponse,
    } as DeleteWorkExperienceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workExperience =
      object.workExperience !== undefined && object.workExperience !== null
        ? WorkExperience.fromJSON(object.workExperience)
        : undefined;
    return message;
  },

  toJSON(message: DeleteWorkExperienceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workExperience !== undefined &&
      (obj.workExperience = message.workExperience
        ? WorkExperience.toJSON(message.workExperience)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteWorkExperienceResponse>,
  ): DeleteWorkExperienceResponse {
    const message = {
      ...baseDeleteWorkExperienceResponse,
    } as DeleteWorkExperienceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workExperience =
      object.workExperience !== undefined && object.workExperience !== null
        ? WorkExperience.fromPartial(object.workExperience)
        : undefined;
    return message;
  },
};

const baseUpdateWorkExperienceRequest: object = { requestId: "", workExperienceId: "" };

export const UpdateWorkExperienceRequest = {
  encode(
    message: UpdateWorkExperienceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.workExperienceId !== "") {
      writer.uint32(10).string(message.workExperienceId);
    }
    if (message.userId !== undefined) {
      writer.uint32(18).string(message.userId);
    }
    if (message.title !== undefined) {
      writer.uint32(26).string(message.title);
    }
    if (message.organization !== undefined) {
      writer.uint32(34).string(message.organization);
    }
    if (message.location !== undefined) {
      writer.uint32(42).string(message.location);
    }
    if (message.description !== undefined) {
      writer.uint32(66).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWorkExperienceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateWorkExperienceRequest } as UpdateWorkExperienceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.workExperienceId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.organization = reader.string();
          break;
        case 5:
          message.location = reader.string();
          break;
        case 8:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateWorkExperienceRequest {
    const message = { ...baseUpdateWorkExperienceRequest } as UpdateWorkExperienceRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.workExperienceId =
      object.workExperienceId !== undefined && object.workExperienceId !== null
        ? String(object.workExperienceId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : undefined;
    message.title =
      object.title !== undefined && object.title !== null
        ? String(object.title)
        : undefined;
    message.organization =
      object.organization !== undefined && object.organization !== null
        ? String(object.organization)
        : undefined;
    message.location =
      object.location !== undefined && object.location !== null
        ? String(object.location)
        : undefined;
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWorkExperienceRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.workExperienceId !== undefined &&
      (obj.workExperienceId = message.workExperienceId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.title !== undefined && (obj.title = message.title);
    message.organization !== undefined && (obj.organization = message.organization);
    message.location !== undefined && (obj.location = message.location);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateWorkExperienceRequest>,
  ): UpdateWorkExperienceRequest {
    const message = { ...baseUpdateWorkExperienceRequest } as UpdateWorkExperienceRequest;
    message.requestId = object.requestId ?? "";
    message.workExperienceId = object.workExperienceId ?? "";
    message.userId = object.userId ?? undefined;
    message.title = object.title ?? undefined;
    message.organization = object.organization ?? undefined;
    message.location = object.location ?? undefined;
    message.description = object.description ?? undefined;
    return message;
  },
};

const baseUpdateWorkExperienceResponse: object = { success: false };

export const UpdateWorkExperienceResponse = {
  encode(
    message: UpdateWorkExperienceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.workExperience !== undefined) {
      WorkExperience.encode(message.workExperience, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWorkExperienceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateWorkExperienceResponse,
    } as UpdateWorkExperienceResponse;
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
          message.workExperience = WorkExperience.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateWorkExperienceResponse {
    const message = {
      ...baseUpdateWorkExperienceResponse,
    } as UpdateWorkExperienceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.workExperience =
      object.workExperience !== undefined && object.workExperience !== null
        ? WorkExperience.fromJSON(object.workExperience)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWorkExperienceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.workExperience !== undefined &&
      (obj.workExperience = message.workExperience
        ? WorkExperience.toJSON(message.workExperience)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateWorkExperienceResponse>,
  ): UpdateWorkExperienceResponse {
    const message = {
      ...baseUpdateWorkExperienceResponse,
    } as UpdateWorkExperienceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.workExperience =
      object.workExperience !== undefined && object.workExperience !== null
        ? WorkExperience.fromPartial(object.workExperience)
        : undefined;
    return message;
  },
};

export const WorkExperienceServiceService = {
  listWorkExperiences: {
    path: "/ea.WorkExperienceService/ListWorkExperiences",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListWorkExperiencesRequest) =>
      Buffer.from(ListWorkExperiencesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListWorkExperiencesRequest.decode(value),
    responseSerialize: (value: ListWorkExperiencesResponse) =>
      Buffer.from(ListWorkExperiencesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListWorkExperiencesResponse.decode(value),
  },
  getWorkExperience: {
    path: "/ea.WorkExperienceService/GetWorkExperience",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetWorkExperienceRequest) =>
      Buffer.from(GetWorkExperienceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetWorkExperienceRequest.decode(value),
    responseSerialize: (value: GetWorkExperienceResponse) =>
      Buffer.from(GetWorkExperienceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetWorkExperienceResponse.decode(value),
  },
  createWorkExperience: {
    path: "/ea.WorkExperienceService/CreateWorkExperience",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateWorkExperienceRequest) =>
      Buffer.from(CreateWorkExperienceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateWorkExperienceRequest.decode(value),
    responseSerialize: (value: CreateWorkExperienceResponse) =>
      Buffer.from(CreateWorkExperienceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateWorkExperienceResponse.decode(value),
  },
  deleteWorkExperience: {
    path: "/ea.WorkExperienceService/DeleteWorkExperience",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteWorkExperienceRequest) =>
      Buffer.from(DeleteWorkExperienceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteWorkExperienceRequest.decode(value),
    responseSerialize: (value: DeleteWorkExperienceResponse) =>
      Buffer.from(DeleteWorkExperienceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteWorkExperienceResponse.decode(value),
  },
  updateWorkExperience: {
    path: "/ea.WorkExperienceService/UpdateWorkExperience",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateWorkExperienceRequest) =>
      Buffer.from(UpdateWorkExperienceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateWorkExperienceRequest.decode(value),
    responseSerialize: (value: UpdateWorkExperienceResponse) =>
      Buffer.from(UpdateWorkExperienceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateWorkExperienceResponse.decode(value),
  },
} as const;

export interface WorkExperienceServiceServer extends UntypedServiceImplementation {
  listWorkExperiences: handleUnaryCall<
    ListWorkExperiencesRequest,
    ListWorkExperiencesResponse
  >;
  getWorkExperience: handleUnaryCall<GetWorkExperienceRequest, GetWorkExperienceResponse>;
  createWorkExperience: handleUnaryCall<
    CreateWorkExperienceRequest,
    CreateWorkExperienceResponse
  >;
  deleteWorkExperience: handleUnaryCall<
    DeleteWorkExperienceRequest,
    DeleteWorkExperienceResponse
  >;
  updateWorkExperience: handleUnaryCall<
    UpdateWorkExperienceRequest,
    UpdateWorkExperienceResponse
  >;
}

export interface WorkExperienceServiceClient extends Client {
  listWorkExperiences(
    request: ListWorkExperiencesRequest,
    callback: (error: ServiceError | null, response: ListWorkExperiencesResponse) => void,
  ): ClientUnaryCall;
  listWorkExperiences(
    request: ListWorkExperiencesRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListWorkExperiencesResponse) => void,
  ): ClientUnaryCall;
  listWorkExperiences(
    request: ListWorkExperiencesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListWorkExperiencesResponse) => void,
  ): ClientUnaryCall;
  getWorkExperience(
    request: GetWorkExperienceRequest,
    callback: (error: ServiceError | null, response: GetWorkExperienceResponse) => void,
  ): ClientUnaryCall;
  getWorkExperience(
    request: GetWorkExperienceRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetWorkExperienceResponse) => void,
  ): ClientUnaryCall;
  getWorkExperience(
    request: GetWorkExperienceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetWorkExperienceResponse) => void,
  ): ClientUnaryCall;
  createWorkExperience(
    request: CreateWorkExperienceRequest,
    callback: (
      error: ServiceError | null,
      response: CreateWorkExperienceResponse,
    ) => void,
  ): ClientUnaryCall;
  createWorkExperience(
    request: CreateWorkExperienceRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: CreateWorkExperienceResponse,
    ) => void,
  ): ClientUnaryCall;
  createWorkExperience(
    request: CreateWorkExperienceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: CreateWorkExperienceResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteWorkExperience(
    request: DeleteWorkExperienceRequest,
    callback: (
      error: ServiceError | null,
      response: DeleteWorkExperienceResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteWorkExperience(
    request: DeleteWorkExperienceRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: DeleteWorkExperienceResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteWorkExperience(
    request: DeleteWorkExperienceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: DeleteWorkExperienceResponse,
    ) => void,
  ): ClientUnaryCall;
  updateWorkExperience(
    request: UpdateWorkExperienceRequest,
    callback: (
      error: ServiceError | null,
      response: UpdateWorkExperienceResponse,
    ) => void,
  ): ClientUnaryCall;
  updateWorkExperience(
    request: UpdateWorkExperienceRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: UpdateWorkExperienceResponse,
    ) => void,
  ): ClientUnaryCall;
  updateWorkExperience(
    request: UpdateWorkExperienceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: UpdateWorkExperienceResponse,
    ) => void,
  ): ClientUnaryCall;
}

export const WorkExperienceServiceClient = makeGenericClientConstructor(
  WorkExperienceServiceService,
  "ea.WorkExperienceService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): WorkExperienceServiceClient;
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
