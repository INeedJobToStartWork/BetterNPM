import { describe, expect, test } from "vitest";
import SemVer from "./semVer";

describe("Version Validators", () => {
	describe("[FUNCTION] versionPreValidator", () => {
		// describe("[ERROR]", () => {}
		describe("[PASS]", () => {
			test("String as Input", () => {
				const text = new SemVer("1.2.3");
				expect(text).instanceOf(SemVer);
			});
			test("SemVer as Input", () => {
				const vers1 = new SemVer("1.2.3");
				const vers2 = new SemVer(vers1);
				expect(vers2).instanceOf(SemVer);
			});
			test("SemVer as Input", () => {
				const vers1 = new SemVer("1.2.3");
				const vers2 = new SemVer(vers1);
				expect(vers2).instanceOf(SemVer);
			});
		});
		describe("[SCENARIOS]", () => {
			test("Format() check", () => {
				const text = new SemVer("1.2.3");
				const expectedOutput = "v1.2.3";
				expect(text).instanceOf(SemVer);

				expect(text.format(({ major, minor, patch }) => `v${major}.${minor}.${patch}`)).toEqual(expectedOutput);
				expect(text.versionFormat).toEqual(expectedOutput);
			});
		});
	});
});
