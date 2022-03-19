import { credentials, Metadata } from "@grpc/grpc-js";
import { promisify } from "util";
import {
  AccountServiceClient,
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  GetAccountRequest,
  GetAccountResponse,
  ListAccountsRequest,
  ListAccountsResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
} from "@/models/account";

/// found this sample here:
/// https://github.com/CatsMiaow/node-grpc-typescript/blob/master/src/client.ts
class AccountService {
  private readonly client: AccountServiceClient = new AccountServiceClient(
    "localhost:8010",
    credentials.createInsecure(),
  );

  public async listAccounts(
    param: ListAccountsRequest,
    metadata: Metadata = new Metadata(),
  ): Promise<ListAccountsResponse> {
    return promisify<ListAccountsRequest, Metadata, ListAccountsResponse>(
      this.client.listAccounts.bind(this.client),
    )(param, metadata);
  }

  public async getAccount(
    param: GetAccountRequest,
    metadata: Metadata = new Metadata(),
  ): Promise<GetAccountResponse> {
    return promisify<GetAccountRequest, Metadata, GetAccountResponse>(
      this.client.getAccount.bind(this.client),
    )(param, metadata);
  }

  public async createAccount(
    param: CreateAccountRequest,
    metadata: Metadata = new Metadata(),
  ): Promise<CreateAccountResponse> {
    return promisify<CreateAccountRequest, Metadata, CreateAccountResponse>(
      this.client.createAccount.bind(this.client),
    )(param, metadata);
  }

  public async deleteAccount(
    param: DeleteAccountRequest,
    metadata: Metadata = new Metadata(),
  ): Promise<DeleteAccountResponse> {
    return promisify<DeleteAccountRequest, Metadata, DeleteAccountResponse>(
      this.client.deleteAccount.bind(this.client),
    )(param, metadata);
  }

  public async updateAccount(
    param: UpdateAccountRequest,
    metadata: Metadata = new Metadata(),
  ): Promise<UpdateAccountResponse> {
    return promisify<UpdateAccountRequest, Metadata, UpdateAccountResponse>(
      this.client.updateAccount.bind(this.client),
    )(param, metadata);
  }
}

export const accountService: AccountService = new AccountService();
