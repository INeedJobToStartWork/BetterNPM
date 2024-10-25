/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SemVer } from "@/classes";
import type { TOptionsSemVer } from "./parseSemVer";
import { parseSemVer, OptionsSemVerDefaults } from "./parseSemVer";
import { myError } from "oh-my-error";
import type { TMyErrorList } from "oh-my-error";

//----------------------
// Global CONST
//----------------------

const DEFAULT_OPTIONS = { ...OptionsSemVerDefaults };

//----------------------
// Errors
//----------------------

/**
 * @internal
 */
const MYERRORLIST = {
	WRONG_UPDATE_OPTION: {
		code: "WRONG_UPDATE_OPTION",
		name: "Wrong update option",
		message: {
			dev: "Wrong `update` option"
		},
		hint: {
			dev: "Check passed `update`"
		}
	}
} as const satisfies TMyErrorList;

//----------------------
// Types
//----------------------

/**
 * Possible update types for version increment.
 * @intelType //TODO: no-internal-exports plugin need update to fix it
 */
type UpdateType = "buildmetadata" | "major" | "minor" | "patch" | "premajor" | "preminor" | "prepatch" | "prerelease";

/**
 * Possible return types for the increase function.
 * @intelType
 */
type ReturnTypes = "object" | "SemVer" | "string";

/** @intelType */
type TTTTT = "premajor" | "preminor" | "prepatch" | "prerelease";

/** @intelType */
// eslint-disable-next-line @typescript-eslint/ban-types
type TOptionsForPrerelease = TOptionsSemVer & { value?: "alpha" | "beta" | "rc" | (Object & string) };

/** @intelType */
// eslint-disable-next-line @typescript-eslint/ban-types
type OptionsForBuild = TOptionsSemVer & { value?: "BUILD" | (Object & string) };

//----------------------
// Functions
//----------------------

/**
 * Increases the version number of a semantic version string.
 *
 * @example
 * // Increase major version
 * increase("1.2.3", "major", "string") // Returns "2.0.0"
 *
 * // Increase minor version with custom prerelease
 * increase("1.2.3", "preminor", "string", { value: "alpha" }) // Returns "1.3.0-alpha"
 */
// eslint-disable-next-line complexity
export const increase = <T extends UpdateType>(
	inputVersion: Parameters<typeof parseSemVer>[0],
	update: T,
	returnType: ReturnTypes = "SemVer" as const,
	options: T extends TTTTT
		? TOptionsForPrerelease
		: T extends "buildmetadata"
			? OptionsForBuild
			: TOptionsSemVer = DEFAULT_OPTIONS as any
) => {
	const mergedOptions = { ...OptionsSemVerDefaults, ...options };
	let version = parseSemVer(inputVersion, mergedOptions);

	const updatePreOrBuild = (stage: "buildmetadata" | "prerelease"): void => {
		if (Object.hasOwn(options, "value")) {
			// @ts-expect-error Because Object.hasOwn(options, "value") doesnt narrow type line `in`, but we dont want to use `in` to not check proto chain
			version[stage] = [options.value as string];
			return;
		}

		const indexOfNumber = version[stage].findLastIndex((item: number | string) => Number.isInteger(item));
		if (indexOfNumber == -1) version[stage].push(0);
		else if (typeof version[stage][indexOfNumber] == "number") version[stage][indexOfNumber] += 1;
	};

	const resetRest = (choiceInput: UpdateType) => {
		const updateOrder = ["major", "minor", "patch", "prerelease", "buildmetadata"] as const;
		const choice: (typeof updateOrder)[number] = updateOrder.find(v => v === choiceInput) ?? "buildmetadata";

		const startFrom = updateOrder.indexOf(choice);
		if (startFrom === -1) throw new Error(`Invalid update type: ${update}`);

		for (let i = startFrom + 1; i < updateOrder.length; i++) {
			const key: (typeof updateOrder)[number] = updateOrder[i];
			// version[key] = Array.isArray(version[key]) ? [] : 0;
			// eslint-disable-next-line @EslintUnicorn/prefer-ternary
			if (key === "prerelease" || key === "buildmetadata") {
				version[key] = [];
			} else {
				version[key] = 0;
			}
		}
	};

	switch (update) {
		case "major":
		case "minor":
		case "patch": {
			const updateKey = update as keyof Pick<typeof version, "major" | "minor" | "patch">;

			if (typeof version[updateKey] === "number") version[updateKey] += 1;

			resetRest(update);
			break;
		}
		case "premajor":
		case "preminor":
		case "prepatch": {
			const upd = {
				premajor: "major",
				preminor: "minor",
				prepatch: "patch"
			} as const;

			const updateKey = upd[update as keyof typeof upd] as keyof Pick<typeof version, "major" | "minor" | "patch">;
			if (typeof version[updateKey] === "number") version[updateKey] += 1;
			resetRest(upd[update as "premajor" | "preminor" | "prepatch"] as "premajor");
			updatePreOrBuild("prerelease");

			break;
		}
		case "prerelease":
		case "buildmetadata": {
			updatePreOrBuild(update);
			resetRest(update);
			break;
		}
		default: {
			throw myError(MYERRORLIST.WRONG_UPDATE_OPTION);
		}
	}

	if (returnType === "string") return version.version();
	if (returnType === "SemVer") return new SemVer(version);
	return version;
};
export default increase;
