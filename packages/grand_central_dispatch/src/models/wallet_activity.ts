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
import { BigDecimal } from "./num_types";
import { Timestamp } from "./google/protobuf/timestamp";

export interface WalletActivity {
  id: string;
  walletId: string;
  publicRef: string;
  newBalance?: BigDecimal;
  prevBalance?: BigDecimal;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListWalletActivitiesRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListWalletActivitiesResponse {
  success: boolean;
  walletActivities: WalletActivity[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetWalletActivityRequest {
  walletActivityId: string;
}

export interface GetWalletActivityResponse {
  success: boolean;
  message: string | undefined;
  walletActivity?: WalletActivity | undefined;
}

export interface CreateWalletActivityRequest {
  requestId: string;
  walletId: string;
  publicRef: string;
  newBalance?: BigDecimal;
  prevBalance?: BigDecimal;
}

export interface CreateWalletActivityResponse {
  success: boolean;
  message: string | undefined;
  walletActivity?: WalletActivity | undefined;
}

export interface DeleteWalletActivityRequest {
  requestId: string;
  walletActivityId: string;
}

export interface DeleteWalletActivityResponse {
  success: boolean;
  message: string | undefined;
  walletActivity?: WalletActivity | undefined;
}

export interface UpdateWalletActivityRequest {
  requestId: string;
  walletActivityId: string;
  walletId?: string | undefined;
  publicRef?: string | undefined;
  newBalance?: BigDecimal | undefined;
  prevBalance?: BigDecimal | undefined;
}

export interface UpdateWalletActivityResponse {
  success: boolean;
  message: string | undefined;
  walletActivity?: WalletActivity | undefined;
}

const baseWalletActivity: object = { id: "", walletId: "", publicRef: "" };

export const WalletActivity = {
  encode(message: WalletActivity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.walletId !== "") {
      writer.uint32(18).string(message.walletId);
    }
    if (message.publicRef !== "") {
      writer.uint32(26).string(message.publicRef);
    }
    if (message.newBalance !== undefined) {
      BigDecimal.encode(message.newBalance, writer.uint32(34).fork()).ldelim();
    }
    if (message.prevBalance !== undefined) {
      BigDecimal.encode(message.prevBalance, writer.uint32(42).fork()).ldelim();
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WalletActivity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWalletActivity } as WalletActivity;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.walletId = reader.string();
          break;
        case 3:
          message.publicRef = reader.string();
          break;
        case 4:
          message.newBalance = BigDecimal.decode(reader, reader.uint32());
          break;
        case 5:
          message.prevBalance = BigDecimal.decode(reader, reader.uint32());
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

  fromJSON(object: any): WalletActivity {
    const message = { ...baseWalletActivity } as WalletActivity;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.walletId =
      object.walletId !== undefined && object.walletId !== null
        ? String(object.walletId)
        : "";
    message.publicRef =
      object.publicRef !== undefined && object.publicRef !== null
        ? String(object.publicRef)
        : "";
    message.newBalance =
      object.newBalance !== undefined && object.newBalance !== null
        ? BigDecimal.fromJSON(object.newBalance)
        : undefined;
    message.prevBalance =
      object.prevBalance !== undefined && object.prevBalance !== null
        ? BigDecimal.fromJSON(object.prevBalance)
        : undefined;
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

  toJSON(message: WalletActivity): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.walletId !== undefined && (obj.walletId = message.walletId);
    message.publicRef !== undefined && (obj.publicRef = message.publicRef);
    message.newBalance !== undefined &&
      (obj.newBalance = message.newBalance
        ? BigDecimal.toJSON(message.newBalance)
        : undefined);
    message.prevBalance !== undefined &&
      (obj.prevBalance = message.prevBalance
        ? BigDecimal.toJSON(message.prevBalance)
        : undefined);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<WalletActivity>): WalletActivity {
    const message = { ...baseWalletActivity } as WalletActivity;
    message.id = object.id ?? "";
    message.walletId = object.walletId ?? "";
    message.publicRef = object.publicRef ?? "";
    message.newBalance =
      object.newBalance !== undefined && object.newBalance !== null
        ? BigDecimal.fromPartial(object.newBalance)
        : undefined;
    message.prevBalance =
      object.prevBalance !== undefined && object.prevBalance !== null
        ? BigDecimal.fromPartial(object.prevBalance)
        : undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListWalletActivitiesRequest: object = { pageSize: 0, pageToken: "" };

export const ListWalletActivitiesRequest = {
  encode(
    message: ListWalletActivitiesRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWalletActivitiesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListWalletActivitiesRequest } as ListWalletActivitiesRequest;
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

  fromJSON(object: any): ListWalletActivitiesRequest {
    const message = { ...baseListWalletActivitiesRequest } as ListWalletActivitiesRequest;
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

  toJSON(message: ListWalletActivitiesRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListWalletActivitiesRequest>,
  ): ListWalletActivitiesRequest {
    const message = { ...baseListWalletActivitiesRequest } as ListWalletActivitiesRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListWalletActivitiesResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListWalletActivitiesResponse = {
  encode(
    message: ListWalletActivitiesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.walletActivities) {
      WalletActivity.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWalletActivitiesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseListWalletActivitiesResponse,
    } as ListWalletActivitiesResponse;
    message.walletActivities = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.walletActivities.push(WalletActivity.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListWalletActivitiesResponse {
    const message = {
      ...baseListWalletActivitiesResponse,
    } as ListWalletActivitiesResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.walletActivities = (object.walletActivities ?? []).map((e: any) =>
      WalletActivity.fromJSON(e),
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

  toJSON(message: ListWalletActivitiesResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.walletActivities) {
      obj.walletActivities = message.walletActivities.map((e) =>
        e ? WalletActivity.toJSON(e) : undefined,
      );
    } else {
      obj.walletActivities = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ListWalletActivitiesResponse>,
  ): ListWalletActivitiesResponse {
    const message = {
      ...baseListWalletActivitiesResponse,
    } as ListWalletActivitiesResponse;
    message.success = object.success ?? false;
    message.walletActivities = (object.walletActivities ?? []).map((e) =>
      WalletActivity.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetWalletActivityRequest: object = { walletActivityId: "" };

export const GetWalletActivityRequest = {
  encode(
    message: GetWalletActivityRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.walletActivityId !== "") {
      writer.uint32(10).string(message.walletActivityId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWalletActivityRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWalletActivityRequest } as GetWalletActivityRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.walletActivityId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWalletActivityRequest {
    const message = { ...baseGetWalletActivityRequest } as GetWalletActivityRequest;
    message.walletActivityId =
      object.walletActivityId !== undefined && object.walletActivityId !== null
        ? String(object.walletActivityId)
        : "";
    return message;
  },

  toJSON(message: GetWalletActivityRequest): unknown {
    const obj: any = {};
    message.walletActivityId !== undefined &&
      (obj.walletActivityId = message.walletActivityId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWalletActivityRequest>): GetWalletActivityRequest {
    const message = { ...baseGetWalletActivityRequest } as GetWalletActivityRequest;
    message.walletActivityId = object.walletActivityId ?? "";
    return message;
  },
};

const baseGetWalletActivityResponse: object = { success: false };

export const GetWalletActivityResponse = {
  encode(
    message: GetWalletActivityResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.walletActivity !== undefined) {
      WalletActivity.encode(message.walletActivity, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWalletActivityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWalletActivityResponse } as GetWalletActivityResponse;
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
          message.walletActivity = WalletActivity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWalletActivityResponse {
    const message = { ...baseGetWalletActivityResponse } as GetWalletActivityResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.walletActivity =
      object.walletActivity !== undefined && object.walletActivity !== null
        ? WalletActivity.fromJSON(object.walletActivity)
        : undefined;
    return message;
  },

  toJSON(message: GetWalletActivityResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.walletActivity !== undefined &&
      (obj.walletActivity = message.walletActivity
        ? WalletActivity.toJSON(message.walletActivity)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWalletActivityResponse>): GetWalletActivityResponse {
    const message = { ...baseGetWalletActivityResponse } as GetWalletActivityResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.walletActivity =
      object.walletActivity !== undefined && object.walletActivity !== null
        ? WalletActivity.fromPartial(object.walletActivity)
        : undefined;
    return message;
  },
};

const baseCreateWalletActivityRequest: object = {
  requestId: "",
  walletId: "",
  publicRef: "",
};

export const CreateWalletActivityRequest = {
  encode(
    message: CreateWalletActivityRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.walletId !== "") {
      writer.uint32(18).string(message.walletId);
    }
    if (message.publicRef !== "") {
      writer.uint32(26).string(message.publicRef);
    }
    if (message.newBalance !== undefined) {
      BigDecimal.encode(message.newBalance, writer.uint32(34).fork()).ldelim();
    }
    if (message.prevBalance !== undefined) {
      BigDecimal.encode(message.prevBalance, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWalletActivityRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateWalletActivityRequest } as CreateWalletActivityRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 2:
          message.walletId = reader.string();
          break;
        case 3:
          message.publicRef = reader.string();
          break;
        case 4:
          message.newBalance = BigDecimal.decode(reader, reader.uint32());
          break;
        case 5:
          message.prevBalance = BigDecimal.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWalletActivityRequest {
    const message = { ...baseCreateWalletActivityRequest } as CreateWalletActivityRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.walletId =
      object.walletId !== undefined && object.walletId !== null
        ? String(object.walletId)
        : "";
    message.publicRef =
      object.publicRef !== undefined && object.publicRef !== null
        ? String(object.publicRef)
        : "";
    message.newBalance =
      object.newBalance !== undefined && object.newBalance !== null
        ? BigDecimal.fromJSON(object.newBalance)
        : undefined;
    message.prevBalance =
      object.prevBalance !== undefined && object.prevBalance !== null
        ? BigDecimal.fromJSON(object.prevBalance)
        : undefined;
    return message;
  },

  toJSON(message: CreateWalletActivityRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.walletId !== undefined && (obj.walletId = message.walletId);
    message.publicRef !== undefined && (obj.publicRef = message.publicRef);
    message.newBalance !== undefined &&
      (obj.newBalance = message.newBalance
        ? BigDecimal.toJSON(message.newBalance)
        : undefined);
    message.prevBalance !== undefined &&
      (obj.prevBalance = message.prevBalance
        ? BigDecimal.toJSON(message.prevBalance)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateWalletActivityRequest>,
  ): CreateWalletActivityRequest {
    const message = { ...baseCreateWalletActivityRequest } as CreateWalletActivityRequest;
    message.requestId = object.requestId ?? "";
    message.walletId = object.walletId ?? "";
    message.publicRef = object.publicRef ?? "";
    message.newBalance =
      object.newBalance !== undefined && object.newBalance !== null
        ? BigDecimal.fromPartial(object.newBalance)
        : undefined;
    message.prevBalance =
      object.prevBalance !== undefined && object.prevBalance !== null
        ? BigDecimal.fromPartial(object.prevBalance)
        : undefined;
    return message;
  },
};

const baseCreateWalletActivityResponse: object = { success: false };

export const CreateWalletActivityResponse = {
  encode(
    message: CreateWalletActivityResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.walletActivity !== undefined) {
      WalletActivity.encode(message.walletActivity, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWalletActivityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseCreateWalletActivityResponse,
    } as CreateWalletActivityResponse;
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
          message.walletActivity = WalletActivity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWalletActivityResponse {
    const message = {
      ...baseCreateWalletActivityResponse,
    } as CreateWalletActivityResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.walletActivity =
      object.walletActivity !== undefined && object.walletActivity !== null
        ? WalletActivity.fromJSON(object.walletActivity)
        : undefined;
    return message;
  },

  toJSON(message: CreateWalletActivityResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.walletActivity !== undefined &&
      (obj.walletActivity = message.walletActivity
        ? WalletActivity.toJSON(message.walletActivity)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateWalletActivityResponse>,
  ): CreateWalletActivityResponse {
    const message = {
      ...baseCreateWalletActivityResponse,
    } as CreateWalletActivityResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.walletActivity =
      object.walletActivity !== undefined && object.walletActivity !== null
        ? WalletActivity.fromPartial(object.walletActivity)
        : undefined;
    return message;
  },
};

const baseDeleteWalletActivityRequest: object = { requestId: "", walletActivityId: "" };

export const DeleteWalletActivityRequest = {
  encode(
    message: DeleteWalletActivityRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.walletActivityId !== "") {
      writer.uint32(10).string(message.walletActivityId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWalletActivityRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteWalletActivityRequest } as DeleteWalletActivityRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.walletActivityId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWalletActivityRequest {
    const message = { ...baseDeleteWalletActivityRequest } as DeleteWalletActivityRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.walletActivityId =
      object.walletActivityId !== undefined && object.walletActivityId !== null
        ? String(object.walletActivityId)
        : "";
    return message;
  },

  toJSON(message: DeleteWalletActivityRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.walletActivityId !== undefined &&
      (obj.walletActivityId = message.walletActivityId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteWalletActivityRequest>,
  ): DeleteWalletActivityRequest {
    const message = { ...baseDeleteWalletActivityRequest } as DeleteWalletActivityRequest;
    message.requestId = object.requestId ?? "";
    message.walletActivityId = object.walletActivityId ?? "";
    return message;
  },
};

const baseDeleteWalletActivityResponse: object = { success: false };

export const DeleteWalletActivityResponse = {
  encode(
    message: DeleteWalletActivityResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.walletActivity !== undefined) {
      WalletActivity.encode(message.walletActivity, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWalletActivityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDeleteWalletActivityResponse,
    } as DeleteWalletActivityResponse;
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
          message.walletActivity = WalletActivity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWalletActivityResponse {
    const message = {
      ...baseDeleteWalletActivityResponse,
    } as DeleteWalletActivityResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.walletActivity =
      object.walletActivity !== undefined && object.walletActivity !== null
        ? WalletActivity.fromJSON(object.walletActivity)
        : undefined;
    return message;
  },

  toJSON(message: DeleteWalletActivityResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.walletActivity !== undefined &&
      (obj.walletActivity = message.walletActivity
        ? WalletActivity.toJSON(message.walletActivity)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteWalletActivityResponse>,
  ): DeleteWalletActivityResponse {
    const message = {
      ...baseDeleteWalletActivityResponse,
    } as DeleteWalletActivityResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.walletActivity =
      object.walletActivity !== undefined && object.walletActivity !== null
        ? WalletActivity.fromPartial(object.walletActivity)
        : undefined;
    return message;
  },
};

const baseUpdateWalletActivityRequest: object = { requestId: "", walletActivityId: "" };

export const UpdateWalletActivityRequest = {
  encode(
    message: UpdateWalletActivityRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.walletActivityId !== "") {
      writer.uint32(10).string(message.walletActivityId);
    }
    if (message.walletId !== undefined) {
      writer.uint32(18).string(message.walletId);
    }
    if (message.publicRef !== undefined) {
      writer.uint32(26).string(message.publicRef);
    }
    if (message.newBalance !== undefined) {
      BigDecimal.encode(message.newBalance, writer.uint32(34).fork()).ldelim();
    }
    if (message.prevBalance !== undefined) {
      BigDecimal.encode(message.prevBalance, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWalletActivityRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateWalletActivityRequest } as UpdateWalletActivityRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.walletActivityId = reader.string();
          break;
        case 2:
          message.walletId = reader.string();
          break;
        case 3:
          message.publicRef = reader.string();
          break;
        case 4:
          message.newBalance = BigDecimal.decode(reader, reader.uint32());
          break;
        case 5:
          message.prevBalance = BigDecimal.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateWalletActivityRequest {
    const message = { ...baseUpdateWalletActivityRequest } as UpdateWalletActivityRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.walletActivityId =
      object.walletActivityId !== undefined && object.walletActivityId !== null
        ? String(object.walletActivityId)
        : "";
    message.walletId =
      object.walletId !== undefined && object.walletId !== null
        ? String(object.walletId)
        : undefined;
    message.publicRef =
      object.publicRef !== undefined && object.publicRef !== null
        ? String(object.publicRef)
        : undefined;
    message.newBalance =
      object.newBalance !== undefined && object.newBalance !== null
        ? BigDecimal.fromJSON(object.newBalance)
        : undefined;
    message.prevBalance =
      object.prevBalance !== undefined && object.prevBalance !== null
        ? BigDecimal.fromJSON(object.prevBalance)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWalletActivityRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.walletActivityId !== undefined &&
      (obj.walletActivityId = message.walletActivityId);
    message.walletId !== undefined && (obj.walletId = message.walletId);
    message.publicRef !== undefined && (obj.publicRef = message.publicRef);
    message.newBalance !== undefined &&
      (obj.newBalance = message.newBalance
        ? BigDecimal.toJSON(message.newBalance)
        : undefined);
    message.prevBalance !== undefined &&
      (obj.prevBalance = message.prevBalance
        ? BigDecimal.toJSON(message.prevBalance)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateWalletActivityRequest>,
  ): UpdateWalletActivityRequest {
    const message = { ...baseUpdateWalletActivityRequest } as UpdateWalletActivityRequest;
    message.requestId = object.requestId ?? "";
    message.walletActivityId = object.walletActivityId ?? "";
    message.walletId = object.walletId ?? undefined;
    message.publicRef = object.publicRef ?? undefined;
    message.newBalance =
      object.newBalance !== undefined && object.newBalance !== null
        ? BigDecimal.fromPartial(object.newBalance)
        : undefined;
    message.prevBalance =
      object.prevBalance !== undefined && object.prevBalance !== null
        ? BigDecimal.fromPartial(object.prevBalance)
        : undefined;
    return message;
  },
};

const baseUpdateWalletActivityResponse: object = { success: false };

export const UpdateWalletActivityResponse = {
  encode(
    message: UpdateWalletActivityResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.walletActivity !== undefined) {
      WalletActivity.encode(message.walletActivity, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWalletActivityResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateWalletActivityResponse,
    } as UpdateWalletActivityResponse;
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
          message.walletActivity = WalletActivity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateWalletActivityResponse {
    const message = {
      ...baseUpdateWalletActivityResponse,
    } as UpdateWalletActivityResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.walletActivity =
      object.walletActivity !== undefined && object.walletActivity !== null
        ? WalletActivity.fromJSON(object.walletActivity)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWalletActivityResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.walletActivity !== undefined &&
      (obj.walletActivity = message.walletActivity
        ? WalletActivity.toJSON(message.walletActivity)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateWalletActivityResponse>,
  ): UpdateWalletActivityResponse {
    const message = {
      ...baseUpdateWalletActivityResponse,
    } as UpdateWalletActivityResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.walletActivity =
      object.walletActivity !== undefined && object.walletActivity !== null
        ? WalletActivity.fromPartial(object.walletActivity)
        : undefined;
    return message;
  },
};

export const WalletActivityServiceService = {
  listWallets: {
    path: "/ea.WalletActivityService/ListWallets",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListWalletActivitiesRequest) =>
      Buffer.from(ListWalletActivitiesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListWalletActivitiesRequest.decode(value),
    responseSerialize: (value: ListWalletActivitiesResponse) =>
      Buffer.from(ListWalletActivitiesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListWalletActivitiesResponse.decode(value),
  },
  getWallet: {
    path: "/ea.WalletActivityService/GetWallet",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetWalletActivityRequest) =>
      Buffer.from(GetWalletActivityRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetWalletActivityRequest.decode(value),
    responseSerialize: (value: GetWalletActivityResponse) =>
      Buffer.from(GetWalletActivityResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetWalletActivityResponse.decode(value),
  },
  createWallet: {
    path: "/ea.WalletActivityService/CreateWallet",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateWalletActivityRequest) =>
      Buffer.from(CreateWalletActivityRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateWalletActivityRequest.decode(value),
    responseSerialize: (value: CreateWalletActivityResponse) =>
      Buffer.from(CreateWalletActivityResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateWalletActivityResponse.decode(value),
  },
  deleteWallet: {
    path: "/ea.WalletActivityService/DeleteWallet",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteWalletActivityRequest) =>
      Buffer.from(DeleteWalletActivityRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteWalletActivityRequest.decode(value),
    responseSerialize: (value: DeleteWalletActivityResponse) =>
      Buffer.from(DeleteWalletActivityResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteWalletActivityResponse.decode(value),
  },
  updateWallet: {
    path: "/ea.WalletActivityService/UpdateWallet",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateWalletActivityRequest) =>
      Buffer.from(UpdateWalletActivityRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateWalletActivityRequest.decode(value),
    responseSerialize: (value: UpdateWalletActivityResponse) =>
      Buffer.from(UpdateWalletActivityResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateWalletActivityResponse.decode(value),
  },
} as const;

export interface WalletActivityServiceServer extends UntypedServiceImplementation {
  listWallets: handleUnaryCall<ListWalletActivitiesRequest, ListWalletActivitiesResponse>;
  getWallet: handleUnaryCall<GetWalletActivityRequest, GetWalletActivityResponse>;
  createWallet: handleUnaryCall<
    CreateWalletActivityRequest,
    CreateWalletActivityResponse
  >;
  deleteWallet: handleUnaryCall<
    DeleteWalletActivityRequest,
    DeleteWalletActivityResponse
  >;
  updateWallet: handleUnaryCall<
    UpdateWalletActivityRequest,
    UpdateWalletActivityResponse
  >;
}

export interface WalletActivityServiceClient extends Client {
  listWallets(
    request: ListWalletActivitiesRequest,
    callback: (
      error: ServiceError | null,
      response: ListWalletActivitiesResponse,
    ) => void,
  ): ClientUnaryCall;
  listWallets(
    request: ListWalletActivitiesRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: ListWalletActivitiesResponse,
    ) => void,
  ): ClientUnaryCall;
  listWallets(
    request: ListWalletActivitiesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: ListWalletActivitiesResponse,
    ) => void,
  ): ClientUnaryCall;
  getWallet(
    request: GetWalletActivityRequest,
    callback: (error: ServiceError | null, response: GetWalletActivityResponse) => void,
  ): ClientUnaryCall;
  getWallet(
    request: GetWalletActivityRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetWalletActivityResponse) => void,
  ): ClientUnaryCall;
  getWallet(
    request: GetWalletActivityRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetWalletActivityResponse) => void,
  ): ClientUnaryCall;
  createWallet(
    request: CreateWalletActivityRequest,
    callback: (
      error: ServiceError | null,
      response: CreateWalletActivityResponse,
    ) => void,
  ): ClientUnaryCall;
  createWallet(
    request: CreateWalletActivityRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: CreateWalletActivityResponse,
    ) => void,
  ): ClientUnaryCall;
  createWallet(
    request: CreateWalletActivityRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: CreateWalletActivityResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteWallet(
    request: DeleteWalletActivityRequest,
    callback: (
      error: ServiceError | null,
      response: DeleteWalletActivityResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteWallet(
    request: DeleteWalletActivityRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: DeleteWalletActivityResponse,
    ) => void,
  ): ClientUnaryCall;
  deleteWallet(
    request: DeleteWalletActivityRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: DeleteWalletActivityResponse,
    ) => void,
  ): ClientUnaryCall;
  updateWallet(
    request: UpdateWalletActivityRequest,
    callback: (
      error: ServiceError | null,
      response: UpdateWalletActivityResponse,
    ) => void,
  ): ClientUnaryCall;
  updateWallet(
    request: UpdateWalletActivityRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: UpdateWalletActivityResponse,
    ) => void,
  ): ClientUnaryCall;
  updateWallet(
    request: UpdateWalletActivityRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: UpdateWalletActivityResponse,
    ) => void,
  ): ClientUnaryCall;
}

export const WalletActivityServiceClient = makeGenericClientConstructor(
  WalletActivityServiceService,
  "ea.WalletActivityService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): WalletActivityServiceClient;
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
