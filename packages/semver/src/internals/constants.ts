// Explanatory comment
/**
 * This module implements the semver.org version 2.0.0 specification.
 * Note: The version here refers to the spec, not necessarily the package version of this code.
 * @packageDocumentation semver-constants
 */

/**
 * The version of the SemVer specification that this module implements.
 * @internal
 */
export const SEMVER_SPEC_VERSION = "2.0.0" as const;

/**
 * The maximum length allowed for a SemVer string.
 * @internal
 */
export const MAX_LENGTH = 256 as const;

/**
 * The maximum safe integer value in JavaScript.
 * @internal
 */
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9_007_199_254_740_991;

/**
 * Constants for safe lengths and component sizes
 * @internal
 */
export const MAX_SAFE_COMPONENT_LENGTH = 16;

/**
 * Max safe length for a build identifier.
 * The max length minus 6 characters for the shortest version with a build 0.0.0+BUILD.
 * @internal
 */
export const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;

/**
 * Valid release types in SemVer.
 */
export type TReleases = (typeof RELEASE_TYPES)[number];
/**
 * Valid release types in SemVer.
 */
export const RELEASE_TYPES = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"] as const; // Maybe change on `new Set`?
