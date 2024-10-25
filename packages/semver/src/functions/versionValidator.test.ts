import { describe, expect, it, test } from "vitest";
import { versionPreValidator, MYERRORLIST_PRE, MYERRORLIST_POST, versionPostValidator } from "./versionValidator";
import { myErrorWrapper } from "oh-my-error";
import { MAX_SAFE_BUILD_LENGTH, MAX_SAFE_INTEGER } from "@/internals/constants";
import { SemVer } from "@/classes";

describe("Version Validators", () => {
	describe("[FUNCTION] versionPreValidator", () => {
		describe("[ERROR]", () => {
			it("NULL_VERSION - for input `null`", () => {
				const [error, isError] = myErrorWrapper(versionPreValidator)(null);
				expect(isError).toEqual(true);
				expect(error).toEqual(MYERRORLIST_PRE.NULL_VERSION);
			});
			it("UNDEFINED_VERSION - for input `void 0` (basic undefined)", () => {
				const [error, isError] = myErrorWrapper(versionPreValidator)(void 0);
				expect(isError).toEqual(true);
				expect(error).toEqual(MYERRORLIST_PRE.UNDEFINED_VERSION);
			});
			it(`TOO_LONG_LENGTH_VERSION - for input string longer than ${MAX_SAFE_BUILD_LENGTH}`, () => {
				const [error, isError] = myErrorWrapper(versionPreValidator)("a".repeat(MAX_SAFE_BUILD_LENGTH + 1));

				expect(isError).toEqual(true);
				expect(error).toEqual(MYERRORLIST_PRE.TOO_LONG_LENGTH_VERSION);
			});
			it(`INVALID_TYPE - for input which is not Parameters<typeof parseSemVer>[0]`, () => {
				const [error, isError] = myErrorWrapper(versionPreValidator)(13);

				expect(isError).toEqual(true);
				expect(error).toEqual(MYERRORLIST_PRE.INVALID_TYPE);
			});
		});
		describe("[PASS]", () => {
			test("SemVer as Input", () => {
				const Input = new SemVer("1.2.3");

				const [data, isError] = myErrorWrapper(versionPreValidator)(Input);
				expect(isError).toEqual(false);
				expect(data).toEqual(true);
			});
		});
	});
	describe("[FUNCTION] versionPostValidator", () => {
		describe("[ERROR]", () => {
			describe("INVALID_VERSION_MAJOR", () => {
				it(`Inputed Major smaller than 0`, () => {
					const [error, isError] = myErrorWrapper(versionPostValidator)({
						buildmetadata: [],
						major: -1,
						minor: 2,
						patch: 3,
						prerelease: [],
						version: () => ""
					});
					expect(isError).toEqual(true);
					expect(error).toEqual(MYERRORLIST_POST.INVALID_VERSION_MAJOR);
				});
				it(`Input bigger than ${MAX_SAFE_INTEGER} (MAX_SAFE_INTEGER)`, () => {
					const [error, isError] = myErrorWrapper(versionPostValidator)({
						buildmetadata: [],
						major: MAX_SAFE_INTEGER + 1,
						minor: 2,
						patch: 3,
						prerelease: [],
						version: () => ""
					});
					expect(isError).toEqual(true);
					expect(error).toEqual(MYERRORLIST_POST.INVALID_VERSION_MAJOR);
				});
			});
		});
	});
});
