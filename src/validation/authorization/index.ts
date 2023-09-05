import { object, string } from 'zod';

const login = {
  username: string({
    required_error: 'Username is required',
  })
    .nonempty()
    .min(8, 'Username too short - should be 8 chars minimum'),
  password: string({
    required_error: 'Password is required',
  })
    .nonempty()
    .min(8, 'Password too short - should be 8 chars minimum'),
};

const refreshTokenCookie = {
  cookies: object({
    refreshToken: string({
      required_error: 'Missing refresh token',
    })
      .nonempty()
      .min(10),
  }),
};

export const loginSchema = object({
  body: object({
    ...login,
  }),
});

export const registrationSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    })
      .nonempty()
      .email('Not a valid email'),
    ...login,
  }),
});

export const logoutSchema = object({
  ...refreshTokenCookie,
});

export const refreshSchema = object({
  ...refreshTokenCookie,
});
