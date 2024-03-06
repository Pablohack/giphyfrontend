import { FC } from "react";
import { ResultProps as ResultsPropsAnt, Result as ResultsAnt } from "antd";
import { ResultsProps } from "./Results.type";

export const Results: FC<ResultsProps> = ({ status }) => {
  const success = {
    status: "success",
    title: "Gif Cargado",
  } as ResultsPropsAnt;

  const errors = {
    status: "error",
    title: "Error en carga de Gif",
  } as ResultsPropsAnt;

  const resultProp = status ? success : errors;

  return <ResultsAnt {...resultProp} />;
};
