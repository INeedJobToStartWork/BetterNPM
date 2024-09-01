/**
 * RexExp for checking string is SCOPED package.
 * The pattern captures the scope (if present) and the package name itself.
 */
// eslint-disable-next-line @EslintSecurity/detect-unsafe-regex
export const SCOPED_PACKAGE_PATTERN = /^(?:@([^/]+?)\/)?([^/]+?)$/u;

/**
 *
 * NPM package name Scope Validator
 *
 * @example isScopedPackage("@scope/example")
 * @param name - NPM package name
 * @returns Boolean
 */

export const isScopedPackage = (name: string): boolean => {
	const nameMatch = SCOPED_PACKAGE_PATTERN.exec(name);
	return Boolean(
		nameMatch && encodeURIComponent(nameMatch[1]) === nameMatch[1] && encodeURIComponent(nameMatch[2]) === nameMatch[2]
	);
};
export default isScopedPackage;
