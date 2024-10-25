/* eslint-disable @EslintImports/no-deprecated */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { TOptionsSemVer } from "@/functions";
import {
	compareSemver,
	compareBuild,
	comparePrerelease,
	compareMinorMajorPatch,
	OptionsSemVerDefaults,
	parseSemVer,
	increase
} from "@/functions";
import { myError, myErrorWrapper } from "oh-my-error";

export default class SemVer {
	public options;
	public raw: string;
	public version: ReturnType<typeof parseSemVer<{ rangeMode: false }>>["version"];
	public versionFormat: string;
	public major: ReturnType<typeof parseSemVer<{ rangeMode: false }>>["major"];
	public minor: ReturnType<typeof parseSemVer<{ rangeMode: false }>>["minor"];
	public patch: ReturnType<typeof parseSemVer<{ rangeMode: false }>>["patch"];
	public prerelease: ReturnType<typeof parseSemVer<{ rangeMode: false }>>["prerelease"];
	public buildmetadata: ReturnType<typeof parseSemVer<{ rangeMode: false }>>["buildmetadata"];

	constructor(inputVersion: Parameters<typeof parseSemVer>[0], options: TOptionsSemVer = OptionsSemVerDefaults) {
		const isSemVer = inputVersion instanceof SemVer;
		const mergedOptions: TOptionsSemVer = { ...OptionsSemVerDefaults, ...options, rangeMode: false };

		this.options = mergedOptions;
		// eslint-disable-next-line no-nested-ternary, @EslintUnicorn/no-nested-ternary
		this.raw = isSemVer ? inputVersion.raw : typeof inputVersion == "string" ? inputVersion : inputVersion.version();
		// eslint-disable-next-line no-nested-ternary
		this.versionFormat = isSemVer
			? inputVersion.versionFormat
			: // eslint-disable-next-line @EslintUnicorn/no-nested-ternary
				typeof inputVersion == "string"
				? inputVersion
				: inputVersion.version();

		// SPLITTING
		// const { patch, buildmetadata, major, minor, prerelease, version } = isSemVer
		// 	? inputVersion
		// 	: parseSemVer(this.raw, { rangeMode: false });

		const { patch, buildmetadata, major, minor, prerelease, version } = isSemVer
			? inputVersion
			: (parseSemVer(this.raw, mergedOptions) as ReturnType<typeof parseSemVer<{ rangeMode: false }>>); //TODO:fix
		this.version = version;
		this.major = major;
		this.minor = minor;
		this.patch = patch;
		this.prerelease = prerelease;
		this.buildmetadata = buildmetadata;
	}

	/**
	 * Set and return `versionFormat` property of class.
	 *
	 * @param cb - Function to format which get `this` from class
	 * @returns string
	 */
	format(cb: (arg1: this) => string): string {
		const [data, isError] = myErrorWrapper(cb)(this);
		if (isError) {
			throw myError({
				code: "CALLBACK_ERROR",
				name: "Callback throw Error",
				hint: { dev: "Callback Function throws error.", user: "" },
				message: {}
			});
		}
		this.versionFormat = data;
		return this.versionFormat;
	}

	/**
	 * Compares the release portion of two versions.
	 *
	 * @returns
	 * - `0` if `this` == `other`
	 * - `1` if `this` is greater
	 * - `-1` if `other` is greater.
	 */
	compare(
		other: Parameters<typeof compareSemver>[1],
		options: Parameters<typeof compareSemver>[2] = this.options
	): -1 | 0 | 1 {
		const mergedOptions: TOptionsSemVer = { ...OptionsSemVerDefaults, ...options };
		return compareSemver(this.version(), other, mergedOptions);
	}
	/**
	 * Compares the release portion of two versions.
	 *
	 * @returns
	 * - `0` if `this` == `other`
	 * - `1` if `this` is greater
	 * - `-1` if `other` is greater.
	 */
	compareMinorMajorPatch(other: Parameters<typeof compareMinorMajorPatch>[1], options = this.options): -1 | 0 | 1 {
		const mergedOptions: TOptionsSemVer = { ...OptionsSemVerDefaults, ...options };
		return compareMinorMajorPatch(this.version(), other, mergedOptions);
	}
	/**
	 * Compares the prerelease portion of two versions.
	 *
	 * @returns
	 * - `0` if `this` == `other`
	 * - `1` if `this` is greater
	 * - `-1` if `other` is greater.
	 */
	// comparePre(other: string | SemVer): 1 | 0 | -1 {}
	comparePrerelease(other: Parameters<typeof comparePrerelease>[1], options = this.options): -1 | 0 | 1 {
		const mergedOptions: TOptionsSemVer = { ...OptionsSemVerDefaults, ...options };
		return comparePrerelease(this.version(), other, mergedOptions);
	}
	/**
	 * Compares the build identifier of two versions.
	 *
	 * @returns
	 * - `0` if `this` == `other`
	 * - `1` if `this` is greater
	 * - `-1` if `other` is greater.
	 */
	compareBuild(other: Parameters<typeof compareBuild>[1], options = this.options): -1 | 0 | 1 {
		const mergedOptions: TOptionsSemVer = { ...OptionsSemVerDefaults, ...options };
		return compareBuild(this.version(), other, mergedOptions);
	}

	/**
	 * Increases the version number of a semantic version string.
	 *
	 * @example
	 * ```
	 * // Increase major version for "1.2.3"
	 * increase("major", "string") // Returns "2.0.0"
	 *
	 * // Increase minor version with custom prerelease for "1.2.3"
	 * increase("preminor", "string", { value: "alpha" }) // Returns "1.3.0-alpha"
	 * ```
	 */
	increase(update: Parameters<typeof increase>[1], options: Parameters<typeof increase>[3] = OptionsSemVerDefaults) {
		const result = increase(this.version(), update, "SemVer", options) as SemVer;
		const { version, prerelease, patch, raw, minor, major, buildmetadata } = result;

		this.version = version;
		this.prerelease = prerelease;
		this.patch = patch;
		this.raw = raw;
		this.minor = minor;
		this.major = major;
		this.buildmetadata = buildmetadata;
	}
}

export { SemVer };
