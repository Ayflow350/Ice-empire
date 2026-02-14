// lib/api/client.ts

const BASE_URL = "/api";

// 1. Define valid body types to replace 'any'
// This covers JSON objects, Arrays, and FormData/Files
type APIBody = FormData | Record<string, unknown> | unknown[] | BodyInit;

type FetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: APIBody | null;
  headers?: Record<string, string>;
  isMultipart?: boolean; // Set true for File Uploads (FormData)
};

// 2. Define expected error shape for type-safe access
interface APIErrorResponse {
  error?: string;
}

export async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, isMultipart = false } = options;

  const config: RequestInit = {
    method,
    headers: { ...headers },
  };

  // Handle Body
  if (body) {
    if (isMultipart) {
      // Browser automatically sets Content-Type + Boundary for FormData
      // We assert 'as BodyInit' because we know 'isMultipart' implies compatible body (e.g., FormData)
      config.body = body as BodyInit;
    } else {
      config.headers = {
        "Content-Type": "application/json",
        ...config.headers, // Spread existing headers
      };
      // JSON.stringify accepts unknown/objects safely
      config.body = JSON.stringify(body);
    }
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);

    // Parse JSON safely
    // Cast to T & APIErrorResponse to allow checking for .error property
    const data = (await res.json().catch(() => ({}))) as T & APIErrorResponse;

    if (!res.ok) {
      throw new Error(data.error || `API Error: ${res.statusText}`);
    }

    return data as T;
  } catch (error) {
    console.error(`Request failed: ${endpoint}`, error);
    throw error;
  }
}
