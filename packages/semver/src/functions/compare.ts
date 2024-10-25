/* eslint-disable curly */
/* eslint-disable complexity */
import type { TOptionsSemVer } from "./parseSemVer";
import { OptionsSemVerDefaults, parseSemVer } from "./parseSemVer";
import { isX } from "@/utils";

//----------------------
// Global CONST
//----------------------

/** @internal Default options for all Compares */
const DEFAULT_OPTIONS: TOptionsSemVer = OptionsSemVerDefaults;

//----------------------
// Types
//----------------------

type TCompareMode = "all" | "builds" | "majorMinorPatch" | "prereleases";

//----------------------
// Functions
//----------------------

/**
 * Comparing SemVer **ONLY** in `MinorMajorPatch`
 *
 * Example format: `1.2.3-prerelease+build`
 * - `1.2.3` - majorMinorPatch
 * - `['prerelease']` - prereleases
 * - `['build']` - builds
 *
 * @returns
 * - `1` if `this` is greater
 * - `0` if `this` == `other`
 * - `-1` if `this` is smaller.
 *
 * @param options - Passing into `parseSemVer` function.
 * @example
 * ```
 * compareMinorMajorPatch("1.2.3","1.2.2") // 1
 * compareMinorMajorPatch("1.2.3","1.2.3") // 0
 * compareMinorMajorPatch("1.2.3","1.2.4") // -1
 * ```
 */

export const compareMinorMajorPatch = (
	InputVersion1: Parameters<typeof parseSemVer>[0],
	InputVersion2: Parameters<typeof parseSemVer>[0],
	options: Partial<TOptionsSemVer> = DEFAULT_OPTIONS
): -1 | 0 | 1 => {
	// DEFAULTS
	const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

	const [version1, version2] = [parseSemVer(InputVersion1, mergedOptions), parseSemVer(InputVersion2, mergedOptions)];
	// 1.2.3 1.x.x - 2.0.x

	const checkX = (val1: number | string, val2: number | string): boolean =>
		Boolean((mergedOptions.rangeMode && isX(val1)) || isX(val2));

	if (!checkX(version1.major, version2.major) && version1.major !== version2.major)
		return version1.major > version2.major ? 1 : -1;
	if (!checkX(version1.minor, version2.minor) && version1.minor !== version2.minor)
		return version1.minor > version2.minor ? 1 : -1;
	if (!checkX(version1.patch, version2.patch) && version1.patch !== version2.patch)
		return version1.patch > version2.patch ? 1 : -1;

	return 0;
};

/**
 * Comparing SemVer **ONLY** in `prereleases`
 *
 * Example format: `1.2.3-prerelease+build`
 * - `1.2.3` - majorMinorPatch
 * - `['prerelease']` - prereleases
 * - `['build']` - builds
 *
 * @param options - Passing into `parseSemVer` function.
 * @returns
 * - `0` if `this` == `other`
 * - `1` if `this` is greater
 * - `-1` if `this` is smaller.
 *
 * @example
 * ```
 * comparePrerelease("1.2.3","1.2.4") // -1
 * comparePrerelease("1.2.3","1.2.3") // 0
 * comparePrerelease("1.2.3","1.2.2") // 1
 * ```
 */

export const comparePrerelease = (
	InputVersion1: Parameters<typeof parseSemVer>[0],
	InputVersion2: Parameters<typeof parseSemVer>[0],
	options: Partial<TOptionsSemVer> = DEFAULT_OPTIONS
): -1 | 0 | 1 => {
	// DEFAULTS
	const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
	const [version1, version2] = [parseSemVer(InputVersion1, mergedOptions), parseSemVer(InputVersion2, mergedOptions)];

	if (version1.prerelease.length === 0 && version2.prerelease.length > 0) return 1;
	if (version1.prerelease.length > 0 && version2.prerelease.length === 0) return -1;

	return compareComponents(version1.prerelease, version2.prerelease, mergedOptions.rangeMode);
};

