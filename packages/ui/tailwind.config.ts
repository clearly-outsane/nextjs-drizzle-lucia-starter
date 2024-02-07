import BaseConfig from "@repo/tailwind-config/base.ts";
import type { Config } from "tailwindcss";

const config = {
  ...BaseConfig,
} satisfies Config;

export default config;
