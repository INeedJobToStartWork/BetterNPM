![image](https://github.com/user-attachments/assets/cf3b6b20-cbc4-45ab-8979-b0da0cd827fe)

<h1 align="center">Better Npm</h1>
<p align="center">Make NPM great Again! </p>
<hr/>

Hello! This project is created to show how NPM packages could work if they would be refactored and made properly.

Project it's made by **Community** and is not **related with official NPM**.

Currently:

- Documentation is outdated
- Types are outdated
- Not friendly for developers to use it as Dependency
- Not minified

## Mission

- 100% original functionality (Maybe extras sometimes)
- Refactor on Typescript
- Make Dependencies easier in use for developers of external packages
- Up-to-date documentation
- Correct types

About:

- 📘 Docs (External documentation)

About packages:

- 📖 TSDocs (Internal documentation)
- ♻️ Minified
- ⚠️ Error Handler (Custom - `oh-my-error`, why this?)
- ✅ Support JS/TS & CJS/ESM
- 📝 Debug Logging (Only for CLI commands)

## Packages

### Status

| Emoji | Meaning         |
| ----- | --------------- |
| ✅    | Completed       |
| ⏸️    | Paused          |
| ❌    | Aborted         |
| 🛠️    | In Progress     |
| 💤    | Not Yet Started |

| Category                               | Functionality                                             | (Original) Package name                                                                      | (Better) Package name                                                                                      | Progress Status |
| -------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------- |
| 📦 Package Management                  | 🔍 Validates NPM package names                            | [validate-npm-package-name](https://www.npmjs.com/package/validate-npm-package-name)         | [@betternpm/validate-npm-package-name](https://www.npmjs.com/package/@betternpm/validate-npm-package-name) | 💤              |
| 📦 Package Management                  | 📥 NPM API (programmatic) Package download and extraction | [pacote](https://www.npmjs.com/package/pacote)                                               | [@betternpm/pacote](https://www.npmjs.com/package/@betternpm/pacote)                                       | 💤              |
| 📦 Package Management                  | 🎁 Create NPM packages                                    | [libnpmpack](https://www.npmjs.com/package/libnpmpack)                                       | [@betternpm/libnpmpack](https://www.npmjs.com/package/@betternpm/libnpmpack)                               | 💤              |
| 📦 Package Management                  | 🏷️ Parse package names and specifiers                     | [npm-package-arg](https://www.npmjs.com/package/npm-package-arg)                             | [@betternpm/npm-package-arg](https://www.npmjs.com/package/@betternpm/npm-package-arg)                     | 💤              |
| 📦 Package Management                  | 🌿 Manage package dependencies                            | [@npmcli/arborist](https://www.npmjs.com/package/@npmcli/arborist)                           | [@betternpm/@npmcli/arborist](https://www.npmjs.com/package/@betternpm/@npmcli/arborist)                   | 💤              |
| 📦 Package Management                  | 🏁 Initialize package.json files                          | [init-package-json](https://www.npmjs.com/package/init-package-json)                         | [@betternpm/init-package-json](https://www.npmjs.com/package/@betternpm/init-package-json)                 | 💤              |
| 📦 Package Management                  | 🎯 Select best matching package manifest                  | [npm-pick-manifest](https://www.npmjs.com/package/npm-pick-manifest)                         | [@betternpm/npm-pick-manifest](https://www.npmjs.com/package/@betternpm/npm-pick-manifest)                 | 💤              |
| 📦 Package Management                  | 🔍 Verify package installation integrity                  | [npm-install-checks](https://www.npmjs.com/package/npm-install-checks)                       | [@betternpm/npm-install-checks](https://www.npmjs.com/package/@betternpm/npm-install-checks)               | 💤              |
| 📦 Package Management                  | 📝 Read and write package.json files                      | [@npmcli/package-json](https://www.npmjs.com/package/@npmcli/package-json)                   | [@betternpm/@npmcli/package-json](https://www.npmjs.com/package/@betternpm/@npmcli/package-json)           | 💤              |
| 📦 Package Management                  | 🔧 Normalize package metadata                             | [normalize-package-data](https://www.npmjs.com/package/normalize-package-data)               | [@betternpm/normalize-package-data](https://www.npmjs.com/package/@betternpm/normalize-package-data)       | 💤              |
| 📦 Package Management                  | 🔍 Validates NPM package names                            | [validate-npm-package-name](https://www.npmjs.com/package/validate-npm-package-name)         | [@betternpm/validate-npm-package-name](https://www.npmjs.com/package/@betternpm/validate-npm-package-name) | 💤              |
| 🌐 Registry and API Interaction        | 🏛️ NPM organization management                            | [libnpmorg](https://www.npmjs.com/package/libnpmorg)                                         | [@betternpm/libnpmorg](https://www.npmjs.com/package/@betternpm/libnpmorg)                                 | 💤              |
| 🌐 Registry and API Interaction        | 🔍 Compare NPM packages                                   | [libnpmdiff](https://www.npmjs.com/package/libnpmdiff)                                       | [@betternpm/libnpmdiff](https://www.npmjs.com/package/@betternpm/libnpmdiff)                               | 💤              |
| 🌐 Registry and API Interaction        | 🕵️ Search NPM packages                                    | [libnpmsearch](https://www.npmjs.com/package/libnpmsearch)                                   | [@betternpm/libnpmsearch](https://www.npmjs.com/package/@betternpm/libnpmsearch)                           | 💤              |
| 🌐 Registry and API Interaction        | 🚀 Publish NPM packages                                   | [libnpmpublish](https://www.npmjs.com/package/libnpmpublish)                                 | [@betternpm/libnpmpublish](https://www.npmjs.com/package/@betternpm/libnpmpublish)                         | 💤              |
| 🌐 Registry and API Interaction        | 🔄 Interact with npm registry API                         | [npm-registry-fetch](https://www.npmjs.com/package/npm-registry-fetch)                       | [@betternpm/npm-registry-fetch](https://www.npmjs.com/package/@betternpm/npm-registry-fetch)               | 💤              |
| 🔢 Version Management                  | 📊 Semantic versioning utility                            | [semver](https://www.npmjs.com/package/semver)                                               | [@betternpm/semver](https://www.npmjs.com/package/@betternpm/semver)                                       | 💤              |
| 🔢 Version Management                  | 🏷️ NPM package versioning                                 | [libnpmversion](https://www.npmjs.com/package/libnpmversion)                                 | [@betternpm/libnpmversion](https://www.npmjs.com/package/@betternpm/libnpmversion)                         | 💤              |
| 🔐 Security and Access Control         | 🔒 Subresource Integrity                                  | [ssri](https://www.npmjs.com/package/ssri)                                                   | [@betternpm/ssri](https://www.npmjs.com/package/@betternpm/ssri)                                           | 💤              |
| 🔐 Security and Access Control         | 🔑 NPM package access management                          | [libnpmaccess](https://www.npmjs.com/package/libnpmaccess)                                   | [@betternpm/libnpmaccess](https://www.npmjs.com/package/@betternpm/libnpmaccess)                           | 💤              |
| 🔐 Security and Access Control         | 🕶️ Redact sensitive information                           | [@npmcli/redact](https://www.npmjs.com/package/@npmcli/redact)                               | [@betternpm/@npmcli/redact](https://www.npmjs.com/package/@betternpm/@npmcli/redact)                       | 💤              |
| 🔐 Security and Access Control         | 📊 Generate npm audit reports                             | [npm-audit-report](https://www.npmjs.com/package/npm-audit-report)                           | [@betternpm/npm-audit-report](https://www.npmjs.com/package/@betternpm/npm-audit-report)                   | 💤              |
| 👥 User and Team Management            | 👪 NPM team management                                    | [libnpmteam](https://www.npmjs.com/package/libnpmteam)                                       | [@betternpm/libnpmteam](https://www.npmjs.com/package/@betternpm/libnpmteam)                               | 💤              |
| 👥 User and Team Management            | 👨‍💼 NPM user profile management                            | [npm-profile](https://www.npmjs.com/package/npm-profile)                                     | [@betternpm/npm-profile](https://www.npmjs.com/package/@betternpm/npm-profile)                             | 💤              |
| 👥 User and Team Management            | ✅ Validate npm usernames                                 | [npm-user-validate](https://www.npmjs.com/package/npm-user-validate)                         | [@betternpm/npm-user-validate](https://www.npmjs.com/package/@betternpm/npm-user-validate)                 | 💤              |
| 🏃 Script and Process Execution        | ▶️ Execute NPM packages                                   | [libnpmexec](https://www.npmjs.com/package/libnpmexec)                                       | [@betternpm/libnpmexec](https://www.npmjs.com/package/@betternpm/libnpmexec)                               | 💤              |
| 🏃 Script and Process Execution        | ▶️ Run package scripts                                    | [@npmcli/run-script](https://www.npmjs.com/package/@npmcli/run-script)                       | [@betternpm/@npmcli/run-script](https://www.npmjs.com/package/@betternpm/@npmcli/run-script)               | 💤              |
| 🏃 Script and Process Execution        | 🚀 Spawn processes with Promises                          | [@npmcli/promise-spawn](https://www.npmjs.com/package/@npmcli/promise-spawn)                 | [@betternpm/@npmcli/promise-spawn](https://www.npmjs.com/package/@betternpm/@npmcli/promise-spawn)         | 💤              |
| 💾 File System and Caching             | 🗄️ Content-addressable cache                              | [cacache](https://www.npmjs.com/package/cacache)                                             | [@betternpm/cacache](https://www.npmjs.com/package/@betternpm/cacache)                                     | 💤              |
| 💾 File System and Caching             | 📂 File system operations                                 | [fs](https://www.npmjs.com/package/fs)                                                       | [@betternpm/fs](https://www.npmjs.com/package/@betternpm/fs)                                               | 💤              |
| 💾 File System and Caching             | 🔄 File system streams                                    | [fs-minipass](https://www.npmjs.com/package/fs-minipass)                                     | [@betternpm/fs-minipass](https://www.npmjs.com/package/@betternpm/fs-minipass)                             | 💤              |
| 💾 File System and Caching             | ✍️ Atomically write files                                 | [write-file-atomic](https://www.npmjs.com/package/write-file-atomic)                         | [@betternpm/write-file-atomic](https://www.npmjs.com/package/@betternpm/write-file-atomic)                 | 💤              |
| ⚙️ Configuration and Settings          | 📝 INI file parser and serializer                         | [ini](https://www.npmjs.com/package/ini)                                                     | [@betternpm/ini](https://www.npmjs.com/package/@betternpm/ini)                                             | 💤              |
| ⚙️ Configuration and Settings          | 🛠️ NPM configuration management                           | [@npmcli/config](https://www.npmjs.com/package/@npmcli/config)                               | [@betternpm/@npmcli/config](https://www.npmjs.com/package/@betternpm/@npmcli/config)                       | 💤              |
| 🗺️ Workspace and Repository Management | ℹ️ Git repository information                             | [hosted-git-info](https://www.npmjs.com/package/hosted-git-info)                             | [@betternpm/hosted-git-info](https://www.npmjs.com/package/@betternpm/hosted-git-info)                     | 💤              |
| 🗺️ Workspace and Repository Management | 🗂️ Map npm workspaces                                     | [@npmcli/map-workspaces](https://www.npmjs.com/package/@npmcli/map-workspaces)               | [@betternpm/@npmcli/map-workspaces](https://www.npmjs.com/package/@betternpm/@npmcli/map-workspaces)       | 💤              |
| 🌐 Networking                          | 🚚 HTTP/HTTPS requests with caching                       | [make-fetch-happen](https://www.npmjs.com/package/make-fetch-happen)                         | [@betternpm/make-fetch-happen](https://www.npmjs.com/package/@betternpm/make-fetch-happen)                 | 💤              |
| 📊 Logging and Reporting               | 📝 Process logging utility                                | [proc-log](https://www.npmjs.com/package/proc-log)                                           | [@betternpm/proc-log](https://www.npmjs.com/package/@betternpm/proc-log)                                   | 💤              |
| 🔍 Utility Functions                   | ⌨️ Command-line option parsing                            | [nopt](https://www.npmjs.com/package/nopt)                                                   | [@betternpm/nopt](https://www.npmjs.com/package/@betternpm/nopt)                                           | 💤              |
| 🔍 Utility Functions                   | 📖 Read user input from console                           | [read](https://www.npmjs.com/package/read)                                                   | [@betternpm/read](https://www.npmjs.com/package/@betternpm/read)                                           | 💤              |
| 🔍 Utility Functions                   | 🔎 Locate command in system PATH                          | [which](https://www.npmjs.com/package/which)                                                 | [@betternpm/which](https://www.npmjs.com/package/@betternpm/which)                                         | 💤              |
| 🔍 Utility Functions                   | 🔤 String abbreviation                                    | [abbrev](https://www.npmjs.com/package/abbrev)                                               | [@betternpm/abbrev](https://www.npmjs.com/package/@betternpm/abbrev)                                       | 💤              |
| 🔍 Utility Functions                   | 🚶 Walk tree-like structures                              | [treeverse](https://www.npmjs.com/package/treeverse)                                         | [@betternpm/treeverse](https://www.npmjs.com/package/@betternpm/treeverse)                                 | 💤              |
| 🔍 Utility Functions                   | 💸 Handles dependency funding                             | [libnpmfund](https://www.npmjs.com/package/libnpmfund)                                       | [@betternpm/libnpmfund](https://www.npmjs.com/package/@betternpm/libnpmfund)                               | 💤              |
| 🔍 Utility Functions                   | 🎣 NPM hooks management                                   | [libnpmhook](https://www.npmjs.com/package/libnpmhook)                                       | [@betternpm/libnpmhook](https://www.npmjs.com/package/@betternpm/libnpmhook)                               | 💤              |
| 🔍 Utility Functions                   | 🔀 Parse JSON with conflict markers                       | [parse-conflict-json](https://www.npmjs.com/package/parse-conflict-json)                     | [@betternpm/parse-conflict-json](https://www.npmjs.com/package/@betternpm/parse-conflict-json)             | 💤              |
| 🔍 Utility Functions                   | 🐛 Improve JSON parsing errors                            | [json-parse-even-better-errors](https://www.npmjs.com/package/json-parse-even-better-errors) | [@betternpm/json-parse-even-better-errors](https://www.npmjs.com/package/@bet)                             | 💤              |
