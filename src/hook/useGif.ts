import { Image } from "../container/Gallery/Gallery.type";
import { ApiRepository } from "../repository/api.repository";

export const useGif = () => {
  const api = new ApiRepository("http://localhost:3000");

  type GiphyParams = {
    search?: string;
    limit: number;
    offset: number;
  };

  type GiphyData = {
    embed_url: string;
    title: string;
    images: {
      original: {
        height: number;
        width: number;
        webp: string;
      };
    };
  };

  type GiphyResponse = {
    data: GiphyData[];
    meta: {
      status: number;
      msg: string;
      response_id: string;
    };
    pagination: {
      total_count: number;
      count: number;
      offset: number;
    };
  };

  const getGiphy = async ({ limit, offset }: GiphyParams) => {
    const { data } = await api.get<GiphyResponse>({
      path: "/trending",
      params: {
        limit,
        offset,
      },
    });

    //todo: retornar typo Image para la galeria
    const datos: Image[] = data.map((gif) => {
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

    const datos: Image[] = data.map((gif) => {
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

  return {
    getSearchGiphy,
    getGiphy,
  };
};
