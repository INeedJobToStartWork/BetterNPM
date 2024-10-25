export const rangeArrayToInclude = ["x", "X", "*"] as const;

export const isX = (value: unknown[] | number | string): boolean => /[*Xx]/u.test(String(value));
// export const isX = (value: number | string): boolean =>
// 	Array.isArray(value) ? arrayToInclude.includes(()=>{}) : arrayToInclude.includes(String(value));
