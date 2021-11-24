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

export interface ProjectClue {
  id: string;
  projectId: string;
  requirements: string;
  environments: string;
  repositoryHttpUrl: string;
  repositorySshUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListProjectCluesRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListProjectCluesResponse {
  success: boolean;
  projectClues: ProjectClue[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetProjectClueRequest {
  projectClueId: string;
}

export interface GetProjectClueResponse {
  success: boolean;
  message: string | undefined;
  projectClue?: ProjectClue | undefined;
}

export interface CreateProjectClueRequest {
  requestId: string;
  projectId: string;
  requirements: string;
  environments: string;
  repositoryHttpUrl: string;
  repositorySshUrl: string;
}

export interface CreateProjectClueResponse {
  success: boolean;
  message: string | undefined;
  projectClue?: ProjectClue | undefined;
}

export interface DeleteProjectClueRequest {
  requestId: string;
  projectClueId: string;
}

export interface DeleteProjectClueResponse {
  success: boolean;
  message: string | undefined;
  projectClue?: ProjectClue | undefined;
}

export interface UpdateProjectClueRequest {
  requestId: string;
  projectClueId: string;
  projectId?: string | undefined;
  requirements?: string | undefined;
  environments?: string | undefined;
  repositoryHttpUrl?: string | undefined;
  repositorySshUrl?: string | undefined;
}

export interface UpdateProjectClueResponse {
  success: boolean;
  message: string | undefined;
  projectClue?: ProjectClue | undefined;
}

const baseProjectClue: object = {
  id: "",
  projectId: "",
  requirements: "",
  environments: "",
  repositoryHttpUrl: "",
  repositorySshUrl: "",
};

export const ProjectClue = {
  encode(message: ProjectClue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.projectId !== "") {
      writer.uint32(18).string(message.projectId);
    }
    if (message.requirements !== "") {
      writer.uint32(26).string(message.requirements);
    }
    if (message.environments !== "") {
      writer.uint32(34).string(message.environments);
    }
    if (message.repositoryHttpUrl !== "") {
      writer.uint32(42).string(message.repositoryHttpUrl);
    }
    if (message.repositorySshUrl !== "") {
      writer.uint32(50).string(message.repositorySshUrl);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProjectClue {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProjectClue } as ProjectClue;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.projectId = reader.string();
          break;
        case 3:
          message.requirements = reader.string();
          break;
        case 4:
          message.environments = reader.string();
          break;
        case 5:
          message.repositoryHttpUrl = reader.string();
          break;
        case 6:
          message.repositorySshUrl = reader.string();
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

  fromJSON(object: any): ProjectClue {
    const message = { ...baseProjectClue } as ProjectClue;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.projectId =
      object.projectId !== undefined && object.projectId !== null
        ? String(object.projectId)
        : "";
    message.requirements =
      object.requirements !== undefined && object.requirements !== null
        ? String(object.requirements)
        : "";
    message.environments =
      object.environments !== undefined && object.environments !== null
        ? String(object.environments)
        : "";
    message.repositoryHttpUrl =
      object.repositoryHttpUrl !== undefined && object.repositoryHttpUrl !== null
        ? String(object.repositoryHttpUrl)
        : "";
    message.repositorySshUrl =
      object.repositorySshUrl !== undefined && object.repositorySshUrl !== null
        ? String(object.repositorySshUrl)
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

  toJSON(message: ProjectClue): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.projectId !== undefined && (obj.projectId = message.projectId);
    message.requirements !== undefined && (obj.requirements = message.requirements);
    message.environments !== undefined && (obj.environments = message.environments);
    message.repositoryHttpUrl !== undefined &&
      (obj.repositoryHttpUrl = message.repositoryHttpUrl);
    message.repositorySshUrl !== undefined &&
      (obj.repositorySshUrl = message.repositorySshUrl);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<ProjectClue>): ProjectClue {
    const message = { ...baseProjectClue } as ProjectClue;
    message.id = object.id ?? "";
    message.projectId = object.projectId ?? "";
    message.requirements = object.requirements ?? "";
    message.environments = object.environments ?? "";
    message.repositoryHttpUrl = object.repositoryHttpUrl ?? "";
    message.repositorySshUrl = object.repositorySshUrl ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListProjectCluesRequest: object = { pageSize: 0, pageToken: "" };

export const ListProjectCluesRequest = {
  encode(
    message: ListProjectCluesRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListProjectCluesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListProjectCluesRequest } as ListProjectCluesRequest;
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

  fromJSON(object: any): ListProjectCluesRequest {
    const message = { ...baseListProjectCluesRequest } as ListProjectCluesRequest;
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

  toJSON(message: ListProjectCluesRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListProjectCluesRequest>): ListProjectCluesRequest {
    const message = { ...baseListProjectCluesRequest } as ListProjectCluesRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListProjectCluesResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListProjectCluesResponse = {
  encode(
    message: ListProjectCluesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.projectClues) {
      ProjectClue.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListProjectCluesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListProjectCluesResponse } as ListProjectCluesResponse;
    message.projectClues = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.projectClues.push(ProjectClue.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListProjectCluesResponse {
    const message = { ...baseListProjectCluesResponse } as ListProjectCluesResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.projectClues = (object.projectClues ?? []).map((e: any) =>
      ProjectClue.fromJSON(e),
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

  toJSON(message: ListProjectCluesResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.projectClues) {
      obj.projectClues = message.projectClues.map((e) =>
        e ? ProjectClue.toJSON(e) : undefined,
      );
    } else {
      obj.projectClues = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListProjectCluesResponse>): ListProjectCluesResponse {
    const message = { ...baseListProjectCluesResponse } as ListProjectCluesResponse;
    message.success = object.success ?? false;
    message.projectClues = (object.projectClues ?? []).map((e) =>
      ProjectClue.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetProjectClueRequest: object = { projectClueId: "" };

export const GetProjectClueRequest = {
  encode(
    message: GetProjectClueRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.projectClueId !== "") {
      writer.uint32(10).string(message.projectClueId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProjectClueRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetProjectClueRequest } as GetProjectClueRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectClueId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProjectClueRequest {
    const message = { ...baseGetProjectClueRequest } as GetProjectClueRequest;
    message.projectClueId =
      object.projectClueId !== undefined && object.projectClueId !== null
        ? String(object.projectClueId)
        : "";
    return message;
  },

  toJSON(message: GetProjectClueRequest): unknown {
    const obj: any = {};
    message.projectClueId !== undefined && (obj.projectClueId = message.projectClueId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetProjectClueRequest>): GetProjectClueRequest {
    const message = { ...baseGetProjectClueRequest } as GetProjectClueRequest;
    message.projectClueId = object.projectClueId ?? "";
    return message;
  },
};

const baseGetProjectClueResponse: object = { success: false };

export const GetProjectClueResponse = {
  encode(
    message: GetProjectClueResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectClue !== undefined) {
      ProjectClue.encode(message.projectClue, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProjectClueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetProjectClueResponse } as GetProjectClueResponse;
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
          message.projectClue = ProjectClue.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProjectClueResponse {
    const message = { ...baseGetProjectClueResponse } as GetProjectClueResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectClue =
      object.projectClue !== undefined && object.projectClue !== null
        ? ProjectClue.fromJSON(object.projectClue)
        : undefined;
    return message;
  },

  toJSON(message: GetProjectClueResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectClue !== undefined &&
      (obj.projectClue = message.projectClue
        ? ProjectClue.toJSON(message.projectClue)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetProjectClueResponse>): GetProjectClueResponse {
    const message = { ...baseGetProjectClueResponse } as GetProjectClueResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectClue =
      object.projectClue !== undefined && object.projectClue !== null
        ? ProjectClue.fromPartial(object.projectClue)
        : undefined;
    return message;
  },
};

const baseCreateProjectClueRequest: object = {
  requestId: "",
  projectId: "",
  requirements: "",
  environments: "",
  repositoryHttpUrl: "",
  repositorySshUrl: "",
};

export const CreateProjectClueRequest = {
  encode(
    message: CreateProjectClueRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.projectId !== "") {
      writer.uint32(18).string(message.projectId);
    }
    if (message.requirements !== "") {
      writer.uint32(26).string(message.requirements);
    }
    if (message.environments !== "") {
      writer.uint32(34).string(message.environments);
    }
    if (message.repositoryHttpUrl !== "") {
      writer.uint32(42).string(message.repositoryHttpUrl);
    }
    if (message.repositorySshUrl !== "") {
      writer.uint32(50).string(message.repositorySshUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateProjectClueRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateProjectClueRequest } as CreateProjectClueRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 2:
          message.projectId = reader.string();
          break;
        case 3:
          message.requirements = reader.string();
          break;
        case 4:
          message.environments = reader.string();
          break;
        case 5:
          message.repositoryHttpUrl = reader.string();
          break;
        case 6:
          message.repositorySshUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateProjectClueRequest {
    const message = { ...baseCreateProjectClueRequest } as CreateProjectClueRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.projectId =
      object.projectId !== undefined && object.projectId !== null
        ? String(object.projectId)
        : "";
    message.requirements =
      object.requirements !== undefined && object.requirements !== null
        ? String(object.requirements)
        : "";
    message.environments =
      object.environments !== undefined && object.environments !== null
        ? String(object.environments)
        : "";
    message.repositoryHttpUrl =
      object.repositoryHttpUrl !== undefined && object.repositoryHttpUrl !== null
        ? String(object.repositoryHttpUrl)
        : "";
    message.repositorySshUrl =
      object.repositorySshUrl !== undefined && object.repositorySshUrl !== null
        ? String(object.repositorySshUrl)
        : "";
    return message;
  },

  toJSON(message: CreateProjectClueRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.projectId !== undefined && (obj.projectId = message.projectId);
    message.requirements !== undefined && (obj.requirements = message.requirements);
    message.environments !== undefined && (obj.environments = message.environments);
    message.repositoryHttpUrl !== undefined &&
      (obj.repositoryHttpUrl = message.repositoryHttpUrl);
    message.repositorySshUrl !== undefined &&
      (obj.repositorySshUrl = message.repositorySshUrl);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateProjectClueRequest>): CreateProjectClueRequest {
    const message = { ...baseCreateProjectClueRequest } as CreateProjectClueRequest;
    message.requestId = object.requestId ?? "";
    message.projectId = object.projectId ?? "";
    message.requirements = object.requirements ?? "";
    message.environments = object.environments ?? "";
    message.repositoryHttpUrl = object.repositoryHttpUrl ?? "";
    message.repositorySshUrl = object.repositorySshUrl ?? "";
    return message;
  },
};

const baseCreateProjectClueResponse: object = { success: false };

export const CreateProjectClueResponse = {
  encode(
    message: CreateProjectClueResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectClue !== undefined) {
      ProjectClue.encode(message.projectClue, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateProjectClueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateProjectClueResponse } as CreateProjectClueResponse;
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
          message.projectClue = ProjectClue.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateProjectClueResponse {
    const message = { ...baseCreateProjectClueResponse } as CreateProjectClueResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectClue =
      object.projectClue !== undefined && object.projectClue !== null
        ? ProjectClue.fromJSON(object.projectClue)
        : undefined;
    return message;
  },

  toJSON(message: CreateProjectClueResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectClue !== undefined &&
      (obj.projectClue = message.projectClue
        ? ProjectClue.toJSON(message.projectClue)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateProjectClueResponse>): CreateProjectClueResponse {
    const message = { ...baseCreateProjectClueResponse } as CreateProjectClueResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectClue =
      object.projectClue !== undefined && object.projectClue !== null
        ? ProjectClue.fromPartial(object.projectClue)
        : undefined;
    return message;
  },
};

const baseDeleteProjectClueRequest: object = { requestId: "", projectClueId: "" };

export const DeleteProjectClueRequest = {
  encode(
    message: DeleteProjectClueRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.projectClueId !== "") {
      writer.uint32(10).string(message.projectClueId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteProjectClueRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteProjectClueRequest } as DeleteProjectClueRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.projectClueId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteProjectClueRequest {
    const message = { ...baseDeleteProjectClueRequest } as DeleteProjectClueRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.projectClueId =
      object.projectClueId !== undefined && object.projectClueId !== null
        ? String(object.projectClueId)
        : "";
    return message;
  },

  toJSON(message: DeleteProjectClueRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.projectClueId !== undefined && (obj.projectClueId = message.projectClueId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteProjectClueRequest>): DeleteProjectClueRequest {
    const message = { ...baseDeleteProjectClueRequest } as DeleteProjectClueRequest;
    message.requestId = object.requestId ?? "";
    message.projectClueId = object.projectClueId ?? "";
    return message;
  },
};

const baseDeleteProjectClueResponse: object = { success: false };

export const DeleteProjectClueResponse = {
  encode(
    message: DeleteProjectClueResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectClue !== undefined) {
      ProjectClue.encode(message.projectClue, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteProjectClueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteProjectClueResponse } as DeleteProjectClueResponse;
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
          message.projectClue = ProjectClue.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteProjectClueResponse {
    const message = { ...baseDeleteProjectClueResponse } as DeleteProjectClueResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectClue =
      object.projectClue !== undefined && object.projectClue !== null
        ? ProjectClue.fromJSON(object.projectClue)
        : undefined;
    return message;
  },

  toJSON(message: DeleteProjectClueResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectClue !== undefined &&
      (obj.projectClue = message.projectClue
        ? ProjectClue.toJSON(message.projectClue)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteProjectClueResponse>): DeleteProjectClueResponse {
    const message = { ...baseDeleteProjectClueResponse } as DeleteProjectClueResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectClue =
      object.projectClue !== undefined && object.projectClue !== null
        ? ProjectClue.fromPartial(object.projectClue)
        : undefined;
    return message;
  },
};

const baseUpdateProjectClueRequest: object = { requestId: "", projectClueId: "" };

export const UpdateProjectClueRequest = {
  encode(
    message: UpdateProjectClueRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.projectClueId !== "") {
      writer.uint32(10).string(message.projectClueId);
    }
    if (message.projectId !== undefined) {
      writer.uint32(18).string(message.projectId);
    }
    if (message.requirements !== undefined) {
      writer.uint32(26).string(message.requirements);
    }
    if (message.environments !== undefined) {
      writer.uint32(34).string(message.environments);
    }
    if (message.repositoryHttpUrl !== undefined) {
      writer.uint32(42).string(message.repositoryHttpUrl);
    }
    if (message.repositorySshUrl !== undefined) {
      writer.uint32(50).string(message.repositorySshUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProjectClueRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateProjectClueRequest } as UpdateProjectClueRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.projectClueId = reader.string();
          break;
        case 2:
          message.projectId = reader.string();
          break;
        case 3:
          message.requirements = reader.string();
          break;
        case 4:
          message.environments = reader.string();
          break;
        case 5:
          message.repositoryHttpUrl = reader.string();
          break;
        case 6:
          message.repositorySshUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateProjectClueRequest {
    const message = { ...baseUpdateProjectClueRequest } as UpdateProjectClueRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.projectClueId =
      object.projectClueId !== undefined && object.projectClueId !== null
        ? String(object.projectClueId)
        : "";
    message.projectId =
      object.projectId !== undefined && object.projectId !== null
        ? String(object.projectId)
        : undefined;
    message.requirements =
      object.requirements !== undefined && object.requirements !== null
        ? String(object.requirements)
        : undefined;
    message.environments =
      object.environments !== undefined && object.environments !== null
        ? String(object.environments)
        : undefined;
    message.repositoryHttpUrl =
      object.repositoryHttpUrl !== undefined && object.repositoryHttpUrl !== null
        ? String(object.repositoryHttpUrl)
        : undefined;
    message.repositorySshUrl =
      object.repositorySshUrl !== undefined && object.repositorySshUrl !== null
        ? String(object.repositorySshUrl)
        : undefined;
    return message;
  },

  toJSON(message: UpdateProjectClueRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.projectClueId !== undefined && (obj.projectClueId = message.projectClueId);
    message.projectId !== undefined && (obj.projectId = message.projectId);
    message.requirements !== undefined && (obj.requirements = message.requirements);
    message.environments !== undefined && (obj.environments = message.environments);
    message.repositoryHttpUrl !== undefined &&
      (obj.repositoryHttpUrl = message.repositoryHttpUrl);
    message.repositorySshUrl !== undefined &&
      (obj.repositorySshUrl = message.repositorySshUrl);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateProjectClueRequest>): UpdateProjectClueRequest {
    const message = { ...baseUpdateProjectClueRequest } as UpdateProjectClueRequest;
    message.requestId = object.requestId ?? "";
    message.projectClueId = object.projectClueId ?? "";
    message.projectId = object.projectId ?? undefined;
    message.requirements = object.requirements ?? undefined;
    message.environments = object.environments ?? undefined;
    message.repositoryHttpUrl = object.repositoryHttpUrl ?? undefined;
    message.repositorySshUrl = object.repositorySshUrl ?? undefined;
    return message;
  },
};

const baseUpdateProjectClueResponse: object = { success: false };

export const UpdateProjectClueResponse = {
  encode(
    message: UpdateProjectClueResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectClue !== undefined) {
      ProjectClue.encode(message.projectClue, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProjectClueResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateProjectClueResponse } as UpdateProjectClueResponse;
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
          message.projectClue = ProjectClue.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateProjectClueResponse {
    const message = { ...baseUpdateProjectClueResponse } as UpdateProjectClueResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectClue =
      object.projectClue !== undefined && object.projectClue !== null
        ? ProjectClue.fromJSON(object.projectClue)
        : undefined;
    return message;
  },

  toJSON(message: UpdateProjectClueResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectClue !== undefined &&
      (obj.projectClue = message.projectClue
        ? ProjectClue.toJSON(message.projectClue)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateProjectClueResponse>): UpdateProjectClueResponse {
    const message = { ...baseUpdateProjectClueResponse } as UpdateProjectClueResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectClue =
      object.projectClue !== undefined && object.projectClue !== null
        ? ProjectClue.fromPartial(object.projectClue)
        : undefined;
    return message;
  },
};

export const ProjectClueServiceService = {
  listProjectClues: {
    path: "/ea.ProjectClueService/ListProjectClues",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListProjectCluesRequest) =>
      Buffer.from(ListProjectCluesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListProjectCluesRequest.decode(value),
    responseSerialize: (value: ListProjectCluesResponse) =>
      Buffer.from(ListProjectCluesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListProjectCluesResponse.decode(value),
  },
  getProjectClue: {
    path: "/ea.ProjectClueService/GetProjectClue",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetProjectClueRequest) =>
      Buffer.from(GetProjectClueRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetProjectClueRequest.decode(value),
    responseSerialize: (value: GetProjectClueResponse) =>
      Buffer.from(GetProjectClueResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetProjectClueResponse.decode(value),
  },
  createProjectClue: {
    path: "/ea.ProjectClueService/CreateProjectClue",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateProjectClueRequest) =>
      Buffer.from(CreateProjectClueRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateProjectClueRequest.decode(value),
    responseSerialize: (value: CreateProjectClueResponse) =>
      Buffer.from(CreateProjectClueResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateProjectClueResponse.decode(value),
  },
  deleteProjectClue: {
    path: "/ea.ProjectClueService/DeleteProjectClue",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteProjectClueRequest) =>
      Buffer.from(DeleteProjectClueRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteProjectClueRequest.decode(value),
    responseSerialize: (value: DeleteProjectClueResponse) =>
      Buffer.from(DeleteProjectClueResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteProjectClueResponse.decode(value),
  },
  updateProjectClue: {
    path: "/ea.ProjectClueService/UpdateProjectClue",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateProjectClueRequest) =>
      Buffer.from(UpdateProjectClueRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateProjectClueRequest.decode(value),
    responseSerialize: (value: UpdateProjectClueResponse) =>
      Buffer.from(UpdateProjectClueResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateProjectClueResponse.decode(value),
  },
} as const;

export interface ProjectClueServiceServer extends UntypedServiceImplementation {
  listProjectClues: handleUnaryCall<ListProjectCluesRequest, ListProjectCluesResponse>;
  getProjectClue: handleUnaryCall<GetProjectClueRequest, GetProjectClueResponse>;
  createProjectClue: handleUnaryCall<CreateProjectClueRequest, CreateProjectClueResponse>;
  deleteProjectClue: handleUnaryCall<DeleteProjectClueRequest, DeleteProjectClueResponse>;
  updateProjectClue: handleUnaryCall<UpdateProjectClueRequest, UpdateProjectClueResponse>;
}

export interface ProjectClueServiceClient extends Client {
  listProjectClues(
    request: ListProjectCluesRequest,
    callback: (error: ServiceError | null, response: ListProjectCluesResponse) => void,
  ): ClientUnaryCall;
  listProjectClues(
    request: ListProjectCluesRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListProjectCluesResponse) => void,
  ): ClientUnaryCall;
  listProjectClues(
    request: ListProjectCluesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListProjectCluesResponse) => void,
  ): ClientUnaryCall;
  getProjectClue(
    request: GetProjectClueRequest,
    callback: (error: ServiceError | null, response: GetProjectClueResponse) => void,
  ): ClientUnaryCall;
  getProjectClue(
    request: GetProjectClueRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetProjectClueResponse) => void,
  ): ClientUnaryCall;
  getProjectClue(
    request: GetProjectClueRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetProjectClueResponse) => void,
  ): ClientUnaryCall;
  createProjectClue(
    request: CreateProjectClueRequest,
    callback: (error: ServiceError | null, response: CreateProjectClueResponse) => void,
  ): ClientUnaryCall;
  createProjectClue(
    request: CreateProjectClueRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateProjectClueResponse) => void,
  ): ClientUnaryCall;
  createProjectClue(
    request: CreateProjectClueRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateProjectClueResponse) => void,
  ): ClientUnaryCall;
  deleteProjectClue(
    request: DeleteProjectClueRequest,
    callback: (error: ServiceError | null, response: DeleteProjectClueResponse) => void,
  ): ClientUnaryCall;
  deleteProjectClue(
    request: DeleteProjectClueRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteProjectClueResponse) => void,
  ): ClientUnaryCall;
  deleteProjectClue(
    request: DeleteProjectClueRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteProjectClueResponse) => void,
  ): ClientUnaryCall;
  updateProjectClue(
    request: UpdateProjectClueRequest,
    callback: (error: ServiceError | null, response: UpdateProjectClueResponse) => void,
  ): ClientUnaryCall;
  updateProjectClue(
    request: UpdateProjectClueRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateProjectClueResponse) => void,
  ): ClientUnaryCall;
  updateProjectClue(
    request: UpdateProjectClueRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateProjectClueResponse) => void,
  ): ClientUnaryCall;
}

export const ProjectClueServiceClient = makeGenericClientConstructor(
  ProjectClueServiceService,
  "ea.ProjectClueService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): ProjectClueServiceClient;
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
