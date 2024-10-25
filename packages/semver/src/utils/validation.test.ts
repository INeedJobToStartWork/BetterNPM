import { describe, expect, it } from "vitest";
import type { TValidationList } from "./validation";
import { validator } from "./validation";
import { myErrorWrapper } from "oh-my-error";
import type { TMyErrorList } from "oh-my-error";

describe("validator function", () => {
	const MyErrorList = {
		INVALID_TYPE: {
			code: "INVALID_TYPE",
			hint: {},
			message: { dev: "Input is not a string", user: "Input must be a string." },
			name: "Invalid Type Error"
		},
		TOO_SHORT: {
			code: "TOO_SHORT",
			hint: {},
			message: { dev: "Input is too short", user: "Input must be at least 3 characters long." },
			name: "Too Short Error"
		},
		CONTAINS_SPECIAL_CHAR: {
			code: "CONTAINS_SPECIAL_CHAR",
			hint: {},
			message: { dev: "Input contains special characters", user: "Input must not contain special characters." },
			name: "Special Character Error"
		}
	} as const satisfies TMyErrorList;

	const ValidationList: TValidationList<typeof MyErrorList, string> = {
		INVALID_TYPE: {
			condition: version => typeof version !== "string",
			exit: true
		},
		TOO_SHORT: {
			condition: version => typeof version === "string" && version.length < 3
		},
		CONTAINS_SPECIAL_CHAR: {
			condition: version => typeof version === "string" && /[!"#$%&()*,.:<>?@^{|}]/u.test(version)
		}
	};

	it("[ERROR TEST] - returnType:'boolean' - Invalid type - return false", () => {
		expect(
			validator({
				MyErrorList: MyErrorList,
				ValidationList: ValidationList,
				options: { returnType: "boolean" },
				data: 3333
			})
		).toEqual(false);
	});

	it("[ERROR TEST] - returnType:'errorList' - Invalid type - return { errors: [MyErrorList.INVALID_TYPE] }", () => {
		expect(
			validator({
				MyErrorList: MyErrorList,
				ValidationList: ValidationList,
				options: { returnType: "errorList" },
				data: 3333
			})
		).toEqual({ errors: [MyErrorList.INVALID_TYPE] });
	});

	it("[ERROR TEST] - returnType:'errorThrow' - Invalid type - throw myError", () => {
		const [data, isError] = myErrorWrapper(validator)({
			MyErrorList: MyErrorList,
			ValidationList: ValidationList,
			options: { returnType: "errorThrow" },
			data: 3333
		});

		expect(isError).toBe(true);
		expect(data).toEqual(MyErrorList.INVALID_TYPE);
	});

	// Nowe testy

	it("[SUCCESS TEST] - returnType:'boolean' - Valid input - return true", () => {
		expect(
			validator({
				MyErrorList: MyErrorList,
				ValidationList: ValidationList,
				options: { returnType: "boolean" },
				data: "valid string"
			})
		).toEqual(true);
	});

	it("[ERROR TEST] - returnType:'errorList' - Multiple errors - return all errors", () => {
		expect(
			validator({
				MyErrorList: MyErrorList,
				ValidationList: ValidationList,
				options: { returnType: "errorList" },
				data: "a!"
			})
		).toEqual({ errors: [MyErrorList.TOO_SHORT, MyErrorList.CONTAINS_SPECIAL_CHAR] });
	});

	it("[SUCCESS TEST] - returnType:'errorList' - Valid input - return empty errors array", () => {
		expect(
			validator({
				MyErrorList: MyErrorList,
				ValidationList: ValidationList,
				options: { returnType: "errorList" },
				data: "valid string"
			})
		).toEqual({ errors: [] });
	});

	it("[ERROR TEST] - returnType:'errorThrow' - First error throws - other errors are not checked", () => {
		const [data, isError] = myErrorWrapper(validator)({
			MyErrorList: MyErrorList,
			ValidationList: ValidationList,
			options: { returnType: "errorThrow" },
			data: "a!"
		});

		expect(isError).toBe(true);
		expect(data).toEqual(MyErrorList.TOO_SHORT);
	});

	it("[TEST] - Default returnType is 'errorThrow'", () => {
		const [data, isError] = myErrorWrapper(validator)({
			MyErrorList: MyErrorList,
			ValidationList: ValidationList,
			data: 3333
		});

		expect(isError).toBe(true);
		expect(data).toEqual(MyErrorList.INVALID_TYPE);
	});
});
