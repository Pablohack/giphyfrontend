import axios, { AxiosError } from "axios";
import { IApi, IGet, IUpload } from "./api.interface";

export class ApiRepository<T> implements IApi<T> {
  private readonly url: string;
  constructor(url: string) {
    this.url = url;
  }

  async get<T>({ path, params }: IGet): Promise<T> {
    try {
      const { data } = await axios.get<T>(`${this.url}${path}`, {
        params: { ...params },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      }
      throw new Error(error as string);
    }
  }

  async uploadFile({ path, formData }: IUpload): Promise<T> {
    try {
      const { data } = await axios.post<T>(`${this.url}${path}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      }
      throw new Error(`${error} -> es un error` as string);
    }
  }
}
