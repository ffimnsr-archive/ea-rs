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

export interface Country {
  id: string;
  name: string;
  alpha2: string;
  alpha3: string;
  phoneCode: string;
  currencyCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListCountriesRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListCountriesResponse {
  success: boolean;
  countries: Country[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetCountryRequest {
  countryId: string;
}

export interface GetCountryResponse {
  success: boolean;
  message: string | undefined;
  country?: Country | undefined;
}

export interface CreateCountryRequest {
  requestId: string;
  name: string;
  alpha2: string;
  alpha3: string;
  phoneCode: string;
  currencyCode: string;
}

export interface CreateCountryResponse {
  success: boolean;
  message: string | undefined;
  country?: Country | undefined;
}

export interface DeleteCountryRequest {
  requestId: string;
  countryId: string;
}

export interface DeleteCountryResponse {
  success: boolean;
  message: string | undefined;
  country?: Country | undefined;
}

export interface UpdateCountryRequest {
  requestId: string;
  countryId: string;
  name?: string | undefined;
  alpha2?: string | undefined;
  alpha3?: string | undefined;
  phoneCode?: string | undefined;
  currencyCode?: string | undefined;
}

export interface UpdateCountryResponse {
  success: boolean;
  message: string | undefined;
  country?: Country | undefined;
}

const baseCountry: object = {
  id: "",
  name: "",
  alpha2: "",
  alpha3: "",
  phoneCode: "",
  currencyCode: "",
};

export const Country = {
  encode(message: Country, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.alpha2 !== "") {
      writer.uint32(26).string(message.alpha2);
    }
    if (message.alpha3 !== "") {
      writer.uint32(34).string(message.alpha3);
    }
    if (message.phoneCode !== "") {
      writer.uint32(42).string(message.phoneCode);
    }
    if (message.currencyCode !== "") {
      writer.uint32(50).string(message.currencyCode);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Country {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCountry } as Country;
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
          message.alpha2 = reader.string();
          break;
        case 4:
          message.alpha3 = reader.string();
          break;
        case 5:
          message.phoneCode = reader.string();
          break;
        case 6:
          message.currencyCode = reader.string();
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

  fromJSON(object: any): Country {
    const message = { ...baseCountry } as Country;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : "";
    message.alpha2 =
      object.alpha2 !== undefined && object.alpha2 !== null ? String(object.alpha2) : "";
    message.alpha3 =
      object.alpha3 !== undefined && object.alpha3 !== null ? String(object.alpha3) : "";
    message.phoneCode =
      object.phoneCode !== undefined && object.phoneCode !== null
        ? String(object.phoneCode)
        : "";
    message.currencyCode =
      object.currencyCode !== undefined && object.currencyCode !== null
        ? String(object.currencyCode)
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

  toJSON(message: Country): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.alpha2 !== undefined && (obj.alpha2 = message.alpha2);
    message.alpha3 !== undefined && (obj.alpha3 = message.alpha3);
    message.phoneCode !== undefined && (obj.phoneCode = message.phoneCode);
    message.currencyCode !== undefined && (obj.currencyCode = message.currencyCode);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Country>): Country {
    const message = { ...baseCountry } as Country;
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.alpha2 = object.alpha2 ?? "";
    message.alpha3 = object.alpha3 ?? "";
    message.phoneCode = object.phoneCode ?? "";
    message.currencyCode = object.currencyCode ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListCountriesRequest: object = { pageSize: 0, pageToken: "" };

export const ListCountriesRequest = {
  encode(
    message: ListCountriesRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListCountriesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListCountriesRequest } as ListCountriesRequest;
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

  fromJSON(object: any): ListCountriesRequest {
    const message = { ...baseListCountriesRequest } as ListCountriesRequest;
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

  toJSON(message: ListCountriesRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListCountriesRequest>): ListCountriesRequest {
    const message = { ...baseListCountriesRequest } as ListCountriesRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListCountriesResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListCountriesResponse = {
  encode(
    message: ListCountriesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.countries) {
      Country.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListCountriesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListCountriesResponse } as ListCountriesResponse;
    message.countries = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.countries.push(Country.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListCountriesResponse {
    const message = { ...baseListCountriesResponse } as ListCountriesResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.countries = (object.countries ?? []).map((e: any) => Country.fromJSON(e));
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

  toJSON(message: ListCountriesResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.countries) {
      obj.countries = message.countries.map((e) => (e ? Country.toJSON(e) : undefined));
    } else {
      obj.countries = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListCountriesResponse>): ListCountriesResponse {
    const message = { ...baseListCountriesResponse } as ListCountriesResponse;
    message.success = object.success ?? false;
    message.countries = (object.countries ?? []).map((e) => Country.fromPartial(e));
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetCountryRequest: object = { countryId: "" };

export const GetCountryRequest = {
  encode(
    message: GetCountryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.countryId !== "") {
      writer.uint32(10).string(message.countryId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCountryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetCountryRequest } as GetCountryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.countryId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCountryRequest {
    const message = { ...baseGetCountryRequest } as GetCountryRequest;
    message.countryId =
      object.countryId !== undefined && object.countryId !== null
        ? String(object.countryId)
        : "";
    return message;
  },

  toJSON(message: GetCountryRequest): unknown {
    const obj: any = {};
    message.countryId !== undefined && (obj.countryId = message.countryId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetCountryRequest>): GetCountryRequest {
    const message = { ...baseGetCountryRequest } as GetCountryRequest;
    message.countryId = object.countryId ?? "";
    return message;
  },
};

const baseGetCountryResponse: object = { success: false };

export const GetCountryResponse = {
  encode(
    message: GetCountryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.country !== undefined) {
      Country.encode(message.country, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCountryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetCountryResponse } as GetCountryResponse;
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
          message.country = Country.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCountryResponse {
    const message = { ...baseGetCountryResponse } as GetCountryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.country =
      object.country !== undefined && object.country !== null
        ? Country.fromJSON(object.country)
        : undefined;
    return message;
  },

  toJSON(message: GetCountryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.country !== undefined &&
      (obj.country = message.country ? Country.toJSON(message.country) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetCountryResponse>): GetCountryResponse {
    const message = { ...baseGetCountryResponse } as GetCountryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.country =
      object.country !== undefined && object.country !== null
        ? Country.fromPartial(object.country)
        : undefined;
    return message;
  },
};

const baseCreateCountryRequest: object = {
  requestId: "",
  name: "",
  alpha2: "",
  alpha3: "",
  phoneCode: "",
  currencyCode: "",
};

export const CreateCountryRequest = {
  encode(
    message: CreateCountryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.alpha2 !== "") {
      writer.uint32(26).string(message.alpha2);
    }
    if (message.alpha3 !== "") {
      writer.uint32(34).string(message.alpha3);
    }
    if (message.phoneCode !== "") {
      writer.uint32(42).string(message.phoneCode);
    }
    if (message.currencyCode !== "") {
      writer.uint32(50).string(message.currencyCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCountryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateCountryRequest } as CreateCountryRequest;
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
          message.alpha2 = reader.string();
          break;
        case 4:
          message.alpha3 = reader.string();
          break;
        case 5:
          message.phoneCode = reader.string();
          break;
        case 6:
          message.currencyCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateCountryRequest {
    const message = { ...baseCreateCountryRequest } as CreateCountryRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : "";
    message.alpha2 =
      object.alpha2 !== undefined && object.alpha2 !== null ? String(object.alpha2) : "";
    message.alpha3 =
      object.alpha3 !== undefined && object.alpha3 !== null ? String(object.alpha3) : "";
    message.phoneCode =
      object.phoneCode !== undefined && object.phoneCode !== null
        ? String(object.phoneCode)
        : "";
    message.currencyCode =
      object.currencyCode !== undefined && object.currencyCode !== null
        ? String(object.currencyCode)
        : "";
    return message;
  },

  toJSON(message: CreateCountryRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.name !== undefined && (obj.name = message.name);
    message.alpha2 !== undefined && (obj.alpha2 = message.alpha2);
    message.alpha3 !== undefined && (obj.alpha3 = message.alpha3);
    message.phoneCode !== undefined && (obj.phoneCode = message.phoneCode);
    message.currencyCode !== undefined && (obj.currencyCode = message.currencyCode);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateCountryRequest>): CreateCountryRequest {
    const message = { ...baseCreateCountryRequest } as CreateCountryRequest;
    message.requestId = object.requestId ?? "";
    message.name = object.name ?? "";
    message.alpha2 = object.alpha2 ?? "";
    message.alpha3 = object.alpha3 ?? "";
    message.phoneCode = object.phoneCode ?? "";
    message.currencyCode = object.currencyCode ?? "";
    return message;
  },
};

const baseCreateCountryResponse: object = { success: false };

export const CreateCountryResponse = {
  encode(
    message: CreateCountryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.country !== undefined) {
      Country.encode(message.country, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateCountryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateCountryResponse } as CreateCountryResponse;
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
          message.country = Country.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateCountryResponse {
    const message = { ...baseCreateCountryResponse } as CreateCountryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.country =
      object.country !== undefined && object.country !== null
        ? Country.fromJSON(object.country)
        : undefined;
    return message;
  },

  toJSON(message: CreateCountryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.country !== undefined &&
      (obj.country = message.country ? Country.toJSON(message.country) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateCountryResponse>): CreateCountryResponse {
    const message = { ...baseCreateCountryResponse } as CreateCountryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.country =
      object.country !== undefined && object.country !== null
        ? Country.fromPartial(object.country)
        : undefined;
    return message;
  },
};

const baseDeleteCountryRequest: object = { requestId: "", countryId: "" };

export const DeleteCountryRequest = {
  encode(
    message: DeleteCountryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.countryId !== "") {
      writer.uint32(10).string(message.countryId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteCountryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteCountryRequest } as DeleteCountryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.countryId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteCountryRequest {
    const message = { ...baseDeleteCountryRequest } as DeleteCountryRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.countryId =
      object.countryId !== undefined && object.countryId !== null
        ? String(object.countryId)
        : "";
    return message;
  },

  toJSON(message: DeleteCountryRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.countryId !== undefined && (obj.countryId = message.countryId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteCountryRequest>): DeleteCountryRequest {
    const message = { ...baseDeleteCountryRequest } as DeleteCountryRequest;
    message.requestId = object.requestId ?? "";
    message.countryId = object.countryId ?? "";
    return message;
  },
};

const baseDeleteCountryResponse: object = { success: false };

export const DeleteCountryResponse = {
  encode(
    message: DeleteCountryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.country !== undefined) {
      Country.encode(message.country, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteCountryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteCountryResponse } as DeleteCountryResponse;
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
          message.country = Country.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteCountryResponse {
    const message = { ...baseDeleteCountryResponse } as DeleteCountryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.country =
      object.country !== undefined && object.country !== null
        ? Country.fromJSON(object.country)
        : undefined;
    return message;
  },

  toJSON(message: DeleteCountryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.country !== undefined &&
      (obj.country = message.country ? Country.toJSON(message.country) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteCountryResponse>): DeleteCountryResponse {
    const message = { ...baseDeleteCountryResponse } as DeleteCountryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.country =
      object.country !== undefined && object.country !== null
        ? Country.fromPartial(object.country)
        : undefined;
    return message;
  },
};

const baseUpdateCountryRequest: object = { requestId: "", countryId: "" };

export const UpdateCountryRequest = {
  encode(
    message: UpdateCountryRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.countryId !== "") {
      writer.uint32(10).string(message.countryId);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.alpha2 !== undefined) {
      writer.uint32(26).string(message.alpha2);
    }
    if (message.alpha3 !== undefined) {
      writer.uint32(34).string(message.alpha3);
    }
    if (message.phoneCode !== undefined) {
      writer.uint32(42).string(message.phoneCode);
    }
    if (message.currencyCode !== undefined) {
      writer.uint32(50).string(message.currencyCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCountryRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateCountryRequest } as UpdateCountryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.countryId = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.alpha2 = reader.string();
          break;
        case 4:
          message.alpha3 = reader.string();
          break;
        case 5:
          message.phoneCode = reader.string();
          break;
        case 6:
          message.currencyCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateCountryRequest {
    const message = { ...baseUpdateCountryRequest } as UpdateCountryRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.countryId =
      object.countryId !== undefined && object.countryId !== null
        ? String(object.countryId)
        : "";
    message.name =
      object.name !== undefined && object.name !== null ? String(object.name) : undefined;
    message.alpha2 =
      object.alpha2 !== undefined && object.alpha2 !== null
        ? String(object.alpha2)
        : undefined;
    message.alpha3 =
      object.alpha3 !== undefined && object.alpha3 !== null
        ? String(object.alpha3)
        : undefined;
    message.phoneCode =
      object.phoneCode !== undefined && object.phoneCode !== null
        ? String(object.phoneCode)
        : undefined;
    message.currencyCode =
      object.currencyCode !== undefined && object.currencyCode !== null
        ? String(object.currencyCode)
        : undefined;
    return message;
  },

  toJSON(message: UpdateCountryRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.countryId !== undefined && (obj.countryId = message.countryId);
    message.name !== undefined && (obj.name = message.name);
    message.alpha2 !== undefined && (obj.alpha2 = message.alpha2);
    message.alpha3 !== undefined && (obj.alpha3 = message.alpha3);
    message.phoneCode !== undefined && (obj.phoneCode = message.phoneCode);
    message.currencyCode !== undefined && (obj.currencyCode = message.currencyCode);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateCountryRequest>): UpdateCountryRequest {
    const message = { ...baseUpdateCountryRequest } as UpdateCountryRequest;
    message.requestId = object.requestId ?? "";
    message.countryId = object.countryId ?? "";
    message.name = object.name ?? undefined;
    message.alpha2 = object.alpha2 ?? undefined;
    message.alpha3 = object.alpha3 ?? undefined;
    message.phoneCode = object.phoneCode ?? undefined;
    message.currencyCode = object.currencyCode ?? undefined;
    return message;
  },
};

const baseUpdateCountryResponse: object = { success: false };

export const UpdateCountryResponse = {
  encode(
    message: UpdateCountryResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.country !== undefined) {
      Country.encode(message.country, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateCountryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateCountryResponse } as UpdateCountryResponse;
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
          message.country = Country.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateCountryResponse {
    const message = { ...baseUpdateCountryResponse } as UpdateCountryResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.country =
      object.country !== undefined && object.country !== null
        ? Country.fromJSON(object.country)
        : undefined;
    return message;
  },

  toJSON(message: UpdateCountryResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.country !== undefined &&
      (obj.country = message.country ? Country.toJSON(message.country) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateCountryResponse>): UpdateCountryResponse {
    const message = { ...baseUpdateCountryResponse } as UpdateCountryResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.country =
      object.country !== undefined && object.country !== null
        ? Country.fromPartial(object.country)
        : undefined;
    return message;
  },
};

export const CountryServiceService = {
  listCountries: {
    path: "/ea.CountryService/ListCountries",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListCountriesRequest) =>
      Buffer.from(ListCountriesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListCountriesRequest.decode(value),
    responseSerialize: (value: ListCountriesResponse) =>
      Buffer.from(ListCountriesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListCountriesResponse.decode(value),
  },
  getCountry: {
    path: "/ea.CountryService/GetCountry",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetCountryRequest) =>
      Buffer.from(GetCountryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetCountryRequest.decode(value),
    responseSerialize: (value: GetCountryResponse) =>
      Buffer.from(GetCountryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetCountryResponse.decode(value),
  },
  createCountry: {
    path: "/ea.CountryService/CreateCountry",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateCountryRequest) =>
      Buffer.from(CreateCountryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateCountryRequest.decode(value),
    responseSerialize: (value: CreateCountryResponse) =>
      Buffer.from(CreateCountryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateCountryResponse.decode(value),
  },
  deleteCountry: {
    path: "/ea.CountryService/DeleteCountry",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteCountryRequest) =>
      Buffer.from(DeleteCountryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteCountryRequest.decode(value),
    responseSerialize: (value: DeleteCountryResponse) =>
      Buffer.from(DeleteCountryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteCountryResponse.decode(value),
  },
  updateCountry: {
    path: "/ea.CountryService/UpdateCountry",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateCountryRequest) =>
      Buffer.from(UpdateCountryRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateCountryRequest.decode(value),
    responseSerialize: (value: UpdateCountryResponse) =>
      Buffer.from(UpdateCountryResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateCountryResponse.decode(value),
  },
} as const;

export interface CountryServiceServer extends UntypedServiceImplementation {
  listCountries: handleUnaryCall<ListCountriesRequest, ListCountriesResponse>;
  getCountry: handleUnaryCall<GetCountryRequest, GetCountryResponse>;
  createCountry: handleUnaryCall<CreateCountryRequest, CreateCountryResponse>;
  deleteCountry: handleUnaryCall<DeleteCountryRequest, DeleteCountryResponse>;
  updateCountry: handleUnaryCall<UpdateCountryRequest, UpdateCountryResponse>;
}

export interface CountryServiceClient extends Client {
  listCountries(
    request: ListCountriesRequest,
    callback: (error: ServiceError | null, response: ListCountriesResponse) => void,
  ): ClientUnaryCall;
  listCountries(
    request: ListCountriesRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListCountriesResponse) => void,
  ): ClientUnaryCall;
  listCountries(
    request: ListCountriesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListCountriesResponse) => void,
  ): ClientUnaryCall;
  getCountry(
    request: GetCountryRequest,
    callback: (error: ServiceError | null, response: GetCountryResponse) => void,
  ): ClientUnaryCall;
  getCountry(
    request: GetCountryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetCountryResponse) => void,
  ): ClientUnaryCall;
  getCountry(
    request: GetCountryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetCountryResponse) => void,
  ): ClientUnaryCall;
  createCountry(
    request: CreateCountryRequest,
    callback: (error: ServiceError | null, response: CreateCountryResponse) => void,
  ): ClientUnaryCall;
  createCountry(
    request: CreateCountryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateCountryResponse) => void,
  ): ClientUnaryCall;
  createCountry(
    request: CreateCountryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateCountryResponse) => void,
  ): ClientUnaryCall;
  deleteCountry(
    request: DeleteCountryRequest,
    callback: (error: ServiceError | null, response: DeleteCountryResponse) => void,
  ): ClientUnaryCall;
  deleteCountry(
    request: DeleteCountryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteCountryResponse) => void,
  ): ClientUnaryCall;
  deleteCountry(
    request: DeleteCountryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteCountryResponse) => void,
  ): ClientUnaryCall;
  updateCountry(
    request: UpdateCountryRequest,
    callback: (error: ServiceError | null, response: UpdateCountryResponse) => void,
  ): ClientUnaryCall;
  updateCountry(
    request: UpdateCountryRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateCountryResponse) => void,
  ): ClientUnaryCall;
  updateCountry(
    request: UpdateCountryRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateCountryResponse) => void,
  ): ClientUnaryCall;
}

export const CountryServiceClient = makeGenericClientConstructor(
  CountryServiceService,
  "ea.CountryService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): CountryServiceClient;
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
