import API from "../lib/api";

export const login = async (email: string, password: string) => {
  console.log("Calling login API with email:", email);

  // sends credentials -> backend sets refresh cookie and returns accessToken
  const res = await API.post("/auth/login", { email, password });

  // backend should return { accessToken, firstLogin } (or accessToken + refresh cookie set)
  const { accessToken } = res.data;

  // store access token in localStorage
  if (accessToken) localStorage.setItem("accessToken", accessToken);

  return res.data;
};

export const logout = async () => {
  // call logout endpoint — API attaches Authorization header automatically via interceptor
  await API.post("/auth/logout");
  localStorage.removeItem("accessToken");
};

export const getProfile = async () => {
  const res = await API.get("/auth/me"); // adjust path to your profile endpoint
  return res.data;
};

