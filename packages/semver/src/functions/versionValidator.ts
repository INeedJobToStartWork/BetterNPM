import { MAX_SAFE_BUILD_LENGTH, MAX_SAFE_INTEGER } from "@/internals/constants";
import type { TValidationList } from "@/utils";
import { isX, validator } from "@/utils";
import type { TMyErrorList } from "oh-my-error";
import type parseSemVer from "./parseSemVer";

//----------------------
// Errors
//----------------------

/**
 * @internal
 */
export const MYERRORLIST_PRE = {
	NULL_VERSION: {
		code: "NULL_VERSION",
		hint: { user: "Provide a non-null version", dev: "Check input to function it's not null." },
		name: "Null Version Error",
		message: {
			dev: "Version cannot be null.",
			user: "Please provide a valid version - can't be null."
		}
	},
	INVALID_TYPE: {
		code: "INVALID_TYPE",
		hint: { dev: "Check input to function it's string", user: "Input correct version input type." },
		message: { dev: "Version is not a string", user: "Version must be a string." },
		name: "Invalid Type Error"
	},
	UNDEFINED_VERSION: {
		code: "UNDEFINED_VERSION",
		hint: { user: "Missing version" },
		name: "Undefined Version Error",
		message: {
			dev: "Version cannot be undefined",
			user: "Please provide a valid version."
		}
	},
	TOO_LONG_LENGTH_VERSION: {
		code: "TOO_LONG_LENGTH_VERSION",
		hint: { user: `Shorten the name to ${MAX_SAFE_BUILD_LENGTH} characters or less` },
		message: {
			dev: `Name cannot contain more than ${MAX_SAFE_BUILD_LENGTH} characters`,
			user: `The name is too long. Please use ${MAX_SAFE_BUILD_LENGTH} characters or less.`
		},
		name: "Too Long Name Error"
	}
} as const satisfies TMyErrorList;

const templateInvalidVersion = (part: "Major" | "Minor" | "Patch") =>
	`${part} version is not in range 0 to ${MAX_SAFE_INTEGER}` as const;

/**
 * @internal
 */
export const MYERRORLIST_POST = {
	INVALID_VERSION_MINOR: {
		code: "INVALID_VERSION_MINOR",
		name: "Invalid version number",
		hint: {},
		message: { user: (() => templateInvalidVersion("Minor"))() }
	},
	INVALID_VERSION_MAJOR: {
		code: "INVALID_VERSION_MAJOR",
		name: "Invalid version number",
		hint: {},
		message: { user: (() => templateInvalidVersion("Major"))() }
	},
	INVALID_VERSION_PATCH: {
		code: "INVALID_VERSION_PATCH",
		name: "Invalid version number",
		hint: {},
		message: { user: (() => templateInvalidVersion("Patch"))() }
	}
} as const satisfies TMyErrorList;

//----------------------
// Functions
//----------------------

/**
 * @internal
 */
export const versionPreValidator = (version: unknown, options?: Parameters<typeof validator>[0]["options"]) => {
	const ValidationList: TValidationList<typeof MYERRORLIST_PRE> = {
		NULL_VERSION: { condition: (version): version is null => version === null, exit: true },
		UNDEFINED_VERSION: { condition: (version): version is undefined => version === undefined, exit: true },
		INVALID_TYPE: {
			// condition: version => !(version instanceof SemVer) && typeof version !== "string",
			condition: version =>
				!(typeof version === "object" && version !== null && "format" in version) && typeof version !== "string",
			exit: true
		},
		TOO_LONG_LENGTH_VERSION: {
			condition: (version): boolean => typeof version === "string" && version.length > MAX_SAFE_BUILD_LENGTH
		}
	} as const;

	return validator({
		data: version,
		options,
		MyErrorList: MYERRORLIST_PRE,
		ValidationList: ValidationList
	});
};

/**
 * @internal
 */
export const versionPostValidator = (
	version: ReturnType<typeof parseSemVer>,
	options?: Parameters<typeof validator>[0]["options"],
	rangeMode = false
) => {
	const isInValidVersionNumber = (num: any): boolean => {
		if (rangeMode && isX(num)) {
			return false;
		}
		return num > MAX_SAFE_INTEGER || num < 0;
	};
	// const isInValidVersionNumber = (num: number): boolean =>  num > MAX_SAFE_INTEGER || num < 0;
	const ValidationList: TValidationList<
		typeof MYERRORLIST_POST,
		ReturnType<typeof parseSemVer<{ rangeMode: false }>>
	> = {
		// TODO: Change this version:any to Generic, problem in validation.ts
		INVALID_VERSION_MAJOR: {
			condition: (version): boolean => isInValidVersionNumber(version.major)
		},
		INVALID_VERSION_MINOR: { condition: version => isInValidVersionNumber(version.minor) },
		INVALID_VERSION_PATCH: { condition: version => isInValidVersionNumber(version.patch) }
	} as const;

	return validator({
		data: version,
		options,
		MyErrorList: MYERRORLIST_POST,
		ValidationList: ValidationList
	});
};
