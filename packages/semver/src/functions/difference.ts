/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { parseSemVer } from "./parseSemVer";
import compareSemver from "./compare";
import type { TReleases } from "@/internals";

//----------------------
// Types
//----------------------

type differenceReturn = TReleases | undefined;

//----------------------
// Functions
//----------------------

/**
 * Determines the type of version differenceerence between two semantic versions.
 * @returns Returns a string indicating the type of differenceerence:
 * - `"major"` - Major version differenceerence
 * - `"minor"` - Minor version differenceerence
 * - `"patch"` - Patch version differenceerence
 * - `"premajor"` - Major version differenceerence with prerelease
 * - `"preminor"` - Minor version differenceerence with prerelease
 * - `"prepatch"` - Patch version differenceerence with prerelease
 * - `"prerelease"` - Only prerelease differenceerence
 * - `undefined` - Versions are identical
 * @example
 * // Regular version differenceerences
 * difference("1.0.0", "2.0.0") // Returns "major"
 * difference("1.1.0", "1.2.0") // Returns "minor"
 * difference("1.1.1", "1.1.2") // Returns "patch"
 */
// eslint-disable-next-line complexity
export const difference = (
	version1: Parameters<typeof parseSemVer>[0],
	version2: Parameters<typeof parseSemVer>[0],
	options: Parameters<typeof parseSemVer>[1] = {}
): differenceReturn => {
	const [v1, v2] = [parseSemVer(version1, options), parseSemVer(version2, options)];

	const comparison = compareSemver(v1, v2);
	if (comparison === 0) return void 0;

	const [higher, lower] = comparison > 0 ? [v1, v2] : [v2, v1];
	const [highHasPre, lowHasPre] = [Boolean(higher.prerelease.length), Boolean(lower.prerelease.length)];

	if (lowHasPre && !highHasPre) {
		if (!lower.patch && !lower.minor) return "major";
		if (higher.patch) return "patch";
		if (higher.minor) return "minor";
		return "major";
	}
	const prefix = highHasPre ? "pre" : "";
	if (v1.major !== v2.major) return `${prefix}major`;
	if (v1.minor !== v2.minor) return `${prefix}minor`;
	if (v1.patch !== v2.patch) return `${prefix}patch`;
	return "prerelease";
};

export default difference;
