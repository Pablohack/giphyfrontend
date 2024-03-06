export interface IApi<T> {
  get({ path, params }: IGet): Promise<T[]>;
}

export interface IGet {
  path: string;
  params: Record<string, string | number>;
}
