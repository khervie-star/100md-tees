import { useRouter } from "next/navigation";
import { apiInstance } from ".";
import toast from "react-hot-toast";
import { login_types, signup_body_types } from "@/utils";
// import { cookies } from "next/headers";

export const login_user = async (payload: login_types) => {
  try {
    const response = await apiInstance.post("/login", payload);
    localStorage.addItem("access_token", response.data.userToken);
    // localStorage.removeItem("refresh_token");
    // cookies().set({
    //   name: "access_token",
    //   value: "TOKEN",
    //   maxAge: 30 * 24 * 60 * 60, // Cookie expiration time in seconds
    //   path: "/",
    //   // httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Set to true in production
    //   sameSite: "strict", // Adjust based on your needs
    // });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register_user = async (payload: signup_body_types) => {
  try {
    const response = await apiInstance.post("/register", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout_user = async (logout_message: string) => {
  document.cookie =
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie =
    "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");

  // const router = useRouter();
  // router.push("/login");

  if (logout_message) {
    toast(logout_message);
  }
};

export const resend_verification_email = async (payload: {
  userId: string;
}) => {
  try {
    const response = await apiInstance.post("/resend/email/link", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verify_email = async (payload: {
  userId: string;
  token: string;
}) => {
  try {
    const response = await apiInstance.post(
      `/verify/email/${payload.userId}/${payload.token}`,
      payload
    );
    localStorage.addItem("access_token", response.data.userToken);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// TODO: Forgot Password
export const reset_password = async (payload: { email: string }) => {
  try {
    const response = await apiInstance.post(`/reset/password`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const set_new_password = async (payload: {
  token: string;
  passwordDetails: { password: string; confirmPassword: string };
}) => {
  try {
    const response = await apiInstance.post(
      `/password-reset/change-password/${payload.token}`,
      payload.passwordDetails
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
