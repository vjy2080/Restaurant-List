import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "./components/Constant";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  description: string;
}


export const fetchData = async (): Promise<Post[]> => {
  const response = await axios.get(baseUrl);
  return response.data;

};

export const useHandleApi = () => {
  return useQuery<Post[], Error>({
    queryKey: ['fetchData'],
    queryFn: fetchData,
  });
};

export const createItem = async (restaurant: string, data: number): Promise<Post> => {
  console.log('create press');
  const response = await axios.post(baseUrl, { restaurant: restaurant, id: String(data) });
  return response.data;
};
export const deleteItem = async (id: number): Promise<Post> => {
  console.log('delete press id', id);
  console.log('Type of id', typeof id);
  // console.log(`${baseUrl}/?id=${id}`);
  // let deleteId = String(id)
  // console.log(typeof deleteId);

  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};
