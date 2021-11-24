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

export interface Account {
  id: string;
  globalId: string;
  publicCode: string;
  username: string;
  avatar: string;
  givenName: string;
  familyName: string;
  middleName: string;
  email: string;
  emailVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListAccountsRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListAccountsResponse {
  success: boolean;
  accounts: Account[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetAccountRequest {
  userId: string;
}

export interface GetAccountResponse {
  success: boolean;
  message: string | undefined;
  account?: Account | undefined;
}

export interface CreateAccountRequest {
  requestId: string;
  globalId: string;
  username: string;
  avatar: string;
  givenName: string;
  familyName: string;
  middleName: string;
  email: string;
}

export interface CreateAccountResponse {
  success: boolean;
  message: string | undefined;
  account?: Account | undefined;
}

export interface DeleteAccountRequest {
  requestId: string;
  userId: string;
}

export interface DeleteAccountResponse {
  success: boolean;
  message: string | undefined;
  account?: Account | undefined;
}

export interface UpdateAccountRequest {
  requestId: string;
  userId: string;
  globalId?: string | undefined;
  publicCode?: string | undefined;
  username?: string | undefined;
  avatar?: string | undefined;
  givenName?: string | undefined;
  familyName?: string | undefined;
  middleName?: string | undefined;
  email?: string | undefined;
  emailVerified?: boolean | undefined;
}

export interface UpdateAccountResponse {
  success: boolean;
  message: string | undefined;
  account?: Account | undefined;
}

const baseAccount: object = {
  id: "",
  globalId: "",
  publicCode: "",
  username: "",
  avatar: "",
  givenName: "",
  familyName: "",
  middleName: "",
  email: "",
  emailVerified: false,
};

export const Account = {
  encode(message: Account, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.globalId !== "") {
      writer.uint32(18).string(message.globalId);
    }
    if (message.publicCode !== "") {
      writer.uint32(26).string(message.publicCode);
    }
    if (message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.avatar !== "") {
      writer.uint32(42).string(message.avatar);
    }
    if (message.givenName !== "") {
      writer.uint32(50).string(message.givenName);
    }
    if (message.familyName !== "") {
      writer.uint32(58).string(message.familyName);
    }
    if (message.middleName !== "") {
      writer.uint32(66).string(message.middleName);
    }
    if (message.email !== "") {
      writer.uint32(74).string(message.email);
    }
    if (message.emailVerified === true) {
      writer.uint32(80).bool(message.emailVerified);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Account {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccount } as Account;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.globalId = reader.string();
          break;
        case 3:
          message.publicCode = reader.string();
          break;
        case 4:
          message.username = reader.string();
          break;
        case 5:
          message.avatar = reader.string();
          break;
        case 6:
          message.givenName = reader.string();
          break;
        case 7:
          message.familyName = reader.string();
          break;
        case 8:
          message.middleName = reader.string();
          break;
        case 9:
          message.email = reader.string();
          break;
        case 10:
          message.emailVerified = reader.bool();
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

  fromJSON(object: any): Account {
    const message = { ...baseAccount } as Account;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.globalId =
      object.globalId !== undefined && object.globalId !== null
        ? String(object.globalId)
        : "";
    message.publicCode =
      object.publicCode !== undefined && object.publicCode !== null
        ? String(object.publicCode)
        : "";
    message.username =
      object.username !== undefined && object.username !== null
        ? String(object.username)
        : "";
    message.avatar =
      object.avatar !== undefined && object.avatar !== null ? String(object.avatar) : "";
    message.givenName =
      object.givenName !== undefined && object.givenName !== null
        ? String(object.givenName)
        : "";
    message.familyName =
      object.familyName !== undefined && object.familyName !== null
        ? String(object.familyName)
        : "";
    message.middleName =
      object.middleName !== undefined && object.middleName !== null
        ? String(object.middleName)
        : "";
    message.email =
      object.email !== undefined && object.email !== null ? String(object.email) : "";
    message.emailVerified =
      object.emailVerified !== undefined && object.emailVerified !== null
        ? Boolean(object.emailVerified)
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

  toJSON(message: Account): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.globalId !== undefined && (obj.globalId = message.globalId);
    message.publicCode !== undefined && (obj.publicCode = message.publicCode);
    message.username !== undefined && (obj.username = message.username);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    message.givenName !== undefined && (obj.givenName = message.givenName);
    message.familyName !== undefined && (obj.familyName = message.familyName);
    message.middleName !== undefined && (obj.middleName = message.middleName);
    message.email !== undefined && (obj.email = message.email);
    message.emailVerified !== undefined && (obj.emailVerified = message.emailVerified);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Account>): Account {
    const message = { ...baseAccount } as Account;
    message.id = object.id ?? "";
    message.globalId = object.globalId ?? "";
    message.publicCode = object.publicCode ?? "";
    message.username = object.username ?? "";
    message.avatar = object.avatar ?? "";
    message.givenName = object.givenName ?? "";
    message.familyName = object.familyName ?? "";
    message.middleName = object.middleName ?? "";
    message.email = object.email ?? "";
    message.emailVerified = object.emailVerified ?? false;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListAccountsRequest: object = { pageSize: 0, pageToken: "" };

export const ListAccountsRequest = {
  encode(
    message: ListAccountsRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAccountsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListAccountsRequest } as ListAccountsRequest;
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

  fromJSON(object: any): ListAccountsRequest {
    const message = { ...baseListAccountsRequest } as ListAccountsRequest;
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

  toJSON(message: ListAccountsRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListAccountsRequest>): ListAccountsRequest {
    const message = { ...baseListAccountsRequest } as ListAccountsRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListAccountsResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListAccountsResponse = {
  encode(
    message: ListAccountsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.accounts) {
      Account.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListAccountsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListAccountsResponse } as ListAccountsResponse;
    message.accounts = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.accounts.push(Account.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListAccountsResponse {
    const message = { ...baseListAccountsResponse } as ListAccountsResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.accounts = (object.accounts ?? []).map((e: any) => Account.fromJSON(e));
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

  toJSON(message: ListAccountsResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.accounts) {
      obj.accounts = message.accounts.map((e) => (e ? Account.toJSON(e) : undefined));
    } else {
      obj.accounts = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListAccountsResponse>): ListAccountsResponse {
    const message = { ...baseListAccountsResponse } as ListAccountsResponse;
    message.success = object.success ?? false;
    message.accounts = (object.accounts ?? []).map((e) => Account.fromPartial(e));
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetAccountRequest: object = { userId: "" };

export const GetAccountRequest = {
  encode(
    message: GetAccountRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetAccountRequest } as GetAccountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAccountRequest {
    const message = { ...baseGetAccountRequest } as GetAccountRequest;
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    return message;
  },

  toJSON(message: GetAccountRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetAccountRequest>): GetAccountRequest {
    const message = { ...baseGetAccountRequest } as GetAccountRequest;
    message.userId = object.userId ?? "";
    return message;
  },
};

const baseGetAccountResponse: object = { success: false };

export const GetAccountResponse = {
  encode(
    message: GetAccountResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.account !== undefined) {
      Account.encode(message.account, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetAccountResponse } as GetAccountResponse;
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
          message.account = Account.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAccountResponse {
    const message = { ...baseGetAccountResponse } as GetAccountResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.account =
      object.account !== undefined && object.account !== null
        ? Account.fromJSON(object.account)
        : undefined;
    return message;
  },

  toJSON(message: GetAccountResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.account !== undefined &&
      (obj.account = message.account ? Account.toJSON(message.account) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetAccountResponse>): GetAccountResponse {
    const message = { ...baseGetAccountResponse } as GetAccountResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.account =
      object.account !== undefined && object.account !== null
        ? Account.fromPartial(object.account)
        : undefined;
    return message;
  },
};

const baseCreateAccountRequest: object = {
  requestId: "",
  globalId: "",
  username: "",
  avatar: "",
  givenName: "",
  familyName: "",
  middleName: "",
  email: "",
};

export const CreateAccountRequest = {
  encode(
    message: CreateAccountRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.globalId !== "") {
      writer.uint32(18).string(message.globalId);
    }
    if (message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.avatar !== "") {
      writer.uint32(42).string(message.avatar);
    }
    if (message.givenName !== "") {
      writer.uint32(50).string(message.givenName);
    }
    if (message.familyName !== "") {
      writer.uint32(58).string(message.familyName);
    }
    if (message.middleName !== "") {
      writer.uint32(66).string(message.middleName);
    }
    if (message.email !== "") {
      writer.uint32(74).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateAccountRequest } as CreateAccountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 2:
          message.globalId = reader.string();
          break;
        case 4:
          message.username = reader.string();
          break;
        case 5:
          message.avatar = reader.string();
          break;
        case 6:
          message.givenName = reader.string();
          break;
        case 7:
          message.familyName = reader.string();
          break;
        case 8:
          message.middleName = reader.string();
          break;
        case 9:
          message.email = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateAccountRequest {
    const message = { ...baseCreateAccountRequest } as CreateAccountRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.globalId =
      object.globalId !== undefined && object.globalId !== null
        ? String(object.globalId)
        : "";
    message.username =
      object.username !== undefined && object.username !== null
        ? String(object.username)
        : "";
    message.avatar =
      object.avatar !== undefined && object.avatar !== null ? String(object.avatar) : "";
    message.givenName =
      object.givenName !== undefined && object.givenName !== null
        ? String(object.givenName)
        : "";
    message.familyName =
      object.familyName !== undefined && object.familyName !== null
        ? String(object.familyName)
        : "";
    message.middleName =
      object.middleName !== undefined && object.middleName !== null
        ? String(object.middleName)
        : "";
    message.email =
      object.email !== undefined && object.email !== null ? String(object.email) : "";
    return message;
  },

  toJSON(message: CreateAccountRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.globalId !== undefined && (obj.globalId = message.globalId);
    message.username !== undefined && (obj.username = message.username);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    message.givenName !== undefined && (obj.givenName = message.givenName);
    message.familyName !== undefined && (obj.familyName = message.familyName);
    message.middleName !== undefined && (obj.middleName = message.middleName);
    message.email !== undefined && (obj.email = message.email);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateAccountRequest>): CreateAccountRequest {
    const message = { ...baseCreateAccountRequest } as CreateAccountRequest;
    message.requestId = object.requestId ?? "";
    message.globalId = object.globalId ?? "";
    message.username = object.username ?? "";
    message.avatar = object.avatar ?? "";
    message.givenName = object.givenName ?? "";
    message.familyName = object.familyName ?? "";
    message.middleName = object.middleName ?? "";
    message.email = object.email ?? "";
    return message;
  },
};

const baseCreateAccountResponse: object = { success: false };

export const CreateAccountResponse = {
  encode(
    message: CreateAccountResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.account !== undefined) {
      Account.encode(message.account, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateAccountResponse } as CreateAccountResponse;
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
          message.account = Account.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateAccountResponse {
    const message = { ...baseCreateAccountResponse } as CreateAccountResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.account =
      object.account !== undefined && object.account !== null
        ? Account.fromJSON(object.account)
        : undefined;
    return message;
  },

  toJSON(message: CreateAccountResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.account !== undefined &&
      (obj.account = message.account ? Account.toJSON(message.account) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateAccountResponse>): CreateAccountResponse {
    const message = { ...baseCreateAccountResponse } as CreateAccountResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.account =
      object.account !== undefined && object.account !== null
        ? Account.fromPartial(object.account)
        : undefined;
    return message;
  },
};

const baseDeleteAccountRequest: object = { requestId: "", userId: "" };

export const DeleteAccountRequest = {
  encode(
    message: DeleteAccountRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteAccountRequest } as DeleteAccountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteAccountRequest {
    const message = { ...baseDeleteAccountRequest } as DeleteAccountRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    return message;
  },

  toJSON(message: DeleteAccountRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteAccountRequest>): DeleteAccountRequest {
    const message = { ...baseDeleteAccountRequest } as DeleteAccountRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

const baseDeleteAccountResponse: object = { success: false };

export const DeleteAccountResponse = {
  encode(
    message: DeleteAccountResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.account !== undefined) {
      Account.encode(message.account, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteAccountResponse } as DeleteAccountResponse;
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
          message.account = Account.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteAccountResponse {
    const message = { ...baseDeleteAccountResponse } as DeleteAccountResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.account =
      object.account !== undefined && object.account !== null
        ? Account.fromJSON(object.account)
        : undefined;
    return message;
  },

  toJSON(message: DeleteAccountResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.account !== undefined &&
      (obj.account = message.account ? Account.toJSON(message.account) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteAccountResponse>): DeleteAccountResponse {
    const message = { ...baseDeleteAccountResponse } as DeleteAccountResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.account =
      object.account !== undefined && object.account !== null
        ? Account.fromPartial(object.account)
        : undefined;
    return message;
  },
};

const baseUpdateAccountRequest: object = { requestId: "", userId: "" };

export const UpdateAccountRequest = {
  encode(
    message: UpdateAccountRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.globalId !== undefined) {
      writer.uint32(18).string(message.globalId);
    }
    if (message.publicCode !== undefined) {
      writer.uint32(26).string(message.publicCode);
    }
    if (message.username !== undefined) {
      writer.uint32(34).string(message.username);
    }
    if (message.avatar !== undefined) {
      writer.uint32(42).string(message.avatar);
    }
    if (message.givenName !== undefined) {
      writer.uint32(50).string(message.givenName);
    }
    if (message.familyName !== undefined) {
      writer.uint32(58).string(message.familyName);
    }
    if (message.middleName !== undefined) {
      writer.uint32(66).string(message.middleName);
    }
    if (message.email !== undefined) {
      writer.uint32(74).string(message.email);
    }
    if (message.emailVerified !== undefined) {
      writer.uint32(80).bool(message.emailVerified);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateAccountRequest } as UpdateAccountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.globalId = reader.string();
          break;
        case 3:
          message.publicCode = reader.string();
          break;
        case 4:
          message.username = reader.string();
          break;
        case 5:
          message.avatar = reader.string();
          break;
        case 6:
          message.givenName = reader.string();
          break;
        case 7:
          message.familyName = reader.string();
          break;
        case 8:
          message.middleName = reader.string();
          break;
        case 9:
          message.email = reader.string();
          break;
        case 10:
          message.emailVerified = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateAccountRequest {
    const message = { ...baseUpdateAccountRequest } as UpdateAccountRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.globalId =
      object.globalId !== undefined && object.globalId !== null
        ? String(object.globalId)
        : undefined;
    message.publicCode =
      object.publicCode !== undefined && object.publicCode !== null
        ? String(object.publicCode)
        : undefined;
    message.username =
      object.username !== undefined && object.username !== null
        ? String(object.username)
        : undefined;
    message.avatar =
      object.avatar !== undefined && object.avatar !== null
        ? String(object.avatar)
        : undefined;
    message.givenName =
      object.givenName !== undefined && object.givenName !== null
        ? String(object.givenName)
        : undefined;
    message.familyName =
      object.familyName !== undefined && object.familyName !== null
        ? String(object.familyName)
        : undefined;
    message.middleName =
      object.middleName !== undefined && object.middleName !== null
        ? String(object.middleName)
        : undefined;
    message.email =
      object.email !== undefined && object.email !== null
        ? String(object.email)
        : undefined;
    message.emailVerified =
      object.emailVerified !== undefined && object.emailVerified !== null
        ? Boolean(object.emailVerified)
        : undefined;
    return message;
  },

  toJSON(message: UpdateAccountRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.globalId !== undefined && (obj.globalId = message.globalId);
    message.publicCode !== undefined && (obj.publicCode = message.publicCode);
    message.username !== undefined && (obj.username = message.username);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    message.givenName !== undefined && (obj.givenName = message.givenName);
    message.familyName !== undefined && (obj.familyName = message.familyName);
    message.middleName !== undefined && (obj.middleName = message.middleName);
    message.email !== undefined && (obj.email = message.email);
    message.emailVerified !== undefined && (obj.emailVerified = message.emailVerified);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateAccountRequest>): UpdateAccountRequest {
    const message = { ...baseUpdateAccountRequest } as UpdateAccountRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    message.globalId = object.globalId ?? undefined;
    message.publicCode = object.publicCode ?? undefined;
    message.username = object.username ?? undefined;
    message.avatar = object.avatar ?? undefined;
    message.givenName = object.givenName ?? undefined;
    message.familyName = object.familyName ?? undefined;
    message.middleName = object.middleName ?? undefined;
    message.email = object.email ?? undefined;
    message.emailVerified = object.emailVerified ?? undefined;
    return message;
  },
};

const baseUpdateAccountResponse: object = { success: false };

export const UpdateAccountResponse = {
  encode(
    message: UpdateAccountResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.account !== undefined) {
      Account.encode(message.account, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateAccountResponse } as UpdateAccountResponse;
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
          message.account = Account.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateAccountResponse {
    const message = { ...baseUpdateAccountResponse } as UpdateAccountResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.account =
      object.account !== undefined && object.account !== null
        ? Account.fromJSON(object.account)
        : undefined;
    return message;
  },

  toJSON(message: UpdateAccountResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.account !== undefined &&
      (obj.account = message.account ? Account.toJSON(message.account) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateAccountResponse>): UpdateAccountResponse {
    const message = { ...baseUpdateAccountResponse } as UpdateAccountResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.account =
      object.account !== undefined && object.account !== null
        ? Account.fromPartial(object.account)
        : undefined;
    return message;
  },
};

export const AccountServiceService = {
  listAccounts: {
    path: "/ea.AccountService/ListAccounts",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListAccountsRequest) =>
      Buffer.from(ListAccountsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListAccountsRequest.decode(value),
    responseSerialize: (value: ListAccountsResponse) =>
      Buffer.from(ListAccountsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListAccountsResponse.decode(value),
  },
  getAccount: {
    path: "/ea.AccountService/GetAccount",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetAccountRequest) =>
      Buffer.from(GetAccountRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetAccountRequest.decode(value),
    responseSerialize: (value: GetAccountResponse) =>
      Buffer.from(GetAccountResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetAccountResponse.decode(value),
  },
  createAccount: {
    path: "/ea.AccountService/CreateAccount",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateAccountRequest) =>
      Buffer.from(CreateAccountRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateAccountRequest.decode(value),
    responseSerialize: (value: CreateAccountResponse) =>
      Buffer.from(CreateAccountResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateAccountResponse.decode(value),
  },
  deleteAccount: {
    path: "/ea.AccountService/DeleteAccount",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteAccountRequest) =>
      Buffer.from(DeleteAccountRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteAccountRequest.decode(value),
    responseSerialize: (value: DeleteAccountResponse) =>
      Buffer.from(DeleteAccountResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteAccountResponse.decode(value),
  },
  updateAccount: {
    path: "/ea.AccountService/UpdateAccount",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateAccountRequest) =>
      Buffer.from(UpdateAccountRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateAccountRequest.decode(value),
    responseSerialize: (value: UpdateAccountResponse) =>
      Buffer.from(UpdateAccountResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateAccountResponse.decode(value),
  },
} as const;

export interface AccountServiceServer extends UntypedServiceImplementation {
  listAccounts: handleUnaryCall<ListAccountsRequest, ListAccountsResponse>;
  getAccount: handleUnaryCall<GetAccountRequest, GetAccountResponse>;
  createAccount: handleUnaryCall<CreateAccountRequest, CreateAccountResponse>;
  deleteAccount: handleUnaryCall<DeleteAccountRequest, DeleteAccountResponse>;
  updateAccount: handleUnaryCall<UpdateAccountRequest, UpdateAccountResponse>;
}

export interface AccountServiceClient extends Client {
  listAccounts(
    request: ListAccountsRequest,
    callback: (error: ServiceError | null, response: ListAccountsResponse) => void,
  ): ClientUnaryCall;
  listAccounts(
    request: ListAccountsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListAccountsResponse) => void,
  ): ClientUnaryCall;
  listAccounts(
    request: ListAccountsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListAccountsResponse) => void,
  ): ClientUnaryCall;
  getAccount(
    request: GetAccountRequest,
    callback: (error: ServiceError | null, response: GetAccountResponse) => void,
  ): ClientUnaryCall;
  getAccount(
    request: GetAccountRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetAccountResponse) => void,
  ): ClientUnaryCall;
  getAccount(
    request: GetAccountRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetAccountResponse) => void,
  ): ClientUnaryCall;
  createAccount(
    request: CreateAccountRequest,
    callback: (error: ServiceError | null, response: CreateAccountResponse) => void,
  ): ClientUnaryCall;
  createAccount(
    request: CreateAccountRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateAccountResponse) => void,
  ): ClientUnaryCall;
  createAccount(
    request: CreateAccountRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateAccountResponse) => void,
  ): ClientUnaryCall;
  deleteAccount(
    request: DeleteAccountRequest,
    callback: (error: ServiceError | null, response: DeleteAccountResponse) => void,
  ): ClientUnaryCall;
  deleteAccount(
    request: DeleteAccountRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteAccountResponse) => void,
  ): ClientUnaryCall;
  deleteAccount(
    request: DeleteAccountRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteAccountResponse) => void,
  ): ClientUnaryCall;
  updateAccount(
    request: UpdateAccountRequest,
    callback: (error: ServiceError | null, response: UpdateAccountResponse) => void,
  ): ClientUnaryCall;
  updateAccount(
    request: UpdateAccountRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateAccountResponse) => void,
  ): ClientUnaryCall;
  updateAccount(
    request: UpdateAccountRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateAccountResponse) => void,
  ): ClientUnaryCall;
}

export const AccountServiceClient = makeGenericClientConstructor(
  AccountServiceService,
  "ea.AccountService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): AccountServiceClient;
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
