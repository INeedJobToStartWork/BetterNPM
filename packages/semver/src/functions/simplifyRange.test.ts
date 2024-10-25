import { describe, expect, it } from "vitest";
import simplifyRange from "./simplifyRange";
import type { TOptionsSemVer } from "./parseSemVer";

describe("simplifyRange", () => {
	// Basic functionality tests
	it("should handle empty version array", () => {
		const versions: string[] = [];
		const range = ">=1.0.0";
		expect(simplifyRange(versions, range)).toBe("");
	});

	it("should return single version for matching consecutive versions", () => {
		const versions = ["1.0.0", "1.0.0"];
		const range = ">=1.0.0";
		const result = simplifyRange(versions, range);
		expect(result).toBe("*");
	});

	it("should return * for all versions matching from start", () => {
		const versions = ["1.0.0", "1.1.0", "1.2.0"];
		const range = ">=0.0.0 <=2.0.0";
		expect(simplifyRange(versions, range)).toBe("*");
	});

	it("should handle mixed matching and non-matching versions", () => {
		const versions = ["1.0.0", "2.0.0", "3.0.0", "4.0.0"];
		const range = ">=1.0.0 <=2.0.0";
		const result = simplifyRange(versions, range);
		expect(result).toBe("<=2.0.0");
	});

	it("should create >= range for versions matching to end", () => {
		const versions = ["1.0.0", "1.1.0", "1.2.0"];
		const range = ">=1.0.0";
		const result = simplifyRange(versions, range);
		expect(result).toBe("*");
	});

	it("should create <= range for versions matching from start", () => {
		const versions = ["1.0.0", "1.1.0", "1.2.0"];
		const range = "<=1.2.0";
		const result = simplifyRange(versions, range);
		expect(result).toBe("*");
	});

	it("should handle multiple ranges with ||", () => {
		const versions = ["1.0.0", "1.1.0", "2.0.0", "2.1.0", "3.0.0"];
		const range = ">=1.0.0 <=1.1.0 || >=2.0.0 <=2.1.0";
		const result = simplifyRange(versions, range);
		expect(result).toBe("<=2.1.0");
	});

	it("should keep original range if simplified version would be longer", () => {
		const versions = ["1.0.0", "1.1.0", "1.2.0"];
		const range = "^1.0.0";
		expect(simplifyRange(versions, range)).toBe("*");
	});

	it("should handle versions with pre-release tags", () => {
		const versions = ["1.0.0-alpha", "1.0.0-beta", "1.0.0"];
		const range = ">=1.0.0-alpha <=1.0.0";
		const result = simplifyRange(versions, range);
		expect(result).toBe("*");
	});

	it("should respect options in version comparison", () => {
		const versions = ["1.0", "1.1", "1.2"];
		const range = ">=1.0.0 <=1.2.0";
		const options: Partial<TOptionsSemVer> = { loose: true };
		const result = simplifyRange(versions, range, options);
		expect(result).toBe("*");
	});

	it("should handle non-matching versions", () => {
		const versions = ["1.0.0", "2.0.0", "3.0.0"];
		const range = ">=4.0.0";
		expect(simplifyRange(versions, range)).toBe("");
	});

	it("should handle disjoint ranges properly", () => {
		const versions = ["1.0.0", "1.1.0", "2.0.0", "2.1.0", "3.0.0"];
		const range = ">=1.0.0 <1.2.0 || >=2.0.0 <2.2.0";
		const result = simplifyRange(versions, range);
		expect(result).toBe("<=2.1.0");
	});
});
