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

export interface Project {
  id: string;
  publicCode: string;
  name: string;
  description: string;
  parentOrganizationId: string;
  managedById: string;
  createdById: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListProjectsRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListProjectsResponse {
  success: boolean;
  projects: Project[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetProjectRequest {
  projectId: string;
}

export interface GetProjectResponse {
  success: boolean;
  message: string | undefined;
  project?: Project | undefined;
}

export interface CreateProjectRequest {
  requestId: string;
  publicCode: string;
  name: string;
  description: string;
  parentOrganizationId: string;
  managedById: string;
  createdById: string;
}

export interface CreateProjectResponse {
  success: boolean;
  message: string | undefined;
  project?: Project | undefined;
}

export interface DeleteProjectRequest {
  requestId: string;
  projectId: string;
}

export interface DeleteProjectResponse {
  success: boolean;
  message: string | undefined;
  project?: Project | undefined;
}

export interface UpdateProjectRequest {
  requestId: string;
  projectId: string;
  publicCode?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  parentOrganizationId?: string | undefined;
  managedById?: string | undefined;
  createdById?: string | undefined;
}

export interface UpdateProjectResponse {
  success: boolean;
  message: string | undefined;
  project?: Project | undefined;
}

const baseProject: object = {
  id: "",
  publicCode: "",
  name: "",
  description: "",
  parentOrganizationId: "",
  managedById: "",
  createdById: "",
};

export const Project = {
  encode(message: Project, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.publicCode !== "") {
      writer.uint32(18).string(message.publicCode);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.parentOrganizationId !== "") {
      writer.uint32(42).string(message.parentOrganizationId);
    }
    if (message.managedById !== "") {
      writer.uint32(50).string(message.managedById);
    }
    if (message.createdById !== "") {
      writer.uint32(58).string(message.createdById);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Project {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProject } as Project;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.publicCode = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.parentOrganizationId = reader.string();
          break;
        case 6:
          message.managedById = reader.string();
          break;
        case 7:
          message.createdById = reader.string();
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

  fromJSON(object: any): Project {
    const message = { ...baseProject } as Project;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.publicCode =
      object.publicCode !== undefined && object.publicCode !== null
        ? String(object.publicCode)
        : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : "";
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : "";
    message.parentOrganizationId =
      object.parentOrganizationId !== undefined && object.parentOrganizationId !== null
        ? String(object.parentOrganizationId)
        : "";
    message.managedById =
      object.managedById !== undefined && object.managedById !== null
        ? String(object.managedById)
        : "";
    message.createdById =
      object.createdById !== undefined && object.createdById !== null
        ? String(object.createdById)
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

  toJSON(message: Project): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.publicCode !== undefined && (obj.publicCode = message.publicCode);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.parentOrganizationId !== undefined &&
      (obj.parentOrganizationId = message.parentOrganizationId);
    message.managedById !== undefined && (obj.managedById = message.managedById);
    message.createdById !== undefined && (obj.createdById = message.createdById);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Project>): Project {
    const message = { ...baseProject } as Project;
    message.id = object.id ?? "";
    message.publicCode = object.publicCode ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.parentOrganizationId = object.parentOrganizationId ?? "";
    message.managedById = object.managedById ?? "";
    message.createdById = object.createdById ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListProjectsRequest: object = { pageSize: 0, pageToken: "" };

export const ListProjectsRequest = {
  encode(
    message: ListProjectsRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListProjectsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListProjectsRequest } as ListProjectsRequest;
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

  fromJSON(object: any): ListProjectsRequest {
    const message = { ...baseListProjectsRequest } as ListProjectsRequest;
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

  toJSON(message: ListProjectsRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListProjectsRequest>): ListProjectsRequest {
    const message = { ...baseListProjectsRequest } as ListProjectsRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListProjectsResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListProjectsResponse = {
  encode(
    message: ListProjectsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.projects) {
      Project.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListProjectsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListProjectsResponse } as ListProjectsResponse;
    message.projects = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.projects.push(Project.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListProjectsResponse {
    const message = { ...baseListProjectsResponse } as ListProjectsResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.projects = (object.projects ?? []).map((e: any) => Project.fromJSON(e));
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

  toJSON(message: ListProjectsResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.projects) {
      obj.projects = message.projects.map((e) => (e ? Project.toJSON(e) : undefined));
    } else {
      obj.projects = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListProjectsResponse>): ListProjectsResponse {
    const message = { ...baseListProjectsResponse } as ListProjectsResponse;
    message.success = object.success ?? false;
    message.projects = (object.projects ?? []).map((e) => Project.fromPartial(e));
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetProjectRequest: object = { projectId: "" };

export const GetProjectRequest = {
  encode(
    message: GetProjectRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProjectRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetProjectRequest } as GetProjectRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProjectRequest {
    const message = { ...baseGetProjectRequest } as GetProjectRequest;
    message.projectId =
      object.projectId !== undefined && object.projectId !== null
        ? String(object.projectId)
        : "";
    return message;
  },

  toJSON(message: GetProjectRequest): unknown {
    const obj: any = {};
    message.projectId !== undefined && (obj.projectId = message.projectId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetProjectRequest>): GetProjectRequest {
    const message = { ...baseGetProjectRequest } as GetProjectRequest;
    message.projectId = object.projectId ?? "";
    return message;
  },
};

const baseGetProjectResponse: object = { success: false };

export const GetProjectResponse = {
  encode(
    message: GetProjectResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.project !== undefined) {
      Project.encode(message.project, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProjectResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetProjectResponse } as GetProjectResponse;
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
          message.project = Project.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProjectResponse {
    const message = { ...baseGetProjectResponse } as GetProjectResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.project =
      object.project !== undefined && object.project !== null
        ? Project.fromJSON(object.project)
        : undefined;
    return message;
  },

  toJSON(message: GetProjectResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.project !== undefined &&
      (obj.project = message.project ? Project.toJSON(message.project) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetProjectResponse>): GetProjectResponse {
    const message = { ...baseGetProjectResponse } as GetProjectResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.project =
      object.project !== undefined && object.project !== null
        ? Project.fromPartial(object.project)
        : undefined;
    return message;
  },
};

const baseCreateProjectRequest: object = {
  requestId: "",
  publicCode: "",
  name: "",
  description: "",
  parentOrganizationId: "",
  managedById: "",
  createdById: "",
};

export const CreateProjectRequest = {
  encode(
    message: CreateProjectRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.publicCode !== "") {
      writer.uint32(18).string(message.publicCode);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.parentOrganizationId !== "") {
      writer.uint32(42).string(message.parentOrganizationId);
    }
    if (message.managedById !== "") {
      writer.uint32(50).string(message.managedById);
    }
    if (message.createdById !== "") {
      writer.uint32(58).string(message.createdById);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateProjectRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateProjectRequest } as CreateProjectRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 2:
          message.publicCode = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.parentOrganizationId = reader.string();
          break;
        case 6:
          message.managedById = reader.string();
          break;
        case 7:
          message.createdById = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateProjectRequest {
    const message = { ...baseCreateProjectRequest } as CreateProjectRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.publicCode =
      object.publicCode !== undefined && object.publicCode !== null
        ? String(object.publicCode)
        : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : "";
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : "";
    message.parentOrganizationId =
      object.parentOrganizationId !== undefined && object.parentOrganizationId !== null
        ? String(object.parentOrganizationId)
        : "";
    message.managedById =
      object.managedById !== undefined && object.managedById !== null
        ? String(object.managedById)
        : "";
    message.createdById =
      object.createdById !== undefined && object.createdById !== null
        ? String(object.createdById)
        : "";
    return message;
  },

  toJSON(message: CreateProjectRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.publicCode !== undefined && (obj.publicCode = message.publicCode);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.parentOrganizationId !== undefined &&
      (obj.parentOrganizationId = message.parentOrganizationId);
    message.managedById !== undefined && (obj.managedById = message.managedById);
    message.createdById !== undefined && (obj.createdById = message.createdById);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateProjectRequest>): CreateProjectRequest {
    const message = { ...baseCreateProjectRequest } as CreateProjectRequest;
    message.requestId = object.requestId ?? "";
    message.publicCode = object.publicCode ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.parentOrganizationId = object.parentOrganizationId ?? "";
    message.managedById = object.managedById ?? "";
    message.createdById = object.createdById ?? "";
    return message;
  },
};

const baseCreateProjectResponse: object = { success: false };

export const CreateProjectResponse = {
  encode(
    message: CreateProjectResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.project !== undefined) {
      Project.encode(message.project, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateProjectResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateProjectResponse } as CreateProjectResponse;
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
          message.project = Project.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateProjectResponse {
    const message = { ...baseCreateProjectResponse } as CreateProjectResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.project =
      object.project !== undefined && object.project !== null
        ? Project.fromJSON(object.project)
        : undefined;
    return message;
  },

  toJSON(message: CreateProjectResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.project !== undefined &&
      (obj.project = message.project ? Project.toJSON(message.project) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateProjectResponse>): CreateProjectResponse {
    const message = { ...baseCreateProjectResponse } as CreateProjectResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.project =
      object.project !== undefined && object.project !== null
        ? Project.fromPartial(object.project)
        : undefined;
    return message;
  },
};

const baseDeleteProjectRequest: object = { requestId: "", projectId: "" };

export const DeleteProjectRequest = {
  encode(
    message: DeleteProjectRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteProjectRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteProjectRequest } as DeleteProjectRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.projectId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteProjectRequest {
    const message = { ...baseDeleteProjectRequest } as DeleteProjectRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.projectId =
      object.projectId !== undefined && object.projectId !== null
        ? String(object.projectId)
        : "";
    return message;
  },

  toJSON(message: DeleteProjectRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.projectId !== undefined && (obj.projectId = message.projectId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteProjectRequest>): DeleteProjectRequest {
    const message = { ...baseDeleteProjectRequest } as DeleteProjectRequest;
    message.requestId = object.requestId ?? "";
    message.projectId = object.projectId ?? "";
    return message;
  },
};

const baseDeleteProjectResponse: object = { success: false };

export const DeleteProjectResponse = {
  encode(
    message: DeleteProjectResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.project !== undefined) {
      Project.encode(message.project, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteProjectResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteProjectResponse } as DeleteProjectResponse;
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
          message.project = Project.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteProjectResponse {
    const message = { ...baseDeleteProjectResponse } as DeleteProjectResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.project =
      object.project !== undefined && object.project !== null
        ? Project.fromJSON(object.project)
        : undefined;
    return message;
  },

  toJSON(message: DeleteProjectResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.project !== undefined &&
      (obj.project = message.project ? Project.toJSON(message.project) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteProjectResponse>): DeleteProjectResponse {
    const message = { ...baseDeleteProjectResponse } as DeleteProjectResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.project =
      object.project !== undefined && object.project !== null
        ? Project.fromPartial(object.project)
        : undefined;
    return message;
  },
};

const baseUpdateProjectRequest: object = { requestId: "", projectId: "" };

export const UpdateProjectRequest = {
  encode(
    message: UpdateProjectRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    if (message.publicCode !== undefined) {
      writer.uint32(18).string(message.publicCode);
    }
    if (message.name !== undefined) {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(34).string(message.description);
    }
    if (message.parentOrganizationId !== undefined) {
      writer.uint32(42).string(message.parentOrganizationId);
    }
    if (message.managedById !== undefined) {
      writer.uint32(50).string(message.managedById);
    }
    if (message.createdById !== undefined) {
      writer.uint32(58).string(message.createdById);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProjectRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateProjectRequest } as UpdateProjectRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.projectId = reader.string();
          break;
        case 2:
          message.publicCode = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.parentOrganizationId = reader.string();
          break;
        case 6:
          message.managedById = reader.string();
          break;
        case 7:
          message.createdById = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateProjectRequest {
    const message = { ...baseUpdateProjectRequest } as UpdateProjectRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.projectId =
      object.projectId !== undefined && object.projectId !== null
        ? String(object.projectId)
        : "";
    message.publicCode =
      object.publicCode !== undefined && object.publicCode !== null
        ? String(object.publicCode)
        : undefined;
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : undefined;
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : undefined;
    message.parentOrganizationId =
      object.parentOrganizationId !== undefined && object.parentOrganizationId !== null
        ? String(object.parentOrganizationId)
        : undefined;
    message.managedById =
      object.managedById !== undefined && object.managedById !== null
        ? String(object.managedById)
        : undefined;
    message.createdById =
      object.createdById !== undefined && object.createdById !== null
        ? String(object.createdById)
        : undefined;
    return message;
  },

  toJSON(message: UpdateProjectRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.projectId !== undefined && (obj.projectId = message.projectId);
    message.publicCode !== undefined && (obj.publicCode = message.publicCode);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.parentOrganizationId !== undefined &&
      (obj.parentOrganizationId = message.parentOrganizationId);
    message.managedById !== undefined && (obj.managedById = message.managedById);
    message.createdById !== undefined && (obj.createdById = message.createdById);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateProjectRequest>): UpdateProjectRequest {
    const message = { ...baseUpdateProjectRequest } as UpdateProjectRequest;
    message.requestId = object.requestId ?? "";
    message.projectId = object.projectId ?? "";
    message.publicCode = object.publicCode ?? undefined;
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    message.parentOrganizationId = object.parentOrganizationId ?? undefined;
    message.managedById = object.managedById ?? undefined;
    message.createdById = object.createdById ?? undefined;
    return message;
  },
};

const baseUpdateProjectResponse: object = { success: false };

export const UpdateProjectResponse = {
  encode(
    message: UpdateProjectResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.project !== undefined) {
      Project.encode(message.project, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProjectResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateProjectResponse } as UpdateProjectResponse;
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
          message.project = Project.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateProjectResponse {
    const message = { ...baseUpdateProjectResponse } as UpdateProjectResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.project =
      object.project !== undefined && object.project !== null
        ? Project.fromJSON(object.project)
        : undefined;
    return message;
  },

  toJSON(message: UpdateProjectResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.project !== undefined &&
      (obj.project = message.project ? Project.toJSON(message.project) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateProjectResponse>): UpdateProjectResponse {
    const message = { ...baseUpdateProjectResponse } as UpdateProjectResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.project =
      object.project !== undefined && object.project !== null
        ? Project.fromPartial(object.project)
        : undefined;
    return message;
  },
};

export const ProjectServiceService = {
  listProjects: {
    path: "/ea.ProjectService/ListProjects",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListProjectsRequest) =>
      Buffer.from(ListProjectsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListProjectsRequest.decode(value),
    responseSerialize: (value: ListProjectsResponse) =>
      Buffer.from(ListProjectsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListProjectsResponse.decode(value),
  },
  getProject: {
    path: "/ea.ProjectService/GetProject",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetProjectRequest) =>
      Buffer.from(GetProjectRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetProjectRequest.decode(value),
    responseSerialize: (value: GetProjectResponse) =>
      Buffer.from(GetProjectResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetProjectResponse.decode(value),
  },
  createProject: {
    path: "/ea.ProjectService/CreateProject",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateProjectRequest) =>
      Buffer.from(CreateProjectRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateProjectRequest.decode(value),
    responseSerialize: (value: CreateProjectResponse) =>
      Buffer.from(CreateProjectResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateProjectResponse.decode(value),
  },
  deleteProject: {
    path: "/ea.ProjectService/DeleteProject",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteProjectRequest) =>
      Buffer.from(DeleteProjectRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteProjectRequest.decode(value),
    responseSerialize: (value: DeleteProjectResponse) =>
      Buffer.from(DeleteProjectResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteProjectResponse.decode(value),
  },
  updateProject: {
    path: "/ea.ProjectService/UpdateProject",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateProjectRequest) =>
      Buffer.from(UpdateProjectRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateProjectRequest.decode(value),
    responseSerialize: (value: UpdateProjectResponse) =>
      Buffer.from(UpdateProjectResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateProjectResponse.decode(value),
  },
} as const;

export interface ProjectServiceServer extends UntypedServiceImplementation {
  listProjects: handleUnaryCall<ListProjectsRequest, ListProjectsResponse>;
  getProject: handleUnaryCall<GetProjectRequest, GetProjectResponse>;
  createProject: handleUnaryCall<CreateProjectRequest, CreateProjectResponse>;
  deleteProject: handleUnaryCall<DeleteProjectRequest, DeleteProjectResponse>;
  updateProject: handleUnaryCall<UpdateProjectRequest, UpdateProjectResponse>;
}

export interface ProjectServiceClient extends Client {
  listProjects(
    request: ListProjectsRequest,
    callback: (error: ServiceError | null, response: ListProjectsResponse) => void,
  ): ClientUnaryCall;
  listProjects(
    request: ListProjectsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListProjectsResponse) => void,
  ): ClientUnaryCall;
  listProjects(
    request: ListProjectsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListProjectsResponse) => void,
  ): ClientUnaryCall;
  getProject(
    request: GetProjectRequest,
    callback: (error: ServiceError | null, response: GetProjectResponse) => void,
  ): ClientUnaryCall;
  getProject(
    request: GetProjectRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetProjectResponse) => void,
  ): ClientUnaryCall;
  getProject(
    request: GetProjectRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetProjectResponse) => void,
  ): ClientUnaryCall;
  createProject(
    request: CreateProjectRequest,
    callback: (error: ServiceError | null, response: CreateProjectResponse) => void,
  ): ClientUnaryCall;
  createProject(
    request: CreateProjectRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateProjectResponse) => void,
  ): ClientUnaryCall;
  createProject(
    request: CreateProjectRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateProjectResponse) => void,
  ): ClientUnaryCall;
  deleteProject(
    request: DeleteProjectRequest,
    callback: (error: ServiceError | null, response: DeleteProjectResponse) => void,
  ): ClientUnaryCall;
  deleteProject(
    request: DeleteProjectRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteProjectResponse) => void,
  ): ClientUnaryCall;
  deleteProject(
    request: DeleteProjectRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteProjectResponse) => void,
  ): ClientUnaryCall;
  updateProject(
    request: UpdateProjectRequest,
    callback: (error: ServiceError | null, response: UpdateProjectResponse) => void,
  ): ClientUnaryCall;
  updateProject(
    request: UpdateProjectRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateProjectResponse) => void,
  ): ClientUnaryCall;
  updateProject(
    request: UpdateProjectRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateProjectResponse) => void,
  ): ClientUnaryCall;
}

export const ProjectServiceClient = makeGenericClientConstructor(
  ProjectServiceService,
  "ea.ProjectService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): ProjectServiceClient;
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
