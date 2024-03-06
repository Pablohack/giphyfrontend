export type GiphyParams = {
  search?: string;
  limit: number;
  offset: number;
};

export type GiphyData = {
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

export type GiphyResponse = {
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
