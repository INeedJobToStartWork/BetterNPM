import { describe, it, expect } from "vitest";
import satisfies from "./satisfies";
import { myErrorWrapper } from "oh-my-error";

describe("[FUNCTION] satisfies", () => {
	describe("TEST", () => {
		// it("",()=>{})
		it("1.2.3 satisfies x.X.x", () => {
			const [result, isError] = myErrorWrapper(satisfies)("1.2.3", "x.X.x");
			expect(isError).toBe(false);
			expect(result).toBe(true);
		});
		it("1.2.3 satisfies 1.2.3 || 1.2.4", () => {
			const [result, isError] = myErrorWrapper(satisfies)("1.2.3", "1.2.3 || 1.2.4");
			expect(isError).toBe(false);
			expect(result).toBe(true);
		});
	});

	describe("[PASS]", () => {
		describe("Operators", () => {
			it("19.0.1 satisfies >=19.0.0-x", () => {
				const [data, isError] = myErrorWrapper(satisfies)("19.0.1", ">=19.0.0-x");
				expect(isError).toEqual(false);
				expect(data).toEqual(true);
			});
			it("1.2.3", () => {
				expect(satisfies("1.2.3", "1.2.3 || 1.2.4")).toEqual(true);
			});
		});

		describe("...", () => {
			describe("1.2.3", () => {
				it("satisfies 1.2.3 || 1.2.4", () => {
					const [data, isError] = myErrorWrapper(satisfies)("1.2.3", "1.2.3 || 1.2.4");
					expect(isError).toBe(false);
					expect(data).toEqual(true);
				});
				it("satisfies x.x.x", () => {
					const [data, isError] = myErrorWrapper(satisfies)("1.2.3", "x.x.x");
					expect(isError).toBe(false);
					expect(data).toEqual(true);
				});
				it("satisfies 1.x.x", () => {
					const [data, isError] = myErrorWrapper(satisfies)("1.2.3", "1.x.x");
					expect(isError).toBe(false);
					expect(data).toEqual(true);
				});
				it("satisfies 1.2.x", () => {
					const [data, isError] = myErrorWrapper(satisfies)("1.2.3", "1.2.x");
					expect(isError).toBe(false);
					expect(data).toEqual(true);
				});
				it("satisfies 1.x.3", () => {
					const [data, isError] = myErrorWrapper(satisfies)("1.2.3", "1.x.3");
					expect(isError).toBe(false);
					expect(data).toEqual(true);
				});
				it("satisfies x.2.3", () => {
					const [data, isError] = myErrorWrapper(satisfies)("1.2.3", "x.2.3");
					expect(isError).toBe(false);
					expect(data).toEqual(true);
				});
				it("satisfies 1.2.3", () => {
					const [data, isError] = myErrorWrapper(satisfies)("1.2.3", "1.2.3");
					expect(isError).toBe(false);
					expect(data).toEqual(true);
				});
				it("satisfies 1.x.x-x", () => {
					const [data, isError] = myErrorWrapper(satisfies)("1.2.3", "1.x.x || 1.x.x-x");
					expect(isError).toBe(false);
					expect(data).toEqual(true);
				});
				it("satisfies 1.x.x-x+x", () => {
					const [data, isError] = myErrorWrapper(satisfies)("1.2.3-prerelease+asd", "1.x.x-x+x");
					expect(isError).toBe(false);
					expect(data).toEqual(true);
				});
				it("satisfies 1.x.x-x+x", () => {
					const [data, isError] = myErrorWrapper(satisfies)("1.2.3-prerelease+asd", "1.x.x");
					expect(isError).toBe(false);
					expect(data).toEqual(false);
				});
				it("satisfies 1.2.2 - 1.2.5", () => {
					const [data, isError] = myErrorWrapper(satisfies)("1.2.3", "1.2.2 - 1.2.5");
					expect(isError).toBe(false);
					expect(data).toEqual(true);
				});
				// it("satisfies 1.x.x-x+x", () => {
				// 	const [data, isError] = myErrorWrapper(satisfies)("1.0.0-prerelease+asd", "<1.x.x");
				// 	expect(isError).toBe(false);
				// 	expect(data).toEqual(true);
				// });
			});
		});
	});
});

