// import { SemVer } from "@/classes";
// import type { TOptionsSemVer } from "./parseSemVer";
// import { OptionsSemVerDefaults } from "./parseSemVer";

import { describe, expect, it } from "vitest";
import increase from "./increase";
import parseSemVer, { MYERRORLIST } from "./parseSemVer";
import { myError, myErrorWrapper } from "oh-my-error";
import { SemVer } from "@/classes";

describe("[FUNCTION] increase", () => {
	describe("[ERROR]", () => {
		it("INVALID_VERSION - for input `null`", () => {
			const [error, isError] = myErrorWrapper(parseSemVer)("1.ASD.4");
			expect(isError).toEqual(true);
			expect(error).toEqual(myError(MYERRORLIST.INVALID_VERSION, { message: { dev: ["1.ASD.4"] } }));
		});
	});
	describe("[PASS]", () => {
		describe("Bump Major Version - '1.2.3' 'major'", () => {
			it("returnType - 'string'", () => {
				const result = increase("1.2.3", "major", "string");

				expect(typeof result === "string").toEqual(true);
				expect(result).toEqual("2.0.0");
			});
			it("returnType - 'SemVer'", () => {
				const result = increase("1.2.3", "major", "SemVer");
				expect(result).instanceOf(SemVer);
				expect(String(result)).toEqual(String(new SemVer("2.0.0")));
			});
			it("returnType - 'object'", () => {
				const result = increase("1.2.3", "major", "object");

				expect(typeof result === "object").toEqual(true);
				expect(result).toEqual({
					major: 2,
					minor: 0,
					patch: 0,
					prerelease: [],
					buildmetadata: [],
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					version: expect.any(Function)
				});
			});
		});
		describe("Bump Minor Version - '1.2.3' 'minor'", () => {
			it("returnType - 'string'", () => {
				const result = increase("1.2.3", "minor", "string");

				expect(typeof result === "string").toEqual(true);
				expect(result).toEqual("1.3.0");
			});
			it("returnType - 'SemVer'", () => {
				const result = increase("1.2.3", "minor", "SemVer");
				expect(result).instanceOf(SemVer);
				expect(String(result)).toEqual(String(new SemVer("1.3.0")));
			});
			it("returnType - 'object'", () => {
				const result = increase("1.2.3", "minor", "object");

				expect(typeof result === "object").toEqual(true);
				expect(result).toEqual({
					major: 1,
					minor: 3,
					patch: 0,
					prerelease: [],
					buildmetadata: [],
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					version: expect.any(Function)
				});
			});
		});
		describe("Bump Patch Version - '1.2.3' 'patch'", () => {
			it("returnType - 'string'", () => {
				const result = increase("1.2.3", "patch", "string");

				expect(typeof result === "string").toEqual(true);
				expect(result).toEqual("1.2.4");
			});
			it("returnType - 'SemVer'", () => {
				const result = increase("1.2.3", "patch", "SemVer");
				expect(result).instanceOf(SemVer);
				expect(String(result)).toEqual(String(new SemVer("1.2.4")));
			});
			it("returnType - 'object'", () => {
				const result = increase("1.2.3", "patch", "object");

				expect(typeof result === "object").toEqual(true);
				expect(result).toEqual({
					major: 1,
					minor: 2,
					patch: 4,
					prerelease: [],
					buildmetadata: [],
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					version: expect.any(Function)
				});
			});
		});
	});
	describe("[SCENARIOS]", () => {
		describe("Major", () => {
			it("1.2.3 => 2.0.0", () => {});
			it("5.2.3 => 6.0.0", () => {});
		});
		describe("PRERELEASES", () => {
			describe("PreMajor", () => {
				it("1.2.3 => 2.0.0-0 - string - check correctness", () => {
					const result = increase("1.2.3", "premajor", "string");
					expect(typeof result == "string").toEqual(true);
					expect(result).toEqual("2.0.0-0");
				});
				it("1.2.3 => 2.0.0-alpha", () => {
					const result = increase("1.2.3", "premajor", "string", { value: "alpha" });
					expect(typeof result == "string").toEqual(true);
					expect(result).toEqual("2.0.0-alpha");
				});
			});
			describe("PreMinor", () => {
				it("1.2.3 => 1.3.0-0", () => {
					const result = increase("1.2.3", "preminor", "string");
					expect(typeof result == "string").toEqual(true);
					expect(result).toEqual("1.3.0-0");
				});
				it("1.2.3 => 1.3.0-alpha", () => {
					const result = increase("1.2.3", "preminor", "string", { value: "alpha" });
					expect(typeof result == "string").toEqual(true);
					expect(result).toEqual("1.3.0-alpha");
				});
			});
			describe("PrePatch", () => {
				it("1.2.3 => 1.2.4-0", () => {
					const result = increase("1.2.3", "prepatch", "string");
					expect(typeof result == "string").toEqual(true);
					expect(result).toEqual("1.2.4-0");
				});
				it("1.2.3 => 1.2.4-alpha", () => {
					const result = increase("1.2.3", "prepatch", "string", { value: "alpha" });
					expect(typeof result == "string").toEqual(true);
					expect(result).toEqual("1.2.4-alpha");
				});
			});
		});
		describe("Prerelease update", () => {
			it("1.0.0-x.7.z.92 => 1.0.0-x.7.z.93", () => {
				const result = increase("1.0.0-x.7.z.92", "prerelease", "string");
				expect(typeof result === "string").toEqual(true);
				expect(result).toEqual("1.0.0-x.7.z.93");
			});
			it("1.2.3-alpha => 1.2.3-alpha.0 - returnType - 'string'", () => {
				const result = increase("1.2.3-alpha", "prerelease", "string");
				expect(typeof result === "string").toEqual(true);
				expect(result).toEqual("1.2.3-alpha.0");
			});
			describe("1.2.3-alpha.0 => 1.2.3-alpha.1", () => {
				it("returnType - 'string'", () => {
					const result = increase("1.2.3-alpha.0", "prerelease", "string");
					expect(typeof result === "string").toEqual(true);
					expect(result).toEqual("1.2.3-alpha.1");
				});
				it("returnType - 'Semver'", () => {
					const result = increase("1.2.3-alpha.0", "prerelease", "SemVer");
					expect(result).instanceOf(SemVer);
					expect(String(result)).toEqual(String(new SemVer("1.2.3-alpha.1")));
				});
				it("returnType - 'object'", () => {
					const result = increase("1.2.3-alpha.0", "prerelease", "object");
					expect(typeof result === "object").toEqual(true);
					expect(result).toEqual({
						major: 1,
						minor: 2,
						patch: 3,
						prerelease: ["alpha", 1],
						buildmetadata: [],
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						version: expect.any(Function)
					});
				});
			});
			// it("1.2.3 => 1.2.3.beta - returnType - 'string'", () => {
			// 	const result = increase("1.2.3", "prerelease", "string", "beta");
			// 	expect(typeof result === "string").toEqual(true);
			// 	expect(result).toEqual("1.2.3.beta");
			// });
			// it("returnType - 'object'", () => {
			// 	const result = increase("1.2.3", "patch", "object");
			// 	expect(typeof result === "object").toEqual(true);
			// 	expect(result).toEqual({
			// 		major: 1,
			// 		minor: 2,
			// 		patch: 4,
			// 		prerelease: [],
			// 		buildmetadata: [],
			// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			// 		version: expect.any(Function)
			// 	});
			// });
		});
		describe("Builds update", () => {
			it("1.2.3-alpha+build => 1.2.3-alpha.0 - returnType - 'string'", () => {
				const result = increase("1.2.3-alpha+build", "prerelease", "string");
				expect(typeof result === "string").toEqual(true);
				expect(result).toEqual("1.2.3-alpha.0");
			});
			describe("1.2.3-alpha.0+build.0 => 1.2.3-alpha.0+build.1", () => {
				it("returnType - 'string'", () => {
					const result = increase("1.2.3-alpha.0+build.0", "buildmetadata", "string");
					expect(typeof result === "string").toEqual(true);
					expect(result).toEqual("1.2.3-alpha.0+build.1");
				});
				it("returnType - 'Semver'", () => {
					const result = increase("1.2.3-alpha.0+build.0", "buildmetadata", "SemVer");
					expect(result).instanceOf(SemVer);
					expect(String(result)).toEqual(String(new SemVer("1.2.3-alpha.0+build.1")));
				});
				it("returnType - 'object'", () => {
					const result = increase("1.2.3-alpha.0+build.0", "buildmetadata", "object");
					expect(typeof result === "object").toEqual(true);
					expect(result).toEqual({
						major: 1,
						minor: 2,
						patch: 3,
						prerelease: ["alpha", 0],
						buildmetadata: ["build", 1],
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						version: expect.any(Function)
					});
				});
			});
			// it("1.2.3 => 1.2.3.beta - returnType - 'string'", () => {
			// 	const result = increase("1.2.3", "prerelease", "string", "beta");
			// 	expect(typeof result === "string").toEqual(true);
			// 	expect(result).toEqual("1.2.3.beta");
			// });
			// it("returnType - 'object'", () => {
			// 	const result = increase("1.2.3", "patch", "object");
			// 	expect(typeof result === "object").toEqual(true);
			// 	expect(result).toEqual({
			// 		major: 1,
			// 		minor: 2,
			// 		patch: 4,
			// 		prerelease: [],
			// 		buildmetadata: [],
			// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			// 		version: expect.any(Function)
			// 	});
			// });
		});
	});
});
