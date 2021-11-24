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

export interface BankAccount {
  id: string;
  userId: string;
  accountName: string;
  accountNo: string;
  bankAddress: string;
  bankBranch: string;
  bankName: string;
  bankSwiftCode: string;
  bankRoutingNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListBankAccountsRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListBankAccountsResponse {
  success: boolean;
  bankAccounts: BankAccount[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetBankAccountRequest {
  bankAccountId: string;
}

export interface GetBankAccountResponse {
  success: boolean;
  message: string | undefined;
  bankAccount?: BankAccount | undefined;
}

export interface CreateBankAccountRequest {
  requestId: string;
  userId: string;
  accountName: string;
  accountNo: string;
  bankAddress: string;
  bankBranch: string;
  bankName: string;
  bankSwiftCode: string;
  bankRoutingNumber: string;
}

export interface CreateBankAccountResponse {
  success: boolean;
  message: string | undefined;
  bankAccount?: BankAccount | undefined;
}

export interface DeleteBankAccountRequest {
  requestId: string;
  bankAccountId: string;
}

export interface DeleteBankAccountResponse {
  success: boolean;
  message: string | undefined;
  bankAccount?: BankAccount | undefined;
}

export interface UpdateBankAccountRequest {
  requestId: string;
  bankAccountId: string;
  userId?: string | undefined;
  accountName?: string | undefined;
  accountNo?: string | undefined;
  bankAddress?: string | undefined;
  bankBranch?: string | undefined;
  bankName?: string | undefined;
  bankSwiftCode?: string | undefined;
  bankRoutingNumber?: string | undefined;
}

export interface UpdateBankAccountResponse {
  success: boolean;
  message: string | undefined;
  bankAccount?: BankAccount | undefined;
}

const baseBankAccount: object = {
  id: "",
  userId: "",
  accountName: "",
  accountNo: "",
  bankAddress: "",
  bankBranch: "",
  bankName: "",
  bankSwiftCode: "",
  bankRoutingNumber: "",
};

export const BankAccount = {
  encode(message: BankAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.accountName !== "") {
      writer.uint32(26).string(message.accountName);
    }
    if (message.accountNo !== "") {
      writer.uint32(34).string(message.accountNo);
    }
    if (message.bankAddress !== "") {
      writer.uint32(42).string(message.bankAddress);
    }
    if (message.bankBranch !== "") {
      writer.uint32(50).string(message.bankBranch);
    }
    if (message.bankName !== "") {
      writer.uint32(58).string(message.bankName);
    }
    if (message.bankSwiftCode !== "") {
      writer.uint32(66).string(message.bankSwiftCode);
    }
    if (message.bankRoutingNumber !== "") {
      writer.uint32(74).string(message.bankRoutingNumber);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BankAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBankAccount } as BankAccount;
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
          message.accountName = reader.string();
          break;
        case 4:
          message.accountNo = reader.string();
          break;
        case 5:
          message.bankAddress = reader.string();
          break;
        case 6:
          message.bankBranch = reader.string();
          break;
        case 7:
          message.bankName = reader.string();
          break;
        case 8:
          message.bankSwiftCode = reader.string();
          break;
        case 9:
          message.bankRoutingNumber = reader.string();
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

  fromJSON(object: any): BankAccount {
    const message = { ...baseBankAccount } as BankAccount;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.accountName =
      object.accountName !== undefined && object.accountName !== null
        ? String(object.accountName)
        : "";
    message.accountNo =
      object.accountNo !== undefined && object.accountNo !== null
        ? String(object.accountNo)
        : "";
    message.bankAddress =
      object.bankAddress !== undefined && object.bankAddress !== null
        ? String(object.bankAddress)
        : "";
    message.bankBranch =
      object.bankBranch !== undefined && object.bankBranch !== null
        ? String(object.bankBranch)
        : "";
    message.bankName =
      object.bankName !== undefined && object.bankName !== null
        ? String(object.bankName)
        : "";
    message.bankSwiftCode =
      object.bankSwiftCode !== undefined && object.bankSwiftCode !== null
        ? String(object.bankSwiftCode)
        : "";
    message.bankRoutingNumber =
      object.bankRoutingNumber !== undefined && object.bankRoutingNumber !== null
        ? String(object.bankRoutingNumber)
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

  toJSON(message: BankAccount): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.userId !== undefined && (obj.userId = message.userId);
    message.accountName !== undefined && (obj.accountName = message.accountName);
    message.accountNo !== undefined && (obj.accountNo = message.accountNo);
    message.bankAddress !== undefined && (obj.bankAddress = message.bankAddress);
    message.bankBranch !== undefined && (obj.bankBranch = message.bankBranch);
    message.bankName !== undefined && (obj.bankName = message.bankName);
    message.bankSwiftCode !== undefined && (obj.bankSwiftCode = message.bankSwiftCode);
    message.bankRoutingNumber !== undefined &&
      (obj.bankRoutingNumber = message.bankRoutingNumber);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<BankAccount>): BankAccount {
    const message = { ...baseBankAccount } as BankAccount;
    message.id = object.id ?? "";
    message.userId = object.userId ?? "";
    message.accountName = object.accountName ?? "";
    message.accountNo = object.accountNo ?? "";
    message.bankAddress = object.bankAddress ?? "";
    message.bankBranch = object.bankBranch ?? "";
    message.bankName = object.bankName ?? "";
    message.bankSwiftCode = object.bankSwiftCode ?? "";
    message.bankRoutingNumber = object.bankRoutingNumber ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListBankAccountsRequest: object = { pageSize: 0, pageToken: "" };

export const ListBankAccountsRequest = {
  encode(
    message: ListBankAccountsRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListBankAccountsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListBankAccountsRequest } as ListBankAccountsRequest;
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

  fromJSON(object: any): ListBankAccountsRequest {
    const message = { ...baseListBankAccountsRequest } as ListBankAccountsRequest;
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

  toJSON(message: ListBankAccountsRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListBankAccountsRequest>): ListBankAccountsRequest {
    const message = { ...baseListBankAccountsRequest } as ListBankAccountsRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListBankAccountsResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListBankAccountsResponse = {
  encode(
    message: ListBankAccountsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.bankAccounts) {
      BankAccount.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListBankAccountsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListBankAccountsResponse } as ListBankAccountsResponse;
    message.bankAccounts = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.bankAccounts.push(BankAccount.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListBankAccountsResponse {
    const message = { ...baseListBankAccountsResponse } as ListBankAccountsResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.bankAccounts = (object.bankAccounts ?? []).map((e: any) =>
      BankAccount.fromJSON(e),
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

  toJSON(message: ListBankAccountsResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.bankAccounts) {
      obj.bankAccounts = message.bankAccounts.map((e) =>
        e ? BankAccount.toJSON(e) : undefined,
      );
    } else {
      obj.bankAccounts = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListBankAccountsResponse>): ListBankAccountsResponse {
    const message = { ...baseListBankAccountsResponse } as ListBankAccountsResponse;
    message.success = object.success ?? false;
    message.bankAccounts = (object.bankAccounts ?? []).map((e) =>
      BankAccount.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetBankAccountRequest: object = { bankAccountId: "" };

export const GetBankAccountRequest = {
  encode(
    message: GetBankAccountRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.bankAccountId !== "") {
      writer.uint32(10).string(message.bankAccountId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBankAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetBankAccountRequest } as GetBankAccountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bankAccountId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBankAccountRequest {
    const message = { ...baseGetBankAccountRequest } as GetBankAccountRequest;
    message.bankAccountId =
      object.bankAccountId !== undefined && object.bankAccountId !== null
        ? String(object.bankAccountId)
        : "";
    return message;
  },

  toJSON(message: GetBankAccountRequest): unknown {
    const obj: any = {};
    message.bankAccountId !== undefined && (obj.bankAccountId = message.bankAccountId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetBankAccountRequest>): GetBankAccountRequest {
    const message = { ...baseGetBankAccountRequest } as GetBankAccountRequest;
    message.bankAccountId = object.bankAccountId ?? "";
    return message;
  },
};

const baseGetBankAccountResponse: object = { success: false };

export const GetBankAccountResponse = {
  encode(
    message: GetBankAccountResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.bankAccount !== undefined) {
      BankAccount.encode(message.bankAccount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBankAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetBankAccountResponse } as GetBankAccountResponse;
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
          message.bankAccount = BankAccount.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBankAccountResponse {
    const message = { ...baseGetBankAccountResponse } as GetBankAccountResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.bankAccount =
      object.bankAccount !== undefined && object.bankAccount !== null
        ? BankAccount.fromJSON(object.bankAccount)
        : undefined;
    return message;
  },

  toJSON(message: GetBankAccountResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.bankAccount !== undefined &&
      (obj.bankAccount = message.bankAccount
        ? BankAccount.toJSON(message.bankAccount)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetBankAccountResponse>): GetBankAccountResponse {
    const message = { ...baseGetBankAccountResponse } as GetBankAccountResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.bankAccount =
      object.bankAccount !== undefined && object.bankAccount !== null
        ? BankAccount.fromPartial(object.bankAccount)
        : undefined;
    return message;
  },
};

const baseCreateBankAccountRequest: object = {
  requestId: "",
  userId: "",
  accountName: "",
  accountNo: "",
  bankAddress: "",
  bankBranch: "",
  bankName: "",
  bankSwiftCode: "",
  bankRoutingNumber: "",
};

export const CreateBankAccountRequest = {
  encode(
    message: CreateBankAccountRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.accountName !== "") {
      writer.uint32(26).string(message.accountName);
    }
    if (message.accountNo !== "") {
      writer.uint32(34).string(message.accountNo);
    }
    if (message.bankAddress !== "") {
      writer.uint32(42).string(message.bankAddress);
    }
    if (message.bankBranch !== "") {
      writer.uint32(50).string(message.bankBranch);
    }
    if (message.bankName !== "") {
      writer.uint32(58).string(message.bankName);
    }
    if (message.bankSwiftCode !== "") {
      writer.uint32(66).string(message.bankSwiftCode);
    }
    if (message.bankRoutingNumber !== "") {
      writer.uint32(74).string(message.bankRoutingNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateBankAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateBankAccountRequest } as CreateBankAccountRequest;
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
          message.accountName = reader.string();
          break;
        case 4:
          message.accountNo = reader.string();
          break;
        case 5:
          message.bankAddress = reader.string();
          break;
        case 6:
          message.bankBranch = reader.string();
          break;
        case 7:
          message.bankName = reader.string();
          break;
        case 8:
          message.bankSwiftCode = reader.string();
          break;
        case 9:
          message.bankRoutingNumber = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateBankAccountRequest {
    const message = { ...baseCreateBankAccountRequest } as CreateBankAccountRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.accountName =
      object.accountName !== undefined && object.accountName !== null
        ? String(object.accountName)
        : "";
    message.accountNo =
      object.accountNo !== undefined && object.accountNo !== null
        ? String(object.accountNo)
        : "";
    message.bankAddress =
      object.bankAddress !== undefined && object.bankAddress !== null
        ? String(object.bankAddress)
        : "";
    message.bankBranch =
      object.bankBranch !== undefined && object.bankBranch !== null
        ? String(object.bankBranch)
        : "";
    message.bankName =
      object.bankName !== undefined && object.bankName !== null
        ? String(object.bankName)
        : "";
    message.bankSwiftCode =
      object.bankSwiftCode !== undefined && object.bankSwiftCode !== null
        ? String(object.bankSwiftCode)
        : "";
    message.bankRoutingNumber =
      object.bankRoutingNumber !== undefined && object.bankRoutingNumber !== null
        ? String(object.bankRoutingNumber)
        : "";
    return message;
  },

  toJSON(message: CreateBankAccountRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.accountName !== undefined && (obj.accountName = message.accountName);
    message.accountNo !== undefined && (obj.accountNo = message.accountNo);
    message.bankAddress !== undefined && (obj.bankAddress = message.bankAddress);
    message.bankBranch !== undefined && (obj.bankBranch = message.bankBranch);
    message.bankName !== undefined && (obj.bankName = message.bankName);
    message.bankSwiftCode !== undefined && (obj.bankSwiftCode = message.bankSwiftCode);
    message.bankRoutingNumber !== undefined &&
      (obj.bankRoutingNumber = message.bankRoutingNumber);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateBankAccountRequest>): CreateBankAccountRequest {
    const message = { ...baseCreateBankAccountRequest } as CreateBankAccountRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    message.accountName = object.accountName ?? "";
    message.accountNo = object.accountNo ?? "";
    message.bankAddress = object.bankAddress ?? "";
    message.bankBranch = object.bankBranch ?? "";
    message.bankName = object.bankName ?? "";
    message.bankSwiftCode = object.bankSwiftCode ?? "";
    message.bankRoutingNumber = object.bankRoutingNumber ?? "";
    return message;
  },
};

const baseCreateBankAccountResponse: object = { success: false };

export const CreateBankAccountResponse = {
  encode(
    message: CreateBankAccountResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.bankAccount !== undefined) {
      BankAccount.encode(message.bankAccount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateBankAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateBankAccountResponse } as CreateBankAccountResponse;
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
          message.bankAccount = BankAccount.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateBankAccountResponse {
    const message = { ...baseCreateBankAccountResponse } as CreateBankAccountResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.bankAccount =
      object.bankAccount !== undefined && object.bankAccount !== null
        ? BankAccount.fromJSON(object.bankAccount)
        : undefined;
    return message;
  },

  toJSON(message: CreateBankAccountResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.bankAccount !== undefined &&
      (obj.bankAccount = message.bankAccount
        ? BankAccount.toJSON(message.bankAccount)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateBankAccountResponse>): CreateBankAccountResponse {
    const message = { ...baseCreateBankAccountResponse } as CreateBankAccountResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.bankAccount =
      object.bankAccount !== undefined && object.bankAccount !== null
        ? BankAccount.fromPartial(object.bankAccount)
        : undefined;
    return message;
  },
};

const baseDeleteBankAccountRequest: object = { requestId: "", bankAccountId: "" };

export const DeleteBankAccountRequest = {
  encode(
    message: DeleteBankAccountRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.bankAccountId !== "") {
      writer.uint32(10).string(message.bankAccountId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteBankAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteBankAccountRequest } as DeleteBankAccountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.bankAccountId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteBankAccountRequest {
    const message = { ...baseDeleteBankAccountRequest } as DeleteBankAccountRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.bankAccountId =
      object.bankAccountId !== undefined && object.bankAccountId !== null
        ? String(object.bankAccountId)
        : "";
    return message;
  },

  toJSON(message: DeleteBankAccountRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.bankAccountId !== undefined && (obj.bankAccountId = message.bankAccountId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteBankAccountRequest>): DeleteBankAccountRequest {
    const message = { ...baseDeleteBankAccountRequest } as DeleteBankAccountRequest;
    message.requestId = object.requestId ?? "";
    message.bankAccountId = object.bankAccountId ?? "";
    return message;
  },
};

const baseDeleteBankAccountResponse: object = { success: false };

export const DeleteBankAccountResponse = {
  encode(
    message: DeleteBankAccountResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.bankAccount !== undefined) {
      BankAccount.encode(message.bankAccount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteBankAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteBankAccountResponse } as DeleteBankAccountResponse;
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
          message.bankAccount = BankAccount.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteBankAccountResponse {
    const message = { ...baseDeleteBankAccountResponse } as DeleteBankAccountResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.bankAccount =
      object.bankAccount !== undefined && object.bankAccount !== null
        ? BankAccount.fromJSON(object.bankAccount)
        : undefined;
    return message;
  },

  toJSON(message: DeleteBankAccountResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.bankAccount !== undefined &&
      (obj.bankAccount = message.bankAccount
        ? BankAccount.toJSON(message.bankAccount)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteBankAccountResponse>): DeleteBankAccountResponse {
    const message = { ...baseDeleteBankAccountResponse } as DeleteBankAccountResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.bankAccount =
      object.bankAccount !== undefined && object.bankAccount !== null
        ? BankAccount.fromPartial(object.bankAccount)
        : undefined;
    return message;
  },
};

const baseUpdateBankAccountRequest: object = { requestId: "", bankAccountId: "" };

export const UpdateBankAccountRequest = {
  encode(
    message: UpdateBankAccountRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.bankAccountId !== "") {
      writer.uint32(10).string(message.bankAccountId);
    }
    if (message.userId !== undefined) {
      writer.uint32(18).string(message.userId);
    }
    if (message.accountName !== undefined) {
      writer.uint32(26).string(message.accountName);
    }
    if (message.accountNo !== undefined) {
      writer.uint32(34).string(message.accountNo);
    }
    if (message.bankAddress !== undefined) {
      writer.uint32(42).string(message.bankAddress);
    }
    if (message.bankBranch !== undefined) {
      writer.uint32(50).string(message.bankBranch);
    }
    if (message.bankName !== undefined) {
      writer.uint32(58).string(message.bankName);
    }
    if (message.bankSwiftCode !== undefined) {
      writer.uint32(66).string(message.bankSwiftCode);
    }
    if (message.bankRoutingNumber !== undefined) {
      writer.uint32(74).string(message.bankRoutingNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateBankAccountRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateBankAccountRequest } as UpdateBankAccountRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.bankAccountId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.accountName = reader.string();
          break;
        case 4:
          message.accountNo = reader.string();
          break;
        case 5:
          message.bankAddress = reader.string();
          break;
        case 6:
          message.bankBranch = reader.string();
          break;
        case 7:
          message.bankName = reader.string();
          break;
        case 8:
          message.bankSwiftCode = reader.string();
          break;
        case 9:
          message.bankRoutingNumber = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateBankAccountRequest {
    const message = { ...baseUpdateBankAccountRequest } as UpdateBankAccountRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.bankAccountId =
      object.bankAccountId !== undefined && object.bankAccountId !== null
        ? String(object.bankAccountId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : undefined;
    message.accountName =
      object.accountName !== undefined && object.accountName !== null
        ? String(object.accountName)
        : undefined;
    message.accountNo =
      object.accountNo !== undefined && object.accountNo !== null
        ? String(object.accountNo)
        : undefined;
    message.bankAddress =
      object.bankAddress !== undefined && object.bankAddress !== null
        ? String(object.bankAddress)
        : undefined;
    message.bankBranch =
      object.bankBranch !== undefined && object.bankBranch !== null
        ? String(object.bankBranch)
        : undefined;
    message.bankName =
      object.bankName !== undefined && object.bankName !== null
        ? String(object.bankName)
        : undefined;
    message.bankSwiftCode =
      object.bankSwiftCode !== undefined && object.bankSwiftCode !== null
        ? String(object.bankSwiftCode)
        : undefined;
    message.bankRoutingNumber =
      object.bankRoutingNumber !== undefined && object.bankRoutingNumber !== null
        ? String(object.bankRoutingNumber)
        : undefined;
    return message;
  },

  toJSON(message: UpdateBankAccountRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.bankAccountId !== undefined && (obj.bankAccountId = message.bankAccountId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.accountName !== undefined && (obj.accountName = message.accountName);
    message.accountNo !== undefined && (obj.accountNo = message.accountNo);
    message.bankAddress !== undefined && (obj.bankAddress = message.bankAddress);
    message.bankBranch !== undefined && (obj.bankBranch = message.bankBranch);
    message.bankName !== undefined && (obj.bankName = message.bankName);
    message.bankSwiftCode !== undefined && (obj.bankSwiftCode = message.bankSwiftCode);
    message.bankRoutingNumber !== undefined &&
      (obj.bankRoutingNumber = message.bankRoutingNumber);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateBankAccountRequest>): UpdateBankAccountRequest {
    const message = { ...baseUpdateBankAccountRequest } as UpdateBankAccountRequest;
    message.requestId = object.requestId ?? "";
    message.bankAccountId = object.bankAccountId ?? "";
    message.userId = object.userId ?? undefined;
    message.accountName = object.accountName ?? undefined;
    message.accountNo = object.accountNo ?? undefined;
    message.bankAddress = object.bankAddress ?? undefined;
    message.bankBranch = object.bankBranch ?? undefined;
    message.bankName = object.bankName ?? undefined;
    message.bankSwiftCode = object.bankSwiftCode ?? undefined;
    message.bankRoutingNumber = object.bankRoutingNumber ?? undefined;
    return message;
  },
};

const baseUpdateBankAccountResponse: object = { success: false };

export const UpdateBankAccountResponse = {
  encode(
    message: UpdateBankAccountResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.bankAccount !== undefined) {
      BankAccount.encode(message.bankAccount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateBankAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateBankAccountResponse } as UpdateBankAccountResponse;
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
          message.bankAccount = BankAccount.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateBankAccountResponse {
    const message = { ...baseUpdateBankAccountResponse } as UpdateBankAccountResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.bankAccount =
      object.bankAccount !== undefined && object.bankAccount !== null
        ? BankAccount.fromJSON(object.bankAccount)
        : undefined;
    return message;
  },

  toJSON(message: UpdateBankAccountResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.bankAccount !== undefined &&
      (obj.bankAccount = message.bankAccount
        ? BankAccount.toJSON(message.bankAccount)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateBankAccountResponse>): UpdateBankAccountResponse {
    const message = { ...baseUpdateBankAccountResponse } as UpdateBankAccountResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.bankAccount =
      object.bankAccount !== undefined && object.bankAccount !== null
        ? BankAccount.fromPartial(object.bankAccount)
        : undefined;
    return message;
  },
};

export const BankAccountServiceService = {
  listBankAccounts: {
    path: "/ea.BankAccountService/ListBankAccounts",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListBankAccountsRequest) =>
      Buffer.from(ListBankAccountsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListBankAccountsRequest.decode(value),
    responseSerialize: (value: ListBankAccountsResponse) =>
      Buffer.from(ListBankAccountsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListBankAccountsResponse.decode(value),
  },
  getBankAccount: {
    path: "/ea.BankAccountService/GetBankAccount",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetBankAccountRequest) =>
      Buffer.from(GetBankAccountRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetBankAccountRequest.decode(value),
    responseSerialize: (value: GetBankAccountResponse) =>
      Buffer.from(GetBankAccountResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetBankAccountResponse.decode(value),
  },
  createBankAccount: {
    path: "/ea.BankAccountService/CreateBankAccount",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateBankAccountRequest) =>
      Buffer.from(CreateBankAccountRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateBankAccountRequest.decode(value),
    responseSerialize: (value: CreateBankAccountResponse) =>
      Buffer.from(CreateBankAccountResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateBankAccountResponse.decode(value),
  },
  deleteBankAccount: {
    path: "/ea.BankAccountService/DeleteBankAccount",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteBankAccountRequest) =>
      Buffer.from(DeleteBankAccountRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteBankAccountRequest.decode(value),
    responseSerialize: (value: DeleteBankAccountResponse) =>
      Buffer.from(DeleteBankAccountResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteBankAccountResponse.decode(value),
  },
  updateBankAccount: {
    path: "/ea.BankAccountService/UpdateBankAccount",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateBankAccountRequest) =>
      Buffer.from(UpdateBankAccountRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateBankAccountRequest.decode(value),
    responseSerialize: (value: UpdateBankAccountResponse) =>
      Buffer.from(UpdateBankAccountResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateBankAccountResponse.decode(value),
  },
} as const;

export interface BankAccountServiceServer extends UntypedServiceImplementation {
  listBankAccounts: handleUnaryCall<ListBankAccountsRequest, ListBankAccountsResponse>;
  getBankAccount: handleUnaryCall<GetBankAccountRequest, GetBankAccountResponse>;
  createBankAccount: handleUnaryCall<CreateBankAccountRequest, CreateBankAccountResponse>;
  deleteBankAccount: handleUnaryCall<DeleteBankAccountRequest, DeleteBankAccountResponse>;
  updateBankAccount: handleUnaryCall<UpdateBankAccountRequest, UpdateBankAccountResponse>;
}

export interface BankAccountServiceClient extends Client {
  listBankAccounts(
    request: ListBankAccountsRequest,
    callback: (error: ServiceError | null, response: ListBankAccountsResponse) => void,
  ): ClientUnaryCall;
  listBankAccounts(
    request: ListBankAccountsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListBankAccountsResponse) => void,
  ): ClientUnaryCall;
  listBankAccounts(
    request: ListBankAccountsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListBankAccountsResponse) => void,
  ): ClientUnaryCall;
  getBankAccount(
    request: GetBankAccountRequest,
    callback: (error: ServiceError | null, response: GetBankAccountResponse) => void,
  ): ClientUnaryCall;
  getBankAccount(
    request: GetBankAccountRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetBankAccountResponse) => void,
  ): ClientUnaryCall;
  getBankAccount(
    request: GetBankAccountRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetBankAccountResponse) => void,
  ): ClientUnaryCall;
  createBankAccount(
    request: CreateBankAccountRequest,
    callback: (error: ServiceError | null, response: CreateBankAccountResponse) => void,
  ): ClientUnaryCall;
  createBankAccount(
    request: CreateBankAccountRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateBankAccountResponse) => void,
  ): ClientUnaryCall;
  createBankAccount(
    request: CreateBankAccountRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateBankAccountResponse) => void,
  ): ClientUnaryCall;
  deleteBankAccount(
    request: DeleteBankAccountRequest,
    callback: (error: ServiceError | null, response: DeleteBankAccountResponse) => void,
  ): ClientUnaryCall;
  deleteBankAccount(
    request: DeleteBankAccountRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteBankAccountResponse) => void,
  ): ClientUnaryCall;
  deleteBankAccount(
    request: DeleteBankAccountRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteBankAccountResponse) => void,
  ): ClientUnaryCall;
  updateBankAccount(
    request: UpdateBankAccountRequest,
    callback: (error: ServiceError | null, response: UpdateBankAccountResponse) => void,
  ): ClientUnaryCall;
  updateBankAccount(
    request: UpdateBankAccountRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateBankAccountResponse) => void,
  ): ClientUnaryCall;
  updateBankAccount(
    request: UpdateBankAccountRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateBankAccountResponse) => void,
  ): ClientUnaryCall;
}

export const BankAccountServiceClient = makeGenericClientConstructor(
  BankAccountServiceService,
  "ea.BankAccountService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): BankAccountServiceClient;
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
