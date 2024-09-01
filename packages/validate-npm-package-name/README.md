![image](https://github.com/user-attachments/assets/985f8c86-4dad-400f-a5fa-16f57d0546d8)

<h1 align="center"> NPM package name Validator</h1>
<p align="center">validate-npm-package-name</p>
<p align="center">This package exports functions and few elements.</p>

<!-- <img alt="Crates.io Size" src="https://img.shields.io/bundlephobia/size/@better/validate-npm-package-name"> -->
<hr/>

## **nameValidator**

```typescript
import { nameValidator } from "@betternpm/validate-npm-package-name";
nameValidator("examplename");
nameValidator("some-package");
nameValidator("example.com");
nameValidator("under_score");
nameValidator("123numeric");
nameValidator("@npm/thingy");
nameValidator("@jane/foo.js");
```

```typescript
{
  validForNewPackages: boolean;
  validForOldPackages: boolean;
  errors?:TMyError[]
  warnings?:TMyError[]
}
```

<hr/>

## List of Contents

- [**nameValidator**](#namevalidator)
- [List of Contents](#list-of-contents)
- [Exports](#exports)
- [Naming Rules (Error Codes and Descriptions)](#naming-rules-error-codes-and-descriptions)

## Exports

| Export                 | Description                                    | Return Type                       |
| ---------------------- | ---------------------------------------------- | --------------------------------- |
| nameValidator          | NPM package name Validator                     | `object`                          |
| isScopedPackage        | NPM package name Scope Validator               | `boolean`                         |
| SCOPED_PACKAGE_PATTERN | RegExp pattern checking Scope                  | `RegExp`                          |
| MyErrorList            | List of Errors which `nameValidator` can throw | `as const satisfies TMyErrorList` |
| BLACK_LIST             | Black listed Names                             | `Set<string>`                     |

nameValidator MyErrorList BLACK_LIST SCOPED_PACKAGE_PATTERN

## Naming Rules (Error Codes and Descriptions)

Below is a table of errors that indicate when invalid `npm` package names do not conform to the required rules:

| Error Code                     | Description                                                                          | Don't                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `NULL_NAME`                    | Package name cannot be null.                                                         | `null`                                                     |
| `UNDEFINED_NAME`               | Package name cannot be undefined.                                                    | `undefined` \| `void 0`                                    |
| `INVALID_TYPE`                 | Package name must be a string.                                                       | Non-string types (e.g., numbers)                           |
| `TOO_SHORT_LENGTH_NAME`        | Package name length should be greater than zero.                                     | An empty string                                            |
| `TOO_LONG_LENGTH_NAME`         | Package name length cannot exceed 214 characters.                                    | Names longer than 214 characters                           |
| `CANNOT_START_WITH_PERIOD`     | Package name cannot start with a period.                                             | Names starting with `.`                                    |
| `CANNOT_START_WITH_UNDERSCORE` | Package name cannot start with an underscore.                                        | Names starting with `_`                                    |
| `CANNOT_HAVE_SPACES`           | Package name cannot contain spaces.                                                  | Names with any spaces                                      |
| `CORE_MODULE_NAME`             | Package name _cannot_ be the same as a node.js/io.js core module or a reserved name. | Names like `http`, `stream`, `node_modules`, `favicon.ico` |
| `NO_CAPITAL_LETTERS`           | All characters in the package name must be lowercase.                                | Uppercase or mixed case names                              |
| `SPECIAL_CHARACTERS`           | Package name cannot contain special characters (~'!()\*).                            | Names containing any of these characters: `~'!()*`         |
| `URL_FRIENDLY`                 | Package name must only contain URL-friendly characters.                              | Names with non-URL-friendly characters                     |
| `BLACK_LISTED`                 | Package name cannot be on the blacklist of prohibited names.                         | Names that are explicitly prohibited                       |
