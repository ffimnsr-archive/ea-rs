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

export interface Wallet {
  id: string;
  userId: string;
  balance?: BigDecimal;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListWalletsRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListWalletsResponse {
  success: boolean;
  wallets: Wallet[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetWalletRequest {
  walletId: string;
}

export interface GetWalletResponse {
  success: boolean;
  message: string | undefined;
  wallet?: Wallet | undefined;
}

export interface CreateWalletRequest {
  requestId: string;
  userId: string;
  balance?: BigDecimal;
}

export interface CreateWalletResponse {
  success: boolean;
  message: string | undefined;
  wallet?: Wallet | undefined;
}

export interface DeleteWalletRequest {
  requestId: string;
  walletId: string;
}

export interface DeleteWalletResponse {
  success: boolean;
  message: string | undefined;
  wallet?: Wallet | undefined;
}

export interface UpdateWalletRequest {
  requestId: string;
  walletId: string;
  userId?: string | undefined;
  balance?: BigDecimal | undefined;
}

export interface UpdateWalletResponse {
  success: boolean;
  message: string | undefined;
  wallet?: Wallet | undefined;
}

const baseWallet: object = { id: "", userId: "" };

export const Wallet = {
  encode(message: Wallet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.balance !== undefined) {
      BigDecimal.encode(message.balance, writer.uint32(26).fork()).ldelim();
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Wallet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWallet } as Wallet;
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
          message.balance = BigDecimal.decode(reader, reader.uint32());
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

  fromJSON(object: any): Wallet {
    const message = { ...baseWallet } as Wallet;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.balance =
      object.balance !== undefined && object.balance !== null
        ? BigDecimal.fromJSON(object.balance)
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

  toJSON(message: Wallet): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.userId !== undefined && (obj.userId = message.userId);
    message.balance !== undefined &&
      (obj.balance = message.balance ? BigDecimal.toJSON(message.balance) : undefined);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Wallet>): Wallet {
    const message = { ...baseWallet } as Wallet;
    message.id = object.id ?? "";
    message.userId = object.userId ?? "";
    message.balance =
      object.balance !== undefined && object.balance !== null
        ? BigDecimal.fromPartial(object.balance)
        : undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListWalletsRequest: object = { pageSize: 0, pageToken: "" };

export const ListWalletsRequest = {
  encode(
    message: ListWalletsRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWalletsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListWalletsRequest } as ListWalletsRequest;
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

  fromJSON(object: any): ListWalletsRequest {
    const message = { ...baseListWalletsRequest } as ListWalletsRequest;
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

  toJSON(message: ListWalletsRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListWalletsRequest>): ListWalletsRequest {
    const message = { ...baseListWalletsRequest } as ListWalletsRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListWalletsResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListWalletsResponse = {
  encode(
    message: ListWalletsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.wallets) {
      Wallet.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWalletsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListWalletsResponse } as ListWalletsResponse;
    message.wallets = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.wallets.push(Wallet.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListWalletsResponse {
    const message = { ...baseListWalletsResponse } as ListWalletsResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.wallets = (object.wallets ?? []).map((e: any) => Wallet.fromJSON(e));
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

  toJSON(message: ListWalletsResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.wallets) {
      obj.wallets = message.wallets.map((e) => (e ? Wallet.toJSON(e) : undefined));
    } else {
      obj.wallets = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListWalletsResponse>): ListWalletsResponse {
    const message = { ...baseListWalletsResponse } as ListWalletsResponse;
    message.success = object.success ?? false;
    message.wallets = (object.wallets ?? []).map((e) => Wallet.fromPartial(e));
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetWalletRequest: object = { walletId: "" };

export const GetWalletRequest = {
  encode(
    message: GetWalletRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.walletId !== "") {
      writer.uint32(10).string(message.walletId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWalletRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWalletRequest } as GetWalletRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.walletId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWalletRequest {
    const message = { ...baseGetWalletRequest } as GetWalletRequest;
    message.walletId =
      object.walletId !== undefined && object.walletId !== null
        ? String(object.walletId)
        : "";
    return message;
  },

  toJSON(message: GetWalletRequest): unknown {
    const obj: any = {};
    message.walletId !== undefined && (obj.walletId = message.walletId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWalletRequest>): GetWalletRequest {
    const message = { ...baseGetWalletRequest } as GetWalletRequest;
    message.walletId = object.walletId ?? "";
    return message;
  },
};

const baseGetWalletResponse: object = { success: false };

export const GetWalletResponse = {
  encode(
    message: GetWalletResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.wallet !== undefined) {
      Wallet.encode(message.wallet, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWalletResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWalletResponse } as GetWalletResponse;
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
          message.wallet = Wallet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWalletResponse {
    const message = { ...baseGetWalletResponse } as GetWalletResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.wallet =
      object.wallet !== undefined && object.wallet !== null
        ? Wallet.fromJSON(object.wallet)
        : undefined;
    return message;
  },

  toJSON(message: GetWalletResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.wallet !== undefined &&
      (obj.wallet = message.wallet ? Wallet.toJSON(message.wallet) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWalletResponse>): GetWalletResponse {
    const message = { ...baseGetWalletResponse } as GetWalletResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.wallet =
      object.wallet !== undefined && object.wallet !== null
        ? Wallet.fromPartial(object.wallet)
        : undefined;
    return message;
  },
};

const baseCreateWalletRequest: object = { requestId: "", userId: "" };

export const CreateWalletRequest = {
  encode(
    message: CreateWalletRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.balance !== undefined) {
      BigDecimal.encode(message.balance, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWalletRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateWalletRequest } as CreateWalletRequest;
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
          message.balance = BigDecimal.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWalletRequest {
    const message = { ...baseCreateWalletRequest } as CreateWalletRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.balance =
      object.balance !== undefined && object.balance !== null
        ? BigDecimal.fromJSON(object.balance)
        : undefined;
    return message;
  },

  toJSON(message: CreateWalletRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.balance !== undefined &&
      (obj.balance = message.balance ? BigDecimal.toJSON(message.balance) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateWalletRequest>): CreateWalletRequest {
    const message = { ...baseCreateWalletRequest } as CreateWalletRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    message.balance =
      object.balance !== undefined && object.balance !== null
        ? BigDecimal.fromPartial(object.balance)
        : undefined;
    return message;
  },
};

const baseCreateWalletResponse: object = { success: false };

export const CreateWalletResponse = {
  encode(
    message: CreateWalletResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.wallet !== undefined) {
      Wallet.encode(message.wallet, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWalletResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateWalletResponse } as CreateWalletResponse;
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
          message.wallet = Wallet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWalletResponse {
    const message = { ...baseCreateWalletResponse } as CreateWalletResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.wallet =
      object.wallet !== undefined && object.wallet !== null
        ? Wallet.fromJSON(object.wallet)
        : undefined;
    return message;
  },

  toJSON(message: CreateWalletResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.wallet !== undefined &&
      (obj.wallet = message.wallet ? Wallet.toJSON(message.wallet) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateWalletResponse>): CreateWalletResponse {
    const message = { ...baseCreateWalletResponse } as CreateWalletResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.wallet =
      object.wallet !== undefined && object.wallet !== null
        ? Wallet.fromPartial(object.wallet)
        : undefined;
    return message;
  },
};

const baseDeleteWalletRequest: object = { requestId: "", walletId: "" };

export const DeleteWalletRequest = {
  encode(
    message: DeleteWalletRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.walletId !== "") {
      writer.uint32(10).string(message.walletId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWalletRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteWalletRequest } as DeleteWalletRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.walletId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWalletRequest {
    const message = { ...baseDeleteWalletRequest } as DeleteWalletRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.walletId =
      object.walletId !== undefined && object.walletId !== null
        ? String(object.walletId)
        : "";
    return message;
  },

  toJSON(message: DeleteWalletRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.walletId !== undefined && (obj.walletId = message.walletId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteWalletRequest>): DeleteWalletRequest {
    const message = { ...baseDeleteWalletRequest } as DeleteWalletRequest;
    message.requestId = object.requestId ?? "";
    message.walletId = object.walletId ?? "";
    return message;
  },
};

const baseDeleteWalletResponse: object = { success: false };

export const DeleteWalletResponse = {
  encode(
    message: DeleteWalletResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.wallet !== undefined) {
      Wallet.encode(message.wallet, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWalletResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteWalletResponse } as DeleteWalletResponse;
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
          message.wallet = Wallet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWalletResponse {
    const message = { ...baseDeleteWalletResponse } as DeleteWalletResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.wallet =
      object.wallet !== undefined && object.wallet !== null
        ? Wallet.fromJSON(object.wallet)
        : undefined;
    return message;
  },

  toJSON(message: DeleteWalletResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.wallet !== undefined &&
      (obj.wallet = message.wallet ? Wallet.toJSON(message.wallet) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteWalletResponse>): DeleteWalletResponse {
    const message = { ...baseDeleteWalletResponse } as DeleteWalletResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.wallet =
      object.wallet !== undefined && object.wallet !== null
        ? Wallet.fromPartial(object.wallet)
        : undefined;
    return message;
  },
};

const baseUpdateWalletRequest: object = { requestId: "", walletId: "" };

export const UpdateWalletRequest = {
  encode(
    message: UpdateWalletRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.walletId !== "") {
      writer.uint32(10).string(message.walletId);
    }
    if (message.userId !== undefined) {
      writer.uint32(18).string(message.userId);
    }
    if (message.balance !== undefined) {
      BigDecimal.encode(message.balance, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWalletRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateWalletRequest } as UpdateWalletRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.walletId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.balance = BigDecimal.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateWalletRequest {
    const message = { ...baseUpdateWalletRequest } as UpdateWalletRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.walletId =
      object.walletId !== undefined && object.walletId !== null
        ? String(object.walletId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : undefined;
    message.balance =
      object.balance !== undefined && object.balance !== null
        ? BigDecimal.fromJSON(object.balance)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWalletRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.walletId !== undefined && (obj.walletId = message.walletId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.balance !== undefined &&
      (obj.balance = message.balance ? BigDecimal.toJSON(message.balance) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateWalletRequest>): UpdateWalletRequest {
    const message = { ...baseUpdateWalletRequest } as UpdateWalletRequest;
    message.requestId = object.requestId ?? "";
    message.walletId = object.walletId ?? "";
    message.userId = object.userId ?? undefined;
    message.balance =
      object.balance !== undefined && object.balance !== null
        ? BigDecimal.fromPartial(object.balance)
        : undefined;
    return message;
  },
};

const baseUpdateWalletResponse: object = { success: false };

export const UpdateWalletResponse = {
  encode(
    message: UpdateWalletResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.wallet !== undefined) {
      Wallet.encode(message.wallet, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWalletResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateWalletResponse } as UpdateWalletResponse;
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
          message.wallet = Wallet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateWalletResponse {
    const message = { ...baseUpdateWalletResponse } as UpdateWalletResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.wallet =
      object.wallet !== undefined && object.wallet !== null
        ? Wallet.fromJSON(object.wallet)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWalletResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.wallet !== undefined &&
      (obj.wallet = message.wallet ? Wallet.toJSON(message.wallet) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateWalletResponse>): UpdateWalletResponse {
    const message = { ...baseUpdateWalletResponse } as UpdateWalletResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.wallet =
      object.wallet !== undefined && object.wallet !== null
        ? Wallet.fromPartial(object.wallet)
        : undefined;
    return message;
  },
};

export const WalletServiceService = {
  listWallets: {
    path: "/ea.WalletService/ListWallets",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListWalletsRequest) =>
      Buffer.from(ListWalletsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListWalletsRequest.decode(value),
    responseSerialize: (value: ListWalletsResponse) =>
      Buffer.from(ListWalletsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListWalletsResponse.decode(value),
  },
  getWallet: {
    path: "/ea.WalletService/GetWallet",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetWalletRequest) =>
      Buffer.from(GetWalletRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetWalletRequest.decode(value),
    responseSerialize: (value: GetWalletResponse) =>
      Buffer.from(GetWalletResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetWalletResponse.decode(value),
  },
  createWallet: {
    path: "/ea.WalletService/CreateWallet",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateWalletRequest) =>
      Buffer.from(CreateWalletRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateWalletRequest.decode(value),
    responseSerialize: (value: CreateWalletResponse) =>
      Buffer.from(CreateWalletResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateWalletResponse.decode(value),
  },
  deleteWallet: {
    path: "/ea.WalletService/DeleteWallet",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteWalletRequest) =>
      Buffer.from(DeleteWalletRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteWalletRequest.decode(value),
    responseSerialize: (value: DeleteWalletResponse) =>
      Buffer.from(DeleteWalletResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteWalletResponse.decode(value),
  },
  updateWallet: {
    path: "/ea.WalletService/UpdateWallet",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateWalletRequest) =>
      Buffer.from(UpdateWalletRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateWalletRequest.decode(value),
    responseSerialize: (value: UpdateWalletResponse) =>
      Buffer.from(UpdateWalletResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateWalletResponse.decode(value),
  },
} as const;

export interface WalletServiceServer extends UntypedServiceImplementation {
  listWallets: handleUnaryCall<ListWalletsRequest, ListWalletsResponse>;
  getWallet: handleUnaryCall<GetWalletRequest, GetWalletResponse>;
  createWallet: handleUnaryCall<CreateWalletRequest, CreateWalletResponse>;
  deleteWallet: handleUnaryCall<DeleteWalletRequest, DeleteWalletResponse>;
  updateWallet: handleUnaryCall<UpdateWalletRequest, UpdateWalletResponse>;
}

export interface WalletServiceClient extends Client {
  listWallets(
    request: ListWalletsRequest,
    callback: (error: ServiceError | null, response: ListWalletsResponse) => void,
  ): ClientUnaryCall;
  listWallets(
    request: ListWalletsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListWalletsResponse) => void,
  ): ClientUnaryCall;
  listWallets(
    request: ListWalletsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListWalletsResponse) => void,
  ): ClientUnaryCall;
  getWallet(
    request: GetWalletRequest,
    callback: (error: ServiceError | null, response: GetWalletResponse) => void,
  ): ClientUnaryCall;
  getWallet(
    request: GetWalletRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetWalletResponse) => void,
  ): ClientUnaryCall;
  getWallet(
    request: GetWalletRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetWalletResponse) => void,
  ): ClientUnaryCall;
  createWallet(
    request: CreateWalletRequest,
    callback: (error: ServiceError | null, response: CreateWalletResponse) => void,
  ): ClientUnaryCall;
  createWallet(
    request: CreateWalletRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateWalletResponse) => void,
  ): ClientUnaryCall;
  createWallet(
    request: CreateWalletRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateWalletResponse) => void,
  ): ClientUnaryCall;
  deleteWallet(
    request: DeleteWalletRequest,
    callback: (error: ServiceError | null, response: DeleteWalletResponse) => void,
  ): ClientUnaryCall;
  deleteWallet(
    request: DeleteWalletRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteWalletResponse) => void,
  ): ClientUnaryCall;
  deleteWallet(
    request: DeleteWalletRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteWalletResponse) => void,
  ): ClientUnaryCall;
  updateWallet(
    request: UpdateWalletRequest,
    callback: (error: ServiceError | null, response: UpdateWalletResponse) => void,
  ): ClientUnaryCall;
  updateWallet(
    request: UpdateWalletRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateWalletResponse) => void,
  ): ClientUnaryCall;
  updateWallet(
    request: UpdateWalletRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateWalletResponse) => void,
  ): ClientUnaryCall;
}

export const WalletServiceClient = makeGenericClientConstructor(
  WalletServiceService,
  "ea.WalletService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): WalletServiceClient;
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
