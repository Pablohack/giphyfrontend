export interface IApi<T> {
  get({ path, params }: IGet): Promise<T[]>;
  uploadFile({ path, formData }: IUpload): Promise<T>;
}

export interface IGet {
  path: string;
  params: Record<string, string | number>;
}

export interface IUpload {
  path: string;
  formData: FormData;
}
