import { z } from 'zod';

const nodeEnv = z.enum(['development', 'production', 'test']);

const envSchema = z.object({
  NODE_ENV: nodeEnv,
});

type ENV = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Partial<ENV> {}
  }
}

export const { NODE_ENV } = envSchema.parse(process.env);
