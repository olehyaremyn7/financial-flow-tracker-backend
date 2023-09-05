import { TypeOf } from 'zod';

import { loginSchema, logoutSchema, refreshSchema, registrationSchema } from './index.js';

export type LoginRequestInput = TypeOf<typeof loginSchema>;

export type RegistrationRequestInput = TypeOf<typeof registrationSchema>;

export type LogoutRequestInput = TypeOf<typeof logoutSchema>;

export type RefreshRequestInput = TypeOf<typeof refreshSchema>;
