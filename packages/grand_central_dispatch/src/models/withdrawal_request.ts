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

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount?: BigDecimal;
  referenceNo: string;
  remarks: string;
  approvedById: string;
  approvedAt: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListWithdrawalsRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListWithdrawalsResponse {
  success: boolean;
  withdrawals: WithdrawalRequest[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetWithdrawalRequest {
  withdrawalId: string;
}

export interface GetWithdrawalResponse {
  success: boolean;
  message: string | undefined;
  withdrawal?: WithdrawalRequest | undefined;
}

export interface CreateWithdrawalRequest {
  requestId: string;
  userId: string;
  amount?: BigDecimal;
  referenceNo: string;
  remarks: string;
  approvedById: string;
  approvedAt: string;
  status: string;
}

export interface CreateWithdrawalResponse {
  success: boolean;
  message: string | undefined;
  withdrawal?: WithdrawalRequest | undefined;
}

export interface DeleteWithdrawalRequest {
  requestId: string;
  withdrawalId: string;
}

export interface DeleteWithdrawalResponse {
  success: boolean;
  message: string | undefined;
  withdrawal?: WithdrawalRequest | undefined;
}

export interface UpdateWithdrawalRequest {
  requestId: string;
  withdrawalId: string;
  userId?: string | undefined;
  amount?: BigDecimal | undefined;
  referenceNo?: string | undefined;
  remarks?: string | undefined;
  approvedById?: string | undefined;
  approvedAt?: string | undefined;
  status?: string | undefined;
}

export interface UpdateWithdrawalResponse {
  success: boolean;
  message: string | undefined;
  withdrawal?: WithdrawalRequest | undefined;
}

const baseWithdrawalRequest: object = {
  id: "",
  userId: "",
  referenceNo: "",
  remarks: "",
  approvedById: "",
  approvedAt: "",
  status: "",
};

export const WithdrawalRequest = {
  encode(
    message: WithdrawalRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.amount !== undefined) {
      BigDecimal.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    if (message.referenceNo !== "") {
      writer.uint32(34).string(message.referenceNo);
    }
    if (message.remarks !== "") {
      writer.uint32(42).string(message.remarks);
    }
    if (message.approvedById !== "") {
      writer.uint32(50).string(message.approvedById);
    }
    if (message.approvedAt !== "") {
      writer.uint32(58).string(message.approvedAt);
    }
    if (message.status !== "") {
      writer.uint32(66).string(message.status);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithdrawalRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWithdrawalRequest } as WithdrawalRequest;
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
          message.amount = BigDecimal.decode(reader, reader.uint32());
          break;
        case 4:
          message.referenceNo = reader.string();
          break;
        case 5:
          message.remarks = reader.string();
          break;
        case 6:
          message.approvedById = reader.string();
          break;
        case 7:
          message.approvedAt = reader.string();
          break;
        case 8:
          message.status = reader.string();
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

  fromJSON(object: any): WithdrawalRequest {
    const message = { ...baseWithdrawalRequest } as WithdrawalRequest;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? BigDecimal.fromJSON(object.amount)
        : undefined;
    message.referenceNo =
      object.referenceNo !== undefined && object.referenceNo !== null
        ? String(object.referenceNo)
        : "";
    message.remarks =
      object.remarks !== undefined && object.remarks !== null
        ? String(object.remarks)
        : "";
    message.approvedById =
      object.approvedById !== undefined && object.approvedById !== null
        ? String(object.approvedById)
        : "";
    message.approvedAt =
      object.approvedAt !== undefined && object.approvedAt !== null
        ? String(object.approvedAt)
        : "";
    message.status =
      object.status !== undefined && object.status !== null ? String(object.status) : "";
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

  toJSON(message: WithdrawalRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.userId !== undefined && (obj.userId = message.userId);
    message.amount !== undefined &&
      (obj.amount = message.amount ? BigDecimal.toJSON(message.amount) : undefined);
    message.referenceNo !== undefined && (obj.referenceNo = message.referenceNo);
    message.remarks !== undefined && (obj.remarks = message.remarks);
    message.approvedById !== undefined && (obj.approvedById = message.approvedById);
    message.approvedAt !== undefined && (obj.approvedAt = message.approvedAt);
    message.status !== undefined && (obj.status = message.status);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<WithdrawalRequest>): WithdrawalRequest {
    const message = { ...baseWithdrawalRequest } as WithdrawalRequest;
    message.id = object.id ?? "";
    message.userId = object.userId ?? "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? BigDecimal.fromPartial(object.amount)
        : undefined;
    message.referenceNo = object.referenceNo ?? "";
    message.remarks = object.remarks ?? "";
    message.approvedById = object.approvedById ?? "";
    message.approvedAt = object.approvedAt ?? "";
    message.status = object.status ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListWithdrawalsRequest: object = { pageSize: 0, pageToken: "" };

export const ListWithdrawalsRequest = {
  encode(
    message: ListWithdrawalsRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWithdrawalsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListWithdrawalsRequest } as ListWithdrawalsRequest;
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

  fromJSON(object: any): ListWithdrawalsRequest {
    const message = { ...baseListWithdrawalsRequest } as ListWithdrawalsRequest;
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

  toJSON(message: ListWithdrawalsRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListWithdrawalsRequest>): ListWithdrawalsRequest {
    const message = { ...baseListWithdrawalsRequest } as ListWithdrawalsRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListWithdrawalsResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListWithdrawalsResponse = {
  encode(
    message: ListWithdrawalsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.withdrawals) {
      WithdrawalRequest.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListWithdrawalsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListWithdrawalsResponse } as ListWithdrawalsResponse;
    message.withdrawals = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.withdrawals.push(WithdrawalRequest.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListWithdrawalsResponse {
    const message = { ...baseListWithdrawalsResponse } as ListWithdrawalsResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.withdrawals = (object.withdrawals ?? []).map((e: any) =>
      WithdrawalRequest.fromJSON(e),
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

  toJSON(message: ListWithdrawalsResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.withdrawals) {
      obj.withdrawals = message.withdrawals.map((e) =>
        e ? WithdrawalRequest.toJSON(e) : undefined,
      );
    } else {
      obj.withdrawals = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListWithdrawalsResponse>): ListWithdrawalsResponse {
    const message = { ...baseListWithdrawalsResponse } as ListWithdrawalsResponse;
    message.success = object.success ?? false;
    message.withdrawals = (object.withdrawals ?? []).map((e) =>
      WithdrawalRequest.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetWithdrawalRequest: object = { withdrawalId: "" };

export const GetWithdrawalRequest = {
  encode(
    message: GetWithdrawalRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.withdrawalId !== "") {
      writer.uint32(10).string(message.withdrawalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWithdrawalRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWithdrawalRequest } as GetWithdrawalRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.withdrawalId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWithdrawalRequest {
    const message = { ...baseGetWithdrawalRequest } as GetWithdrawalRequest;
    message.withdrawalId =
      object.withdrawalId !== undefined && object.withdrawalId !== null
        ? String(object.withdrawalId)
        : "";
    return message;
  },

  toJSON(message: GetWithdrawalRequest): unknown {
    const obj: any = {};
    message.withdrawalId !== undefined && (obj.withdrawalId = message.withdrawalId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWithdrawalRequest>): GetWithdrawalRequest {
    const message = { ...baseGetWithdrawalRequest } as GetWithdrawalRequest;
    message.withdrawalId = object.withdrawalId ?? "";
    return message;
  },
};

const baseGetWithdrawalResponse: object = { success: false };

export const GetWithdrawalResponse = {
  encode(
    message: GetWithdrawalResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.withdrawal !== undefined) {
      WithdrawalRequest.encode(message.withdrawal, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetWithdrawalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetWithdrawalResponse } as GetWithdrawalResponse;
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
          message.withdrawal = WithdrawalRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetWithdrawalResponse {
    const message = { ...baseGetWithdrawalResponse } as GetWithdrawalResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.withdrawal =
      object.withdrawal !== undefined && object.withdrawal !== null
        ? WithdrawalRequest.fromJSON(object.withdrawal)
        : undefined;
    return message;
  },

  toJSON(message: GetWithdrawalResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.withdrawal !== undefined &&
      (obj.withdrawal = message.withdrawal
        ? WithdrawalRequest.toJSON(message.withdrawal)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetWithdrawalResponse>): GetWithdrawalResponse {
    const message = { ...baseGetWithdrawalResponse } as GetWithdrawalResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.withdrawal =
      object.withdrawal !== undefined && object.withdrawal !== null
        ? WithdrawalRequest.fromPartial(object.withdrawal)
        : undefined;
    return message;
  },
};

const baseCreateWithdrawalRequest: object = {
  requestId: "",
  userId: "",
  referenceNo: "",
  remarks: "",
  approvedById: "",
  approvedAt: "",
  status: "",
};

export const CreateWithdrawalRequest = {
  encode(
    message: CreateWithdrawalRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.amount !== undefined) {
      BigDecimal.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    if (message.referenceNo !== "") {
      writer.uint32(34).string(message.referenceNo);
    }
    if (message.remarks !== "") {
      writer.uint32(42).string(message.remarks);
    }
    if (message.approvedById !== "") {
      writer.uint32(50).string(message.approvedById);
    }
    if (message.approvedAt !== "") {
      writer.uint32(58).string(message.approvedAt);
    }
    if (message.status !== "") {
      writer.uint32(66).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWithdrawalRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateWithdrawalRequest } as CreateWithdrawalRequest;
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
          message.amount = BigDecimal.decode(reader, reader.uint32());
          break;
        case 4:
          message.referenceNo = reader.string();
          break;
        case 5:
          message.remarks = reader.string();
          break;
        case 6:
          message.approvedById = reader.string();
          break;
        case 7:
          message.approvedAt = reader.string();
          break;
        case 8:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWithdrawalRequest {
    const message = { ...baseCreateWithdrawalRequest } as CreateWithdrawalRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? BigDecimal.fromJSON(object.amount)
        : undefined;
    message.referenceNo =
      object.referenceNo !== undefined && object.referenceNo !== null
        ? String(object.referenceNo)
        : "";
    message.remarks =
      object.remarks !== undefined && object.remarks !== null
        ? String(object.remarks)
        : "";
    message.approvedById =
      object.approvedById !== undefined && object.approvedById !== null
        ? String(object.approvedById)
        : "";
    message.approvedAt =
      object.approvedAt !== undefined && object.approvedAt !== null
        ? String(object.approvedAt)
        : "";
    message.status =
      object.status !== undefined && object.status !== null ? String(object.status) : "";
    return message;
  },

  toJSON(message: CreateWithdrawalRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.amount !== undefined &&
      (obj.amount = message.amount ? BigDecimal.toJSON(message.amount) : undefined);
    message.referenceNo !== undefined && (obj.referenceNo = message.referenceNo);
    message.remarks !== undefined && (obj.remarks = message.remarks);
    message.approvedById !== undefined && (obj.approvedById = message.approvedById);
    message.approvedAt !== undefined && (obj.approvedAt = message.approvedAt);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateWithdrawalRequest>): CreateWithdrawalRequest {
    const message = { ...baseCreateWithdrawalRequest } as CreateWithdrawalRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? BigDecimal.fromPartial(object.amount)
        : undefined;
    message.referenceNo = object.referenceNo ?? "";
    message.remarks = object.remarks ?? "";
    message.approvedById = object.approvedById ?? "";
    message.approvedAt = object.approvedAt ?? "";
    message.status = object.status ?? "";
    return message;
  },
};

const baseCreateWithdrawalResponse: object = { success: false };

export const CreateWithdrawalResponse = {
  encode(
    message: CreateWithdrawalResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.withdrawal !== undefined) {
      WithdrawalRequest.encode(message.withdrawal, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWithdrawalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateWithdrawalResponse } as CreateWithdrawalResponse;
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
          message.withdrawal = WithdrawalRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWithdrawalResponse {
    const message = { ...baseCreateWithdrawalResponse } as CreateWithdrawalResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.withdrawal =
      object.withdrawal !== undefined && object.withdrawal !== null
        ? WithdrawalRequest.fromJSON(object.withdrawal)
        : undefined;
    return message;
  },

  toJSON(message: CreateWithdrawalResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.withdrawal !== undefined &&
      (obj.withdrawal = message.withdrawal
        ? WithdrawalRequest.toJSON(message.withdrawal)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateWithdrawalResponse>): CreateWithdrawalResponse {
    const message = { ...baseCreateWithdrawalResponse } as CreateWithdrawalResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.withdrawal =
      object.withdrawal !== undefined && object.withdrawal !== null
        ? WithdrawalRequest.fromPartial(object.withdrawal)
        : undefined;
    return message;
  },
};

const baseDeleteWithdrawalRequest: object = { requestId: "", withdrawalId: "" };

export const DeleteWithdrawalRequest = {
  encode(
    message: DeleteWithdrawalRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.withdrawalId !== "") {
      writer.uint32(10).string(message.withdrawalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWithdrawalRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteWithdrawalRequest } as DeleteWithdrawalRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.withdrawalId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWithdrawalRequest {
    const message = { ...baseDeleteWithdrawalRequest } as DeleteWithdrawalRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.withdrawalId =
      object.withdrawalId !== undefined && object.withdrawalId !== null
        ? String(object.withdrawalId)
        : "";
    return message;
  },

  toJSON(message: DeleteWithdrawalRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.withdrawalId !== undefined && (obj.withdrawalId = message.withdrawalId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteWithdrawalRequest>): DeleteWithdrawalRequest {
    const message = { ...baseDeleteWithdrawalRequest } as DeleteWithdrawalRequest;
    message.requestId = object.requestId ?? "";
    message.withdrawalId = object.withdrawalId ?? "";
    return message;
  },
};

const baseDeleteWithdrawalResponse: object = { success: false };

export const DeleteWithdrawalResponse = {
  encode(
    message: DeleteWithdrawalResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.withdrawal !== undefined) {
      WithdrawalRequest.encode(message.withdrawal, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteWithdrawalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteWithdrawalResponse } as DeleteWithdrawalResponse;
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
          message.withdrawal = WithdrawalRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteWithdrawalResponse {
    const message = { ...baseDeleteWithdrawalResponse } as DeleteWithdrawalResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.withdrawal =
      object.withdrawal !== undefined && object.withdrawal !== null
        ? WithdrawalRequest.fromJSON(object.withdrawal)
        : undefined;
    return message;
  },

  toJSON(message: DeleteWithdrawalResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.withdrawal !== undefined &&
      (obj.withdrawal = message.withdrawal
        ? WithdrawalRequest.toJSON(message.withdrawal)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteWithdrawalResponse>): DeleteWithdrawalResponse {
    const message = { ...baseDeleteWithdrawalResponse } as DeleteWithdrawalResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.withdrawal =
      object.withdrawal !== undefined && object.withdrawal !== null
        ? WithdrawalRequest.fromPartial(object.withdrawal)
        : undefined;
    return message;
  },
};

const baseUpdateWithdrawalRequest: object = { requestId: "", withdrawalId: "" };

export const UpdateWithdrawalRequest = {
  encode(
    message: UpdateWithdrawalRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.withdrawalId !== "") {
      writer.uint32(10).string(message.withdrawalId);
    }
    if (message.userId !== undefined) {
      writer.uint32(18).string(message.userId);
    }
    if (message.amount !== undefined) {
      BigDecimal.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    if (message.referenceNo !== undefined) {
      writer.uint32(34).string(message.referenceNo);
    }
    if (message.remarks !== undefined) {
      writer.uint32(42).string(message.remarks);
    }
    if (message.approvedById !== undefined) {
      writer.uint32(50).string(message.approvedById);
    }
    if (message.approvedAt !== undefined) {
      writer.uint32(58).string(message.approvedAt);
    }
    if (message.status !== undefined) {
      writer.uint32(66).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWithdrawalRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateWithdrawalRequest } as UpdateWithdrawalRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.withdrawalId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.amount = BigDecimal.decode(reader, reader.uint32());
          break;
        case 4:
          message.referenceNo = reader.string();
          break;
        case 5:
          message.remarks = reader.string();
          break;
        case 6:
          message.approvedById = reader.string();
          break;
        case 7:
          message.approvedAt = reader.string();
          break;
        case 8:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateWithdrawalRequest {
    const message = { ...baseUpdateWithdrawalRequest } as UpdateWithdrawalRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.withdrawalId =
      object.withdrawalId !== undefined && object.withdrawalId !== null
        ? String(object.withdrawalId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : undefined;
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? BigDecimal.fromJSON(object.amount)
        : undefined;
    message.referenceNo =
      object.referenceNo !== undefined && object.referenceNo !== null
        ? String(object.referenceNo)
        : undefined;
    message.remarks =
      object.remarks !== undefined && object.remarks !== null
        ? String(object.remarks)
        : undefined;
    message.approvedById =
      object.approvedById !== undefined && object.approvedById !== null
        ? String(object.approvedById)
        : undefined;
    message.approvedAt =
      object.approvedAt !== undefined && object.approvedAt !== null
        ? String(object.approvedAt)
        : undefined;
    message.status =
      object.status !== undefined && object.status !== null
        ? String(object.status)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWithdrawalRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.withdrawalId !== undefined && (obj.withdrawalId = message.withdrawalId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.amount !== undefined &&
      (obj.amount = message.amount ? BigDecimal.toJSON(message.amount) : undefined);
    message.referenceNo !== undefined && (obj.referenceNo = message.referenceNo);
    message.remarks !== undefined && (obj.remarks = message.remarks);
    message.approvedById !== undefined && (obj.approvedById = message.approvedById);
    message.approvedAt !== undefined && (obj.approvedAt = message.approvedAt);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateWithdrawalRequest>): UpdateWithdrawalRequest {
    const message = { ...baseUpdateWithdrawalRequest } as UpdateWithdrawalRequest;
    message.requestId = object.requestId ?? "";
    message.withdrawalId = object.withdrawalId ?? "";
    message.userId = object.userId ?? undefined;
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? BigDecimal.fromPartial(object.amount)
        : undefined;
    message.referenceNo = object.referenceNo ?? undefined;
    message.remarks = object.remarks ?? undefined;
    message.approvedById = object.approvedById ?? undefined;
    message.approvedAt = object.approvedAt ?? undefined;
    message.status = object.status ?? undefined;
    return message;
  },
};

const baseUpdateWithdrawalResponse: object = { success: false };

export const UpdateWithdrawalResponse = {
  encode(
    message: UpdateWithdrawalResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.withdrawal !== undefined) {
      WithdrawalRequest.encode(message.withdrawal, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateWithdrawalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateWithdrawalResponse } as UpdateWithdrawalResponse;
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
          message.withdrawal = WithdrawalRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateWithdrawalResponse {
    const message = { ...baseUpdateWithdrawalResponse } as UpdateWithdrawalResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.withdrawal =
      object.withdrawal !== undefined && object.withdrawal !== null
        ? WithdrawalRequest.fromJSON(object.withdrawal)
        : undefined;
    return message;
  },

  toJSON(message: UpdateWithdrawalResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.withdrawal !== undefined &&
      (obj.withdrawal = message.withdrawal
        ? WithdrawalRequest.toJSON(message.withdrawal)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateWithdrawalResponse>): UpdateWithdrawalResponse {
    const message = { ...baseUpdateWithdrawalResponse } as UpdateWithdrawalResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.withdrawal =
      object.withdrawal !== undefined && object.withdrawal !== null
        ? WithdrawalRequest.fromPartial(object.withdrawal)
        : undefined;
    return message;
  },
};

export const WithdrawalRequestServiceService = {
  listWithdrawals: {
    path: "/ea.WithdrawalRequestService/ListWithdrawals",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListWithdrawalsRequest) =>
      Buffer.from(ListWithdrawalsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListWithdrawalsRequest.decode(value),
    responseSerialize: (value: ListWithdrawalsResponse) =>
      Buffer.from(ListWithdrawalsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListWithdrawalsResponse.decode(value),
  },
  getWithdrawal: {
    path: "/ea.WithdrawalRequestService/GetWithdrawal",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetWithdrawalRequest) =>
      Buffer.from(GetWithdrawalRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetWithdrawalRequest.decode(value),
    responseSerialize: (value: GetWithdrawalResponse) =>
      Buffer.from(GetWithdrawalResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetWithdrawalResponse.decode(value),
  },
  createWithdrawal: {
    path: "/ea.WithdrawalRequestService/CreateWithdrawal",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateWithdrawalRequest) =>
      Buffer.from(CreateWithdrawalRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateWithdrawalRequest.decode(value),
    responseSerialize: (value: CreateWithdrawalResponse) =>
      Buffer.from(CreateWithdrawalResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateWithdrawalResponse.decode(value),
  },
  deleteWithdrawal: {
    path: "/ea.WithdrawalRequestService/DeleteWithdrawal",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteWithdrawalRequest) =>
      Buffer.from(DeleteWithdrawalRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteWithdrawalRequest.decode(value),
    responseSerialize: (value: DeleteWithdrawalResponse) =>
      Buffer.from(DeleteWithdrawalResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteWithdrawalResponse.decode(value),
  },
  updateWithdrawal: {
    path: "/ea.WithdrawalRequestService/UpdateWithdrawal",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateWithdrawalRequest) =>
      Buffer.from(UpdateWithdrawalRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateWithdrawalRequest.decode(value),
    responseSerialize: (value: UpdateWithdrawalResponse) =>
      Buffer.from(UpdateWithdrawalResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateWithdrawalResponse.decode(value),
  },
} as const;

export interface WithdrawalRequestServiceServer extends UntypedServiceImplementation {
  listWithdrawals: handleUnaryCall<ListWithdrawalsRequest, ListWithdrawalsResponse>;
  getWithdrawal: handleUnaryCall<GetWithdrawalRequest, GetWithdrawalResponse>;
  createWithdrawal: handleUnaryCall<CreateWithdrawalRequest, CreateWithdrawalResponse>;
  deleteWithdrawal: handleUnaryCall<DeleteWithdrawalRequest, DeleteWithdrawalResponse>;
  updateWithdrawal: handleUnaryCall<UpdateWithdrawalRequest, UpdateWithdrawalResponse>;
}

export interface WithdrawalRequestServiceClient extends Client {
  listWithdrawals(
    request: ListWithdrawalsRequest,
    callback: (error: ServiceError | null, response: ListWithdrawalsResponse) => void,
  ): ClientUnaryCall;
  listWithdrawals(
    request: ListWithdrawalsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListWithdrawalsResponse) => void,
  ): ClientUnaryCall;
  listWithdrawals(
    request: ListWithdrawalsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListWithdrawalsResponse) => void,
  ): ClientUnaryCall;
  getWithdrawal(
    request: GetWithdrawalRequest,
    callback: (error: ServiceError | null, response: GetWithdrawalResponse) => void,
  ): ClientUnaryCall;
  getWithdrawal(
    request: GetWithdrawalRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetWithdrawalResponse) => void,
  ): ClientUnaryCall;
  getWithdrawal(
    request: GetWithdrawalRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetWithdrawalResponse) => void,
  ): ClientUnaryCall;
  createWithdrawal(
    request: CreateWithdrawalRequest,
    callback: (error: ServiceError | null, response: CreateWithdrawalResponse) => void,
  ): ClientUnaryCall;
  createWithdrawal(
    request: CreateWithdrawalRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateWithdrawalResponse) => void,
  ): ClientUnaryCall;
  createWithdrawal(
    request: CreateWithdrawalRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateWithdrawalResponse) => void,
  ): ClientUnaryCall;
  deleteWithdrawal(
    request: DeleteWithdrawalRequest,
    callback: (error: ServiceError | null, response: DeleteWithdrawalResponse) => void,
  ): ClientUnaryCall;
  deleteWithdrawal(
    request: DeleteWithdrawalRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteWithdrawalResponse) => void,
  ): ClientUnaryCall;
  deleteWithdrawal(
    request: DeleteWithdrawalRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteWithdrawalResponse) => void,
  ): ClientUnaryCall;
  updateWithdrawal(
    request: UpdateWithdrawalRequest,
    callback: (error: ServiceError | null, response: UpdateWithdrawalResponse) => void,
  ): ClientUnaryCall;
  updateWithdrawal(
    request: UpdateWithdrawalRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateWithdrawalResponse) => void,
  ): ClientUnaryCall;
  updateWithdrawal(
    request: UpdateWithdrawalRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateWithdrawalResponse) => void,
  ): ClientUnaryCall;
}

export const WithdrawalRequestServiceClient = makeGenericClientConstructor(
  WithdrawalRequestServiceService,
  "ea.WithdrawalRequestService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): WithdrawalRequestServiceClient;
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
