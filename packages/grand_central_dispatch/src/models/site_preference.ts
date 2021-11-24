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

export interface SitePreference {
  id: string;
  userId: string;
  isOptInMarketing: boolean;
  isOptInUsageStatistics: boolean;
  isOptInExperimental: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListSitePreferencesRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListSitePreferencesResponse {
  success: boolean;
  sitePreferences: SitePreference[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetSitePreferenceRequest {
  sitePreferenceId: string;
}

export interface GetSitePreferenceResponse {
  success: boolean;
  message: string | undefined;
  sitePreference?: SitePreference | undefined;
}

export interface CreateSitePreferenceRequest {
  requestId: string;
  userId: string;
  isOptInMarketing: boolean;
  isOptInUsageStatistics: boolean;
  isOptInExperimental: boolean;
}

export interface CreateSitePreferenceResponse {
  success: boolean;
  message: string | undefined;
  sitePreference?: SitePreference | undefined;
}

export interface DeleteSitePreferenceRequest {
  requestId: string;
  sitePreferenceId: string;
}

export interface DeleteSitePreferenceResponse {
  success: boolean;
  message: string | undefined;
  sitePreference?: SitePreference | undefined;
}

export interface UpdateSitePreferenceRequest {
  requestId: string;
  sitePreferenceId: string;
  userId?: string | undefined;
  isOptInMarketing?: boolean | undefined;
  isOptInUsageStatistics?: boolean | undefined;
  isOptInExperimental?: boolean | undefined;
}

export interface UpdateSitePreferenceResponse {
  success: boolean;
  message: string | undefined;
  sitePreference?: SitePreference | undefined;
}

const baseSitePreference: object = {
  id: "",
  userId: "",
  isOptInMarketing: false,
  isOptInUsageStatistics: false,
  isOptInExperimental: false,
};

export const SitePreference = {
  encode(message: SitePreference, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.isOptInMarketing === true) {
      writer.uint32(24).bool(message.isOptInMarketing);
    }
    if (message.isOptInUsageStatistics === true) {
      writer.uint32(32).bool(message.isOptInUsageStatistics);
    }
    if (message.isOptInExperimental === true) {
      writer.uint32(40).bool(message.isOptInExperimental);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SitePreference {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSitePreference } as SitePreference;
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
          message.isOptInMarketing = reader.bool();
          break;
        case 4:
          message.isOptInUsageStatistics = reader.bool();
          break;
        case 5:
          message.isOptInExperimental = reader.bool();
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

  fromJSON(object: any): SitePreference {
    const message = { ...baseSitePreference } as SitePreference;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.isOptInMarketing =
      object.isOptInMarketing !== undefined && object.isOptInMarketing !== null
        ? Boolean(object.isOptInMarketing)
        : false;
    message.isOptInUsageStatistics =
      object.isOptInUsageStatistics !== undefined &&
      object.isOptInUsageStatistics !== null
        ? Boolean(object.isOptInUsageStatistics)
        : false;
    message.isOptInExperimental =
      object.isOptInExperimental !== undefined && object.isOptInExperimental !== null
        ? Boolean(object.isOptInExperimental)
        : false;
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

  toJSON(message: SitePreference): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.userId !== undefined && (obj.userId = message.userId);
    message.isOptInMarketing !== undefined &&
      (obj.isOptInMarketing = message.isOptInMarketing);
    message.isOptInUsageStatistics !== undefined &&
      (obj.isOptInUsageStatistics = message.isOptInUsageStatistics);
    message.isOptInExperimental !== undefined &&
      (obj.isOptInExperimental = message.isOptInExperimental);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<SitePreference>): SitePreference {
    const message = { ...baseSitePreference } as SitePreference;
    message.id = object.id ?? "";
    message.userId = object.userId ?? "";
    message.isOptInMarketing = object.isOptInMarketing ?? false;
    message.isOptInUsageStatistics = object.isOptInUsageStatistics ?? false;
    message.isOptInExperimental = object.isOptInExperimental ?? false;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListSitePreferencesRequest: object = { pageSize: 0, pageToken: "" };

export const ListSitePreferencesRequest = {
  encode(
    message: ListSitePreferencesRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSitePreferencesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListSitePreferencesRequest } as ListSitePreferencesRequest;
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

  fromJSON(object: any): ListSitePreferencesRequest {
    const message = { ...baseListSitePreferencesRequest } as ListSitePreferencesRequest;
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

  toJSON(message: ListSitePreferencesRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListSitePreferencesRequest>,
  ): ListSitePreferencesRequest {
    const message = { ...baseListSitePreferencesRequest } as ListSitePreferencesRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListSitePreferencesResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListSitePreferencesResponse = {
  encode(
    message: ListSitePreferencesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.sitePreferences) {
      SitePreference.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListSitePreferencesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListSitePreferencesResponse } as ListSitePreferencesResponse;
    message.sitePreferences = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.sitePreferences.push(SitePreference.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListSitePreferencesResponse {
    const message = { ...baseListSitePreferencesResponse } as ListSitePreferencesResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.sitePreferences = (object.sitePreferences ?? []).map((e: any) =>
      SitePreference.fromJSON(e),
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

  toJSON(message: ListSitePreferencesResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.sitePreferences) {
      obj.sitePreferences = message.sitePreferences.map((e) =>
        e ? SitePreference.toJSON(e) : undefined,
      );
    } else {
      obj.sitePreferences = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListSitePreferencesResponse>,
  ): ListSitePreferencesResponse {
    const message = { ...baseListSitePreferencesResponse } as ListSitePreferencesResponse;
    message.success = object.success ?? false;
    message.sitePreferences = (object.sitePreferences ?? []).map((e) =>
      SitePreference.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetSitePreferenceRequest: object = { sitePreferenceId: "" };

export const GetSitePreferenceRequest = {
  encode(
    message: GetSitePreferenceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sitePreferenceId !== "") {
      writer.uint32(10).string(message.sitePreferenceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSitePreferenceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetSitePreferenceRequest } as GetSitePreferenceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sitePreferenceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSitePreferenceRequest {
    const message = { ...baseGetSitePreferenceRequest } as GetSitePreferenceRequest;
    message.sitePreferenceId =
      object.sitePreferenceId !== undefined && object.sitePreferenceId !== null
        ? String(object.sitePreferenceId)
        : "";
    return message;
  },

  toJSON(message: GetSitePreferenceRequest): unknown {
    const obj: any = {};
    message.sitePreferenceId !== undefined &&
      (obj.sitePreferenceId = message.sitePreferenceId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetSitePreferenceRequest>): GetSitePreferenceRequest {
    const message = { ...baseGetSitePreferenceRequest } as GetSitePreferenceRequest;
    message.sitePreferenceId = object.sitePreferenceId ?? "";
    return message;
  },
};

const baseGetSitePreferenceResponse: object = { success: false };

export const GetSitePreferenceResponse = {
  encode(
    message: GetSitePreferenceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.sitePreference !== undefined) {
      SitePreference.encode(message.sitePreference, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSitePreferenceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetSitePreferenceResponse } as GetSitePreferenceResponse;
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
          message.sitePreference = SitePreference.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSitePreferenceResponse {
    const message = { ...baseGetSitePreferenceResponse } as GetSitePreferenceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.sitePreference =
      object.sitePreference !== undefined && object.sitePreference !== null
        ? SitePreference.fromJSON(object.sitePreference)
        : undefined;
    return message;
  },

  toJSON(message: GetSitePreferenceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.sitePreference !== undefined &&
      (obj.sitePreference = message.sitePreference
        ? SitePreference.toJSON(message.sitePreference)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetSitePreferenceResponse>): GetSitePreferenceResponse {
    const message = { ...baseGetSitePreferenceResponse } as GetSitePreferenceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.sitePreference =
      object.sitePreference !== undefined && object.sitePreference !== null
        ? SitePreference.fromPartial(object.sitePreference)
        : undefined;
    return message;
  },
};

const baseCreateSitePreferenceRequest: object = {
  requestId: "",
  userId: "",
  isOptInMarketing: false,
  isOptInUsageStatistics: false,
  isOptInExperimental: false,
};

export const CreateSitePreferenceRequest = {
  encode(
    message: CreateSitePreferenceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.isOptInMarketing === true) {
      writer.uint32(24).bool(message.isOptInMarketing);
    }
    if (message.isOptInUsageStatistics === true) {
      writer.uint32(32).bool(message.isOptInUsageStatistics);
    }
    if (message.isOptInExperimental === true) {
      writer.uint32(40).bool(message.isOptInExperimental);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSitePreferenceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateSitePreferenceRequest } as CreateSitePreferenceRequest;
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
          message.isOptInMarketing = reader.bool();
          break;
        case 4:
          message.isOptInUsageStatistics = reader.bool();
          break;
        case 5:
          message.isOptInExperimental = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateSitePreferenceRequest {
    const message = { ...baseCreateSitePreferenceRequest } as CreateSitePreferenceRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.isOptInMarketing =
      object.isOptInMarketing !== undefined && object.isOptInMarketing !== null
        ? Boolean(object.isOptInMarketing)
        : false;
    message.isOptInUsageStatistics =
      object.isOptInUsageStatistics !== undefined &&
      object.isOptInUsageStatistics !== null
        ? Boolean(object.isOptInUsageStatistics)
        : false;
    message.isOptInExperimental =
      object.isOptInExperimental !== undefined && object.isOptInExperimental !== null
        ? Boolean(object.isOptInExperimental)
        : false;
    return message;
  },

  toJSON(message: CreateSitePreferenceRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.isOptInMarketing !== undefined &&
      (obj.isOptInMarketing = message.isOptInMarketing);
    message.isOptInUsageStatistics !== undefined &&
      (obj.isOptInUsageStatistics = message.isOptInUsageStatistics);
    message.isOptInExperimental !== undefined &&
      (obj.isOptInExperimental = message.isOptInExperimental);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateSitePreferenceRequest>,
  ): CreateSitePreferenceRequest {
    const message = { ...baseCreateSitePreferenceRequest } as CreateSitePreferenceRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    message.isOptInMarketing = object.isOptInMarketing ?? false;
    message.isOptInUsageStatistics = object.isOptInUsageStatistics ?? false;
    message.isOptInExperimental = object.isOptInExperimental ?? false;
    return message;
  },
};

const baseCreateSitePreferenceResponse: object = { success: false };

export const CreateSitePreferenceResponse = {
  encode(
    message: CreateSitePreferenceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.sitePreference !== undefined) {
      SitePreference.encode(message.sitePreference, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateSitePreferenceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseCreateSitePreferenceResponse,
    } as CreateSitePreferenceResponse;
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
          message.sitePreference = SitePreference.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateSitePreferenceResponse {
    const message = {
      ...baseCreateSitePreferenceResponse,
    } as CreateSitePreferenceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.sitePreference =
      object.sitePreference !== undefined && object.sitePreference !== null
        ? SitePreference.fromJSON(object.sitePreference)
        : undefined;
    return message;
  },

  toJSON(message: CreateSitePreferenceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.sitePreference !== undefined &&
      (obj.sitePreference = message.sitePreference
        ? SitePreference.toJSON(message.sitePreference)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateSitePreferenceResponse>,
  ): CreateSitePreferenceResponse {
    const message = {
      ...baseCreateSitePreferenceResponse,
    } as CreateSitePreferenceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.sitePreference =
      object.sitePreference !== undefined && object.sitePreference !== null
        ? SitePreference.fromPartial(object.sitePreference)
        : undefined;
    return message;
  },
};

const baseDeleteSitePreferenceRequest: object = { requestId: "", sitePreferenceId: "" };

export const DeleteSitePreferenceRequest = {
  encode(
    message: DeleteSitePreferenceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.sitePreferenceId !== "") {
      writer.uint32(10).string(message.sitePreferenceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteSitePreferenceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteSitePreferenceRequest } as DeleteSitePreferenceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.sitePreferenceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteSitePreferenceRequest {
    const message = { ...baseDeleteSitePreferenceRequest } as DeleteSitePreferenceRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.sitePreferenceId =
      object.sitePreferenceId !== undefined && object.sitePreferenceId !== null
        ? String(object.sitePreferenceId)
        : "";
    return message;
  },

  toJSON(message: DeleteSitePreferenceRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.sitePreferenceId !== undefined &&
      (obj.sitePreferenceId = message.sitePreferenceId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteSitePreferenceRequest>,
  ): DeleteSitePreferenceRequest {
    const message = { ...baseDeleteSitePreferenceRequest } as DeleteSitePreferenceRequest;
    message.requestId = object.requestId ?? "";
    message.sitePreferenceId = object.sitePreferenceId ?? "";
    return message;
  },
};

const baseDeleteSitePreferenceResponse: object = { success: false };

export const DeleteSitePreferenceResponse = {
  encode(
    message: DeleteSitePreferenceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.sitePreference !== undefined) {
      SitePreference.encode(message.sitePreference, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteSitePreferenceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteSitePreferenceResponse,
    } as DeleteSitePreferenceResponse;
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
          message.sitePreference = SitePreference.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteSitePreferenceResponse {
    const message = {
      ...baseDeleteSitePreferenceResponse,
    } as DeleteSitePreferenceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.sitePreference =
      object.sitePreference !== undefined && object.sitePreference !== null
        ? SitePreference.fromJSON(object.sitePreference)
        : undefined;
    return message;
  },

  toJSON(message: DeleteSitePreferenceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.sitePreference !== undefined &&
      (obj.sitePreference = message.sitePreference
        ? SitePreference.toJSON(message.sitePreference)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteSitePreferenceResponse>,
  ): DeleteSitePreferenceResponse {
    const message = {
      ...baseDeleteSitePreferenceResponse,
    } as DeleteSitePreferenceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.sitePreference =
      object.sitePreference !== undefined && object.sitePreference !== null
        ? SitePreference.fromPartial(object.sitePreference)
        : undefined;
    return message;
  },
};

const baseUpdateSitePreferenceRequest: object = { requestId: "", sitePreferenceId: "" };

export const UpdateSitePreferenceRequest = {
  encode(
    message: UpdateSitePreferenceRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.sitePreferenceId !== "") {
      writer.uint32(10).string(message.sitePreferenceId);
    }
    if (message.userId !== undefined) {
      writer.uint32(18).string(message.userId);
    }
    if (message.isOptInMarketing !== undefined) {
      writer.uint32(24).bool(message.isOptInMarketing);
    }
    if (message.isOptInUsageStatistics !== undefined) {
      writer.uint32(32).bool(message.isOptInUsageStatistics);
    }
    if (message.isOptInExperimental !== undefined) {
      writer.uint32(40).bool(message.isOptInExperimental);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateSitePreferenceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateSitePreferenceRequest } as UpdateSitePreferenceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.sitePreferenceId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.isOptInMarketing = reader.bool();
          break;
        case 4:
          message.isOptInUsageStatistics = reader.bool();
          break;
        case 5:
          message.isOptInExperimental = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateSitePreferenceRequest {
    const message = { ...baseUpdateSitePreferenceRequest } as UpdateSitePreferenceRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.sitePreferenceId =
      object.sitePreferenceId !== undefined && object.sitePreferenceId !== null
        ? String(object.sitePreferenceId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : undefined;
    message.isOptInMarketing =
      object.isOptInMarketing !== undefined && object.isOptInMarketing !== null
        ? Boolean(object.isOptInMarketing)
        : undefined;
    message.isOptInUsageStatistics =
      object.isOptInUsageStatistics !== undefined &&
      object.isOptInUsageStatistics !== null
        ? Boolean(object.isOptInUsageStatistics)
        : undefined;
    message.isOptInExperimental =
      object.isOptInExperimental !== undefined && object.isOptInExperimental !== null
        ? Boolean(object.isOptInExperimental)
        : undefined;
    return message;
  },

  toJSON(message: UpdateSitePreferenceRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.sitePreferenceId !== undefined &&
      (obj.sitePreferenceId = message.sitePreferenceId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.isOptInMarketing !== undefined &&
      (obj.isOptInMarketing = message.isOptInMarketing);
    message.isOptInUsageStatistics !== undefined &&
      (obj.isOptInUsageStatistics = message.isOptInUsageStatistics);
    message.isOptInExperimental !== undefined &&
      (obj.isOptInExperimental = message.isOptInExperimental);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateSitePreferenceRequest>,
  ): UpdateSitePreferenceRequest {
    const message = { ...baseUpdateSitePreferenceRequest } as UpdateSitePreferenceRequest;
    message.requestId = object.requestId ?? "";
    message.sitePreferenceId = object.sitePreferenceId ?? "";
    message.userId = object.userId ?? undefined;
    message.isOptInMarketing = object.isOptInMarketing ?? undefined;
    message.isOptInUsageStatistics = object.isOptInUsageStatistics ?? undefined;
    message.isOptInExperimental = object.isOptInExperimental ?? undefined;
    return message;
  },
};

const baseUpdateSitePreferenceResponse: object = { success: false };

export const UpdateSitePreferenceResponse = {
  encode(
    message: UpdateSitePreferenceResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.sitePreference !== undefined) {
      SitePreference.encode(message.sitePreference, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateSitePreferenceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateSitePreferenceResponse,
    } as UpdateSitePreferenceResponse;
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
          message.sitePreference = SitePreference.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateSitePreferenceResponse {
    const message = {
      ...baseUpdateSitePreferenceResponse,
    } as UpdateSitePreferenceResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.sitePreference =
      object.sitePreference !== undefined && object.sitePreference !== null
        ? SitePreference.fromJSON(object.sitePreference)
        : undefined;
    return message;
  },

  toJSON(message: UpdateSitePreferenceResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.sitePreference !== undefined &&
      (obj.sitePreference = message.sitePreference
        ? SitePreference.toJSON(message.sitePreference)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateSitePreferenceResponse>,
  ): UpdateSitePreferenceResponse {
    const message = {
      ...baseUpdateSitePreferenceResponse,
    } as UpdateSitePreferenceResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.sitePreference =
      object.sitePreference !== undefined && object.sitePreference !== null
        ? SitePreference.fromPartial(object.sitePreference)
        : undefined;
    return message;
  },
};

export const SitePreferenceServiceService = {
  listSitePreferences: {
    path: "/ea.SitePreferenceService/ListSitePreferences",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListSitePreferencesRequest) =>
      Buffer.from(ListSitePreferencesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListSitePreferencesRequest.decode(value),
    responseSerialize: (value: ListSitePreferencesResponse) =>
      Buffer.from(ListSitePreferencesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListSitePreferencesResponse.decode(value),
  },
  getSitePreference: {
    path: "/ea.SitePreferenceService/GetSitePreference",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetSitePreferenceRequest) =>
      Buffer.from(GetSitePreferenceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetSitePreferenceRequest.decode(value),
    responseSerialize: (value: GetSitePreferenceResponse) =>
      Buffer.from(GetSitePreferenceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetSitePreferenceResponse.decode(value),
  },
  createSitePreference: {
    path: "/ea.SitePreferenceService/CreateSitePreference",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateSitePreferenceRequest) =>
      Buffer.from(CreateSitePreferenceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateSitePreferenceRequest.decode(value),
    responseSerialize: (value: CreateSitePreferenceResponse) =>
      Buffer.from(CreateSitePreferenceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateSitePreferenceResponse.decode(value),
  },
  deleteSitePreference: {
    path: "/ea.SitePreferenceService/DeleteSitePreference",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteSitePreferenceRequest) =>
      Buffer.from(DeleteSitePreferenceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteSitePreferenceRequest.decode(value),
    responseSerialize: (value: DeleteSitePreferenceResponse) =>
      Buffer.from(DeleteSitePreferenceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteSitePreferenceResponse.decode(value),
  },
  updateSitePreference: {
    path: "/ea.SitePreferenceService/UpdateSitePreference",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateSitePreferenceRequest) =>
      Buffer.from(UpdateSitePreferenceRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateSitePreferenceRequest.decode(value),
    responseSerialize: (value: UpdateSitePreferenceResponse) =>
      Buffer.from(UpdateSitePreferenceResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateSitePreferenceResponse.decode(value),
  },
} as const;

export interface SitePreferenceServiceServer extends UntypedServiceImplementation {
  listSitePreferences: handleUnaryCall<
    ListSitePreferencesRequest,
    ListSitePreferencesResponse
  >;
  getSitePreference: handleUnaryCall<GetSitePreferenceRequest, GetSitePreferenceResponse>;
  createSitePreference: handleUnaryCall<
    CreateSitePreferenceRequest,
    CreateSitePreferenceResponse
  >;
  deleteSitePreference: handleUnaryCall<
    DeleteSitePreferenceRequest,
    DeleteSitePreferenceResponse
  >;
  updateSitePreference: handleUnaryCall<
    UpdateSitePreferenceRequest,
    UpdateSitePreferenceResponse
  >;
}

export interface SitePreferenceServiceClient extends Client {
  listSitePreferences(
    request: ListSitePreferencesRequest,
    callback: (error: ServiceError | null, response: ListSitePreferencesResponse) => void,
  ): ClientUnaryCall;
  listSitePreferences(
    request: ListSitePreferencesRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListSitePreferencesResponse) => void,
  ): ClientUnaryCall;
  listSitePreferences(
    request: ListSitePreferencesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListSitePreferencesResponse) => void,
  ): ClientUnaryCall;
  getSitePreference(
    request: GetSitePreferenceRequest,
    callback: (error: ServiceError | null, response: GetSitePreferenceResponse) => void,
  ): ClientUnaryCall;
  getSitePreference(
    request: GetSitePreferenceRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetSitePreferenceResponse) => void,
  ): ClientUnaryCall;
  getSitePreference(
    request: GetSitePreferenceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetSitePreferenceResponse) => void,
  ): ClientUnaryCall;
  createSitePreference(
    request: CreateSitePreferenceRequest,
    callback: (
      error: ServiceError | null,
      response: CreateSitePreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  createSitePreference(
    request: CreateSitePreferenceRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: CreateSitePreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  createSitePreference(
    request: CreateSitePreferenceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: CreateSitePreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteSitePreference(
    request: DeleteSitePreferenceRequest,
    callback: (
      error: ServiceError | null,
      response: DeleteSitePreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteSitePreference(
    request: DeleteSitePreferenceRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: DeleteSitePreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteSitePreference(
    request: DeleteSitePreferenceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: DeleteSitePreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  updateSitePreference(
    request: UpdateSitePreferenceRequest,
    callback: (
      error: ServiceError | null,
      response: UpdateSitePreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  updateSitePreference(
    request: UpdateSitePreferenceRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: UpdateSitePreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
  updateSitePreference(
    request: UpdateSitePreferenceRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: UpdateSitePreferenceResponse,
    ) => void,
  ): ClientUnaryCall;
}

export const SitePreferenceServiceClient = makeGenericClientConstructor(
  SitePreferenceServiceService,
  "ea.SitePreferenceService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): SitePreferenceServiceClient;
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
