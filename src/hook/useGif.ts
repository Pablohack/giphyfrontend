import { HttpStatusCode } from "axios";

import { GifGalleryProps } from "../container/GifGallery/Gallery.type";
import { ApiRepository } from "../repository/api.repository";
import { GiphyParams, GiphyResponse, GiphyData } from "./customHook.type";

export const useGif = () => {
  const api = new ApiRepository("http://localhost:3000");

  const getGiphyTrending = async ({ limit, offset }: GiphyParams) => {
    const { data } = await api.get<GiphyResponse>({
      path: "/trending",
      params: {
        limit,
        offset,
      },
    });

    const datos: GifGalleryProps[] = data.map((gif: GiphyData) => {
      return {
        alt: gif.title,
        img: gif.images.original,
        src: gif.images.original.webp,
        width: gif.images.original.width,
        height: gif.images.original.height,
      };
    });
    return datos;
  };

  const getSearchGiphy = async ({ search, limit, offset }: GiphyParams) => {
    const { data } = await api.get<GiphyResponse>({
      path: "/search",
      params: {
        q: search!,
        limit,
        offset,
      },
    });

    const datos: GifGalleryProps[] = data.map((gif: GiphyData) => {
      return {
        alt: gif.title,
        img: gif.images.original,
        src: gif.images.original.webp,
        width: gif.images.original.width,
        height: gif.images.original.height,
      };
    });
    return datos;
  };

  const uploadGif = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("gif", file);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.uploadFile({
        path: "/uploadGif",
        formData: formData,
      });

      return HttpStatusCode.Created;
    } catch (error) {
      throw new Error("Error cargando gif");
    }
  };

  return {
    getSearchGiphy,
    getGiphyTrending,
    uploadGif,
  };
};
