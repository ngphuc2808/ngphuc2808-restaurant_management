import { z } from "zod";

// client config
const configClientSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
});

const configClientObject = configClientSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
});

if (!configClientObject.success) {
  console.log(configClientObject.error.errors);
  throw new Error("Invalid config");
}

export const envClientConfig = configClientObject.data;

// server config
const configServerSchema = z.object({});

const configServerObject = configServerSchema.safeParse({});

if (!configServerObject.success) {
  console.log(configServerObject.error.errors);
  throw new Error("Invalid config");
}

export const envServerConfig = configServerObject.data;
