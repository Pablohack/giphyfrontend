import { ImageTag } from "react-grid-gallery";

export type GifGalleryProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  isSelected?: boolean;
  caption?: string;
  tags?: ImageTag[];
};
