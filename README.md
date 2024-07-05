# TypeScript NPM Package Template

<span style="color: darkBlue;">**Writing great TypeScript is only half the battle!**</span> You also need to instrument it, format it, lint it, test it, bundle it, and publish it!

Getting all of these pieces to work gracefully together is not trivial, especially given that a bunch of popular tools have recently released major versions that don't always play well together.

This template is designed to help you get all of these pieces working together in harmony, right out of the box, so you can focus on your code. It includes fully-configured support for:

✅ Code authoring with [TypeScript](https://www.typescriptlang.org/).<br>
✅ Inline documentation with [TSDoc](https://tsdoc.org/).<br>
✅ CLI generation with [Commander](https://www.npmjs.com/package/commander).<br>
✅ Logging with [tslog](https://tslog.js.org/).<br>
✅ Code formatting with [Prettier](https://prettier.io/).<br>
✅ Linting with [ESLint](https://eslint.org/).<br>
✅ Unit testing with [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/).<br>
✅ Bundling with [Rollup](https://rollupjs.org/).<br>
✅ Publishing with [ReleaseIt](https://github.com/release-it/release-it).<br>
✅ Git hooks with [Lefthook](https://github.com/evilmartians/lefthook).<br>
✅ Recommended extensions & settings wherever appropriate.<br>

After cloning a repository that uses this template, be sure to run:

```bash
npm i
npx lefthook install
```

Also, type `@recommended` into the VSCode Extensions sidebar and install the recommended extensions!

## Code Authoring

You want to write straight TS code without having to jump through weird hoops like adding a `.js` extension to your TS imports. ([Click here](https://stackoverflow.com/questions/75807785/why-do-i-need-to-include-js-extension-in-typescript-import-for-custom-module) to dive into that hole. 🙄)

Long story short: you can. Just write your code in the `src` directory and import it as you would any other module. The [bundling process](#bundling) will take care of the rest.

## Inline Documentation

This template uses [TSDoc](https://tsdoc.org/) for inline documentation. TSDoc is similar to JSDoc, but is way less verbose as it can take advantage of TypeScript's type system. It also has better support for documenting generics and other TypeScript-specific features.

TSdoc comments are automatically included in your bundled code, so you can use them to document your code for IntelliSense in JavaScript as well as TypeScript.

The template also includes linting support for your TSDoc comments to keep you out of trouble. Just run `npm run lint` to check your comments along with the rest of your code, and be sure to check out the great [TSDoc documentation](https://tsdoc.org/) for more details!

## CLI Generation

This template uses [Commander](https://www.npmjs.com/package/commander) to generate a CLI for your package.

Given that your underlying library is solid, wrapping it into a CLI is fairly straightforward. Just follow these steps:

1. All of your CLI-specific code should live in the [`src/cli`](./src/cli/) directory, but can import code from across your package as required. Each subdirectory here is the root of a CLI command. You can have as many as you want, but this template includes a single example called [`mycli`](./src/cli/mycli/).

1. The `index.ts` file in each named CLI subdirectory will be picked up by the [bundler](#bundling) and compiled into a CLI command with the same name as the subdirectory. So `src/cli/mycli/index.ts` will be compiled into `dist/mycli.cli.mjs`.

1. The `bin` field in [`package.json`](./package.json) must specifically reference each of these compiled CLI commands. On installation, you can then execute your CLI command like this:

```bash
> npx mycli      # if installed localy

> mycli          # if installed globally

# this is what you get...

Usage: mycli [options] [command]

My CLI tool

Options:
  -h, --help      display help for command

Commands:
  foo [options]   Foos your bar.
  help [command]  display help for command
```

Providing a detailed tutorial on Commander is really out of scope for this README, but this repo demonstrates a simple example with a single subcommand abstracted into a separate dependency.

You can build on this example to create a MUCH more complex CLI! See the [Commander documentation](https://www.npmjs.com/package/commander) for more details.

**If your project requires an extensive, config-driven CLI, you might want to use my [get-dotenv-child](https://github.com/karmaniverous/get-dotenv-child) template instead!**

## Logging

Logging is provided by [tslog](https://tslog.js.org). Just import & use the pre-configured logger, like this:

```typescript
import { logger } from './util/logger';

logger.debug('This is a debug message!');
```

By default, logs are suppressed when `LOG_LEVEL` is either invalid or undefined. For example, the test script uses `cross-env` to enable debug logging during unit testing like this:

```typescript
cross-env LOG_LEVEL=debug nyc mocha
```

See the [`logger` module](./src/util/logger.ts) for more details of this implementation, and the [tslog documentation](https://tslog.js.org) for tons of configuration options.

### IIFE Logging

[tslog](https://tslog.js.org) appears not to play nicely with IIFE modules, so I've added a [`rollup.config.ts` replacement rule](./rollup.config.ts#L21-L24) that replaces the `tslog` logger with `console` for all IIFE builds.

**If you plan to build IIFE modules, you should avoid the `silly` and `fatal` log levels, as these do not exist on `console`!**

This is a bit of a hack, but it works. If you have a better solution, please [submit a PR](https://github.com/karmaniverous/npm-package-template-ts/issues/10)!

## Formatting

Code formatting is provided by [Prettier](https://prettier.io).

Just run `npm run lint` to lint & format your code, or `npm run lint:fix` to resolve any issues automatically if possible.

The [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) is included in the template's VSCode [workspace recommendations](./.vscode/extensions.json), and the template contains related [workspace settings](./.vscode/settings.json), so be sure to install recommended extensions when prompted!

## Linting

Linting services are provided by [ESLint](https://eslint.org).

Just run `npm run lint` to lint your code, or `npm run lint:fix` to resolve any issues automatically if possible. These commands also run Prettier to identify & fix formatting issues.

The [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) is included in the template's VSCode [workspace recommendations](./.vscode/extensions.json), and the template contains related [workspace settings](./.vscode/settings.json), so be sure to install recommended extensions when prompted!

## Unit Testing

Unit test support is provided by [Mocha](https://mochajs.org), using the [Chai](https://www.chaijs.com) assertion library.

Any file containing `.test.` in its name (e.g. [`foo.test.ts`](./src/foo.test.ts)) will be treated as a test file and executed by Mocha. See [`.mocharc.json`](./.mocharc.json) for configuration details.

Just run `npm run test` to execute your tests.

Test coverage reporting is provided by [`nyc`](https://www.npmjs.com/package/nyc) and runs every time you execute your tests. If you execute your tests from the command line, you will see a coverage report at the bottom of the run. You can also see a prettier version of this report by opening `coverage/index.html` in your browser.

The [Mocha Test Explorer Extension](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter) is a great way to execute & debug your Mocha tests! It's included in the template's VSCode [workspace recommendations](./.vscode/extensions.json), and the template contains related [workspace settings](./.vscode/settings.json), so be sure to install recommended extensions when prompted!

## Bundling

This template uses [Rollup](https://rollupjs.org) to bundle your code. See the [References](#references) section for more detailed notes. It creates several kinds of outputs:

- ESM, for import into most TS/JS code.
- IIFE ([Immediately Invoked Function Expression](https://medium.com/@rabailzaheer/iife-explained-immediately-invoked-function-expressions-fccd8f53123d)), for direct browser import.
- CJS, for lulz.
- Type definition files to support TypeScript imports and power IntelliSense in Javascript.
- CLI commands for execution from your command line. See the [CLI Generation](#cli-generation) section for details. Don't forget to update the `bin` field in [`package.json`](./package.json)!

Type declarations are properly bundled and should be available no matter how your package is imported.

Just run `npm run build` to bundle your code, and the output will be in the `dist` directory.

See [`rollup.config.ts`](./rollup.config.ts) for details. If you don't need all of the output types listed above, it should be fairly straightforward to modify this file to suit your needs.

### Incremental Build Warning

Incremental builds are turned on in this template. This will save you some build time, but [`@rollup/plugin-typescript`](https://www.npmjs.com/package/@rollup/plugin-typescript) will emit the following warning at build time:

```bash
(!) [plugin typescript] @rollup/plugin-typescript: outputToFilesystem option is defaulting to true.
```

This is a [known issue](https://github.com/rollup/plugins/issues/1227) and should have no negative effect on your build. If you can figure out how to suppress this warning, please [submit a PR](https://github.com/karmaniverous/npm-package-template-ts/issues/11)!

## Publishing

This template uses [ReleaseIt](https://github.com/release-it/release-it?tab=readme-ov-file#release-it-) to create a release on GitHub and publish your package to NPM.

Just run `npm run release` and the following will happen:

- ESLint will lint your code.
- Mocha will execute your tests and NYC will assess code coverage. Open `coverage/index.html` to see the results.
- Rollup will bundle your code.
- ReleaseIt will create a release on GitHub and publish your package to NPM.

To preserve Git Flow integrity, `npm run release` will only run on the `main` branch. It is often useful, though, to create a pre-release version from a feature branch. To do this, run `npm run release:pre` on any branch.

See the `release-it` section in [`package.json`](./package.json) for details.

## Validating Your Package

Use [this awesome utility](https://arethetypeswrong.github.io/) to validate that the types in your package are actually accessible in key target development environments.

## Git Hooks

This template assumes you will be using something like [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) with a [strong Git branch naming convention](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534).

The template uses [Lefthook](https://evilmartians.com/opensource/lefthook) to perform two services:

- It will prevent you from committing to a branch with an invalid name. See the [`branch-naming-policy`](./.lefthook/pre-commit/branch-naming-policy) script for details.

- If your branch name begins with a standard-format issue number (e.g. [GH-1](https://github.com/karmaniverous/npm-package-template-ts/issues/1)) it will prefix your commit message with the issue number. This is a great way to keep your commits organized and linked to the issues they address! See the [`add-issue`](./.lefthook/prepare-commit-msg/add-issue) script for details.

To activate this functionality, be sure to run `npx lefthook install` after cloning the repository & installing dependencies!

## References

- [Building a TypeScript CLI with Node.js and Commander](https://blog.logrocket.com/building-typescript-cli-node-js-commander/)

- [Bundling TypeScript in different formats with rollup.js](https://datomarjanidze.medium.com/bundling-typescript-in-different-formats-with-rollup-js-3397b3a84e4e)

- [Naming conventions for Git Branches — a Cheatsheet](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534)

- [TypeScript and NPM package.json exports the 2024 way](https://www.kravchyk.com/typescript-npm-package-json-exports/). Note that [this snippet](https://www.kravchyk.com/typescript-npm-package-json-exports/#:~:text=the%20types%20may%20need%20to%20be%20.d.cjs) is wrong; it should read _the types may need to be `.d.cts`_. That's how this template is implemented. Also note that we're just using a second (and third) `rollup` type declarations target instead of employing [rollup-plugin-copy](https://www.npmjs.com/package/rollup-plugin-copy) as suggested in the article.

---

See more great templates and other tools on
[my GitHub Profile](https://github.com/karmaniverous)!
