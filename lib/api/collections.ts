// lib/api/collections.ts
import { fetcher } from "./client";

export type Collection = {
  _id: string;
  title: string;
  subtitle: string;
  dropCode: string;
  status: "Active" | "Draft" | "Archived";
  imageUrl: string;
  releaseDate: string;
  itemCount: number;
};

export const collectionApi = {
  getAll: () => {
    return fetcher<Collection[]>("/collections");
  },

  create: (formData: FormData) => {
    return fetcher<Collection>("/collections", {
      method: "POST",
      body: formData,
      isMultipart: true,
    });
  },

  delete: (id: string) => {
    return fetcher<{ message: string }>(`/collections/${id}`, {
      method: "DELETE",
    });
  },

  update: (id: string, data: Partial<Collection>) => {
    return fetcher<Collection>(`/collections/${id}`, {
      method: "PATCH",
      body: data,
    });
  },
};
