import { FC } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { GifGallery } from "../GifGallery";
import { UploadGif } from "../UploadGif";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Busca los mejores gif!",
    children: <GifGallery />,
  },
  {
    key: "2",
    label: "Sube tu gif",
    children: <UploadGif />,
  },
];

export const Principal: FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);
