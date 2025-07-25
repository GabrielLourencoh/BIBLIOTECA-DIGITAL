import { z } from 'zod';

export const envSchema = z.object({
  // App
  APP_NAME: z.string(),
  APP_URL: z.string(),
  APP_ENV: z.enum(['dev', 'stage', 'prod', 'test']),
  APP_PORT: z.coerce.number().default(3000),

  // Database
  DATABASE_URL: z.string(),

  // Auth
  JWT_SECRET: z.string(),
  JWT_TTL: z.coerce.number().default(5432),
  JWT_AUDIENCE: z.string(),
  JWT_ISSUER: z.string(),
});
