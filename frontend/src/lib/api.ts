// frontend/src/lib/api.ts
const API_URL = "http://localhost:5000/api"; // adjust if needed

// ---- Types ----
export interface LoginResponse {
  accessToken: string;
  [key: string]: unknown;
}

export interface MeResponse {
  id?: string;
  email?: string;
  [key: string]: unknown;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // important for cookies
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data: LoginResponse = await res.json();
  return data;
}

export async function me(): Promise<MeResponse> {
  const res = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  const data: MeResponse = await res.json();
  return data;
}

// 👇 default export with grouped methods (no anonymous object)
const api = { login, me };
export default api;

