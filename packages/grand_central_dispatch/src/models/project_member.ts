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

export interface ProjectMember {
  id: string;
  userId: string;
  projectId: string;
  workFunctionId: string;
  startDate: number;
  endDate: number;
  status: number;
  remarks: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListProjectMembersRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListProjectMembersResponse {
  success: boolean;
  projectMembers: ProjectMember[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetProjectMemberRequest {
  projectMemberId: string;
}

export interface GetProjectMemberResponse {
  success: boolean;
  message: string | undefined;
  projectMember?: ProjectMember | undefined;
}

export interface CreateProjectMemberRequest {
  requestId: string;
  userId: string;
  projectId: string;
  workFunctionId: string;
  startDate: number;
  endDate: number;
  status: number;
  remarks: string;
}

export interface CreateProjectMemberResponse {
  success: boolean;
  message: string | undefined;
  projectMember?: ProjectMember | undefined;
}

export interface DeleteProjectMemberRequest {
  requestId: string;
  projectMemberId: string;
}

export interface DeleteProjectMemberResponse {
  success: boolean;
  message: string | undefined;
  projectMember?: ProjectMember | undefined;
}

export interface UpdateProjectMemberRequest {
  requestId: string;
  projectMemberId: string;
  userId?: string | undefined;
  projectId?: string | undefined;
  workFunctionId?: string | undefined;
  startDate?: number | undefined;
  endDate?: number | undefined;
  status?: number | undefined;
  remarks?: string | undefined;
}

export interface UpdateProjectMemberResponse {
  success: boolean;
  message: string | undefined;
  projectMember?: ProjectMember | undefined;
}

const baseProjectMember: object = {
  id: "",
  userId: "",
  projectId: "",
  workFunctionId: "",
  startDate: 0,
  endDate: 0,
  status: 0,
  remarks: "",
};

export const ProjectMember = {
  encode(message: ProjectMember, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.projectId !== "") {
      writer.uint32(26).string(message.projectId);
    }
    if (message.workFunctionId !== "") {
      writer.uint32(34).string(message.workFunctionId);
    }
    if (message.startDate !== 0) {
      writer.uint32(40).int64(message.startDate);
    }
    if (message.endDate !== 0) {
      writer.uint32(48).int64(message.endDate);
    }
    if (message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    if (message.remarks !== "") {
      writer.uint32(66).string(message.remarks);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProjectMember {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProjectMember } as ProjectMember;
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
          message.projectId = reader.string();
          break;
        case 4:
          message.workFunctionId = reader.string();
          break;
        case 5:
          message.startDate = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.endDate = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.status = reader.int32();
          break;
        case 8:
          message.remarks = reader.string();
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

  fromJSON(object: any): ProjectMember {
    const message = { ...baseProjectMember } as ProjectMember;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.projectId =
      object.projectId !== undefined && object.projectId !== null
        ? String(object.projectId)
        : "";
    message.workFunctionId =
      object.workFunctionId !== undefined && object.workFunctionId !== null
        ? String(object.workFunctionId)
        : "";
    message.startDate =
      object.startDate !== undefined && object.startDate !== null
        ? Number(object.startDate)
        : 0;
    message.endDate =
      object.endDate !== undefined && object.endDate !== null
        ? Number(object.endDate)
        : 0;
    message.status =
      object.status !== undefined && object.status !== null ? Number(object.status) : 0;
    message.remarks =
      object.remarks !== undefined && object.remarks !== null
        ? String(object.remarks)
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

  toJSON(message: ProjectMember): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.userId !== undefined && (obj.userId = message.userId);
    message.projectId !== undefined && (obj.projectId = message.projectId);
    message.workFunctionId !== undefined && (obj.workFunctionId = message.workFunctionId);
    message.startDate !== undefined && (obj.startDate = message.startDate);
    message.endDate !== undefined && (obj.endDate = message.endDate);
    message.status !== undefined && (obj.status = message.status);
    message.remarks !== undefined && (obj.remarks = message.remarks);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<ProjectMember>): ProjectMember {
    const message = { ...baseProjectMember } as ProjectMember;
    message.id = object.id ?? "";
    message.userId = object.userId ?? "";
    message.projectId = object.projectId ?? "";
    message.workFunctionId = object.workFunctionId ?? "";
    message.startDate = object.startDate ?? 0;
    message.endDate = object.endDate ?? 0;
    message.status = object.status ?? 0;
    message.remarks = object.remarks ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListProjectMembersRequest: object = { pageSize: 0, pageToken: "" };

export const ListProjectMembersRequest = {
  encode(
    message: ListProjectMembersRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListProjectMembersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListProjectMembersRequest } as ListProjectMembersRequest;
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

  fromJSON(object: any): ListProjectMembersRequest {
    const message = { ...baseListProjectMembersRequest } as ListProjectMembersRequest;
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

  toJSON(message: ListProjectMembersRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListProjectMembersRequest>): ListProjectMembersRequest {
    const message = { ...baseListProjectMembersRequest } as ListProjectMembersRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListProjectMembersResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListProjectMembersResponse = {
  encode(
    message: ListProjectMembersResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.projectMembers) {
      ProjectMember.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListProjectMembersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListProjectMembersResponse } as ListProjectMembersResponse;
    message.projectMembers = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.projectMembers.push(ProjectMember.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListProjectMembersResponse {
    const message = { ...baseListProjectMembersResponse } as ListProjectMembersResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.projectMembers = (object.projectMembers ?? []).map((e: any) =>
      ProjectMember.fromJSON(e),
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

  toJSON(message: ListProjectMembersResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.projectMembers) {
      obj.projectMembers = message.projectMembers.map((e) =>
        e ? ProjectMember.toJSON(e) : undefined,
      );
    } else {
      obj.projectMembers = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListProjectMembersResponse>,
  ): ListProjectMembersResponse {
    const message = { ...baseListProjectMembersResponse } as ListProjectMembersResponse;
    message.success = object.success ?? false;
    message.projectMembers = (object.projectMembers ?? []).map((e) =>
      ProjectMember.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetProjectMemberRequest: object = { projectMemberId: "" };

export const GetProjectMemberRequest = {
  encode(
    message: GetProjectMemberRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.projectMemberId !== "") {
      writer.uint32(10).string(message.projectMemberId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProjectMemberRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetProjectMemberRequest } as GetProjectMemberRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectMemberId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProjectMemberRequest {
    const message = { ...baseGetProjectMemberRequest } as GetProjectMemberRequest;
    message.projectMemberId =
      object.projectMemberId !== undefined && object.projectMemberId !== null
        ? String(object.projectMemberId)
        : "";
    return message;
  },

  toJSON(message: GetProjectMemberRequest): unknown {
    const obj: any = {};
    message.projectMemberId !== undefined &&
      (obj.projectMemberId = message.projectMemberId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetProjectMemberRequest>): GetProjectMemberRequest {
    const message = { ...baseGetProjectMemberRequest } as GetProjectMemberRequest;
    message.projectMemberId = object.projectMemberId ?? "";
    return message;
  },
};

const baseGetProjectMemberResponse: object = { success: false };

export const GetProjectMemberResponse = {
  encode(
    message: GetProjectMemberResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectMember !== undefined) {
      ProjectMember.encode(message.projectMember, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProjectMemberResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetProjectMemberResponse } as GetProjectMemberResponse;
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
          message.projectMember = ProjectMember.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProjectMemberResponse {
    const message = { ...baseGetProjectMemberResponse } as GetProjectMemberResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectMember =
      object.projectMember !== undefined && object.projectMember !== null
        ? ProjectMember.fromJSON(object.projectMember)
        : undefined;
    return message;
  },

  toJSON(message: GetProjectMemberResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectMember !== undefined &&
      (obj.projectMember = message.projectMember
        ? ProjectMember.toJSON(message.projectMember)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetProjectMemberResponse>): GetProjectMemberResponse {
    const message = { ...baseGetProjectMemberResponse } as GetProjectMemberResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectMember =
      object.projectMember !== undefined && object.projectMember !== null
        ? ProjectMember.fromPartial(object.projectMember)
        : undefined;
    return message;
  },
};

const baseCreateProjectMemberRequest: object = {
  requestId: "",
  userId: "",
  projectId: "",
  workFunctionId: "",
  startDate: 0,
  endDate: 0,
  status: 0,
  remarks: "",
};

export const CreateProjectMemberRequest = {
  encode(
    message: CreateProjectMemberRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.projectId !== "") {
      writer.uint32(26).string(message.projectId);
    }
    if (message.workFunctionId !== "") {
      writer.uint32(34).string(message.workFunctionId);
    }
    if (message.startDate !== 0) {
      writer.uint32(40).int64(message.startDate);
    }
    if (message.endDate !== 0) {
      writer.uint32(48).int64(message.endDate);
    }
    if (message.status !== 0) {
      writer.uint32(56).int32(message.status);
    }
    if (message.remarks !== "") {
      writer.uint32(66).string(message.remarks);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateProjectMemberRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateProjectMemberRequest } as CreateProjectMemberRequest;
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
          message.projectId = reader.string();
          break;
        case 4:
          message.workFunctionId = reader.string();
          break;
        case 5:
          message.startDate = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.endDate = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.status = reader.int32();
          break;
        case 8:
          message.remarks = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateProjectMemberRequest {
    const message = { ...baseCreateProjectMemberRequest } as CreateProjectMemberRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.projectId =
      object.projectId !== undefined && object.projectId !== null
        ? String(object.projectId)
        : "";
    message.workFunctionId =
      object.workFunctionId !== undefined && object.workFunctionId !== null
        ? String(object.workFunctionId)
        : "";
    message.startDate =
      object.startDate !== undefined && object.startDate !== null
        ? Number(object.startDate)
        : 0;
    message.endDate =
      object.endDate !== undefined && object.endDate !== null
        ? Number(object.endDate)
        : 0;
    message.status =
      object.status !== undefined && object.status !== null ? Number(object.status) : 0;
    message.remarks =
      object.remarks !== undefined && object.remarks !== null
        ? String(object.remarks)
        : "";
    return message;
  },

  toJSON(message: CreateProjectMemberRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.projectId !== undefined && (obj.projectId = message.projectId);
    message.workFunctionId !== undefined && (obj.workFunctionId = message.workFunctionId);
    message.startDate !== undefined && (obj.startDate = message.startDate);
    message.endDate !== undefined && (obj.endDate = message.endDate);
    message.status !== undefined && (obj.status = message.status);
    message.remarks !== undefined && (obj.remarks = message.remarks);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateProjectMemberRequest>,
  ): CreateProjectMemberRequest {
    const message = { ...baseCreateProjectMemberRequest } as CreateProjectMemberRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    message.projectId = object.projectId ?? "";
    message.workFunctionId = object.workFunctionId ?? "";
    message.startDate = object.startDate ?? 0;
    message.endDate = object.endDate ?? 0;
    message.status = object.status ?? 0;
    message.remarks = object.remarks ?? "";
    return message;
  },
};

const baseCreateProjectMemberResponse: object = { success: false };

export const CreateProjectMemberResponse = {
  encode(
    message: CreateProjectMemberResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectMember !== undefined) {
      ProjectMember.encode(message.projectMember, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateProjectMemberResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateProjectMemberResponse } as CreateProjectMemberResponse;
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
          message.projectMember = ProjectMember.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateProjectMemberResponse {
    const message = { ...baseCreateProjectMemberResponse } as CreateProjectMemberResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectMember =
      object.projectMember !== undefined && object.projectMember !== null
        ? ProjectMember.fromJSON(object.projectMember)
        : undefined;
    return message;
  },

  toJSON(message: CreateProjectMemberResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectMember !== undefined &&
      (obj.projectMember = message.projectMember
        ? ProjectMember.toJSON(message.projectMember)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateProjectMemberResponse>,
  ): CreateProjectMemberResponse {
    const message = { ...baseCreateProjectMemberResponse } as CreateProjectMemberResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectMember =
      object.projectMember !== undefined && object.projectMember !== null
        ? ProjectMember.fromPartial(object.projectMember)
        : undefined;
    return message;
  },
};

const baseDeleteProjectMemberRequest: object = { requestId: "", projectMemberId: "" };

export const DeleteProjectMemberRequest = {
  encode(
    message: DeleteProjectMemberRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.projectMemberId !== "") {
      writer.uint32(10).string(message.projectMemberId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteProjectMemberRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteProjectMemberRequest } as DeleteProjectMemberRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.projectMemberId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteProjectMemberRequest {
    const message = { ...baseDeleteProjectMemberRequest } as DeleteProjectMemberRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.projectMemberId =
      object.projectMemberId !== undefined && object.projectMemberId !== null
        ? String(object.projectMemberId)
        : "";
    return message;
  },

  toJSON(message: DeleteProjectMemberRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.projectMemberId !== undefined &&
      (obj.projectMemberId = message.projectMemberId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteProjectMemberRequest>,
  ): DeleteProjectMemberRequest {
    const message = { ...baseDeleteProjectMemberRequest } as DeleteProjectMemberRequest;
    message.requestId = object.requestId ?? "";
    message.projectMemberId = object.projectMemberId ?? "";
    return message;
  },
};

const baseDeleteProjectMemberResponse: object = { success: false };

export const DeleteProjectMemberResponse = {
  encode(
    message: DeleteProjectMemberResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectMember !== undefined) {
      ProjectMember.encode(message.projectMember, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteProjectMemberResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteProjectMemberResponse } as DeleteProjectMemberResponse;
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
          message.projectMember = ProjectMember.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteProjectMemberResponse {
    const message = { ...baseDeleteProjectMemberResponse } as DeleteProjectMemberResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectMember =
      object.projectMember !== undefined && object.projectMember !== null
        ? ProjectMember.fromJSON(object.projectMember)
        : undefined;
    return message;
  },

  toJSON(message: DeleteProjectMemberResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectMember !== undefined &&
      (obj.projectMember = message.projectMember
        ? ProjectMember.toJSON(message.projectMember)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteProjectMemberResponse>,
  ): DeleteProjectMemberResponse {
    const message = { ...baseDeleteProjectMemberResponse } as DeleteProjectMemberResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectMember =
      object.projectMember !== undefined && object.projectMember !== null
        ? ProjectMember.fromPartial(object.projectMember)
        : undefined;
    return message;
  },
};

const baseUpdateProjectMemberRequest: object = { requestId: "", projectMemberId: "" };

export const UpdateProjectMemberRequest = {
  encode(
    message: UpdateProjectMemberRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.projectMemberId !== "") {
      writer.uint32(10).string(message.projectMemberId);
    }
    if (message.userId !== undefined) {
      writer.uint32(18).string(message.userId);
    }
    if (message.projectId !== undefined) {
      writer.uint32(26).string(message.projectId);
    }
    if (message.workFunctionId !== undefined) {
      writer.uint32(34).string(message.workFunctionId);
    }
    if (message.startDate !== undefined) {
      writer.uint32(40).int64(message.startDate);
    }
    if (message.endDate !== undefined) {
      writer.uint32(48).int64(message.endDate);
    }
    if (message.status !== undefined) {
      writer.uint32(56).int32(message.status);
    }
    if (message.remarks !== undefined) {
      writer.uint32(66).string(message.remarks);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProjectMemberRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateProjectMemberRequest } as UpdateProjectMemberRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.projectMemberId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.projectId = reader.string();
          break;
        case 4:
          message.workFunctionId = reader.string();
          break;
        case 5:
          message.startDate = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.endDate = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.status = reader.int32();
          break;
        case 8:
          message.remarks = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateProjectMemberRequest {
    const message = { ...baseUpdateProjectMemberRequest } as UpdateProjectMemberRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.projectMemberId =
      object.projectMemberId !== undefined && object.projectMemberId !== null
        ? String(object.projectMemberId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : undefined;
    message.projectId =
      object.projectId !== undefined && object.projectId !== null
        ? String(object.projectId)
        : undefined;
    message.workFunctionId =
      object.workFunctionId !== undefined && object.workFunctionId !== null
        ? String(object.workFunctionId)
        : undefined;
    message.startDate =
      object.startDate !== undefined && object.startDate !== null
        ? Number(object.startDate)
        : undefined;
    message.endDate =
      object.endDate !== undefined && object.endDate !== null
        ? Number(object.endDate)
        : undefined;
    message.status =
      object.status !== undefined && object.status !== null
        ? Number(object.status)
        : undefined;
    message.remarks =
      object.remarks !== undefined && object.remarks !== null
        ? String(object.remarks)
        : undefined;
    return message;
  },

  toJSON(message: UpdateProjectMemberRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.projectMemberId !== undefined &&
      (obj.projectMemberId = message.projectMemberId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.projectId !== undefined && (obj.projectId = message.projectId);
    message.workFunctionId !== undefined && (obj.workFunctionId = message.workFunctionId);
    message.startDate !== undefined && (obj.startDate = message.startDate);
    message.endDate !== undefined && (obj.endDate = message.endDate);
    message.status !== undefined && (obj.status = message.status);
    message.remarks !== undefined && (obj.remarks = message.remarks);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateProjectMemberRequest>,
  ): UpdateProjectMemberRequest {
    const message = { ...baseUpdateProjectMemberRequest } as UpdateProjectMemberRequest;
    message.requestId = object.requestId ?? "";
    message.projectMemberId = object.projectMemberId ?? "";
    message.userId = object.userId ?? undefined;
    message.projectId = object.projectId ?? undefined;
    message.workFunctionId = object.workFunctionId ?? undefined;
    message.startDate = object.startDate ?? undefined;
    message.endDate = object.endDate ?? undefined;
    message.status = object.status ?? undefined;
    message.remarks = object.remarks ?? undefined;
    return message;
  },
};

const baseUpdateProjectMemberResponse: object = { success: false };

export const UpdateProjectMemberResponse = {
  encode(
    message: UpdateProjectMemberResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.projectMember !== undefined) {
      ProjectMember.encode(message.projectMember, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProjectMemberResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateProjectMemberResponse } as UpdateProjectMemberResponse;
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
          message.projectMember = ProjectMember.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateProjectMemberResponse {
    const message = { ...baseUpdateProjectMemberResponse } as UpdateProjectMemberResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.projectMember =
      object.projectMember !== undefined && object.projectMember !== null
        ? ProjectMember.fromJSON(object.projectMember)
        : undefined;
    return message;
  },

  toJSON(message: UpdateProjectMemberResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.projectMember !== undefined &&
      (obj.projectMember = message.projectMember
        ? ProjectMember.toJSON(message.projectMember)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateProjectMemberResponse>,
  ): UpdateProjectMemberResponse {
    const message = { ...baseUpdateProjectMemberResponse } as UpdateProjectMemberResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.projectMember =
      object.projectMember !== undefined && object.projectMember !== null
        ? ProjectMember.fromPartial(object.projectMember)
        : undefined;
    return message;
  },
};

export const ProjectMemberServiceService = {
  listProjectMembers: {
    path: "/ea.ProjectMemberService/ListProjectMembers",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListProjectMembersRequest) =>
      Buffer.from(ListProjectMembersRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListProjectMembersRequest.decode(value),
    responseSerialize: (value: ListProjectMembersResponse) =>
      Buffer.from(ListProjectMembersResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListProjectMembersResponse.decode(value),
  },
  getProjectMember: {
    path: "/ea.ProjectMemberService/GetProjectMember",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetProjectMemberRequest) =>
      Buffer.from(GetProjectMemberRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetProjectMemberRequest.decode(value),
    responseSerialize: (value: GetProjectMemberResponse) =>
      Buffer.from(GetProjectMemberResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetProjectMemberResponse.decode(value),
  },
  createProjectMember: {
    path: "/ea.ProjectMemberService/CreateProjectMember",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateProjectMemberRequest) =>
      Buffer.from(CreateProjectMemberRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateProjectMemberRequest.decode(value),
    responseSerialize: (value: CreateProjectMemberResponse) =>
      Buffer.from(CreateProjectMemberResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateProjectMemberResponse.decode(value),
  },
  deleteProjectMember: {
    path: "/ea.ProjectMemberService/DeleteProjectMember",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteProjectMemberRequest) =>
      Buffer.from(DeleteProjectMemberRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteProjectMemberRequest.decode(value),
    responseSerialize: (value: DeleteProjectMemberResponse) =>
      Buffer.from(DeleteProjectMemberResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteProjectMemberResponse.decode(value),
  },
  updateProjectMember: {
    path: "/ea.ProjectMemberService/UpdateProjectMember",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateProjectMemberRequest) =>
      Buffer.from(UpdateProjectMemberRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateProjectMemberRequest.decode(value),
    responseSerialize: (value: UpdateProjectMemberResponse) =>
      Buffer.from(UpdateProjectMemberResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateProjectMemberResponse.decode(value),
  },
} as const;

export interface ProjectMemberServiceServer extends UntypedServiceImplementation {
  listProjectMembers: handleUnaryCall<
    ListProjectMembersRequest,
    ListProjectMembersResponse
  >;
  getProjectMember: handleUnaryCall<GetProjectMemberRequest, GetProjectMemberResponse>;
  createProjectMember: handleUnaryCall<
    CreateProjectMemberRequest,
    CreateProjectMemberResponse
  >;
  deleteProjectMember: handleUnaryCall<
    DeleteProjectMemberRequest,
    DeleteProjectMemberResponse
  >;
  updateProjectMember: handleUnaryCall<
    UpdateProjectMemberRequest,
    UpdateProjectMemberResponse
  >;
}

export interface ProjectMemberServiceClient extends Client {
  listProjectMembers(
    request: ListProjectMembersRequest,
    callback: (error: ServiceError | null, response: ListProjectMembersResponse) => void,
  ): ClientUnaryCall;
  listProjectMembers(
    request: ListProjectMembersRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListProjectMembersResponse) => void,
  ): ClientUnaryCall;
  listProjectMembers(
    request: ListProjectMembersRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListProjectMembersResponse) => void,
  ): ClientUnaryCall;
  getProjectMember(
    request: GetProjectMemberRequest,
    callback: (error: ServiceError | null, response: GetProjectMemberResponse) => void,
  ): ClientUnaryCall;
  getProjectMember(
    request: GetProjectMemberRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetProjectMemberResponse) => void,
  ): ClientUnaryCall;
  getProjectMember(
    request: GetProjectMemberRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetProjectMemberResponse) => void,
  ): ClientUnaryCall;
  createProjectMember(
    request: CreateProjectMemberRequest,
    callback: (error: ServiceError | null, response: CreateProjectMemberResponse) => void,
  ): ClientUnaryCall;
  createProjectMember(
    request: CreateProjectMemberRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateProjectMemberResponse) => void,
  ): ClientUnaryCall;
  createProjectMember(
    request: CreateProjectMemberRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateProjectMemberResponse) => void,
  ): ClientUnaryCall;
  deleteProjectMember(
    request: DeleteProjectMemberRequest,
    callback: (error: ServiceError | null, response: DeleteProjectMemberResponse) => void,
  ): ClientUnaryCall;
  deleteProjectMember(
    request: DeleteProjectMemberRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteProjectMemberResponse) => void,
  ): ClientUnaryCall;
  deleteProjectMember(
    request: DeleteProjectMemberRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteProjectMemberResponse) => void,
  ): ClientUnaryCall;
  updateProjectMember(
    request: UpdateProjectMemberRequest,
    callback: (error: ServiceError | null, response: UpdateProjectMemberResponse) => void,
  ): ClientUnaryCall;
  updateProjectMember(
    request: UpdateProjectMemberRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateProjectMemberResponse) => void,
  ): ClientUnaryCall;
  updateProjectMember(
    request: UpdateProjectMemberRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateProjectMemberResponse) => void,
  ): ClientUnaryCall;
}

export const ProjectMemberServiceClient = makeGenericClientConstructor(
  ProjectMemberServiceService,
  "ea.ProjectMemberService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): ProjectMemberServiceClient;
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
