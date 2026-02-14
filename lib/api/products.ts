import { fetcher } from "./client";

// 1. Define and EXPORT the ProductVariant type
export type ProductVariant = {
  id: string;
  colorName: string;
  colorHex: string;
  imageUrl: string;
  stock: number;
};

// 2. Use it inside the Product type
export type Product = {
  _id: string;
  name: string;
  slug: string;
  collectionName: string;
  description: string;
  price: number;
  originalPrice?: number;
  sizes: string[];
  variants: ProductVariant[]; // Use the exported type here
  totalStock: number;
  isArchived: boolean;
};

export const productApi = {
  // GET ALL
  getAll: () => {
    return fetcher<Product[]>("/products");
  },

  // GET SINGLE
  getById: (id: string) => {
    return fetcher<Product>(`/products/${id}`);
  },

  // CREATE (Requires FormData)
  create: (formData: FormData) => {
    return fetcher<Product>("/products", {
      method: "POST",
      body: formData,
      isMultipart: true,
    });
  },

  // UPDATE (Supports JSON or FormData)
  update: (id: string, data: Partial<Product> | FormData) => {
    const isMultipart = data instanceof FormData;
    return fetcher<Product>(`/products/${id}`, {
      method: "PATCH",
      body: data,
      isMultipart,
    });
  },

  // DELETE
  delete: (id: string) => {
    return fetcher<{ message: string }>(`/products/${id}`, {
      method: "DELETE",
    });
  },

  // QUICK ARCHIVE TOGGLE
  toggleArchive: (id: string, isArchived: boolean) => {
    return fetcher<Product>(`/products/${id}`, {
      method: "PATCH",
      body: { isArchived },
    });
  },
};
