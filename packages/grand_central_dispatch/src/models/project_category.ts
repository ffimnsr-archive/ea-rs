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

export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListProjectCategoriesRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListProjectCategoriesResponse {
  success: boolean;
  projectCategories: ProjectCategory[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetProjectCategoryRequest {
  projectCategoryId: string;
}

export interface GetProjectCategoryResponse {
  success: boolean;
  message: string | undefined;
  projectCategory?: ProjectCategory | undefined;
}

export interface CreateProjectCategoryRequest {
  requestId: string;
  name: string;
  description: string;
}

export interface CreateProjectCategoryResponse {
  success: boolean;
  message: string | undefined;
  projectCategory?: ProjectCategory | undefined;
}

export interface DeleteProjectCategoryRequest {
  requestId: string;
  projectCategoryId: string;
}

export interface DeleteProjectCategoryResponse {
  success: boolean;
  message: string | undefined;
  projectCategory?: ProjectCategory | undefined;
}

export interface UpdateProjectCategoryRequest {
  requestId: string;
  projectCategoryId: string;
  name?: string | undefined;
  description?: string | undefined;
}

export interface UpdateProjectCategoryResponse {
  success: boolean;
  message: string | undefined;
  projectCategory?: ProjectCategory | undefined;
}

const baseProjectCategory: object = { id: "", name: "", description: "" };

export const ProjectCategory = {
  encode(message: ProjectCategory, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ProjectCategory {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProjectCategory } as ProjectCategory;
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

  fromJSON(object: any): ProjectCategory {
    const message = { ...baseProjectCategory } as ProjectCategory;
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

  toJSON(message: ProjectCategory): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<ProjectCategory>): ProjectCategory {
    const message = { ...baseProjectCategory } as ProjectCategory;
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListProjectCategoriesRequest: object = { pageSize: 0, pageToken: "" };

export const ListProjectCategoriesRequest = {
  encode(
    message: ListProjectCategoriesRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListProjectCategoriesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListProjectCategoriesRequest,
    } as ListProjectCategoriesRequest;
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

  fromJSON(object: any): ListProjectCategoriesRequest {
    const message = {
      ...baseListProjectCategoriesRequest,
    } as ListProjectCategoriesRequest;
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

  toJSON(message: ListProjectCategoriesRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListProjectCategoriesRequest>,
  ): ListProjectCategoriesRequest {
    const message = {
      ...baseListProjectCategoriesRequest,
    } as ListProjectCategoriesRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListProjectCategoriesResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListProjectCategoriesResponse = {
  encode(
    message: ListProjectCategoriesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.projectCategories) {
      ProjectCategory.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListProjectCategoriesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListProjectCategoriesResponse,
    } as ListProjectCategoriesResponse;
    message.projectCategories = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.projectCategories.push(ProjectCategory.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListProjectCategoriesResponse {
    const message = {
      ...baseListProjectCategoriesResponse,
    } as ListProjectCategoriesResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.projectCategories = (object.projectCategories ?? []).map((e: any) =>
      ProjectCategory.fromJSON(e),
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

  toJSON(message: ListProjectCategoriesResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.projectCategories) {
      obj.projectCategories = message.projectCategories.map((e) =>
        e ? ProjectCategory.toJSON(e) : undefined,
      );
    } else {
      obj.projectCategories = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListProjectCategoriesResponse>,
  ): ListProjectCategoriesResponse {
    const message = {
      ...baseListProjectCategoriesResponse,
    } as ListProjectCategoriesResponse;
    message.success = object.success ?? false;
    message.projectCategories = (object.projectCategories ?? []).map((e) =>
      ProjectCategory.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetProjectCategoryRequest: object = { projectCategoryId: "" };

export const GetProjectCategoryRequest = {
  encode(
    message: GetProjectCategoryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.projectCategoryId !== "") {
      writer.uint32(10).string(message.projectCategoryId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProjectCategoryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetProjectCategoryRequest } as GetProjectCategoryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectCategoryId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProjectCategoryRequest {
    const message = { ...baseGetProjectCategoryRequest } as GetProjectCategoryRequest;
    message.projectCategoryId =
      object.projectCategoryId !== undefined && object.projectCategoryId !== null
        ? String(object.projectCategoryId)
        : "";
    return message;
  },

  toJSON(message: GetProjectCategoryRequest): unknown {
    const obj: any = {};
    message.projectCategoryId !== undefined &&
      (obj.projectCategoryId = message.projectCategoryId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetProjectCategoryRequest>): GetProjectCategoryRequest {
    const message = { ...baseGetProjectCategoryRequest } as GetProjectCategoryRequest;
    message.projectCategoryId = object.projectCategoryId ?? "";
    return message;
  },
};

const baseGetProjectCategoryResponse: object = { success: false };

export const GetProjectCategoryResponse = {
  encode(
    message: GetProjectCategoryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectCategory !== undefined) {
      ProjectCategory.encode(message.projectCategory, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProjectCategoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetProjectCategoryResponse } as GetProjectCategoryResponse;
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
          message.projectCategory = ProjectCategory.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProjectCategoryResponse {
    const message = { ...baseGetProjectCategoryResponse } as GetProjectCategoryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectCategory =
      object.projectCategory !== undefined && object.projectCategory !== null
        ? ProjectCategory.fromJSON(object.projectCategory)
        : undefined;
    return message;
  },

  toJSON(message: GetProjectCategoryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectCategory !== undefined &&
      (obj.projectCategory = message.projectCategory
        ? ProjectCategory.toJSON(message.projectCategory)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GetProjectCategoryResponse>,
  ): GetProjectCategoryResponse {
    const message = { ...baseGetProjectCategoryResponse } as GetProjectCategoryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectCategory =
      object.projectCategory !== undefined && object.projectCategory !== null
        ? ProjectCategory.fromPartial(object.projectCategory)
        : undefined;
    return message;
  },
};

const baseCreateProjectCategoryRequest: object = {
  requestId: "",
  name: "",
  description: "",
};

export const CreateProjectCategoryRequest = {
  encode(
    message: CreateProjectCategoryRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateProjectCategoryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseCreateProjectCategoryRequest,
    } as CreateProjectCategoryRequest;
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

  fromJSON(object: any): CreateProjectCategoryRequest {
    const message = {
      ...baseCreateProjectCategoryRequest,
    } as CreateProjectCategoryRequest;
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

  toJSON(message: CreateProjectCategoryRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateProjectCategoryRequest>,
  ): CreateProjectCategoryRequest {
    const message = {
      ...baseCreateProjectCategoryRequest,
    } as CreateProjectCategoryRequest;
    message.requestId = object.requestId ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

const baseCreateProjectCategoryResponse: object = { success: false };

export const CreateProjectCategoryResponse = {
  encode(
    message: CreateProjectCategoryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectCategory !== undefined) {
      ProjectCategory.encode(message.projectCategory, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateProjectCategoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseCreateProjectCategoryResponse,
    } as CreateProjectCategoryResponse;
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
          message.projectCategory = ProjectCategory.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateProjectCategoryResponse {
    const message = {
      ...baseCreateProjectCategoryResponse,
    } as CreateProjectCategoryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectCategory =
      object.projectCategory !== undefined && object.projectCategory !== null
        ? ProjectCategory.fromJSON(object.projectCategory)
        : undefined;
    return message;
  },

  toJSON(message: CreateProjectCategoryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectCategory !== undefined &&
      (obj.projectCategory = message.projectCategory
        ? ProjectCategory.toJSON(message.projectCategory)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateProjectCategoryResponse>,
  ): CreateProjectCategoryResponse {
    const message = {
      ...baseCreateProjectCategoryResponse,
    } as CreateProjectCategoryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectCategory =
      object.projectCategory !== undefined && object.projectCategory !== null
        ? ProjectCategory.fromPartial(object.projectCategory)
        : undefined;
    return message;
  },
};

const baseDeleteProjectCategoryRequest: object = { requestId: "", projectCategoryId: "" };

export const DeleteProjectCategoryRequest = {
  encode(
    message: DeleteProjectCategoryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.projectCategoryId !== "") {
      writer.uint32(10).string(message.projectCategoryId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteProjectCategoryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteProjectCategoryRequest,
    } as DeleteProjectCategoryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.projectCategoryId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteProjectCategoryRequest {
    const message = {
      ...baseDeleteProjectCategoryRequest,
    } as DeleteProjectCategoryRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.projectCategoryId =
      object.projectCategoryId !== undefined && object.projectCategoryId !== null
        ? String(object.projectCategoryId)
        : "";
    return message;
  },

  toJSON(message: DeleteProjectCategoryRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.projectCategoryId !== undefined &&
      (obj.projectCategoryId = message.projectCategoryId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteProjectCategoryRequest>,
  ): DeleteProjectCategoryRequest {
    const message = {
      ...baseDeleteProjectCategoryRequest,
    } as DeleteProjectCategoryRequest;
    message.requestId = object.requestId ?? "";
    message.projectCategoryId = object.projectCategoryId ?? "";
    return message;
  },
};

const baseDeleteProjectCategoryResponse: object = { success: false };

export const DeleteProjectCategoryResponse = {
  encode(
    message: DeleteProjectCategoryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectCategory !== undefined) {
      ProjectCategory.encode(message.projectCategory, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteProjectCategoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteProjectCategoryResponse,
    } as DeleteProjectCategoryResponse;
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
          message.projectCategory = ProjectCategory.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteProjectCategoryResponse {
    const message = {
      ...baseDeleteProjectCategoryResponse,
    } as DeleteProjectCategoryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectCategory =
      object.projectCategory !== undefined && object.projectCategory !== null
        ? ProjectCategory.fromJSON(object.projectCategory)
        : undefined;
    return message;
  },

  toJSON(message: DeleteProjectCategoryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectCategory !== undefined &&
      (obj.projectCategory = message.projectCategory
        ? ProjectCategory.toJSON(message.projectCategory)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteProjectCategoryResponse>,
  ): DeleteProjectCategoryResponse {
    const message = {
      ...baseDeleteProjectCategoryResponse,
    } as DeleteProjectCategoryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectCategory =
      object.projectCategory !== undefined && object.projectCategory !== null
        ? ProjectCategory.fromPartial(object.projectCategory)
        : undefined;
    return message;
  },
};

const baseUpdateProjectCategoryRequest: object = { requestId: "", projectCategoryId: "" };

export const UpdateProjectCategoryRequest = {
  encode(
    message: UpdateProjectCategoryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.projectCategoryId !== "") {
      writer.uint32(10).string(message.projectCategoryId);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProjectCategoryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateProjectCategoryRequest,
    } as UpdateProjectCategoryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.projectCategoryId = reader.string();
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

  fromJSON(object: any): UpdateProjectCategoryRequest {
    const message = {
      ...baseUpdateProjectCategoryRequest,
    } as UpdateProjectCategoryRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.projectCategoryId =
      object.projectCategoryId !== undefined && object.projectCategoryId !== null
        ? String(object.projectCategoryId)
        : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : undefined;
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : undefined;
    return message;
  },

  toJSON(message: UpdateProjectCategoryRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.projectCategoryId !== undefined &&
      (obj.projectCategoryId = message.projectCategoryId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateProjectCategoryRequest>,
  ): UpdateProjectCategoryRequest {
    const message = {
      ...baseUpdateProjectCategoryRequest,
    } as UpdateProjectCategoryRequest;
    message.requestId = object.requestId ?? "";
    message.projectCategoryId = object.projectCategoryId ?? "";
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    return message;
  },
};

const baseUpdateProjectCategoryResponse: object = { success: false };

export const UpdateProjectCategoryResponse = {
  encode(
    message: UpdateProjectCategoryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectCategory !== undefined) {
      ProjectCategory.encode(message.projectCategory, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProjectCategoryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateProjectCategoryResponse,
    } as UpdateProjectCategoryResponse;
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
          message.projectCategory = ProjectCategory.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateProjectCategoryResponse {
    const message = {
      ...baseUpdateProjectCategoryResponse,
    } as UpdateProjectCategoryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectCategory =
      object.projectCategory !== undefined && object.projectCategory !== null
        ? ProjectCategory.fromJSON(object.projectCategory)
        : undefined;
    return message;
  },

  toJSON(message: UpdateProjectCategoryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectCategory !== undefined &&
      (obj.projectCategory = message.projectCategory
        ? ProjectCategory.toJSON(message.projectCategory)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateProjectCategoryResponse>,
  ): UpdateProjectCategoryResponse {
    const message = {
      ...baseUpdateProjectCategoryResponse,
    } as UpdateProjectCategoryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectCategory =
      object.projectCategory !== undefined && object.projectCategory !== null
        ? ProjectCategory.fromPartial(object.projectCategory)
        : undefined;
    return message;
  },
};

export const ProjectCategoryServiceService = {
  listProjectCategories: {
    path: "/ea.ProjectCategoryService/ListProjectCategories",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListProjectCategoriesRequest) =>
      Buffer.from(ListProjectCategoriesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListProjectCategoriesRequest.decode(value),
    responseSerialize: (value: ListProjectCategoriesResponse) =>
      Buffer.from(ListProjectCategoriesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListProjectCategoriesResponse.decode(value),
  },
  getProjectCategory: {
    path: "/ea.ProjectCategoryService/GetProjectCategory",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetProjectCategoryRequest) =>
      Buffer.from(GetProjectCategoryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetProjectCategoryRequest.decode(value),
    responseSerialize: (value: GetProjectCategoryResponse) =>
      Buffer.from(GetProjectCategoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetProjectCategoryResponse.decode(value),
  },
  createProjectCategory: {
    path: "/ea.ProjectCategoryService/CreateProjectCategory",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateProjectCategoryRequest) =>
      Buffer.from(CreateProjectCategoryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateProjectCategoryRequest.decode(value),
    responseSerialize: (value: CreateProjectCategoryResponse) =>
      Buffer.from(CreateProjectCategoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateProjectCategoryResponse.decode(value),
  },
  deleteProjectCategory: {
    path: "/ea.ProjectCategoryService/DeleteProjectCategory",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteProjectCategoryRequest) =>
      Buffer.from(DeleteProjectCategoryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteProjectCategoryRequest.decode(value),
    responseSerialize: (value: DeleteProjectCategoryResponse) =>
      Buffer.from(DeleteProjectCategoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteProjectCategoryResponse.decode(value),
  },
  updateProjectCategory: {
    path: "/ea.ProjectCategoryService/UpdateProjectCategory",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateProjectCategoryRequest) =>
      Buffer.from(UpdateProjectCategoryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateProjectCategoryRequest.decode(value),
    responseSerialize: (value: UpdateProjectCategoryResponse) =>
      Buffer.from(UpdateProjectCategoryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateProjectCategoryResponse.decode(value),
  },
} as const;

export interface ProjectCategoryServiceServer extends UntypedServiceImplementation {
  listProjectCategories: handleUnaryCall<
    ListProjectCategoriesRequest,
    ListProjectCategoriesResponse
  >;
  getProjectCategory: handleUnaryCall<
    GetProjectCategoryRequest,
    GetProjectCategoryResponse
  >;
  createProjectCategory: handleUnaryCall<
    CreateProjectCategoryRequest,
    CreateProjectCategoryResponse
  >;
  deleteProjectCategory: handleUnaryCall<
    DeleteProjectCategoryRequest,
    DeleteProjectCategoryResponse
  >;
  updateProjectCategory: handleUnaryCall<
    UpdateProjectCategoryRequest,
    UpdateProjectCategoryResponse
  >;
}

export interface ProjectCategoryServiceClient extends Client {
  listProjectCategories(
    request: ListProjectCategoriesRequest,
    callback: (
      error: ServiceError | null,
      response: ListProjectCategoriesResponse,
    ) => void,
  ): ClientUnaryCall;
  listProjectCategories(
    request: ListProjectCategoriesRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: ListProjectCategoriesResponse,
    ) => void,
  ): ClientUnaryCall;
  listProjectCategories(
    request: ListProjectCategoriesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: ListProjectCategoriesResponse,
    ) => void,
  ): ClientUnaryCall;
  getProjectCategory(
    request: GetProjectCategoryRequest,
    callback: (error: ServiceError | null, response: GetProjectCategoryResponse) => void,
  ): ClientUnaryCall;
  getProjectCategory(
    request: GetProjectCategoryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetProjectCategoryResponse) => void,
  ): ClientUnaryCall;
  getProjectCategory(
    request: GetProjectCategoryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetProjectCategoryResponse) => void,
  ): ClientUnaryCall;
  createProjectCategory(
    request: CreateProjectCategoryRequest,
    callback: (
      error: ServiceError | null,
      response: CreateProjectCategoryResponse,
    ) => void,
  ): ClientUnaryCall;
  createProjectCategory(
    request: CreateProjectCategoryRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: CreateProjectCategoryResponse,
    ) => void,
  ): ClientUnaryCall;
  createProjectCategory(
    request: CreateProjectCategoryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: CreateProjectCategoryResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteProjectCategory(
    request: DeleteProjectCategoryRequest,
    callback: (
      error: ServiceError | null,
      response: DeleteProjectCategoryResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteProjectCategory(
    request: DeleteProjectCategoryRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: DeleteProjectCategoryResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteProjectCategory(
    request: DeleteProjectCategoryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: DeleteProjectCategoryResponse,
    ) => void,
  ): ClientUnaryCall;
  updateProjectCategory(
    request: UpdateProjectCategoryRequest,
    callback: (
      error: ServiceError | null,
      response: UpdateProjectCategoryResponse,
    ) => void,
  ): ClientUnaryCall;
  updateProjectCategory(
    request: UpdateProjectCategoryRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: UpdateProjectCategoryResponse,
    ) => void,
  ): ClientUnaryCall;
  updateProjectCategory(
    request: UpdateProjectCategoryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: UpdateProjectCategoryResponse,
    ) => void,
  ): ClientUnaryCall;
}

export const ProjectCategoryServiceClient = makeGenericClientConstructor(
  ProjectCategoryServiceService,
  "ea.ProjectCategoryService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): ProjectCategoryServiceClient;
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
