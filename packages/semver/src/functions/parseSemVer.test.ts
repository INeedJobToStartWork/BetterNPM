import { describe, expect, it } from "vitest";

import { SemVer } from "@/classes";
import { myError, myErrorWrapper } from "oh-my-error";
import parseSemVer, { MYERRORLIST } from "./parseSemVer";

describe("Parse SemVer", () => {
	describe("[FUNCTION] parseSemVer", () => {
		// describe("[ERROR]", () => {
		// 	it("INVALID_VERSION - for input `null`", () => {
		// 		const [error, isError] = myErrorWrapper(parseSemVer)("1.ASD.4");
		// 		expect(isError).toEqual(true);
		// 		expect(error).toEqual(MYERRORLIST.INVALID_VERSION);
		// 	});
		// });
		describe("[PASS]", () => {
			it("SemVer as Input", () => {
				const Input = new SemVer("1.2.3");

				// expect(Input.major).toEqual(1);
				const [data, isError] = myErrorWrapper(parseSemVer)(Input);
				expect(isError).toEqual(false);
				const { version } = data;
				expect(data).toEqual({
					major: 1,
					minor: 2,
					patch: 3,
					prerelease: [],
					buildmetadata: [],
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					version: expect.any(Function)
				});
			});
			describe("rangeMode", () => {
				it("1.X.X", () => {
					const [result, isError] = myErrorWrapper(parseSemVer)("1.X.X", { rangeMode: true });
					expect(isError).toBe(false);
					expect(result).toEqual({
						version: expect.any(Function),
						major: 1,
						minor: "x",
						patch: "x",
						prerelease: [],
						buildmetadata: []
					});
				});
				it("X.X.X", () => {
					const [result, isError] = myErrorWrapper(parseSemVer)("X.X.X", { rangeMode: true });
					expect(isError).toBe(false);
					expect(result).toEqual({
						version: expect.any(Function),
						major: "x",
						minor: "x",
						patch: "x",
						prerelease: [],
						buildmetadata: []
					});
				});
				it("x.X.x", () => {
					const [result, isError] = myErrorWrapper(parseSemVer)("x.X.x", { rangeMode: true });
					expect(isError).toBe(false);
					expect(result).toEqual({
						version: expect.any(Function),
						major: "x",
						minor: "x",
						patch: "x",
						prerelease: [],
						buildmetadata: []
					});
				});
				it("*", () => {
					const [result, isError] = myErrorWrapper(parseSemVer)("*", { rangeMode: true });
					expect(isError).toBe(false);
					expect(result).toEqual({
						version: expect.any(Function),
						major: "x",
						minor: "x",
						patch: "x",
						prerelease: [],
						buildmetadata: []
					});
				});
			});
		});
		describe("[SCENARIOS]", () => {
			describe("1.2 - X.Y.Z form", () => {
				it("1.2 => 1.2.0 - loose:true (default)", () => {
					const Input = "1.2";

					// expect(Input.major).toEqual(1);
					const [data, isError] = myErrorWrapper(parseSemVer)(Input);
					expect(isError).toEqual(false);
					expect(data).toEqual({
						major: 1,
						minor: 2,
						patch: 0,
						prerelease: [],
						buildmetadata: [],
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						version: expect.any(Function)
					});
				});
				it("1.2 => ERROR - loose: false", () => {
					const Input = "1.2";

					// expect(Input.major).toEqual(1);
					const [data, isError] = myErrorWrapper(parseSemVer)(Input, { loose: false });
					expect(isError).toEqual(true);
					expect(data).toEqual(myError(MYERRORLIST.INVALID_VERSION, { message: { dev: ["1.2"] } }));
				});
			});
			it("SemVer as Input", () => {
				const Input = new SemVer("1.2.3-alpha.1+build.32");

				// expect(Input.major).toEqual(1);
				const [data, isError] = myErrorWrapper(parseSemVer)(Input);
				expect(isError).toEqual(false);

				expect(data).toEqual({
					major: 1,
					minor: 2,
					patch: 3,
					prerelease: ["alpha", 1],
					buildmetadata: ["build", 32],
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					version: expect.any(Function)
				});
			});
		});
	});
});