it("ARRAY SATISFIES TEST", () => {
	const inputRange = "16.8.0 - 18.3.1";

	const test = [
		"16.8.0",
		"16.8.1",
		"16.8.2",
		"16.8.3",
		"16.8.4",
		"16.8.5",
		"16.8.6",
		"16.9.0",
		"16.10.0",
		"16.10.1",
		"16.10.2",
		"16.11.0",
		"16.12.0",
		"16.13.0",
		"16.13.1",
		"16.14.0",
		"17.0.0",
		"17.0.1",
		"17.0.2",
		"18.0.0",
		"18.1.0",
		"18.2.0",
		"18.3.0",
		"18.3.1"
	];

	const [data, isError] = myErrorWrapper(() => test.filter(item => satisfies(item, inputRange)))();

	expect(isError).toEqual(false);
	expect(data.length).toEqual(test.length);
});
it("REACT SATISFIES TEST", () => {
	const inputRange = "^16.8.0 || ^17.0.0 || ^18.0.0 || >=19.0.0-x <19.0.0";

	const test = [
		"16.8.0",
		"16.8.1",
		"16.8.2",
		"16.8.3",
		"16.8.4",
		"16.8.5",
		"16.8.6",
		"16.9.0",
		"16.10.0",
		"16.10.1",
		"16.10.2",
		"16.11.0",
		"16.12.0",
		"16.13.0",
		"16.13.1",
		"16.14.0",
		"17.0.0",
		"17.0.1",
		"17.0.2",
		"18.0.0",
		"18.1.0",
		"18.2.0",
		"18.3.0",
		"18.3.1",
		"19.0.0-canary-2b036d3f1-20240327",
		"19.0.0-canary-05797cceb-20240328",
		"19.0.0-canary-a73c3450e-20240329",
		"19.0.0-canary-95e6f032c-20240401",
		"19.0.0-canary-48ec17b86-20240402",
		"19.0.0-canary-7a2609eed-20240403",
		"19.0.0-canary-fd0da3eef-20240404",
		"19.0.0-canary-e3ebcd54b-20240405",
		"19.0.0-canary-4c12339ce-20240408",
		"19.0.0-canary-adb717393-20240411",
		"19.0.0-canary-96c584661-20240412",
		"19.0.0-canary-8afa144bd-20240416",
		"19.0.0-canary-657428a9e-20240416",
		"19.0.0-canary-36e62c603-20240418",
		"19.0.0-canary-33a32441e9-20240418",
		"19.0.0-canary-db913d8e17-20240422",
		"19.0.0-canary-cb151849e1-20240424",
		"19.0.0-canary-cf5ab8b8b2-20240425",
		"19.0.0-beta-94eed63c49-20240425",
		"19.0.0-beta-4508873393-20240430",
		"19.0.0-beta-73bcdfbae5-20240502",
		"19.0.0-beta-1beb73de0f-20240503",
		"19.0.0-beta-5d29478716-20240506",
		"19.0.0-beta-b498834eab-20240506",
		"19.0.0-beta-e7d213dfb0-20240507",
		"19.0.0-beta-6946ebe620-20240508",
		"19.0.0-beta-04b058868c-20240508",
		"19.0.0-beta-9d76c954cf-20240510",
		"19.0.0-beta-26f2496093-20240514",
		"19.0.0-rc-915b914b3a-20240515",
		"19.0.0-rc-3f1436cca1-20240516",
		"19.0.0-rc-57fbe3ba37-20240520",
		"19.0.0-rc-d3ce0d3ea9-20240520",
		"19.0.0-rc-8f3c0525f9-20240521",
		"19.0.0-rc-81c5ff2e04-20240521",
		"19.0.0-rc-3ac551e855-20240522",
		"19.0.0-rc-f994737d14-20240522",
		"19.0.0-rc-4c2e457c7c-20240522",
		"19.0.0-rc-935180c7e0-20240524",
		"19.0.0-rc-6f23540c7d-20240528",
		"19.0.0-rc-38e3b23483-20240529",
		"19.0.0-rc-9d4fba0788-20240530",
		"19.0.0-rc-6d3110b4d9-20240531",
		"19.0.0-rc-9598c41a20-20240603",
		"19.0.0-rc.0",
		"19.0.0-rc-bf3a29d097-20240603",
		"19.0.0-rc-1df34bdf62-20240605",
		"19.0.0-rc-eb259b5d3b-20240605",
		"19.0.0-rc-99da76f23a-20240606",
		"19.0.0-rc-827cbea417-20240606",
		"19.0.0-rc-cc1ec60d0d-20240607",
		"19.0.0-rc-20b6f4c0e8-20240607",
		"19.0.0-rc-a532d91d01-20240610",
		"19.0.0-rc-34d0c5e357-20240607",
		"19.0.0-rc-6230622a1a-20240610",
		"19.0.0-rc-a26e3f403e-20240611",
		"19.0.0-rc-f3e09d6328-20240612",
		"19.0.0-rc-dfd30974ab-20240613",
		"19.0.0-rc-fb9a90fa48-20240614",
		"19.0.0-rc-107a2f8c3e-20240617",
		"19.0.0-rc-1434af3d22-20240618",
		"19.0.0-rc-e684ca66ab-20240619",
		"19.0.0-rc-6fb39ec9e9-20240621",
		"19.0.0-rc-3563387fe3-20240621",
		"19.0.0-rc-c21bcd627b-20240624",
		"19.0.0-rc-8971381549-20240625",
		"19.0.0-rc-e02baf6c92-20240627",
		"19.0.0-rc-58af67a8f8-20240628",
		"19.0.0-rc-100dfd7dab-20240701",
		"19.0.0-rc-9c6806964f-20240703",
		"19.0.0-rc-3da26163a3-20240704",
		"19.0.0-rc-f38c22b244-20240704",
		"19.0.0-rc-df783f9ea1-20240708",
		"19.0.0-rc-c3cdbec0a7-20240708",
		"19.0.0-rc-378b305958-20240710",
		"19.0.0-rc-85acf2d195-20240711",
		"19.0.0-rc-df5f2736-20240712",
		"19.0.0-rc-8b08e99e-20240713",
		"19.0.0-rc-01172397-20240716",
		"19.0.0-rc-163365a0-20240717",
		"19.0.0-rc-512b09b2-20240718",
		"19.0.0-rc-d025ddd3-20240722",
		"19.0.0-rc-f6cce072-20240723",
		"19.0.0-rc-ab2135c7-20240724",
		"19.0.0-rc-76002254-20240724",
		"19.0.0-rc-14a4699f-20240725",
		"19.0.0-rc-941e1b4a-20240729",
		"19.0.0-rc-ab7c1663-20240730",
		"19.0.0-rc-3208e73e-20240730",
		"19.0.0-rc-a7d1240c-20240731",
		"19.0.0-rc-06d0b89e-20240801",
		"19.0.0-rc-8269d55d-20240802",
		"19.0.0-rc-65903583-20240805",
		"19.0.0-rc-187dd6a7-20240806",
		"19.0.0-rc-e948a5ac-20240807",
		"19.0.0-rc-9d2da591-20240808",
		"19.0.0-rc-2d2cc042-20240809",
		"19.0.0-rc-68dbd84b-20240812",
		"19.0.0-rc-d48603a5-20240813",
		"19.0.0-rc-49496d49-20240814",
		"19.0.0-rc-19bd26be-20240815",
		"19.0.0-rc-fa6eab58-20240815",
		"19.0.0-rc-1eaccd82-20240816",
		"19.0.0-rc-6ebfd5b0-20240818",
		"19.0.0-rc-a960b92c-20240819",
		"19.0.0-rc-1d989965-20240821",
		"19.0.0-rc-eb3ad065-20240822",
		"19.0.0-rc-b57d2823-20240822",
		"19.0.0-rc-f65ac7bd-20240826",
		"19.0.0-rc-f90a6bcc-20240827",
		"19.0.0-rc-7771d3a7-20240827",
		"19.0.0-rc-a19a8ab4-20240829",
		"19.0.0-rc-e56f4ae3-20240830",
		"19.0.0-rc-4f604941-20240830",
		"19.0.0-rc-d1afcb43-20240903",
		"19.0.0-rc-4c58fce7-20240904",
		"19.0.0-rc-a03254bc-20240905",
		"19.0.0-rc-e210d081-20240909",
		"19.0.0-rc-3dfd5d9e-20240910",
		"19.0.0-rc-d6cb4e77-20240911",
		"19.0.0-rc-47352209-20240912",
		"19.0.0-rc-94e652d5-20240912",
		"19.0.0-rc-206df66e-20240912",
		"19.0.0-rc-ee1a403a-20240916",
		"19.0.0-rc-f2df5694-20240916",
		"19.0.0-rc-a99d8e8d-20240916",
		"19.0.0-rc-5dcb0097-20240918",
		"19.0.0-rc-e740d4b1-20240919",
		"19.0.0-rc-e4953922-20240919",
		"19.0.0-rc-5d19e1c8-20240923",
		"19.0.0-rc-04bd67a4-20240924",
		"19.0.0-rc-f9ebd85a-20240925",
		"19.0.0-rc-778e1ed2-20240926",
		"19.0.0-rc-204a551e-20240926",
		"19.0.0-rc-67fee58b-20240926",
		"19.0.0-rc-3edc000d-20240926"
	];

	const [data, isError] = myErrorWrapper(() => test.filter(item => satisfies(item, inputRange)))();

	expect(isError).toEqual(false);
	expect(data.length).toEqual(test.length);
});

