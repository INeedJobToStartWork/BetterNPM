/* eslint-disable @EslintSonar/no-duplicate-string */
import { describe, expect, test } from "vitest";
import { difference } from "./difference";

describe("difference", () => {
	describe("regular version comparisons", () => {
		test("returns null when versions are equal", () => {
			expect(difference("1.0.0", "1.0.0")).toBe(void 0);
			expect(difference("2.1.3", "2.1.3")).toBe(void 0);
		});

		test("detects major version changes", () => {
			expect(difference("1.0.0", "2.0.0")).toBe("major");
			expect(difference("2.0.0", "1.0.0")).toBe("major");
			expect(difference("1.2.3", "2.0.0")).toBe("major");
		});

		test("detects minor version changes", () => {
			expect(difference("1.0.0", "1.1.0")).toBe("minor");
			expect(difference("1.1.0", "1.0.0")).toBe("minor");
			expect(difference("1.2.3", "1.3.0")).toBe("minor");
		});

		test("detects patch version changes", () => {
			expect(difference("1.0.0", "1.0.1")).toBe("patch");
			expect(difference("1.0.1", "1.0.0")).toBe("patch");
			expect(difference("1.2.3", "1.2.4")).toBe("patch");
		});
	});

	describe("prerelease version comparisons", () => {
		test("handles prerelease transitions", () => {
			expect(difference("1.0.0-alpha", "1.0.0")).toBe("major");
			expect(difference("1.0.0-beta", "1.0.0")).toBe("major");
			expect(difference("2.0.0-alpha", "2.0.0")).toBe("major");
		});

		test("detects prerelease changes", () => {
			expect(difference("1.0.0-alpha.1", "1.0.0-alpha.2")).toBe("prerelease");
			expect(difference("1.0.0-beta.1", "1.0.0-beta.2")).toBe("prerelease");
		});

		test("handles premajor versions", () => {
			expect(difference("1.0.0", "2.0.0-alpha")).toBe("premajor");
			expect(difference("2.0.0-alpha", "1.0.0")).toBe("premajor");
		});

		test("handles preminor versions", () => {
			expect(difference("1.0.0", "1.1.0-alpha")).toBe("preminor");
			expect(difference("1.1.0-alpha", "1.0.0")).toBe("preminor");
		});

		test("handles prepatch versions", () => {
			expect(difference("1.0.0", "1.0.1-alpha")).toBe("prepatch");
			expect(difference("1.0.1-alpha", "1.0.0")).toBe("prepatch");
		});
	});

	describe("edge cases", () => {
		test("handles major-only prerelease transitions", () => {
			expect(difference("1.0.0-alpha", "1.0.0")).toBe("major");
			expect(difference("1.0.0-alpha", "2.0.0")).toBe("major");
		});

		test("handles invalid versions", () => {
			expect(() => difference("invalid", "1.0.0")).toThrow();
			expect(() => difference("1.0.0", "invalid")).toThrow();
		});

		test("handles complex prerelease patterns", () => {
			expect(difference("1.0.0-alpha.1", "1.0.0-beta.1")).toBe("prerelease");
			expect(difference("1.0.0-alpha.1", "1.0.0")).toBe("major");
			expect(difference("1.0.0-alpha.1", "1.1.0")).toBe("major");
		});
	});
});
