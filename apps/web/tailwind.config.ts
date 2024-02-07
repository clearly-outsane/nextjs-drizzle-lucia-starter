import BaseConfig from "@repo/tailwind-config/base.ts";
import type { Config } from "tailwindcss";

const config = {
  ...BaseConfig,
  content: [...BaseConfig.content, "../../packages/ui/**/*.{ts,tsx}"],
} satisfies Config;

export default config;
