/* eslint-disable complexity */
import { satisfies } from "./satisfies";
import { compareSemver } from "./compare";
import { OptionsSemVerDefaults } from "./parseSemVer";
import type { TOptionsSemVer } from "./parseSemVer";

//----------------------
// Functions
//----------------------

/**
 * Simplifies a version range by creating the shortest possible range expression that matches
 * the same set of versions as the input range.
 *
 * @param versions - Array of version strings to consider
 * @param range - Original version range to simplify
 * @param options - Options for version parsing and comparison
 *
 * @returns The simplified range if shorter than original, otherwise the original range
 *
 * @example
 * // Returns "*"
 * simplifyRange(["1.0.0", "1.1.0", "1.2.0"], ">=1.0.0 <=1.2.0")
 *
 */
export function simplifyRange(
	versions: string[],
	range: string,
	options: Partial<TOptionsSemVer> = OptionsSemVerDefaults
): string {
	const set: Array<[string, string | undefined]> = [];
	let first: string | undefined = void 0;
	let prev: string | undefined = void 0;

	const sortedVersions = versions.sort((a, b) => compareSemver(a, b, options));

	for (const version of sortedVersions) {
		const included = satisfies(version, range, options);
		if (included) {
			prev = version;
			if (!first) first = version;
		} else {
			if (prev) set.push([first!, prev]);
			[prev, first] = [void 0, void 0];
		}
	}

	if (first) set.push([first, undefined]);

	const ranges: string[] = [];
	for (const [min, max] of set) {
		if (min === max) ranges.push(min);
		else if (!max && min === sortedVersions[0]) ranges.push("*");
		else if (!max) ranges.push(`>=${min}`);
		else if (min === sortedVersions[0]) ranges.push(`<=${max}`);
		else ranges.push(`${min} - ${max}`);
	}

	const simplified = ranges.join(" || ");
	return simplified.length < range.length ? simplified : range;
}

export default simplifyRange;
