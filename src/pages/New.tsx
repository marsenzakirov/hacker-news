import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Container from "../components/Сontainer";
import { fetchJSON } from "../utils/fetchJSON";
export default function New() {
  const { id } = useParams<{ id: string }>();

  return <Container>id</Container>;
}
