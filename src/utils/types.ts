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

export type reset_password_types = {
  password: string;
  confirmPassword: string;
};

export type auth_screen_sliders_types = {
  image: any;
  title: string;
  description: string;
}[];
