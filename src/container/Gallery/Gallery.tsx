import { useEffect, useState } from "react";
import { Gallery as Galleryext } from "react-grid-gallery";
import { Pagination, Input, PaginationProps } from "antd";

import { Image } from "./Gallery.type";
import { useGif } from "../../hook/useGif";
import { SearchProps } from "antd/es/input/Search";

const { Search } = Input;

export const Gallery = () => {
  const [images, setImages] = useState<Image[]>();
  const { getGiphy, getSearchGiphy } = useGif();

  useEffect(() => {
    getGiphy({ limit: 20, offset: 0 }).then((res) => {
      setImages(res);
    });
  }, []);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    if (info?.source === "input") {
      getSearchGiphy({ search: value, limit: 15, offset: 0 }).then((res) => {
        setImages(res);
      });
      return;
    }
    if (info?.source === "clear") {
      getGiphy({ limit: 20, offset: 0 }).then((res) => {
        setImages(res);
      });
    }
  };
  const onChange: SearchProps["onChange"] = (value) => {
    getSearchGiphy({ search: value.target.value, limit: 15, offset: 0 }).then(
      (res) => {
        setImages(res);
      }
    );
  };

  const handlerPagination: PaginationProps["onChange"] = (e) => {
    const offset = (e - 1) * 20;
    getGiphy({ limit: 20, offset: offset }).then((res) => {
      setImages(res);
    });
  };
  return images ? (
    <>
      <Search
        onSearch={onSearch}
        onChange={onChange}
        allowClear
        placeholder="Buscar gifs"
      />
      <Galleryext images={images} defaultContainerWidth={500} />
      <Pagination defaultCurrent={1} total={50} onChange={handlerPagination} />
    </>
  ) : (
    <div>cargando</div>
  );
};
