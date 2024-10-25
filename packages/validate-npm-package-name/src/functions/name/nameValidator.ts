/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-unnecessary-condition , @EslintSonar/no-duplicate-string */
import type { TMyError, TMyErrorList } from "oh-my-error";
import { myError } from "oh-my-error";
import { builtinModules } from "node:module";
import isScopedPackage from "./isScopedPackage";

//--------------------------------
// STATIC GLOBALS
//--------------------------------

export const BLACK_LIST = new Set(["node_modules", "favicon.ico"]);

//----------------------
// Errors
//----------------------

export const MyErrorList = {
	NULL_NAME: {
		code: "NULL_NAME",
		hint: { user: "Provide a non-null name" },
		message: {
			dev: "Name cannot be null",
			user: "Please provide a valid name."
		},
		name: "Null Name Error"
	},
	UNDEFINED_NAME: {
		code: "UNDEFINED_NAME",
		hint: { user: "Provide a defined name" },
		message: {
			dev: "Name cannot be undefined",
			user: "Please provide a valid name."
		},
		name: "Undefined Name Error"
	},
	INVALID_TYPE: {
		code: "INVALID_TYPE",
		hint: { user: "Ensure the name is a string" },
		message: {
			dev: "Name must be a string",
			user: "The name must be text."
		},
		name: "Invalid Type Error"
	},
	TOO_SHORT_LENGTH_NAME: {
		code: "TOO_SHORT_LENGTH_NAME",
		hint: { user: "Provide a name with at least one character" },
		message: {
			dev: "Name length must be greater than zero",
			user: "The name cannot be empty."
		},
		name: "Empty Name Error"
	},
	TOO_LONG_LENGTH_NAME: {
		code: "TOO_LONG_LENGTH_NAME",
		hint: { user: "Shorten the name to 214 characters or less" },
		message: {
			dev: "Name cannot contain more than 214 characters",
			user: "The name is too long. Please use 214 characters or less."
		},
		name: "Too Long Name Error"
	},
	CANNOT_START_WITH_UNDERSCORE: {
		code: "CANNOT_START_WITH_UNDERSCORE",
		hint: { user: "Remove the leading underscore from the name" },
		message: {
			dev: "Name cannot start with an underscore",
			user: "The name cannot start with an underscore (_)."
		},
		name: "Invalid Starting Character Error"
	},
	CANNOT_START_WITH_PERIOD: {
		code: "CANNOT_START_WITH_PERIOD",
		hint: { user: "Remove the leading period from the name" },
		message: {
			dev: "Name cannot start with a period",
			user: "The name cannot start with a period (.)."
		},
		name: "Invalid Starting Character Error"
	},
	CANNOT_HAVE_SPACES: {
		code: "CANNOT_HAVE_SPACES",
		hint: { user: "Remove all spaces from the name" },
		message: {
			dev: "Name cannot contain spaces",
			user: "The name cannot contain spaces."
		},
		name: "Invalid Character Error"
	},
	CORE_MODULE_NAME: {
		code: "CORE_MODULE_NAME",
		hint: { user: "Choose a differenceerent name that is not a core module name" },
		message: {
			dev: "Name cannot be a core module name",
			user: "This name is reserved. Please choose a differenceerent name."
		},
		name: "Reserved Name Error"
	},
	BLACK_LISTED: {
		code: "BLACKLISTED",
		hint: { user: "Choose a differenceerent name that is not blacklisted" },
		message: {
			dev: "Name is blacklisted",
			user: "This name is not allowed. Please choose a differenceerent name."
		},
		name: "Prohibited Name Error"
	},
	NO_CAPITAL_LETTERS: {
		code: "NO_CAPITAL_LETTERS",
		hint: { user: "Convert all capital letters to lowercase" },
		message: {
			dev: "Name cannot contain capital letters",
			user: "The name should only contain lowercase letters."
		},
		name: "Invalid Case Error"
	},
	SPECIAL_CHARACTERS: {
		code: "SPECIAL_CHARACTERS",
		hint: { user: "Remove special characters (~'!()*) from the name" },
		message: {
			dev: "Name cannot contain special characters (~'!()*)",
			user: "The name cannot contain special characters (~'!()*)"
		},
		name: "Invalid Character Error"
	},
	URL_FRIENDLY: {
		code: "URL_FRIENDLY",
		hint: { user: "Remove special characters (~'!()*) from the name" },
		message: {
			dev: "Name cannot contain special characters (~'!()*)",
			user: "Name can only contain URL-friendly characters no [ (~'!()*) ]"
		},
		name: "Invalid Character Error"
	}
} as const satisfies TMyErrorList;

