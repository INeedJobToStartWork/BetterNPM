import type { IMyError, TMyErrorList } from "oh-my-error";
import { myError } from "oh-my-error";

//----------------------
// Interfaces & Types
//----------------------

// export type TValidationList<T> = Record<keyof T, { condition: (version: unknown) => boolean; exit?: boolean }>;
export type TValidationList<T, G = unknown> = Record<keyof T, { condition: (data: G) => boolean; exit?: boolean }>;

//----------------------
// Functions
//----------------------

export const validator = <T, G>(props: {
	MyErrorList: TMyErrorList;
	ValidationList: TValidationList<T, G>;
	data: unknown;
	options?: { returnType: "boolean" | "errorList" | "errorThrow" };
}): boolean | { errors: TMyErrorList } => {
	const { data, MyErrorList, ValidationList, options = { returnType: "errorThrow" } } = props;

	const result = options.returnType === "errorList" ? { errors: [] } : true;
	// eslint-disable-next-line guard-for-in
	for (const key in ValidationList) {
		const currentValidation = ValidationList[key];
		if (Object.hasOwn(ValidationList, key) && currentValidation.condition(data as any)) {
			if (options.returnType === "boolean") return false;
			if (options.returnType === "errorThrow") throw myError(MyErrorList[key]);

			(result as { errors: IMyError[] }).errors.push(MyErrorList[key]);
			if (currentValidation.exit) return result as any;
		}
	}
	return result as any;
};
