import axios, { AxiosError } from "axios";
import { IApi, IGet } from "./api.interface";

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
}
