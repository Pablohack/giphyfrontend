import React, { FC, useState } from "react";

import { useGif } from "../../hook/useGif";
import { Results } from "../../components/Results";
import { Spin } from "antd";

export const UploadGif: FC = () => {
  const { uploadGif } = useGif();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number>();

  const handlerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setIsLoading(true);
    uploadGif(file)
      .then((res) => {
        setStatusCode(res);
        setIsSuccess(true);
        setIsLoading(false);
        console.log("res", res);
      })
      .catch(() => {
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!isLoading && !statusCode)
    return (
      <input
        type="file"
        name="file"
        accept="image/gif"
        onChange={handlerOnChange}
      />
    );
  if (isLoading) return <Spin size="large" />;
  if (statusCode === 201) return <Results status={isSuccess} />;
};
