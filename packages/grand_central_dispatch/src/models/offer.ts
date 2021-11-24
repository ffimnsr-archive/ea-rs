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

export interface Offer {
  id: string;
  userId: string;
  employerOrganizationId: string;
  employerId: string;
  isAccepted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListOffersRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListOffersResponse {
  success: boolean;
  offers: Offer[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetOfferRequest {
  offerId: string;
}

export interface GetOfferResponse {
  success: boolean;
  message: string | undefined;
  offer?: Offer | undefined;
}

export interface CreateOfferRequest {
  requestId: string;
  userId: string;
  employerOrganizationId: string;
  employerId: string;
  isAccepted: boolean;
}

export interface CreateOfferResponse {
  success: boolean;
  message: string | undefined;
  offer?: Offer | undefined;
}

export interface DeleteOfferRequest {
  requestId: string;
  offerId: string;
}

export interface DeleteOfferResponse {
  success: boolean;
  message: string | undefined;
  offer?: Offer | undefined;
}

export interface UpdateOfferRequest {
  requestId: string;
  offerId: string;
  userId?: string | undefined;
  employerOrganizationId?: string | undefined;
  employerId?: string | undefined;
  isAccepted?: boolean | undefined;
}

export interface UpdateOfferResponse {
  success: boolean;
  message: string | undefined;
  offer?: Offer | undefined;
}

const baseOffer: object = {
  id: "",
  userId: "",
  employerOrganizationId: "",
  employerId: "",
  isAccepted: false,
};

export const Offer = {
  encode(message: Offer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.employerOrganizationId !== "") {
      writer.uint32(26).string(message.employerOrganizationId);
    }
    if (message.employerId !== "") {
      writer.uint32(34).string(message.employerId);
    }
    if (message.isAccepted === true) {
      writer.uint32(40).bool(message.isAccepted);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Offer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOffer } as Offer;
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
          message.employerOrganizationId = reader.string();
          break;
        case 4:
          message.employerId = reader.string();
          break;
        case 5:
          message.isAccepted = reader.bool();
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

  fromJSON(object: any): Offer {
    const message = { ...baseOffer } as Offer;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.employerOrganizationId =
      object.employerOrganizationId !== undefined &&
      object.employerOrganizationId !== null
        ? String(object.employerOrganizationId)
        : "";
    message.employerId =
      object.employerId !== undefined && object.employerId !== null
        ? String(object.employerId)
        : "";
    message.isAccepted =
      object.isAccepted !== undefined && object.isAccepted !== null
        ? Boolean(object.isAccepted)
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

  toJSON(message: Offer): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.userId !== undefined && (obj.userId = message.userId);
    message.employerOrganizationId !== undefined &&
      (obj.employerOrganizationId = message.employerOrganizationId);
    message.employerId !== undefined && (obj.employerId = message.employerId);
    message.isAccepted !== undefined && (obj.isAccepted = message.isAccepted);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Offer>): Offer {
    const message = { ...baseOffer } as Offer;
    message.id = object.id ?? "";
    message.userId = object.userId ?? "";
    message.employerOrganizationId = object.employerOrganizationId ?? "";
    message.employerId = object.employerId ?? "";
    message.isAccepted = object.isAccepted ?? false;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListOffersRequest: object = { pageSize: 0, pageToken: "" };

export const ListOffersRequest = {
  encode(
    message: ListOffersRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOffersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListOffersRequest } as ListOffersRequest;
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

  fromJSON(object: any): ListOffersRequest {
    const message = { ...baseListOffersRequest } as ListOffersRequest;
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

  toJSON(message: ListOffersRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListOffersRequest>): ListOffersRequest {
    const message = { ...baseListOffersRequest } as ListOffersRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListOffersResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListOffersResponse = {
  encode(
    message: ListOffersResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.offers) {
      Offer.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOffersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListOffersResponse } as ListOffersResponse;
    message.offers = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.offers.push(Offer.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListOffersResponse {
    const message = { ...baseListOffersResponse } as ListOffersResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.offers = (object.offers ?? []).map((e: any) => Offer.fromJSON(e));
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

  toJSON(message: ListOffersResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.offers) {
      obj.offers = message.offers.map((e) => (e ? Offer.toJSON(e) : undefined));
    } else {
      obj.offers = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListOffersResponse>): ListOffersResponse {
    const message = { ...baseListOffersResponse } as ListOffersResponse;
    message.success = object.success ?? false;
    message.offers = (object.offers ?? []).map((e) => Offer.fromPartial(e));
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetOfferRequest: object = { offerId: "" };

export const GetOfferRequest = {
  encode(message: GetOfferRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.offerId !== "") {
      writer.uint32(10).string(message.offerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOfferRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetOfferRequest } as GetOfferRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.offerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetOfferRequest {
    const message = { ...baseGetOfferRequest } as GetOfferRequest;
    message.offerId =
      object.offerId !== undefined && object.offerId !== null
        ? String(object.offerId)
        : "";
    return message;
  },

  toJSON(message: GetOfferRequest): unknown {
    const obj: any = {};
    message.offerId !== undefined && (obj.offerId = message.offerId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetOfferRequest>): GetOfferRequest {
    const message = { ...baseGetOfferRequest } as GetOfferRequest;
    message.offerId = object.offerId ?? "";
    return message;
  },
};

const baseGetOfferResponse: object = { success: false };

export const GetOfferResponse = {
  encode(
    message: GetOfferResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.offer !== undefined) {
      Offer.encode(message.offer, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOfferResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetOfferResponse } as GetOfferResponse;
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
          message.offer = Offer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetOfferResponse {
    const message = { ...baseGetOfferResponse } as GetOfferResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.offer =
      object.offer !== undefined && object.offer !== null
        ? Offer.fromJSON(object.offer)
        : undefined;
    return message;
  },

  toJSON(message: GetOfferResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.offer !== undefined &&
      (obj.offer = message.offer ? Offer.toJSON(message.offer) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetOfferResponse>): GetOfferResponse {
    const message = { ...baseGetOfferResponse } as GetOfferResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.offer =
      object.offer !== undefined && object.offer !== null
        ? Offer.fromPartial(object.offer)
        : undefined;
    return message;
  },
};

const baseCreateOfferRequest: object = {
  requestId: "",
  userId: "",
  employerOrganizationId: "",
  employerId: "",
  isAccepted: false,
};

export const CreateOfferRequest = {
  encode(
    message: CreateOfferRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.employerOrganizationId !== "") {
      writer.uint32(26).string(message.employerOrganizationId);
    }
    if (message.employerId !== "") {
      writer.uint32(34).string(message.employerId);
    }
    if (message.isAccepted === true) {
      writer.uint32(40).bool(message.isAccepted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOfferRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateOfferRequest } as CreateOfferRequest;
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
          message.employerOrganizationId = reader.string();
          break;
        case 4:
          message.employerId = reader.string();
          break;
        case 5:
          message.isAccepted = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateOfferRequest {
    const message = { ...baseCreateOfferRequest } as CreateOfferRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.employerOrganizationId =
      object.employerOrganizationId !== undefined &&
      object.employerOrganizationId !== null
        ? String(object.employerOrganizationId)
        : "";
    message.employerId =
      object.employerId !== undefined && object.employerId !== null
        ? String(object.employerId)
        : "";
    message.isAccepted =
      object.isAccepted !== undefined && object.isAccepted !== null
        ? Boolean(object.isAccepted)
        : false;
    return message;
  },

  toJSON(message: CreateOfferRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.employerOrganizationId !== undefined &&
      (obj.employerOrganizationId = message.employerOrganizationId);
    message.employerId !== undefined && (obj.employerId = message.employerId);
    message.isAccepted !== undefined && (obj.isAccepted = message.isAccepted);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateOfferRequest>): CreateOfferRequest {
    const message = { ...baseCreateOfferRequest } as CreateOfferRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    message.employerOrganizationId = object.employerOrganizationId ?? "";
    message.employerId = object.employerId ?? "";
    message.isAccepted = object.isAccepted ?? false;
    return message;
  },
};

const baseCreateOfferResponse: object = { success: false };

export const CreateOfferResponse = {
  encode(
    message: CreateOfferResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.offer !== undefined) {
      Offer.encode(message.offer, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOfferResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateOfferResponse } as CreateOfferResponse;
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
          message.offer = Offer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateOfferResponse {
    const message = { ...baseCreateOfferResponse } as CreateOfferResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.offer =
      object.offer !== undefined && object.offer !== null
        ? Offer.fromJSON(object.offer)
        : undefined;
    return message;
  },

  toJSON(message: CreateOfferResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.offer !== undefined &&
      (obj.offer = message.offer ? Offer.toJSON(message.offer) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateOfferResponse>): CreateOfferResponse {
    const message = { ...baseCreateOfferResponse } as CreateOfferResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.offer =
      object.offer !== undefined && object.offer !== null
        ? Offer.fromPartial(object.offer)
        : undefined;
    return message;
  },
};

const baseDeleteOfferRequest: object = { requestId: "", offerId: "" };

export const DeleteOfferRequest = {
  encode(
    message: DeleteOfferRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.offerId !== "") {
      writer.uint32(10).string(message.offerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOfferRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteOfferRequest } as DeleteOfferRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.offerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteOfferRequest {
    const message = { ...baseDeleteOfferRequest } as DeleteOfferRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.offerId =
      object.offerId !== undefined && object.offerId !== null
        ? String(object.offerId)
        : "";
    return message;
  },

  toJSON(message: DeleteOfferRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.offerId !== undefined && (obj.offerId = message.offerId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteOfferRequest>): DeleteOfferRequest {
    const message = { ...baseDeleteOfferRequest } as DeleteOfferRequest;
    message.requestId = object.requestId ?? "";
    message.offerId = object.offerId ?? "";
    return message;
  },
};

const baseDeleteOfferResponse: object = { success: false };

export const DeleteOfferResponse = {
  encode(
    message: DeleteOfferResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.offer !== undefined) {
      Offer.encode(message.offer, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOfferResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteOfferResponse } as DeleteOfferResponse;
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
          message.offer = Offer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteOfferResponse {
    const message = { ...baseDeleteOfferResponse } as DeleteOfferResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.offer =
      object.offer !== undefined && object.offer !== null
        ? Offer.fromJSON(object.offer)
        : undefined;
    return message;
  },

  toJSON(message: DeleteOfferResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.offer !== undefined &&
      (obj.offer = message.offer ? Offer.toJSON(message.offer) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteOfferResponse>): DeleteOfferResponse {
    const message = { ...baseDeleteOfferResponse } as DeleteOfferResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.offer =
      object.offer !== undefined && object.offer !== null
        ? Offer.fromPartial(object.offer)
        : undefined;
    return message;
  },
};

const baseUpdateOfferRequest: object = { requestId: "", offerId: "" };

export const UpdateOfferRequest = {
  encode(
    message: UpdateOfferRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.offerId !== "") {
      writer.uint32(10).string(message.offerId);
    }
    if (message.userId !== undefined) {
      writer.uint32(18).string(message.userId);
    }
    if (message.employerOrganizationId !== undefined) {
      writer.uint32(26).string(message.employerOrganizationId);
    }
    if (message.employerId !== undefined) {
      writer.uint32(34).string(message.employerId);
    }
    if (message.isAccepted !== undefined) {
      writer.uint32(40).bool(message.isAccepted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOfferRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateOfferRequest } as UpdateOfferRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.offerId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.employerOrganizationId = reader.string();
          break;
        case 4:
          message.employerId = reader.string();
          break;
        case 5:
          message.isAccepted = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateOfferRequest {
    const message = { ...baseUpdateOfferRequest } as UpdateOfferRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.offerId =
      object.offerId !== undefined && object.offerId !== null
        ? String(object.offerId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : undefined;
    message.employerOrganizationId =
      object.employerOrganizationId !== undefined &&
      object.employerOrganizationId !== null
        ? String(object.employerOrganizationId)
        : undefined;
    message.employerId =
      object.employerId !== undefined && object.employerId !== null
        ? String(object.employerId)
        : undefined;
    message.isAccepted =
      object.isAccepted !== undefined && object.isAccepted !== null
        ? Boolean(object.isAccepted)
        : undefined;
    return message;
  },

  toJSON(message: UpdateOfferRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.offerId !== undefined && (obj.offerId = message.offerId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.employerOrganizationId !== undefined &&
      (obj.employerOrganizationId = message.employerOrganizationId);
    message.employerId !== undefined && (obj.employerId = message.employerId);
    message.isAccepted !== undefined && (obj.isAccepted = message.isAccepted);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateOfferRequest>): UpdateOfferRequest {
    const message = { ...baseUpdateOfferRequest } as UpdateOfferRequest;
    message.requestId = object.requestId ?? "";
    message.offerId = object.offerId ?? "";
    message.userId = object.userId ?? undefined;
    message.employerOrganizationId = object.employerOrganizationId ?? undefined;
    message.employerId = object.employerId ?? undefined;
    message.isAccepted = object.isAccepted ?? undefined;
    return message;
  },
};

const baseUpdateOfferResponse: object = { success: false };

export const UpdateOfferResponse = {
  encode(
    message: UpdateOfferResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.offer !== undefined) {
      Offer.encode(message.offer, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOfferResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateOfferResponse } as UpdateOfferResponse;
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
          message.offer = Offer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateOfferResponse {
    const message = { ...baseUpdateOfferResponse } as UpdateOfferResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.offer =
      object.offer !== undefined && object.offer !== null
        ? Offer.fromJSON(object.offer)
        : undefined;
    return message;
  },

  toJSON(message: UpdateOfferResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.offer !== undefined &&
      (obj.offer = message.offer ? Offer.toJSON(message.offer) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateOfferResponse>): UpdateOfferResponse {
    const message = { ...baseUpdateOfferResponse } as UpdateOfferResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.offer =
      object.offer !== undefined && object.offer !== null
        ? Offer.fromPartial(object.offer)
        : undefined;
    return message;
  },
};

export const OfferServiceService = {
  listOffers: {
    path: "/ea.OfferService/ListOffers",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListOffersRequest) =>
      Buffer.from(ListOffersRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListOffersRequest.decode(value),
    responseSerialize: (value: ListOffersResponse) =>
      Buffer.from(ListOffersResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListOffersResponse.decode(value),
  },
  getOffer: {
    path: "/ea.OfferService/GetOffer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetOfferRequest) =>
      Buffer.from(GetOfferRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetOfferRequest.decode(value),
    responseSerialize: (value: GetOfferResponse) =>
      Buffer.from(GetOfferResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetOfferResponse.decode(value),
  },
  createOffer: {
    path: "/ea.OfferService/CreateOffer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateOfferRequest) =>
      Buffer.from(CreateOfferRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateOfferRequest.decode(value),
    responseSerialize: (value: CreateOfferResponse) =>
      Buffer.from(CreateOfferResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateOfferResponse.decode(value),
  },
  deleteOffer: {
    path: "/ea.OfferService/DeleteOffer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteOfferRequest) =>
      Buffer.from(DeleteOfferRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteOfferRequest.decode(value),
    responseSerialize: (value: DeleteOfferResponse) =>
      Buffer.from(DeleteOfferResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteOfferResponse.decode(value),
  },
  updateOffer: {
    path: "/ea.OfferService/UpdateOffer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateOfferRequest) =>
      Buffer.from(UpdateOfferRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateOfferRequest.decode(value),
    responseSerialize: (value: UpdateOfferResponse) =>
      Buffer.from(UpdateOfferResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateOfferResponse.decode(value),
  },
} as const;

export interface OfferServiceServer extends UntypedServiceImplementation {
  listOffers: handleUnaryCall<ListOffersRequest, ListOffersResponse>;
  getOffer: handleUnaryCall<GetOfferRequest, GetOfferResponse>;
  createOffer: handleUnaryCall<CreateOfferRequest, CreateOfferResponse>;
  deleteOffer: handleUnaryCall<DeleteOfferRequest, DeleteOfferResponse>;
  updateOffer: handleUnaryCall<UpdateOfferRequest, UpdateOfferResponse>;
}

export interface OfferServiceClient extends Client {
  listOffers(
    request: ListOffersRequest,
    callback: (error: ServiceError | null, response: ListOffersResponse) => void,
  ): ClientUnaryCall;
  listOffers(
    request: ListOffersRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListOffersResponse) => void,
  ): ClientUnaryCall;
  listOffers(
    request: ListOffersRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListOffersResponse) => void,
  ): ClientUnaryCall;
  getOffer(
    request: GetOfferRequest,
    callback: (error: ServiceError | null, response: GetOfferResponse) => void,
  ): ClientUnaryCall;
  getOffer(
    request: GetOfferRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetOfferResponse) => void,
  ): ClientUnaryCall;
  getOffer(
    request: GetOfferRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetOfferResponse) => void,
  ): ClientUnaryCall;
  createOffer(
    request: CreateOfferRequest,
    callback: (error: ServiceError | null, response: CreateOfferResponse) => void,
  ): ClientUnaryCall;
  createOffer(
    request: CreateOfferRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateOfferResponse) => void,
  ): ClientUnaryCall;
  createOffer(
    request: CreateOfferRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateOfferResponse) => void,
  ): ClientUnaryCall;
  deleteOffer(
    request: DeleteOfferRequest,
    callback: (error: ServiceError | null, response: DeleteOfferResponse) => void,
  ): ClientUnaryCall;
  deleteOffer(
    request: DeleteOfferRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteOfferResponse) => void,
  ): ClientUnaryCall;
  deleteOffer(
    request: DeleteOfferRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteOfferResponse) => void,
  ): ClientUnaryCall;
  updateOffer(
    request: UpdateOfferRequest,
    callback: (error: ServiceError | null, response: UpdateOfferResponse) => void,
  ): ClientUnaryCall;
  updateOffer(
    request: UpdateOfferRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateOfferResponse) => void,
  ): ClientUnaryCall;
  updateOffer(
    request: UpdateOfferRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateOfferResponse) => void,
  ): ClientUnaryCall;
}

export const OfferServiceClient = makeGenericClientConstructor(
  OfferServiceService,
  "ea.OfferService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): OfferServiceClient;
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
