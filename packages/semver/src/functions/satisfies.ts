/* eslint-disable complexity */
import type { TOptionsSemVer } from "@/functions";
import { compareSemver, OptionsSemVerDefaults, parseSemVer } from "@/functions";

//-------------------------
// Types
//-------------------------

/** @internal */
export type TOperator = "-" | "*" | "^" | "<" | "<=" | "=" | ">" | ">=" | "~" | "x";

/** @internal */
export type TCondition = [TOperator, string];

//-------------------------
// Functions
//-------------------------

/**
 * Determines whether a version satisfies a specified version range.
 *
 * @description
 * This function checks if a given version number meets the constraints specified in a version range string.
 * It supports various range formats including:
 * - Hyphenated ranges (e.g., "1.2.3 - 2.0.0")
 * - Multiple conditions (e.g., ">=1.2.3 <2.0.0")
 * - Simple comparisons (e.g., ">=1.2.3")
 *
 * @param versionInput - The version number to check. Can be a string or any valid input accepted by parseSemVer.
 * @param range - A string specifying the version range to test against.
 *                Examples: "1.2.3", ">=1.2.3", "1.2.3 - 2.0.0", ">=1.2.3 <2.0.0"
 * @param options - Optional configuration options for version parsing and comparison.
 *
 * @returns boolean - Returns true if the version satisfies the range, false otherwise.
 *
 * @example
 * ```typescript
 * satisfies('1.2.3', '>=1.0.0'); // true
 * satisfies('2.0.0', '1.0.0 - 3.0.0'); // true
 * satisfies('1.2.3', '>2.0.0'); // false
 * ```
 */
export function satisfies(
	versionInput: Parameters<typeof parseSemVer<{ rangeMode: false }>>[0],
	range: string,
	options: TOptionsSemVer = OptionsSemVerDefaults
): boolean {
	const mergedOptions = { ...OptionsSemVerDefaults, ...options, rangeMode: true };

	const version = parseSemVer(versionInput, mergedOptions);
	const parsedRanges = parseRange(range);

	return parsedRanges.some(subRange => {
		if (subRange.length === 3) {
			const [start, hyphen, end] = subRange;
			if (hyphen[0] === "-") {
				const result =
					checkCondition(version, [">=", start[1]], mergedOptions) &&
					checkCondition(version, ["<=", end[1]], mergedOptions);
				return result;
			}
		} else if (subRange.length == 2) {
			const [start, end] = subRange;
			const result = checkCondition(version, start, mergedOptions) && checkCondition(version, end, mergedOptions);
			return result;
		}
		return subRange.every(condition => checkCondition(version, condition, mergedOptions));
	});
}

/**
 * @internal
 */
export function parseRange(range: string): TCondition[][] {
	return range.split(/\s*\|\|\s*/u).map(subRange =>
		subRange.split(/\s+/u).map(part => {
			const match = /^(>=|<=|[<=>^~-])?\s*(.*)$/u.exec(part);
			return match ? ([match[1] || "=", match[2]] as TCondition) : ["=", part];
		})
	);
}

/**
 * @internal
 */
export function checkCondition(
	version: ReturnType<typeof parseSemVer>,
	range: TCondition,
	options: TOptionsSemVer = OptionsSemVerDefaults
): boolean {
	const [operator, versionString] = range;
	const version2 = parseSemVer(versionString, options);

	const comparison = compareSemver(version, versionString, options);
	switch (operator) {
		case "*":
		case "x":
		case "=": {
			return comparison === 0;
		}
		case ">": {
			return comparison > 0;
		}
		case ">=": {
			return comparison >= 0;
		}
		case "<": {
			return comparison < 0;
		}
		case "<=": {
			return comparison <= 0;
		}
		case "^": {
			return version.major == version2.major;
		}
		case "~": {
			return version.major == version2.major && version.minor == version2.minor && comparison === 0;
		}
		default: {
			return true;
		}
	}
}

export default satisfies;
