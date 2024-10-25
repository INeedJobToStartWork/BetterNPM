/* eslint-disable @EslintSonar/no-duplicate-string */
import { describe, it, expect } from "vitest";
import minVersion from "./minVersion";

describe("minVersion", () => {
	// Podstawowe przypadki
	it("should handle simple version ranges", () => {
		expect(minVersion("^1.0.0")).toBe("1.0.0");
		expect(minVersion("~2.0.0")).toBe("2.0.0");
		expect(minVersion(">=3.0.0")).toBe("3.0.0");
	});

	// Złożone zakresy
	it("should handle complex version ranges", () => {
		expect(minVersion("^1.2.3 || ^2.0.0")).toBe("1.2.3");
		expect(minVersion(">=1.0.0 <2.0.0")).toBe("1.0.0");
		expect(minVersion("~1.2.3 || ~1.3.0")).toBe("1.2.3");
	});

	// Prerelease wersje
	it("should handle prerelease versions", () => {
		expect(minVersion("^1.0.0-alpha")).toBe("1.0.0-alpha");
		expect(minVersion(">=1.0.0-beta.1")).toBe("1.0.0-beta.1");
		expect(minVersion("^2.0.0-alpha || ^2.0.0")).toBe("2.0.0-alpha");
	});

	// 	// Edge cases
	// it("should handle edge cases", () => {
	// 	// expect(minVersion("*")).toBe("0.0.0");
	// 	// expect(minVersion("")).toBe("0.0.0");
	// 	// expect(minVersion("invalid")).toThrow();
	// });

	// 	// Zakresy z gwiazdkami
	it("should handle wildcard ranges", () => {
		expect(minVersion("1.x")).toBe("1.0.0");
		expect(minVersion("1.2.x")).toBe("1.2.0");
		expect(minVersion("1.*")).toBe("1.0.0");
	});

	// 	// Zakresy z operatorami
	it("should handle hyphens ranges with differenceerent operators", () => {
		expect(minVersion("1.0.0 - 2.0.0")).toBe("1.0.0");
		expect(minVersion(">1.0.0 - 2.0.0")).toBe("1.0.1");
		expect(minVersion("2.0.0 - 1.0.0")).toBe("1.0.0");
		expect(minVersion("3.0.0 - 5.0.0")).toBe("3.0.0");
	});

	it("should handle ranges with differenceerent operators", () => {
		expect(minVersion(">=1.0.0 <=2.0.0")).toBe("1.0.0");
		expect(minVersion(">1.0.0 <2.0.0")).toBe("1.0.1");
		expect(minVersion(">=1.0.0 <2.0.0")).toBe("1.0.0");
	});

	// 	// Nieprawidłowe dane wejściowe
	it("should handle invalid inputs gracefully", () => {
		//TODO: should return error prob
		expect(minVersion(undefined as any)).toBe("0.0.0");
		expect(minVersion(null as any)).toBe("0.0.0");
		expect(minVersion(null as any)).toBe("0.0.0");
	});

	// 	// Skomplikowane zakresy
	it("should handle complex range combinations", () => {
		expect(minVersion("^1.2.3 || ~2.0.0 || >=3.0.0 <=4.0.0")).toBe("1.2.3");
		expect(minVersion(">=1.0.0 <2.0.0 || >=2.0.0 <3.0.0")).toBe("1.0.0");
		expect(minVersion("^1.0.0 || ^2.0.0-beta || ^2.0.0")).toBe("1.0.0");
	});

	// 	// Testy negatywne
	it("should handle invalid version ranges", () => {
		expect(() => {
			minVersion("invalid range");
		}).toThrow();
		expect(() => {
			minVersion(">>1.0.0");
		}).toThrow();
		expect(() => {
			minVersion("1.0.0 ||| 2.0.0");
		}).toThrow();
	});
	// });

	// // Dodatkowe testy dla edge cases z różnymi opcjami
	describe("minVersion with options", () => {
		const options = {
			includePrerelease: true,
			loose: true
		};

		it("should handle loose versioning", () => {
			expect(minVersion("~1.2", options)).toBe("1.2.0");
			expect(minVersion("1.2.x", options)).toBe("1.2.0");
			expect(minVersion("1.x.x", options)).toBe("1.0.0");
		});

		it("should handle prerelease versions with options", () => {
			expect(minVersion("^1.0.0-alpha", options)).toBe("1.0.0-alpha");
			expect(minVersion(">=1.0.0-0", options)).toBe("1.0.0-0");
			expect(minVersion(">=1.0.0-alpha.1", options)).toBe("1.0.0-alpha.1");
		});

		it("should handle complex ranges with options", () => {
			expect(minVersion("^1.0.0-alpha || >=2.0.0", options)).toBe("1.0.0-alpha");
			expect(minVersion(">=1.0.0-beta <2.0.0", options)).toBe("1.0.0-beta");
		});
	});
});
