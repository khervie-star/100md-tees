import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export const GoogleAuth = () => {
  const clientId =
    "239230360273-3mmgne5hej0h8aco3qpqq1asdc2htc8j.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};
