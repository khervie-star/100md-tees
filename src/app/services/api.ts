/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { parse, serialize } from "cookie";
import { logout_user } from "./auth";
import { useAuth } from "@/context";
import { useRouter } from "next/router";

const base_uri = "";

// const router = useRouter();
// const { setIntended } = useAuth()!;

export const apiInstance = axios.create({
  baseURL: base_uri,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // Add any other common headers here
  },
});

// Add an interceptor to include the token in the request headers
apiInstance.interceptors.request.use((config) => {
  // Parse the cookies from the document
  const cookies = parse(document.cookie);

  // Retrieve the token from the 'token' cookie
  const token = cookies.access_token;

  // Add the token to the headers if available
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Add an interceptor to handle 401 responses and attempt to refresh the token
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to a 401 and the original request hasn't been retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Retrieve the refresh token from the 'refreshToken' cookie
      const refresh_token = parse(document.cookie).refresh_token;

      try {
        // Your logic to refresh the token using the refreshToken
        // This may involve making a separate API call to your authentication server
        const response = await apiInstance.post("/refresh-token", {
          refresh_token: refresh_token,
        });

        // For demonstration purposes, let's assume a successful token refresh
        const newToken = response.data.token;

        // Update the 'token' cookie with the new token
        document.cookie = serialize("access_token", newToken, { path: "/" });

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        // If the token refresh fails, log the user out
        console.error("Token refresh failed. Logging out:", refreshError);

        // Your logout logic (e.g., clearing cookies, redirecting to login page)
        logout_user("Session expired, please login to continue");

        // setIntended(router.asPath);
        // router.push("/login");

        // Propagate the original error to avoid further processing
        return Promise.reject(error);
      }
    }

    // If the error is not a 401 or token refresh failed, propagate the error
    return Promise.reject(error);
  }
);