it("2.0.0 does not satisfy 1.x.x", () => {
	expect(satisfies("2.0.0", "1.x.x")).toEqual(false);
});
it("1.2.3 satisfies 1.2.*", () => {
	expect(satisfies("1.2.3", "1.2.*")).toEqual(true);
});
it("1.3.0 does not satisfy 1.2.*", () => {
	expect(satisfies("1.3.0", "1.2.*")).toEqual(false);
});
it("1.2.3 satisfies *", () => {
	expect(satisfies("1.2.3", "*")).toEqual(true);
});
it("1.2.3 satisfies x.x.x", () => {
	expect(satisfies("1.2.3", "x.x.x")).toEqual(true);
});
it("array satisfies 1.0.0 - 2.0.0", () => {
	// const testArray = ["1.0.0", "1.0.1", "1.1.0", "1.1.1", "1.2.0", "1.2.1", "1.3.0", "1.3.1", "2.0.0", "1.0.2"];
	const range = "1.0.0 - 2.0.0";
	const [result, isError] = myErrorWrapper(satisfies)("1.0.0", range);
	expect(isError).toBe(false);
	expect(result).toEqual(true);
});
// });
describe("Mixed patterns", () => {
	it("1.2.3 satisfies >1.0.0 <2.x.x", () => {
		expect(satisfies("1.2.3", ">1.0.0 <2.x.x")).toEqual(true);
	});
	it("2.0.0 does not satisfy >1.0.0 <2.x.x", () => {
		expect(satisfies("2.0.0", ">1.0.0 <2.x.x")).toEqual(false);
	});
	it("1.2.3 satisfies 1.x.x || >2.0.0", () => {
		expect(satisfies("1.2.3", "1.x.x || >2.0.0")).toEqual(true);
	});
	it("3.0.0 satisfies 1.x.x || >2.0.0", () => {
		expect(satisfies("3.0.0", "1.x.x || >2.0.0")).toEqual(true);
	});
});
// 	// });

// 	// describe("[ERROR]", () => {
// 	// 	// ... (poprzednie testy błędów pozostają bez zmian)

// 	// 	it("Throws error for invalid wildcard pattern", () => {
// 	// 		expect(() => satisfies("1.0.0", "1.*.2")).toThrow();
// 	// 	});
// 	// });
// });
