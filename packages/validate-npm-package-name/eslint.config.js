import ineedj from "@ineedj/eslintrc";

export default ineedj({
	formatters: {
		json: true,
		stylistic: false,
		stylisticJSX: false,
		stylisticTS: false,
		perfectionistSorters: false
	},
	modifiers: {
		commands: true
	},
	syntax: {
		mdx: true,
		vitest: false,
		eslint: true,
		jsx: false,
		next: false,
		node: true,
		react: false,
		storybook: false,
		tailwindcss: false,
		typescript: true,
		toml: true,
		yaml: true,
		turbo: false,
		ignoreGlobalFiles: {
			gitIgnore: true,
			basicIgnores: true
		}
	}
}).removeRules(
	"@EslintSecurity/detect-object-injection",
	"@typescript-eslint/no-throw-literal",
	"@EslintImports/namespace"
);

// export default [];
