![image](https://github.com/user-attachments/assets/985f8c86-4dad-400f-a5fa-16f57d0546d8)

<h1 align="center">Semver versioning handler</h1>
<p align="center">semver</p>
<p align="center">This package exports version utils functions.</p>

<!-- <img alt="Crates.io Size" src="https://img.shields.io/bundlephobia/size/@betternpm/validate-npm-package-name"> -->
<hr/>

# 📜 List of Contest

- [📜 List of Contest](#-list-of-contest)
  - [Install](#install)
  - [TLDR (Only Most Important!)](#tldr-only-most-important)
    - [Functions](#functions)
    - [Classes](#classes)
    - [Types](#types)
    - [Variables](#variables)
  - [Table of Compatibility](#table-of-compatibility)
    - [Status](#status)
    - [Table](#table)
  - [Classes](#classes-1)
    - [SemVer](#semver)
  - [Functions](#functions-1)
    - [parseSemVer](#parsesemver)
    - [compareSemver](#comparesemver)
      - [compareMinorMajorPatch](#compareminormajorpatch)
      - [comparePrerelease](#compareprerelease)
      - [compareBuild](#comparebuild)
    - [satisfies](#satisfies)
    - [increase](#increase)
    - [difference](#difference)
    - [minVersion](#minversion)
    - [simplifyRange](#simplifyrange)
  - [Types](#types-1)
    - [TReleases](#treleases)
  - [Variables](#variables-1)
    - [RELEASE\_TYPES](#release_types)

## Install

NPM

```bash copy
npm install @betternpm/semver
```

PNPM

```bash copy
pnpm add @betternpm/semver
```

Yarn

```bash copy
yarn add @betternpm/semver
```

## TLDR (Only Most Important!)

### Functions

| Name                            | Description                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| [parseSemVer](#parsesemver)     | Parse and validate into semver object                                                   |
| [compareSemver](#comparesemver) | Compare versions and return result ` 1 \| 0 \| -1`                                      |
| [satisfies](#satisfies)         | Check that version pass range ex `>=1.0.0 \|\| 0.5.0`                                   |
| [increase](#increase)           | Increase semver `major/minor/patch/prerelease/buildmetadata/premajor/preminor/premajor` |
| [difference](#difference)       | Show most important differenceerence between versions                                   |
| [minVersion](#)                 | Show minimum version which pass range.                                                  |
| [simplifyRange](#simplifyRange) | Simplify Range for inputed versions                                                     |

### Classes

| Name              | Description                                     |
| ----------------- | ----------------------------------------------- |
| [SemVer](#semver) | Represents a class SemVer version with methods. |

### Types

| Name                    | Description                 |
| ----------------------- | --------------------------- |
| [TReleases](#treleases) | Represents a release types. |

### Variables

| Name                            | Description                         |
| ------------------------------- | ----------------------------------- |
| [RELEASE_TYPES](#release_types) | Represents a release type as Array. |

## Table of Compatibility

Table of compatibility of functionalities with the official list of exports from the npm package `semver` with day of
commit.

> [!IMPORTANT]  
> There you not gonna find all `@betternpm/semver` package functions!

### Status

| Emoji | Meaning                                               |
| ----- | ----------------------------------------------------- |
| ✅    | Completed                                             |
| ⏸️    | Paused                                                |
| 🟧    | exist/you can use differenceerent function / no alias |
| ❌    | Aborted                                               |
| 🛠️    | In Progress                                           |
| 💤    | Not Yet Started                                       |
| ℹ️    | Additional Comment                                    |

### Table

| Export              | Progress Status                                                          |
| ------------------- | ------------------------------------------------------------------------ |
| parse               | ✅🟧 [parseSemVer](#parsesemver)                                         |
| valid               | ✅🟧 [parseSemVer](#parsesemver)                                         |
| clean               | 🟧 [SemVer](#semver).format                                              |
| inc                 | 🟧 [increase](#increase)                                                 |
| difference          | ✅                                                                       |
| major               | ❌🟧 [parseSemVer](#parsesemver)                                         |
| minor               | ❌🟧 [parseSemVer](#parsesemver)                                         |
| patch               | ❌🟧 [parseSemVer](#parsesemver)                                         |
| prerelease          | ❌🟧 [parseSemVer](#parsesemver)                                         |
| compare             | ✅                                                                       |
| rcompare            | ❌🟧 [compareSemver](#comparesemver))                                    |
| compareLoose        | ❌🟧 [compareSemver](#comparesemver))                                    |
| compareBuild        | ✅                                                                       |
| sort                | ❌ ℹ️ You can do it with sort algo using [compareSemver](#comparesemver) |
| rsort               | ❌                                                                       |
| gt                  | ❌🟧 [compareSemver](#comparesemver)                                     |
| lt                  | ❌🟧 [compareSemver](#comparesemver)                                     |
| eq                  | ❌🟧 [compareSemver](#comparesemver)                                     |
| neq                 | ❌🟧 [compareSemver](#comparesemver)                                     |
| gte                 | ❌🟧 [compareSemver](#comparesemver)                                     |
| lte                 | ❌🟧 [compareSemver](#comparesemver)                                     |
| cmp                 | ❌🟧 [compareSemver](#comparesemver)                                     |
| coerce              | ❌🟧 [parseSemVer](#parsesemver)                                         |
| Comparator          | ❌                                                                       |
| Range               | ❌                                                                       |
| satisfies           | ✅                                                                       |
| toComparators       | ❌                                                                       |
| maxSatisfying       | ❌ℹ️ You can do this with loop and `satisfies`                           |
| minSatisfying       | ❌ℹ️ You can do this with loop and `satisfies`                           |
| minVersion          | ✅                                                                       |
| validRange          | ❌🟧 [parseSemVer](#parsesemver) with rangeMode at options               |
| outside             | ❌🟧 [satisfies](#satisfies)                                             |
| gtr                 | ❌🟧 [compareSemver](#comparesemver)                                     |
| ltr                 | ❌🟧 [compareSemver](#comparesemver)                                     |
| intersects          | ❌🟧 [satisfies](#satisfies)                                             |
| simplifyRange       | ✅                                                                       |
| subset              | ❌ℹ️ (Didn't see need of this, maybe add in future)                      |
| SemVer              | ✅                                                                       |
| re                  | ❌ℹ️ (Didn't see need of this)                                           |
| src                 | ❌ℹ️ (Didn't see need of this)                                           |
| tokens              | ❌ℹ️ (Didn't see need of this)                                           |
| SEMVER_SPEC_VERSION | ❌                                                                       |
| RELEASE_TYPES       | ✅                                                                       |
| compareIdentifiers  | ❌🟧 [compareSemver](#comparesemver)                                     |
| rcompareIdentifiers | ❌🟧 [compareSemver](#comparesemver)                                     |

## Classes

### SemVer

Class creating SemVer object which has own methods.

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/classes/semVer.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/classes/semVer.test.ts)

[Scroll to List of Contest](#-list-of-contest)

## Functions

### parseSemVer

Parses a semantic version string or range (options).

```typescript
import { parseSemVer } from "@betternpm/semver";

const version = parseSemVer("1.2.3-prerelease.0+20241025");
console.log(version.major); // 1
console.log(version.minor); // 2
console.log(version.patch); // 3
console.log(version.prerelease); // ["prerelease",0]
console.log(version.buildmetadata); // [20241025]
console.log(version.version()); // "1.2.3-prerelease.0+20241025"
```

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/parseSemVer.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/parseSemVer.test.ts)

[Scroll to List of Contest](#-list-of-contest)

### compareSemver

Compare A to B in full scope.

```typescript
import { compareSemver } from "@betternpm/semver";

console.log(compareSemver("1.3.0", "1.2.3")); // 1 - because A is bigger than B
console.log(compareSemver("1.3.0", "1.3.0")); // 0 - because A is same as B
console.log(compareSemver("1.2.3", "1.3.0")); // -1 - because A is smaller than B
```

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/compare.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/compare.test.ts)

[Scroll to List of Contest](#-list-of-contest)

#### compareMinorMajorPatch

Compare A to B but **ONLY** in Major/Minor/Patch scope.

```typescript
import { compareMinorMajorPatch } from "@betternpm/semver";

console.log(compareMinorMajorPatch("1.3.0", "1.2.3")); // 1 - because A is bigger than B
console.log(compareMinorMajorPatch("1.3.0-alpha", "1.3.0")); // 0 - because A is same as B (We care only about MMP)
console.log(compareMinorMajorPatch("1.2.3", "1.3.0")); // -1 - because A is smaller than B
```

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/compare.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/compare.test.ts)

[Scroll to List of Contest](#-list-of-contest)

#### comparePrerelease

Compare A to B but **ONLY** in prerelease scope.

```typescript
import { comparePrerelease } from "@betternpm/semver";
// am > alpha.1 > alpha.0 > alpha
console.log(comparePrerelease("1.3.0-alpha.1", "1.2.3-alpha.0")); // 1 - because A is bigger than B
console.log(comparePrerelease("1.3.0-alpha", "1.2.0-alpha")); // 0 - because A is same as B (We care only about MMP)
console.log(comparePrerelease("1.3.0-alpha", "1.2.0")); // -1 - because A is smaller than B (no prereleases > prereleases)

console.log(comparePrerelease("1.3.0-alpha", "1.2.0-am")); // -1 - In this case just comparing them to first differenceerence v1[i] > v2[i].
console.log(comparePrerelease("1.3.0-alpha", "1.2.0-alphaa")); // -1 - Same as above but ends at last element in v1 or v2 (longer one).
```

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/compare.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/compare.test.ts)

[Scroll to List of Contest](#-list-of-contest)

#### compareBuild

Compare A to B but **ONLY** in buildmetadata.

```typescript
import { compareBuild } from "@betternpm/semver";

console.log(compareBuild("1.3.0+124", "1.2.3+123")); // 1 - because A is bigger than B
console.log(compareBuild("1.3.0+123", "1.2.0+123")); // 0 - because A is same as B (We care only about MMP)
console.log(compareBuild("1.3.0+1.2.2", "1.2.0+123")); // -1 - because A is smaller than B (no prereleases > prerelease)
console.log(compareBuild("1.3.0", "1.2.0+123")); // -1 - because A is smaller than B (no prereleases > prerelease)
console.log(compareBuild("1.3.0+a", "1.2.0+b")); // -1 In this case just comparing them to first differenceerence v1[i] > v2[i].
console.log(compareBuild("1.3.0+a", "1.2.0+aa")); // -1 - Same as above but comparing to last element in v1 or v2 (longer one).
```

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/compare.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/compare.test.ts)

[Scroll to List of Contest](#-list-of-contest)

### satisfies

Checks that version pass range ex `>=1.0.0 || 0.5.0`

```typescript
import { satisfies } from "@betternpm/semver";

console.log(satisfies("1.2.3", ">=1.0.0 || 0.5.0")); // true - Must be equal or higher than 1.0.0 or equal 0.5.0
console.log(satisfies("0.5.0", ">=1.0.0 || 0.5.0")); // true - Must be equal or higher than 1.0.0 or equal 0.5.0
console.log(satisfies("0.4.0", ">=1.0.0 || 0.5.0")); // false - Must be equal or higher than 1.0.0 or equal 0.5.0
console.log(satisfies("0.1.3", ">2.0.0")); // false - Must be higher than 2.0.0
```

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/satisfies.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/satisfies.test.ts)

[Scroll to List of Contest](#-list-of-contest)

### increase

Increase semver `major/minor/patch/prerelease/buildmetadata/premajor/preminor/premajor

> [!IMPORTANT]  
> At `prerelease` and `buildmetadata` always increase last found number.

```typescript
import { increase } from "@betternpm/semver";

console.log(increase("1.2.3", "major", "string")); // 2.0.0
console.log(increase("1.2.3", "minor", "string")); // 1.3.0
console.log(increase("1.2.3", "patch", "string")); // 1.2.4

console.log(increase("1.2.3", "prerelease", "string")); //1.2.3-0
console.log(increase("1.2.3-0", "prerelease", "string")); //1.2.3-1
console.log(increase("1.2.3", "prerelease", "string", { value: "alpha" })); // 1.2.3-alpha
console.log(increase("1.2.3-alpha", "prerelease", "string")); // 1.2.3-alpha.0

console.log(increase("1.2.3", "buildmetadata", "string")); //1.2.3+0
console.log(increase("1.2.3+0", "buildmetadata", "string")); //1.2.3+1
console.log(increase("1.2.3", "buildmetadata", "string", { value: "build" })); // 1.2.3+build
console.log(increase("1.2.3+build", "buildmetadata", "string")); // 1.2.3+build.0

console.log(increase("1.2.3", "premajor", "string")); // 2.0.0-0
console.log(increase("1.2.3", "preminor", "string")); // 1.3.0-0
console.log(increase("1.2.3", "premajor", "string")); // 1.2.4-0
// etc...
```

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/increase.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/increase.test.ts)

[Scroll to List of Contest](#-list-of-contest)

### difference

Show most important differenceerence between versions

```ts
import { difference } from "@betternpm/semver";

console.log(difference("1.0.0", "2.5.0")); // "major"
console.log(difference("1.1.0", "1.2.0")); // "minor"
console.log(difference("1.1.1", "1.1.2")); // "patch"
console.log(difference("0.0.0", "0.0.0")); // undefined

console.log(difference("1.0.0", "2.0.0-prerelease")); // "premajor"
console.log(difference("1.0.0", "1.1.0-prerelease")); // "preminor"
console.log(difference("1.0.0", "1.0.1-prerelease")); // "prepatch"
console.log(difference("1.0.0-alpha", "1.0.0-beta")); // "prerelease"
```

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/difference.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/difference.test.ts)

[Scroll to List of Contest](#-list-of-contest)

### minVersion

Show minimum version which pass range.

```ts
import { minVersion } from "@betternpm/semver";

console.log(minVersion(">=1.0.0 || 0.5.0")); //  0.5.0
console.log(minVersion(">=1.0.0")); // 1.0.0
console.log(minVersion("<=1.0.0")); // 0.0.0
console.log(minVersion(">2.0.0")); // 2.0.1
```

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/minVersion.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/minVersion.test.ts)

[Scroll to List of Contest](#-list-of-contest)

### simplifyRange

Simplify Range for inputed versions

```ts
import { simplifyRange } from "@betternpm/semver";

console.log(simplifyRange(["0.0.0", "1.0.0", "0.5.0", "2.0.1"], ">=1.0.0 || 0.5.0")); // >=0.5.0
console.log(simplifyRange(["0.0.0", "1.0.0", "0.5.0", "2.0.1"], ">=1.0.0")); // >=1.0.0
console.log(simplifyRange(["0.0.0", "1.0.0", "0.5.0", "2.0.1"], "<=1.0.0")); // <=1.0.0
console.log(simplifyRange(["2.0.1"], ">2.0.0")); // *
```

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/simplifyRange.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/functions/simplifyRange.test.ts)

[Scroll to List of Contest](#-list-of-contest)

## Types

### TReleases

type with every possible release (from variable [RELEASE_TYPES](###RELEASE_TYPES))

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/internals/constants.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/internals/constants.test.ts)

[Scroll to List of Contest](#-list-of-contest)

## Variables

### RELEASE_TYPES

Array with every possible

**Links:** <br>
[[📄File]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/internals/constants.ts)
[[🐒TESTS]](https://github.com/INeedJobToStartWork/BetterNPM/tree/main/packages/semver/src/internals/constants.test.ts)

[Scroll to List of Contest](#-list-of-contest)
