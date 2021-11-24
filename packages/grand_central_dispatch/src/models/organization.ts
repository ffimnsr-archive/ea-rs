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

export interface Organization {
  id: string;
  name: string;
  description: string;
  managedById: string;
  createdById: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListOrganizationsRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListOrganizationsResponse {
  success: boolean;
  organizations: Organization[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetOrganizationRequest {
  organizationId: string;
}

export interface GetOrganizationResponse {
  success: boolean;
  message: string | undefined;
  organization?: Organization | undefined;
}

export interface CreateOrganizationRequest {
  requestId: string;
  name: string;
  description: string;
  managedById: string;
  createdById: string;
}

export interface CreateOrganizationResponse {
  success: boolean;
  message: string | undefined;
  organization?: Organization | undefined;
}

export interface DeleteOrganizationRequest {
  requestId: string;
  organizationId: string;
}

export interface DeleteOrganizationResponse {
  success: boolean;
  message: string | undefined;
  organization?: Organization | undefined;
}

export interface UpdateOrganizationRequest {
  requestId: string;
  organizationId: string;
  name?: string | undefined;
  description?: string | undefined;
  managedById?: string | undefined;
  createdById?: string | undefined;
}

export interface UpdateOrganizationResponse {
  success: boolean;
  message: string | undefined;
  organization?: Organization | undefined;
}

const baseOrganization: object = {
  id: "",
  name: "",
  description: "",
  managedById: "",
  createdById: "",
};

export const Organization = {
  encode(message: Organization, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.managedById !== "") {
      writer.uint32(34).string(message.managedById);
    }
    if (message.createdById !== "") {
      writer.uint32(42).string(message.createdById);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Organization {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOrganization } as Organization;
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
        case 4:
          message.managedById = reader.string();
          break;
        case 5:
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

  fromJSON(object: any): Organization {
    const message = { ...baseOrganization } as Organization;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : "";
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
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

  toJSON(message: Organization): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.managedById !== undefined && (obj.managedById = message.managedById);
    message.createdById !== undefined && (obj.createdById = message.createdById);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Organization>): Organization {
    const message = { ...baseOrganization } as Organization;
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.managedById = object.managedById ?? "";
    message.createdById = object.createdById ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListOrganizationsRequest: object = { pageSize: 0, pageToken: "" };

export const ListOrganizationsRequest = {
  encode(
    message: ListOrganizationsRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOrganizationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListOrganizationsRequest } as ListOrganizationsRequest;
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

  fromJSON(object: any): ListOrganizationsRequest {
    const message = { ...baseListOrganizationsRequest } as ListOrganizationsRequest;
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

  toJSON(message: ListOrganizationsRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListOrganizationsRequest>): ListOrganizationsRequest {
    const message = { ...baseListOrganizationsRequest } as ListOrganizationsRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListOrganizationsResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListOrganizationsResponse = {
  encode(
    message: ListOrganizationsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.organizations) {
      Organization.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOrganizationsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListOrganizationsResponse } as ListOrganizationsResponse;
    message.organizations = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.organizations.push(Organization.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListOrganizationsResponse {
    const message = { ...baseListOrganizationsResponse } as ListOrganizationsResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.organizations = (object.organizations ?? []).map((e: any) =>
      Organization.fromJSON(e),
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

  toJSON(message: ListOrganizationsResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.organizations) {
      obj.organizations = message.organizations.map((e) =>
        e ? Organization.toJSON(e) : undefined,
      );
    } else {
      obj.organizations = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListOrganizationsResponse>): ListOrganizationsResponse {
    const message = { ...baseListOrganizationsResponse } as ListOrganizationsResponse;
    message.success = object.success ?? false;
    message.organizations = (object.organizations ?? []).map((e) =>
      Organization.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetOrganizationRequest: object = { organizationId: "" };

export const GetOrganizationRequest = {
  encode(
    message: GetOrganizationRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.organizationId !== "") {
      writer.uint32(10).string(message.organizationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOrganizationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetOrganizationRequest } as GetOrganizationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.organizationId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetOrganizationRequest {
    const message = { ...baseGetOrganizationRequest } as GetOrganizationRequest;
    message.organizationId =
      object.organizationId !== undefined && object.organizationId !== null
        ? String(object.organizationId)
        : "";
    return message;
  },

  toJSON(message: GetOrganizationRequest): unknown {
    const obj: any = {};
    message.organizationId !== undefined && (obj.organizationId = message.organizationId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetOrganizationRequest>): GetOrganizationRequest {
    const message = { ...baseGetOrganizationRequest } as GetOrganizationRequest;
    message.organizationId = object.organizationId ?? "";
    return message;
  },
};

const baseGetOrganizationResponse: object = { success: false };

export const GetOrganizationResponse = {
  encode(
    message: GetOrganizationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.organization !== undefined) {
      Organization.encode(message.organization, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOrganizationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetOrganizationResponse } as GetOrganizationResponse;
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
          message.organization = Organization.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetOrganizationResponse {
    const message = { ...baseGetOrganizationResponse } as GetOrganizationResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.organization =
      object.organization !== undefined && object.organization !== null
        ? Organization.fromJSON(object.organization)
        : undefined;
    return message;
  },

  toJSON(message: GetOrganizationResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.organization !== undefined &&
      (obj.organization = message.organization
        ? Organization.toJSON(message.organization)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetOrganizationResponse>): GetOrganizationResponse {
    const message = { ...baseGetOrganizationResponse } as GetOrganizationResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.organization =
      object.organization !== undefined && object.organization !== null
        ? Organization.fromPartial(object.organization)
        : undefined;
    return message;
  },
};

const baseCreateOrganizationRequest: object = {
  requestId: "",
  name: "",
  description: "",
  managedById: "",
  createdById: "",
};

export const CreateOrganizationRequest = {
  encode(
    message: CreateOrganizationRequest,
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
    if (message.managedById !== "") {
      writer.uint32(34).string(message.managedById);
    }
    if (message.createdById !== "") {
      writer.uint32(42).string(message.createdById);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOrganizationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateOrganizationRequest } as CreateOrganizationRequest;
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
        case 4:
          message.managedById = reader.string();
          break;
        case 5:
          message.createdById = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateOrganizationRequest {
    const message = { ...baseCreateOrganizationRequest } as CreateOrganizationRequest;
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

  toJSON(message: CreateOrganizationRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.managedById !== undefined && (obj.managedById = message.managedById);
    message.createdById !== undefined && (obj.createdById = message.createdById);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateOrganizationRequest>): CreateOrganizationRequest {
    const message = { ...baseCreateOrganizationRequest } as CreateOrganizationRequest;
    message.requestId = object.requestId ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.managedById = object.managedById ?? "";
    message.createdById = object.createdById ?? "";
    return message;
  },
};

const baseCreateOrganizationResponse: object = { success: false };

export const CreateOrganizationResponse = {
  encode(
    message: CreateOrganizationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.organization !== undefined) {
      Organization.encode(message.organization, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOrganizationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateOrganizationResponse } as CreateOrganizationResponse;
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
          message.organization = Organization.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateOrganizationResponse {
    const message = { ...baseCreateOrganizationResponse } as CreateOrganizationResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.organization =
      object.organization !== undefined && object.organization !== null
        ? Organization.fromJSON(object.organization)
        : undefined;
    return message;
  },

  toJSON(message: CreateOrganizationResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.organization !== undefined &&
      (obj.organization = message.organization
        ? Organization.toJSON(message.organization)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateOrganizationResponse>,
  ): CreateOrganizationResponse {
    const message = { ...baseCreateOrganizationResponse } as CreateOrganizationResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.organization =
      object.organization !== undefined && object.organization !== null
        ? Organization.fromPartial(object.organization)
        : undefined;
    return message;
  },
};

const baseDeleteOrganizationRequest: object = { requestId: "", organizationId: "" };

export const DeleteOrganizationRequest = {
  encode(
    message: DeleteOrganizationRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.organizationId !== "") {
      writer.uint32(10).string(message.organizationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOrganizationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteOrganizationRequest } as DeleteOrganizationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.organizationId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteOrganizationRequest {
    const message = { ...baseDeleteOrganizationRequest } as DeleteOrganizationRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.organizationId =
      object.organizationId !== undefined && object.organizationId !== null
        ? String(object.organizationId)
        : "";
    return message;
  },

  toJSON(message: DeleteOrganizationRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.organizationId !== undefined && (obj.organizationId = message.organizationId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteOrganizationRequest>): DeleteOrganizationRequest {
    const message = { ...baseDeleteOrganizationRequest } as DeleteOrganizationRequest;
    message.requestId = object.requestId ?? "";
    message.organizationId = object.organizationId ?? "";
    return message;
  },
};

const baseDeleteOrganizationResponse: object = { success: false };

export const DeleteOrganizationResponse = {
  encode(
    message: DeleteOrganizationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.organization !== undefined) {
      Organization.encode(message.organization, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOrganizationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteOrganizationResponse } as DeleteOrganizationResponse;
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
          message.organization = Organization.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteOrganizationResponse {
    const message = { ...baseDeleteOrganizationResponse } as DeleteOrganizationResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.organization =
      object.organization !== undefined && object.organization !== null
        ? Organization.fromJSON(object.organization)
        : undefined;
    return message;
  },

  toJSON(message: DeleteOrganizationResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.organization !== undefined &&
      (obj.organization = message.organization
        ? Organization.toJSON(message.organization)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteOrganizationResponse>,
  ): DeleteOrganizationResponse {
    const message = { ...baseDeleteOrganizationResponse } as DeleteOrganizationResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.organization =
      object.organization !== undefined && object.organization !== null
        ? Organization.fromPartial(object.organization)
        : undefined;
    return message;
  },
};

const baseUpdateOrganizationRequest: object = { requestId: "", organizationId: "" };

export const UpdateOrganizationRequest = {
  encode(
    message: UpdateOrganizationRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.organizationId !== "") {
      writer.uint32(10).string(message.organizationId);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.managedById !== undefined) {
      writer.uint32(34).string(message.managedById);
    }
    if (message.createdById !== undefined) {
      writer.uint32(42).string(message.createdById);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOrganizationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateOrganizationRequest } as UpdateOrganizationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.organizationId = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.managedById = reader.string();
          break;
        case 5:
          message.createdById = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateOrganizationRequest {
    const message = { ...baseUpdateOrganizationRequest } as UpdateOrganizationRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.organizationId =
      object.organizationId !== undefined && object.organizationId !== null
        ? String(object.organizationId)
        : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : undefined;
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
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

  toJSON(message: UpdateOrganizationRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.organizationId !== undefined && (obj.organizationId = message.organizationId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.managedById !== undefined && (obj.managedById = message.managedById);
    message.createdById !== undefined && (obj.createdById = message.createdById);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateOrganizationRequest>): UpdateOrganizationRequest {
    const message = { ...baseUpdateOrganizationRequest } as UpdateOrganizationRequest;
    message.requestId = object.requestId ?? "";
    message.organizationId = object.organizationId ?? "";
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    message.managedById = object.managedById ?? undefined;
    message.createdById = object.createdById ?? undefined;
    return message;
  },
};

const baseUpdateOrganizationResponse: object = { success: false };

export const UpdateOrganizationResponse = {
  encode(
    message: UpdateOrganizationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.organization !== undefined) {
      Organization.encode(message.organization, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOrganizationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateOrganizationResponse } as UpdateOrganizationResponse;
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
          message.organization = Organization.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateOrganizationResponse {
    const message = { ...baseUpdateOrganizationResponse } as UpdateOrganizationResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.organization =
      object.organization !== undefined && object.organization !== null
        ? Organization.fromJSON(object.organization)
        : undefined;
    return message;
  },

  toJSON(message: UpdateOrganizationResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.organization !== undefined &&
      (obj.organization = message.organization
        ? Organization.toJSON(message.organization)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateOrganizationResponse>,
  ): UpdateOrganizationResponse {
    const message = { ...baseUpdateOrganizationResponse } as UpdateOrganizationResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.organization =
      object.organization !== undefined && object.organization !== null
        ? Organization.fromPartial(object.organization)
        : undefined;
    return message;
  },
};

export const OrganizationServiceService = {
  listOrganizations: {
    path: "/ea.OrganizationService/ListOrganizations",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListOrganizationsRequest) =>
      Buffer.from(ListOrganizationsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListOrganizationsRequest.decode(value),
    responseSerialize: (value: ListOrganizationsResponse) =>
      Buffer.from(ListOrganizationsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListOrganizationsResponse.decode(value),
  },
  getOrganization: {
    path: "/ea.OrganizationService/GetOrganization",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetOrganizationRequest) =>
      Buffer.from(GetOrganizationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetOrganizationRequest.decode(value),
    responseSerialize: (value: GetOrganizationResponse) =>
      Buffer.from(GetOrganizationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetOrganizationResponse.decode(value),
  },
  createOrganization: {
    path: "/ea.OrganizationService/CreateOrganization",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateOrganizationRequest) =>
      Buffer.from(CreateOrganizationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateOrganizationRequest.decode(value),
    responseSerialize: (value: CreateOrganizationResponse) =>
      Buffer.from(CreateOrganizationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateOrganizationResponse.decode(value),
  },
  deleteOrganization: {
    path: "/ea.OrganizationService/DeleteOrganization",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteOrganizationRequest) =>
      Buffer.from(DeleteOrganizationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteOrganizationRequest.decode(value),
    responseSerialize: (value: DeleteOrganizationResponse) =>
      Buffer.from(DeleteOrganizationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteOrganizationResponse.decode(value),
  },
  updateOrganization: {
    path: "/ea.OrganizationService/UpdateOrganization",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateOrganizationRequest) =>
      Buffer.from(UpdateOrganizationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateOrganizationRequest.decode(value),
    responseSerialize: (value: UpdateOrganizationResponse) =>
      Buffer.from(UpdateOrganizationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateOrganizationResponse.decode(value),
  },
} as const;

export interface OrganizationServiceServer extends UntypedServiceImplementation {
  listOrganizations: handleUnaryCall<ListOrganizationsRequest, ListOrganizationsResponse>;
  getOrganization: handleUnaryCall<GetOrganizationRequest, GetOrganizationResponse>;
  createOrganization: handleUnaryCall<
    CreateOrganizationRequest,
    CreateOrganizationResponse
  >;
  deleteOrganization: handleUnaryCall<
    DeleteOrganizationRequest,
    DeleteOrganizationResponse
  >;
  updateOrganization: handleUnaryCall<
    UpdateOrganizationRequest,
    UpdateOrganizationResponse
  >;
}

export interface OrganizationServiceClient extends Client {
  listOrganizations(
    request: ListOrganizationsRequest,
    callback: (error: ServiceError | null, response: ListOrganizationsResponse) => void,
  ): ClientUnaryCall;
  listOrganizations(
    request: ListOrganizationsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListOrganizationsResponse) => void,
  ): ClientUnaryCall;
  listOrganizations(
    request: ListOrganizationsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListOrganizationsResponse) => void,
  ): ClientUnaryCall;
  getOrganization(
    request: GetOrganizationRequest,
    callback: (error: ServiceError | null, response: GetOrganizationResponse) => void,
  ): ClientUnaryCall;
  getOrganization(
    request: GetOrganizationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetOrganizationResponse) => void,
  ): ClientUnaryCall;
  getOrganization(
    request: GetOrganizationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetOrganizationResponse) => void,
  ): ClientUnaryCall;
  createOrganization(
    request: CreateOrganizationRequest,
    callback: (error: ServiceError | null, response: CreateOrganizationResponse) => void,
  ): ClientUnaryCall;
  createOrganization(
    request: CreateOrganizationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateOrganizationResponse) => void,
  ): ClientUnaryCall;
  createOrganization(
    request: CreateOrganizationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateOrganizationResponse) => void,
  ): ClientUnaryCall;
  deleteOrganization(
    request: DeleteOrganizationRequest,
    callback: (error: ServiceError | null, response: DeleteOrganizationResponse) => void,
  ): ClientUnaryCall;
  deleteOrganization(
    request: DeleteOrganizationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteOrganizationResponse) => void,
  ): ClientUnaryCall;
  deleteOrganization(
    request: DeleteOrganizationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteOrganizationResponse) => void,
  ): ClientUnaryCall;
  updateOrganization(
    request: UpdateOrganizationRequest,
    callback: (error: ServiceError | null, response: UpdateOrganizationResponse) => void,
  ): ClientUnaryCall;
  updateOrganization(
    request: UpdateOrganizationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateOrganizationResponse) => void,
  ): ClientUnaryCall;
  updateOrganization(
    request: UpdateOrganizationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateOrganizationResponse) => void,
  ): ClientUnaryCall;
}

export const OrganizationServiceClient = makeGenericClientConstructor(
  OrganizationServiceService,
  "ea.OrganizationService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): OrganizationServiceClient;
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