/**
 * Comparing SemVer **ONLY** in `builds`
 *
 * Example format: `1.2.3-prerelease+build`
 * - `1.2.3` - majorMinorPatch
 * - `['prerelease']` - prereleases
 * - `['build']` - builds
 *
 * @param options - Passing into `parseSemVer` function.
 * @returns
 * - `0` if `this` == `other`
 * - `1` if `this` is greater
 * - `-1` if `this` is smaller.
 *
 * @example
 * ```
 * compareBuild("1.2.3","1.2.4") // -1
 * compareBuild("1.2.3","1.2.3") // 0
 * compareBuild("1.2.3","1.2.2") // 1
 * ```
 */

export const compareBuild = (
	InputVersion1: Parameters<typeof parseSemVer>[0],
	InputVersion2: Parameters<typeof parseSemVer>[0],
	options: Partial<TOptionsSemVer> = DEFAULT_OPTIONS
): -1 | 0 | 1 => {
	// DEFAULTS
	const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

	const [version1, version2] = [parseSemVer(InputVersion1, mergedOptions), parseSemVer(InputVersion2, mergedOptions)];

	return compareComponents(version1.buildmetadata, version2.buildmetadata, mergedOptions.rangeMode);
};

/**
 *
 * To compare Build and Prereleases
 *
 * @internal
 */
const compareComponents = (
	a: ReadonlyArray<number | string>,
	b: ReadonlyArray<number | string>,
	rangeMode = false
): -1 | 0 | 1 => {
	const len = Math.max(a.length, b.length);
	for (let i = 0; i < len; i++) {
		if (i >= a.length) return -1;
		if (i >= b.length) return 1;
		if (a[i] === b[i]) continue;

		const aNum = Number.parseInt(a[i] as string);
		const bNum = Number.parseInt(b[i] as string);

		if (rangeMode && (isX(a[i]) || isX(b[i]))) return 0;

		if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) return aNum > bNum ? 1 : -1;

		return a[i] > b[i] ? 1 : -1;
	}
	return 0;
};

/**
 * Comparing SemVer depends from `options.compare`
 *
 *
 * Example format: `1.2.3-prerelease+build`
 * - `1.2.3` - majorMinorPatch
 * - `['prerelease']` - prereleases
 * - `['build']` - builds
 *
 * @param options - Passing into `parseSemVer` function.
 * @returns
 * - `0` if `this` == `other`
 * - `1` if `this` is greater
 * - `-1` if `this` is smaller.
 *
 * @example
 * ```
 * compareSemver("1.2.3","1.2.4") // -1
 * compareSemver("1.2.3","1.2.3") // 0
 * compareSemver("1.2.3","1.2.2") // 1
 * ```
 */

export const compareSemver = (
	InputVersion1: Parameters<typeof parseSemVer>[0],
	InputVersion2: Parameters<typeof parseSemVer>[0],
	options: Partial<TOptionsSemVer> &
		({ compare: "all"; ignoreBuild?: boolean } | { compare?: Exclude<TCompareMode, "all"> }) = {
		...DEFAULT_OPTIONS,
		compare: "all",
		ignoreBuild: false
	}
): -1 | 0 | 1 => {
	// DEFAULTS
	const mergedOptions: Parameters<typeof compareSemver>[2] = {
		...DEFAULT_OPTIONS,
		...(options.compare === "all" ? { ignoreBuild: false } : {}),
		...options
	};

	const [version1, version2] = [parseSemVer(InputVersion1, mergedOptions), parseSemVer(InputVersion2, mergedOptions)];

	switch (mergedOptions.compare) {
		// eslint-disable-next-line default-case-last
		default:
		case "all": {
			const majorMinorPatchResult = compareMinorMajorPatch(version1, version2, mergedOptions);
			if (majorMinorPatchResult !== 0) return majorMinorPatchResult;
			const prereleaseResult = comparePrerelease(version1, version2, mergedOptions);
			if (prereleaseResult !== 0) return prereleaseResult;
			if (mergedOptions.compare === "all" && !mergedOptions.ignoreBuild) {
				return compareBuild(version1, version2, mergedOptions);
			}
			return 0;
		}
		case "majorMinorPatch": {
			return compareMinorMajorPatch(version1, version2, mergedOptions);
		}
		case "prereleases": {
			return comparePrerelease(version1, version2, mergedOptions);
		}
		case "builds": {
			return compareBuild(version1, version2, mergedOptions);
		}
	}
};

export default compareSemver;