//----------------------
// Functions
//----------------------

/**
 *
 * NPM package name Validator
 *
 * @example validate("some-package")
 *
 * @param name - NPM package name to validate
 * @param errorThrow - Throw Expectation
 * @returns
 * ```
 * {
 *    validForNewPackages: boolean,
 *    validForOldPackages: boolean,
 * 		errors?: TMyError[],
 * 		warnings?: TMyError[],
 * }
 * ```
 *
 */

export function nameValidator(
	name: string,
	errorThrow = false
): {
	errors?: TMyError[];
	validForNewPackages: boolean;
	validForOldPackages: boolean;
	warnings?: TMyError[];
} {
	/**
	 * Returns the validation result for the package name.
	 *
	 * @param InputProblems - An object containing arrays of errors and warnings.
	 * @returns An object representing the validation result.
	 * @internal
	 */
	const result = (InputProblems: typeof problems) => ({
		validForNewPackages: !InputProblems.errors.length && !InputProblems.warnings.length,
		validForOldPackages: !InputProblems.errors.length,
		...(InputProblems.warnings.length && { warnings: InputProblems.warnings }),
		...(InputProblems.errors.length && { errors: InputProblems.errors })
	});

	/**
	 * Object to store validation problems.
	 */
	const problems: { errors: Array<Required<TMyError>>; warnings: Array<Required<TMyError>> } = {
		warnings: [],
		errors: []
	};

	/**
	 * Validation rules for npm package names.
	 * Each rule contains a condition to check, an error message if the condition fails,
	 * and an optional exit flag to indicate if validation should stop if the condition is met.
	 */
	const ValidationList: Partial<
		Record<keyof typeof MyErrorList, { condition: () => boolean; exit?: boolean; type: "error" | "warning" }>
	> = {
		NULL_NAME: { condition: () => name === null, type: "error", exit: true },
		UNDEFINED_NAME: { condition: () => name === void 0, type: "error", exit: true },
		INVALID_TYPE: { condition: () => typeof name !== "string", type: "error", exit: true },
		TOO_SHORT_LENGTH_NAME: { condition: () => !name.length, type: "error" },
		TOO_LONG_LENGTH_NAME: { condition: () => name.length > 214, type: "warning" },
		CANNOT_START_WITH_PERIOD: { condition: () => name.startsWith("."), type: "error" },
		CANNOT_START_WITH_UNDERSCORE: { condition: () => name.startsWith("_"), type: "error" },
		CANNOT_HAVE_SPACES: { condition: () => name !== name.trim(), type: "error" },
		CORE_MODULE_NAME: { condition: () => builtinModules.includes(name), type: "warning" },
		NO_CAPITAL_LETTERS: { condition: () => name !== name.toLowerCase(), type: "warning" },
		SPECIAL_CHARACTERS: { condition: () => /[!'()*~]/u.test(name), type: "warning" },
		URL_FRIENDLY: { condition: () => encodeURIComponent(name) !== name && !isScopedPackage(name), type: "error" },
		BLACK_LISTED: { condition: () => BLACK_LIST.has(name), type: "error" }
	} as const;

	for (const key in ValidationList) {
		const currentValidation = ValidationList[key as keyof typeof ValidationList];
		if (Object.hasOwn(ValidationList, key) && currentValidation?.condition()) {
			if (errorThrow) throw myError(MyErrorList[key as keyof typeof MyErrorList] as Required<TMyError>);
			if (currentValidation.type == "error") {
				problems.errors.push(MyErrorList[key as keyof typeof MyErrorList] as Required<TMyError>);
			}
			if (currentValidation.type == "warning") {
				problems.warnings.push(MyErrorList[key as keyof typeof MyErrorList] as Required<TMyError>);
			}
			if (currentValidation?.exit) return result(problems);
		}
	}

	return result(problems);
}

export default nameValidator;
