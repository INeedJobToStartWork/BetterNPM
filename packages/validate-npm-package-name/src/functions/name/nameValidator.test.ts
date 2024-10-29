import { test, expect } from "vitest";
import validate, { MyErrorList } from "./nameValidator";

test("validate-npm-package-name", () => {
	// Traditional
	expect(validate("some-package")).toEqual({
		validForNewPackages: true,
		validForOldPackages: true
	});
	expect(validate("example.com")).toEqual({
		validForNewPackages: true,
		validForOldPackages: true
	});
	expect(validate("under_score")).toEqual({
		validForNewPackages: true,
		validForOldPackages: true
	});
	expect(validate("period.js")).toEqual({
		validForNewPackages: true,
		validForOldPackages: true
	});
	expect(validate("123numeric")).toEqual({
		validForNewPackages: true,
		validForOldPackages: true
	});
	expect(validate("crazy!")).toEqual({
		validForNewPackages: false,
		validForOldPackages: true,
		warnings: [MyErrorList.SPECIAL_CHARACTERS]
	});

	// Scoped (npm 2+)
	expect(validate("@npm/thingy")).toEqual({
		validForNewPackages: true,
		validForOldPackages: true
	});
	expect(validate("@npm-zors/money!time.js")).toEqual({
		validForNewPackages: false,
		validForOldPackages: true,
		warnings: [MyErrorList.SPECIAL_CHARACTERS]
	});

	// Invalid
	// eslint-disable-next-line @EslintUnicorn/no-null
	expect(validate(null)).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.NULL_NAME]
	});

	expect(validate()).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.UNDEFINED_NAME]
	});

	expect(validate(42)).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.INVALID_TYPE]
	});

	expect(validate("")).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.TOO_SHORT_LENGTH_NAME]
	});

	expect(validate(".start-with-period")).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.CANNOT_START_WITH_PERIOD]
	});

	expect(validate("_start-with-underscore")).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.CANNOT_START_WITH_UNDERSCORE]
	});

	expect(validate("contain:colons")).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.URL_FRIENDLY]
	});

	expect(validate(" leading-space")).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.CANNOT_HAVE_SPACES, MyErrorList.URL_FRIENDLY]
	});

	expect(validate("trailing-space ")).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.CANNOT_HAVE_SPACES, MyErrorList.URL_FRIENDLY]
	});

	expect(validate("s/l/a/s/h/e/s")).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.URL_FRIENDLY]
	});

	expect(validate("node_modules")).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.BLACK_LISTED]
	});

	expect(validate("favicon.ico")).toEqual({
		validForNewPackages: false,
		validForOldPackages: false,
		errors: [MyErrorList.BLACK_LISTED]
	});

	// Node/IO Core
	expect(validate("http")).toEqual({
		validForNewPackages: false,
		validForOldPackages: true,
		warnings: [MyErrorList.CORE_MODULE_NAME]
	});

	expect(validate("process")).toEqual({
		validForNewPackages: false,
		validForOldPackages: true,
		warnings: [MyErrorList.CORE_MODULE_NAME]
	});

	// Long Package Names
	expect(
		validate(
			"ifyouwanttogetthesumoftwonumberswherethosetwonumbersarechosenbyfindingthelargestoftwooutofthreenumbersandsquaringthemwhichismultiplyingthembyitselfthenyoushouldinputthreenumbersintothisfunctionanditwilldothatforyou-"
		)
	).toEqual({
		validForNewPackages: false,
		validForOldPackages: true,
		warnings: [MyErrorList.TOO_LONG_LENGTH_NAME]
	});

	expect(
		validate(
			"ifyouwanttogetthesumoftwonumberswherethosetwonumbersarechosenbyfindingthelargestoftwooutofthreenumbersandsquaringthemwhichismultiplyingthembyitselfthenyoushouldinputthreenumbersintothisfunctionanditwilldothatforyou"
		)
	).toEqual({
		validForNewPackages: true,
		validForOldPackages: true
	});

	// Legacy Mixed-Case
	expect(validate("CAPITAL-LETTERS")).toEqual({
		validForNewPackages: false,
		validForOldPackages: true,
		warnings: [MyErrorList.NO_CAPITAL_LETTERS]
	});
});
