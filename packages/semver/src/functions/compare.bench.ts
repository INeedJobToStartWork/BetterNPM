import { bench, describe } from "vitest";
import compareSemver, { compareMinorMajorPatch } from "./compare";

describe("BenchmarkTEST", () => {
	bench("tescik predkosci2", () => {
		compareSemver("1.2.3", "1.2.3");
	});
	bench("tescik predkosci5", () => {
		compareSemver("1.2.3", "1.2.3", { compare: "majorMinorPatch" });
	});
	bench("tescik predkosci", () => {
		compareMinorMajorPatch("1.2.3", "1.2.3");
	});
});
