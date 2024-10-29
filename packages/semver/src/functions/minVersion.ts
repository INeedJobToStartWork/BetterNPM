import type { IparseRange, satisfies, TCondition } from "@/functions";
import { compareSemver, increase, parseRange, parseSemVer } from "@/functions";
import { isX } from "@/utils";

//----------------------
// Functions (Main)
//----------------------

/**
 * Finds the minimum valid version that satisfies the given semver range.
 * @param range - A semver range string (e.g. "^1.2.3", "1.x", ">=2.0.0")
 * @example
 * minVersion("^1.2.3") // Returns "1.2.3"
 * minVersion(">=2.0.0") // Returns "2.0.0"
 * minVersion("1.x || 2.x") // Returns "1.0.0"
 *
 * @returns The minimum valid version as a string that satisfies the range.
 * If no range is provided, returns "0.0.0"
 */
export const minVersion = (range: Parameters<typeof satisfies>[1]) => {
	if (!range) return parseSemVer("0.0.0").version();
	let result: Required<IparseRange> | undefined = void 0;

	const parsedRanges = parseRange(range);

	for (const subRange of parsedRanges) {
		if (subRange.length == 1) {
			const range = subRange[0];
			const minVersionFromRange = minFromIt(range);
			if (result == void 0) result = minVersionFromRange;
			else result = compareSemver(minVersionFromRange, result) == -1 ? minVersionFromRange : result;
		} else if (subRange.length == 2) {
			const [range1, range2] = [subRange[0], subRange[1]];
			const [minRange1, minRange2] = [minFromIt(range1), minFromIt(range2)];
			const higher = compareSemver(minRange1, minRange2) == 1 ? minRange1 : minRange2; // highest from 2 && - lowest possible
			if (result == void 0) result = higher;
			else result = compareSemver(higher, result) == -1 ? higher : result;
		} else {
			const [start, hyphen, end] = subRange;
			if (hyphen[0] === "-") {
				const [range1, range2] = [start, end];
				const [minRange1, minRange2] = [minFromIt(range1), minFromIt(range2)];
				const lower = compareSemver(minRange1, minRange2) == -1 ? minRange1 : minRange2; // highest from 2 && - lowest possible
				if (result == void 0) result = lower;
				else result = compareSemver(lower, result) == -1 ? lower : result;
			}
		}
	}

	return result?.version();
};

export default minVersion;

//----------------------
// Functions
//----------------------

/** @internal */
const changeXT0 = (versionInp: Parameters<typeof parseSemVer>[0]) => {
	const version = parseSemVer(versionInp, { rangeMode: true });
	version.major = isX(version.major) ? 0 : version.major;
	version.minor = isX(version.minor) ? 0 : version.minor;
	version.patch = isX(version.patch) ? 0 : version.patch;
	return version;
};
/** @internal */
const minFromIt = (cond: TCondition) => {
	let version = changeXT0(cond[1]);

	switch (cond[0]) {
		case "^": {
			return version;
		}
		case "<":
		case "<=": {
			return parseSemVer("0.0.0");
		}
		case ">=":
		case "=": {
			return version;
		}
		case ">": {
			//TODO: prerelease?
			return version.prerelease.length > 0
				? parseSemVer(increase(version, "prerelease"))
				: parseSemVer(increase(version, "patch"));
		}
		case "~": {
			// return parseSemVer(`${version.major}.${version.minor}.0`);
			return version;
		}
		default: {
			return version;
		}
	}
};
