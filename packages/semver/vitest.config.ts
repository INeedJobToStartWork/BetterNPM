import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
	test: {
		include: [
			"./src/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
			"./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"
		],
		alias: {
			"@": resolve(__dirname, "./src")
		}
	}
});
