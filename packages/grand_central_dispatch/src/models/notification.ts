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

export interface Notification {
  id: string;
  userId: string;
  title: string;
  description: string;
  class: number;
  isRead: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ListNotificationsRequest {
  pageSize: number;
  pageToken: string;
}

export interface ListNotificationsResponse {
  success: boolean;
  notifications: Notification[];
  nextPageToken: string;
  totalSize: number;
}

export interface GetNotificationRequest {
  notificationId: string;
}

export interface GetNotificationResponse {
  success: boolean;
  message: string | undefined;
  notification?: Notification | undefined;
}

export interface CreateNotificationRequest {
  requestId: string;
  userId: string;
  title: string;
  description: string;
  class: number;
  isRead: boolean;
  isPublished: boolean;
  isDeleted: boolean;
}

export interface CreateNotificationResponse {
  success: boolean;
  message: string | undefined;
  notification?: Notification | undefined;
}

export interface DeleteNotificationRequest {
  requestId: string;
  notificationId: string;
}

export interface DeleteNotificationResponse {
  success: boolean;
  message: string | undefined;
  notification?: Notification | undefined;
}

export interface UpdateNotificationRequest {
  requestId: string;
  notificationId: string;
  userId?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  class?: number | undefined;
  isRead?: boolean | undefined;
  isPublished?: boolean | undefined;
  isDeleted?: boolean | undefined;
}

export interface UpdateNotificationResponse {
  success: boolean;
  message: string | undefined;
  notification?: Notification | undefined;
}

const baseNotification: object = {
  id: "",
  userId: "",
  title: "",
  description: "",
  class: 0,
  isRead: false,
  isPublished: false,
  isDeleted: false,
};

export const Notification = {
  encode(message: Notification, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.class !== 0) {
      writer.uint32(40).int32(message.class);
    }
    if (message.isRead === true) {
      writer.uint32(48).bool(message.isRead);
    }
    if (message.isPublished === true) {
      writer.uint32(56).bool(message.isPublished);
    }
    if (message.isDeleted === true) {
      writer.uint32(64).bool(message.isDeleted);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(90).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Notification {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNotification } as Notification;
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
          message.title = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.class = reader.int32();
          break;
        case 6:
          message.isRead = reader.bool();
          break;
        case 7:
          message.isPublished = reader.bool();
          break;
        case 8:
          message.isDeleted = reader.bool();
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

  fromJSON(object: any): Notification {
    const message = { ...baseNotification } as Notification;
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.title =
      object.title !== undefined && object.title !== null ? String(object.title) : "";
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : "";
    message.class =
      object.class !== undefined && object.class !== null ? Number(object.class) : 0;
    message.isRead =
      object.isRead !== undefined && object.isRead !== null
        ? Boolean(object.isRead)
        : false;
    message.isPublished =
      object.isPublished !== undefined && object.isPublished !== null
        ? Boolean(object.isPublished)
        : false;
    message.isDeleted =
      object.isDeleted !== undefined && object.isDeleted !== null
        ? Boolean(object.isDeleted)
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

  toJSON(message: Notification): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.userId !== undefined && (obj.userId = message.userId);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.class !== undefined && (obj.class = message.class);
    message.isRead !== undefined && (obj.isRead = message.isRead);
    message.isPublished !== undefined && (obj.isPublished = message.isPublished);
    message.isDeleted !== undefined && (obj.isDeleted = message.isDeleted);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<Notification>): Notification {
    const message = { ...baseNotification } as Notification;
    message.id = object.id ?? "";
    message.userId = object.userId ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.class = object.class ?? 0;
    message.isRead = object.isRead ?? false;
    message.isPublished = object.isPublished ?? false;
    message.isDeleted = object.isDeleted ?? false;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

const baseListNotificationsRequest: object = { pageSize: 0, pageToken: "" };

export const ListNotificationsRequest = {
  encode(
    message: ListNotificationsRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ListNotificationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListNotificationsRequest } as ListNotificationsRequest;
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

  fromJSON(object: any): ListNotificationsRequest {
    const message = { ...baseListNotificationsRequest } as ListNotificationsRequest;
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

  toJSON(message: ListNotificationsRequest): unknown {
    const obj: any = {};
    message.pageSize !== undefined && (obj.pageSize = message.pageSize);
    message.pageToken !== undefined && (obj.pageToken = message.pageToken);
    return obj;
  },

  fromPartial(object: DeepPartial<ListNotificationsRequest>): ListNotificationsRequest {
    const message = { ...baseListNotificationsRequest } as ListNotificationsRequest;
    message.pageSize = object.pageSize ?? 0;
    message.pageToken = object.pageToken ?? "";
    return message;
  },
};

const baseListNotificationsResponse: object = {
  success: false,
  nextPageToken: "",
  totalSize: 0,
};

export const ListNotificationsResponse = {
  encode(
    message: ListNotificationsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.notifications) {
      Notification.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextPageToken !== "") {
      writer.uint32(42).string(message.nextPageToken);
    }
    if (message.totalSize !== 0) {
      writer.uint32(48).int64(message.totalSize);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListNotificationsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseListNotificationsResponse } as ListNotificationsResponse;
    message.notifications = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.notifications.push(Notification.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ListNotificationsResponse {
    const message = { ...baseListNotificationsResponse } as ListNotificationsResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.notifications = (object.notifications ?? []).map((e: any) =>
      Notification.fromJSON(e),
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

  toJSON(message: ListNotificationsResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    if (message.notifications) {
      obj.notifications = message.notifications.map((e) =>
        e ? Notification.toJSON(e) : undefined,
      );
    } else {
      obj.notifications = [];
    }
    message.nextPageToken !== undefined && (obj.nextPageToken = message.nextPageToken);
    message.totalSize !== undefined && (obj.totalSize = message.totalSize);
    return obj;
  },

  fromPartial(object: DeepPartial<ListNotificationsResponse>): ListNotificationsResponse {
    const message = { ...baseListNotificationsResponse } as ListNotificationsResponse;
    message.success = object.success ?? false;
    message.notifications = (object.notifications ?? []).map((e) =>
      Notification.fromPartial(e),
    );
    message.nextPageToken = object.nextPageToken ?? "";
    message.totalSize = object.totalSize ?? 0;
    return message;
  },
};

const baseGetNotificationRequest: object = { notificationId: "" };

export const GetNotificationRequest = {
  encode(
    message: GetNotificationRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.notificationId !== "") {
      writer.uint32(10).string(message.notificationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNotificationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetNotificationRequest } as GetNotificationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.notificationId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetNotificationRequest {
    const message = { ...baseGetNotificationRequest } as GetNotificationRequest;
    message.notificationId =
      object.notificationId !== undefined && object.notificationId !== null
        ? String(object.notificationId)
        : "";
    return message;
  },

  toJSON(message: GetNotificationRequest): unknown {
    const obj: any = {};
    message.notificationId !== undefined && (obj.notificationId = message.notificationId);
    return obj;
  },

  fromPartial(object: DeepPartial<GetNotificationRequest>): GetNotificationRequest {
    const message = { ...baseGetNotificationRequest } as GetNotificationRequest;
    message.notificationId = object.notificationId ?? "";
    return message;
  },
};

const baseGetNotificationResponse: object = { success: false };

export const GetNotificationResponse = {
  encode(
    message: GetNotificationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.notification !== undefined) {
      Notification.encode(message.notification, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNotificationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetNotificationResponse } as GetNotificationResponse;
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
          message.notification = Notification.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetNotificationResponse {
    const message = { ...baseGetNotificationResponse } as GetNotificationResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.notification =
      object.notification !== undefined && object.notification !== null
        ? Notification.fromJSON(object.notification)
        : undefined;
    return message;
  },

  toJSON(message: GetNotificationResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.notification !== undefined &&
      (obj.notification = message.notification
        ? Notification.toJSON(message.notification)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<GetNotificationResponse>): GetNotificationResponse {
    const message = { ...baseGetNotificationResponse } as GetNotificationResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.notification =
      object.notification !== undefined && object.notification !== null
        ? Notification.fromPartial(object.notification)
        : undefined;
    return message;
  },
};

const baseCreateNotificationRequest: object = {
  requestId: "",
  userId: "",
  title: "",
  description: "",
  class: 0,
  isRead: false,
  isPublished: false,
  isDeleted: false,
};

export const CreateNotificationRequest = {
  encode(
    message: CreateNotificationRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.class !== 0) {
      writer.uint32(40).int32(message.class);
    }
    if (message.isRead === true) {
      writer.uint32(48).bool(message.isRead);
    }
    if (message.isPublished === true) {
      writer.uint32(56).bool(message.isPublished);
    }
    if (message.isDeleted === true) {
      writer.uint32(64).bool(message.isDeleted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateNotificationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateNotificationRequest } as CreateNotificationRequest;
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
          message.title = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.class = reader.int32();
          break;
        case 6:
          message.isRead = reader.bool();
          break;
        case 7:
          message.isPublished = reader.bool();
          break;
        case 8:
          message.isDeleted = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateNotificationRequest {
    const message = { ...baseCreateNotificationRequest } as CreateNotificationRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null ? String(object.userId) : "";
    message.title =
      object.title !== undefined && object.title !== null ? String(object.title) : "";
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : "";
    message.class =
      object.class !== undefined && object.class !== null ? Number(object.class) : 0;
    message.isRead =
      object.isRead !== undefined && object.isRead !== null
        ? Boolean(object.isRead)
        : false;
    message.isPublished =
      object.isPublished !== undefined && object.isPublished !== null
        ? Boolean(object.isPublished)
        : false;
    message.isDeleted =
      object.isDeleted !== undefined && object.isDeleted !== null
        ? Boolean(object.isDeleted)
        : false;
    return message;
  },

  toJSON(message: CreateNotificationRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.class !== undefined && (obj.class = message.class);
    message.isRead !== undefined && (obj.isRead = message.isRead);
    message.isPublished !== undefined && (obj.isPublished = message.isPublished);
    message.isDeleted !== undefined && (obj.isDeleted = message.isDeleted);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateNotificationRequest>): CreateNotificationRequest {
    const message = { ...baseCreateNotificationRequest } as CreateNotificationRequest;
    message.requestId = object.requestId ?? "";
    message.userId = object.userId ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.class = object.class ?? 0;
    message.isRead = object.isRead ?? false;
    message.isPublished = object.isPublished ?? false;
    message.isDeleted = object.isDeleted ?? false;
    return message;
  },
};

const baseCreateNotificationResponse: object = { success: false };

export const CreateNotificationResponse = {
  encode(
    message: CreateNotificationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.notification !== undefined) {
      Notification.encode(message.notification, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateNotificationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateNotificationResponse } as CreateNotificationResponse;
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
          message.notification = Notification.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateNotificationResponse {
    const message = { ...baseCreateNotificationResponse } as CreateNotificationResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.notification =
      object.notification !== undefined && object.notification !== null
        ? Notification.fromJSON(object.notification)
        : undefined;
    return message;
  },

  toJSON(message: CreateNotificationResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.notification !== undefined &&
      (obj.notification = message.notification
        ? Notification.toJSON(message.notification)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateNotificationResponse>,
  ): CreateNotificationResponse {
    const message = { ...baseCreateNotificationResponse } as CreateNotificationResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.notification =
      object.notification !== undefined && object.notification !== null
        ? Notification.fromPartial(object.notification)
        : undefined;
    return message;
  },
};

const baseDeleteNotificationRequest: object = { requestId: "", notificationId: "" };

export const DeleteNotificationRequest = {
  encode(
    message: DeleteNotificationRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.notificationId !== "") {
      writer.uint32(10).string(message.notificationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteNotificationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteNotificationRequest } as DeleteNotificationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.notificationId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteNotificationRequest {
    const message = { ...baseDeleteNotificationRequest } as DeleteNotificationRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.notificationId =
      object.notificationId !== undefined && object.notificationId !== null
        ? String(object.notificationId)
        : "";
    return message;
  },

  toJSON(message: DeleteNotificationRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.notificationId !== undefined && (obj.notificationId = message.notificationId);
    return obj;
  },

  fromPartial(object: DeepPartial<DeleteNotificationRequest>): DeleteNotificationRequest {
    const message = { ...baseDeleteNotificationRequest } as DeleteNotificationRequest;
    message.requestId = object.requestId ?? "";
    message.notificationId = object.notificationId ?? "";
    return message;
  },
};

const baseDeleteNotificationResponse: object = { success: false };

export const DeleteNotificationResponse = {
  encode(
    message: DeleteNotificationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.notification !== undefined) {
      Notification.encode(message.notification, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteNotificationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeleteNotificationResponse } as DeleteNotificationResponse;
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
          message.notification = Notification.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteNotificationResponse {
    const message = { ...baseDeleteNotificationResponse } as DeleteNotificationResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.notification =
      object.notification !== undefined && object.notification !== null
        ? Notification.fromJSON(object.notification)
        : undefined;
    return message;
  },

  toJSON(message: DeleteNotificationResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.notification !== undefined &&
      (obj.notification = message.notification
        ? Notification.toJSON(message.notification)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DeleteNotificationResponse>,
  ): DeleteNotificationResponse {
    const message = { ...baseDeleteNotificationResponse } as DeleteNotificationResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.notification =
      object.notification !== undefined && object.notification !== null
        ? Notification.fromPartial(object.notification)
        : undefined;
    return message;
  },
};

const baseUpdateNotificationRequest: object = { requestId: "", notificationId: "" };

export const UpdateNotificationRequest = {
  encode(
    message: UpdateNotificationRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requestId !== "") {
      writer.uint32(338).string(message.requestId);
    }
    if (message.notificationId !== "") {
      writer.uint32(10).string(message.notificationId);
    }
    if (message.userId !== undefined) {
      writer.uint32(18).string(message.userId);
    }
    if (message.title !== undefined) {
      writer.uint32(26).string(message.title);
    }
    if (message.description !== undefined) {
      writer.uint32(34).string(message.description);
    }
    if (message.class !== undefined) {
      writer.uint32(40).int32(message.class);
    }
    if (message.isRead !== undefined) {
      writer.uint32(48).bool(message.isRead);
    }
    if (message.isPublished !== undefined) {
      writer.uint32(56).bool(message.isPublished);
    }
    if (message.isDeleted !== undefined) {
      writer.uint32(64).bool(message.isDeleted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateNotificationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateNotificationRequest } as UpdateNotificationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.requestId = reader.string();
          break;
        case 1:
          message.notificationId = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.class = reader.int32();
          break;
        case 6:
          message.isRead = reader.bool();
          break;
        case 7:
          message.isPublished = reader.bool();
          break;
        case 8:
          message.isDeleted = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateNotificationRequest {
    const message = { ...baseUpdateNotificationRequest } as UpdateNotificationRequest;
    message.requestId =
      object.requestId !== undefined && object.requestId !== null
        ? String(object.requestId)
        : "";
    message.notificationId =
      object.notificationId !== undefined && object.notificationId !== null
        ? String(object.notificationId)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : undefined;
    message.title =
      object.title !== undefined && object.title !== null
        ? String(object.title)
        : undefined;
    message.description =
      object.description !== undefined && object.description !== null
        ? String(object.description)
        : undefined;
    message.class =
      object.class !== undefined && object.class !== null
        ? Number(object.class)
        : undefined;
    message.isRead =
      object.isRead !== undefined && object.isRead !== null
        ? Boolean(object.isRead)
        : undefined;
    message.isPublished =
      object.isPublished !== undefined && object.isPublished !== null
        ? Boolean(object.isPublished)
        : undefined;
    message.isDeleted =
      object.isDeleted !== undefined && object.isDeleted !== null
        ? Boolean(object.isDeleted)
        : undefined;
    return message;
  },

  toJSON(message: UpdateNotificationRequest): unknown {
    const obj: any = {};
    message.requestId !== undefined && (obj.requestId = message.requestId);
    message.notificationId !== undefined && (obj.notificationId = message.notificationId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.class !== undefined && (obj.class = message.class);
    message.isRead !== undefined && (obj.isRead = message.isRead);
    message.isPublished !== undefined && (obj.isPublished = message.isPublished);
    message.isDeleted !== undefined && (obj.isDeleted = message.isDeleted);
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateNotificationRequest>): UpdateNotificationRequest {
    const message = { ...baseUpdateNotificationRequest } as UpdateNotificationRequest;
    message.requestId = object.requestId ?? "";
    message.notificationId = object.notificationId ?? "";
    message.userId = object.userId ?? undefined;
    message.title = object.title ?? undefined;
    message.description = object.description ?? undefined;
    message.class = object.class ?? undefined;
    message.isRead = object.isRead ?? undefined;
    message.isPublished = object.isPublished ?? undefined;
    message.isDeleted = object.isDeleted ?? undefined;
    return message;
  },
};

const baseUpdateNotificationResponse: object = { success: false };

export const UpdateNotificationResponse = {
  encode(
    message: UpdateNotificationResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.notification !== undefined) {
      Notification.encode(message.notification, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateNotificationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateNotificationResponse } as UpdateNotificationResponse;
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
          message.notification = Notification.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateNotificationResponse {
    const message = { ...baseUpdateNotificationResponse } as UpdateNotificationResponse;
    message.success =
      object.success !== undefined && object.success !== null
        ? Boolean(object.success)
        : false;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : undefined;
    message.notification =
      object.notification !== undefined && object.notification !== null
        ? Notification.fromJSON(object.notification)
        : undefined;
    return message;
  },

  toJSON(message: UpdateNotificationResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.message !== undefined && (obj.message = message.message);
    message.notification !== undefined &&
      (obj.notification = message.notification
        ? Notification.toJSON(message.notification)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateNotificationResponse>,
  ): UpdateNotificationResponse {
    const message = { ...baseUpdateNotificationResponse } as UpdateNotificationResponse;
    message.success = object.success ?? false;
    message.message = object.message ?? undefined;
    message.notification =
      object.notification !== undefined && object.notification !== null
        ? Notification.fromPartial(object.notification)
        : undefined;
    return message;
  },
};

export const NotificationServiceService = {
  listNotifications: {
    path: "/ea.NotificationService/ListNotifications",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListNotificationsRequest) =>
      Buffer.from(ListNotificationsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListNotificationsRequest.decode(value),
    responseSerialize: (value: ListNotificationsResponse) =>
      Buffer.from(ListNotificationsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListNotificationsResponse.decode(value),
  },
  getNotification: {
    path: "/ea.NotificationService/GetNotification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetNotificationRequest) =>
      Buffer.from(GetNotificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetNotificationRequest.decode(value),
    responseSerialize: (value: GetNotificationResponse) =>
      Buffer.from(GetNotificationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetNotificationResponse.decode(value),
  },
  createNotification: {
    path: "/ea.NotificationService/CreateNotification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateNotificationRequest) =>
      Buffer.from(CreateNotificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateNotificationRequest.decode(value),
    responseSerialize: (value: CreateNotificationResponse) =>
      Buffer.from(CreateNotificationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateNotificationResponse.decode(value),
  },
  deleteNotification: {
    path: "/ea.NotificationService/DeleteNotification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteNotificationRequest) =>
      Buffer.from(DeleteNotificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteNotificationRequest.decode(value),
    responseSerialize: (value: DeleteNotificationResponse) =>
      Buffer.from(DeleteNotificationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteNotificationResponse.decode(value),
  },
  updateNotification: {
    path: "/ea.NotificationService/UpdateNotification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateNotificationRequest) =>
      Buffer.from(UpdateNotificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateNotificationRequest.decode(value),
    responseSerialize: (value: UpdateNotificationResponse) =>
      Buffer.from(UpdateNotificationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateNotificationResponse.decode(value),
  },
} as const;

export interface NotificationServiceServer extends UntypedServiceImplementation {
  listNotifications: handleUnaryCall<ListNotificationsRequest, ListNotificationsResponse>;
  getNotification: handleUnaryCall<GetNotificationRequest, GetNotificationResponse>;
  createNotification: handleUnaryCall<
    CreateNotificationRequest,
    CreateNotificationResponse
  >;
  deleteNotification: handleUnaryCall<
    DeleteNotificationRequest,
    DeleteNotificationResponse
  >;
  updateNotification: handleUnaryCall<
    UpdateNotificationRequest,
    UpdateNotificationResponse
  >;
}

export interface NotificationServiceClient extends Client {
  listNotifications(
    request: ListNotificationsRequest,
    callback: (error: ServiceError | null, response: ListNotificationsResponse) => void,
  ): ClientUnaryCall;
  listNotifications(
    request: ListNotificationsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListNotificationsResponse) => void,
  ): ClientUnaryCall;
  listNotifications(
    request: ListNotificationsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListNotificationsResponse) => void,
  ): ClientUnaryCall;
  getNotification(
    request: GetNotificationRequest,
    callback: (error: ServiceError | null, response: GetNotificationResponse) => void,
  ): ClientUnaryCall;
  getNotification(
    request: GetNotificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetNotificationResponse) => void,
  ): ClientUnaryCall;
  getNotification(
    request: GetNotificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetNotificationResponse) => void,
  ): ClientUnaryCall;
  createNotification(
    request: CreateNotificationRequest,
    callback: (error: ServiceError | null, response: CreateNotificationResponse) => void,
  ): ClientUnaryCall;
  createNotification(
    request: CreateNotificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateNotificationResponse) => void,
  ): ClientUnaryCall;
  createNotification(
    request: CreateNotificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateNotificationResponse) => void,
  ): ClientUnaryCall;
  deleteNotification(
    request: DeleteNotificationRequest,
    callback: (error: ServiceError | null, response: DeleteNotificationResponse) => void,
  ): ClientUnaryCall;
  deleteNotification(
    request: DeleteNotificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteNotificationResponse) => void,
  ): ClientUnaryCall;
  deleteNotification(
    request: DeleteNotificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteNotificationResponse) => void,
  ): ClientUnaryCall;
  updateNotification(
    request: UpdateNotificationRequest,
    callback: (error: ServiceError | null, response: UpdateNotificationResponse) => void,
  ): ClientUnaryCall;
  updateNotification(
    request: UpdateNotificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateNotificationResponse) => void,
  ): ClientUnaryCall;
  updateNotification(
    request: UpdateNotificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateNotificationResponse) => void,
  ): ClientUnaryCall;
}

export const NotificationServiceClient = makeGenericClientConstructor(
  NotificationServiceService,
  "ea.NotificationService",
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>,
  ): NotificationServiceClient;
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
