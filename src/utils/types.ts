export type login_types = {
  email: string;
  password: string;
};

export type signup_body_types = {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
