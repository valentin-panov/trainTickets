export type Data = {
  token: string;
};

export interface StorageHandlerInterface {
  set(data: Data): Promise<void>;

  get(): Promise<unknown>;
}
