/* eslint-disable @EslintOptRegConf/optimize-regex */
/* eslint-disable @EslintSecurity/detect-unsafe-regex */
import { SemVer } from "@/classes";
import type { TMyErrorList } from "oh-my-error";
import { myError } from "oh-my-error";

import { versionPostValidator, versionPreValidator } from "./versionValidator";

//----------------------
// Global CONST
//----------------------

export const PATTERN_STRICT_SEMVER =
	/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][\dA-Za-z-]*))*))?(?:\+([\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*))?$/u;

export const PATTERN_LOOSE_SEMVER =
	/^v?(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?(?:\.(0|[1-9]\d*))?(?:-((?:0|[1-9]\d*|\d*[a-z-][\da-z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-z-][\da-z-]*))*))?(?:\+([\da-z-]+(?:\.[\da-z-]+)*))?$/iu;

export const PATTERN_RANGE_MODE =
	/^v?(0|[1-9]\d*|x|X|\*)(?:\.(0|[1-9]\d*|x|X|\*))?(?:\.(0|[1-9]\d*|x|X|\*))?(?:-((?:0|[1-9]\d*|\d*[a-z-][\da-z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-z-][\da-z-]*))*))?(?:\+([\da-z-]+(?:\.[\da-z-]+)*))?$/iu;

//----------------------
// Errors
//----------------------

/**
 * @internal
 */
export const MYERRORLIST = {
	INVALID_VERSION: {
		code: "INVALID_VERSION",
		name: "Invalid version string",
		hint: {},
		message: {
			dev: (inp: string) => `Inputed string is not recognized by RegEx - ${inp}`,
			user: "Version string is invalid and can't be parsed."
		}
	}
} as const satisfies TMyErrorList;

//----------------------
// Functions
//----------------------

/** @internal */
export const formatVersion = (version: Required<IparseRange> | Required<IparseSemVer>): string => {
	const base = `${version.major}.${version.minor}.${version.patch}`;
	const prerelease = version.prerelease.length ? `-${version.prerelease.join(".")}` : "";
	const buildmetadata = version.buildmetadata.length ? `+${version.buildmetadata.join(".")}` : "";

	return `${base}${prerelease}${buildmetadata}`;
};

/** @dontexport */
export interface IparseSemVer {
	buildmetadata?: Array<number | string>;
	major?: number;
	minor?: number;
	patch?: number;
	prerelease?: Array<number | string>;

	version?: () => string;
}

/** @dontexport */
export interface IparseRange extends Omit<IparseSemVer, "major" | "minor" | "patch"> {
	major?: number | "*" | "X" | "x";
	minor?: number | "*" | "X" | "x";
	patch?: number | "*" | "X" | "x";
}

/**
 * Options for parsing a semantic version string or range.
 * @dontexport
 */
export type TOptionsSemVer = {
	/** Accept and parse versions like `v1.2.3` etc*/
	/** If true, the parsing will be loose. Accept and parse versions like `v1.2.3` or `1.2` */
	loose?: boolean;
	/** If true, the parsing will be in range mode and accept `x` | `*` etc */
	rangeMode?: boolean;
	/**
	 * `boolean` - return true or false
	 * `errorThrow` - throw error
	 * `errorList` - throw list of errors
	 */
	returnType?: "boolean" | "errorList" | "errorThrow";
	/** If true, the validators will be applied. */
	validators?: boolean | "Post" | "Pre";
};

/**
 * @internal
 */
export const OptionsSemVerDefaults: Required<TOptionsSemVer> = {
	loose: true,
	returnType: "errorThrow",
	validators: true,
	rangeMode: false
};

// TODO: returnType work properly (validator)

/**
 * Parses a semantic version string or SemVer into object.
 *
 * @param version - The semantic version to parse. Can be a string or a SemVer object.
 * @param options - Parsing options.
 * @example
 * ```
 * parseSemVer("'1.2.3-beta.1+build.123'")
 * ```
 */
// eslint-disable-next-line complexity

export function parseSemVer<T extends TOptionsSemVer>(
	inputVersion: Required<IparseRange> | Required<IparseSemVer> | SemVer | string,
	options: T = OptionsSemVerDefaults as T
): T | boolean extends { rangeMode: false } ? Required<IparseSemVer> : Required<IparseRange> {
	if (typeof inputVersion != "string" && inputVersion instanceof SemVer) {
		return resultsFormat(inputVersion) as Required<IparseSemVer>;
	}

	const mergedOptions: Required<TOptionsSemVer> = { ...OptionsSemVerDefaults, ...options };
	const version = typeof inputVersion === "object" ? formatVersion(inputVersion) : inputVersion;

	// PRE VALIDATION
	if (mergedOptions.validators == true || mergedOptions.validators == "Pre") {
		versionPreValidator(version, { returnType: mergedOptions.returnType });
	}

	// PARSING
	const versionTrimmed = version.trim();

	const pattrn = (() => {
		if (mergedOptions.rangeMode) return PATTERN_RANGE_MODE;
		if (mergedOptions.loose) return PATTERN_LOOSE_SEMVER;
		return PATTERN_STRICT_SEMVER;
	})();
	const match = pattrn.exec(versionTrimmed);
	if (!match) throw myError(MYERRORLIST.INVALID_VERSION, { message: { dev: [inputVersion.toString()] } });

	// POST VALIDATION
	const mmpFormat = (value: string): number | "x" => {
		if (mergedOptions.rangeMode) return Number.isNaN(Number.parseInt(value, 10)) ? "x" : Number.parseInt(value, 10);
		return Number.parseInt(mergedOptions.loose ? value || "0" : value, 10);
	};

	const result = resultsFormat({
		major: mmpFormat(match[1]),
		minor: mmpFormat(match[2]),
		patch: mmpFormat(match[3]),
		prerelease: match[4]
			? match[4].split(".").map(part => (Number.isNaN(Number.parseInt(part)) ? part : Number.parseInt(part, 10)))
			: [],
		buildmetadata: match[5]
			? match[5].split(".").map(part => (Number.isNaN(Number.parseInt(part)) ? part : Number.parseInt(part, 10)))
			: []
	}) as typeof mergedOptions extends { rangeMode: false } ? Required<IparseRange> : Required<IparseSemVer>;

	if (mergedOptions.validators == true || mergedOptions.validators == "Pre") {
		versionPostValidator(result, { returnType: mergedOptions.returnType });
	}

	return result;
}

const resultsFormat = (
	data: Omit<Required<IparseRange>, "version">
): Required<IparseRange> | Required<IparseSemVer> => ({
	version: function () {
		return formatVersion(this);
	},
	major: data.major,
	minor: data.minor,
	patch: data.patch,
	prerelease: data.prerelease,
	buildmetadata: data.buildmetadata
});

export default parseSemVer;
