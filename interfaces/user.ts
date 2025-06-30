export type TUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  avatar?: string;
};

export type SignInPayload = Pick<TUser, 'email' | 'password'>;

export interface AuthResponse {
  accessToken: string;
  user: Omit<TUser, 'password'>;
}

export type UserPayload = Omit<TUser, 'password' | 'email ' | 'id'>;

export type SignUpPayload = Omit<TUser, 'id'>;

export interface ISignUpFormData extends Pick<TUser, 'avatar'> {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
