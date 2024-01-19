import { useRouter } from "next/navigation";
import { apiInstance } from ".";
import toast from "react-hot-toast";
import { login_types } from "@/utils";
// import { cookies } from "next/headers";

export const login_user = async (payload: login_types) => {
  try {
    const response = await apiInstance.post("/login", payload);
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
