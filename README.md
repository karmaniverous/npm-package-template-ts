# TypeScript NPM Package Template

<span style="color: darkBlue;">**Writing great TypeScript is only half the battle!**</span> You also need to instrument it, format it, lint it, test it, bundle it, and publish it!

Getting all of these pieces to work gracefully together is not trivial, especially given that a bunch of popular tools have recently released major versions that don't always play well together.

This template is designed to help you get all of these pieces working together in harmony, right out of the box, so you can focus on your code. It includes fully-configured support for:

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

Just run `npm test` to execute your tests.

Test coverage reporting is provided by [`nyc`](https://www.npmjs.com/package/nyc) and runs every time you execute your tests. If you execute your tests from the command line, you will see a coverage report at the bottom of the run. You can also see a prettier version of this report by opening `coverage/index.html` in your browser.

The [Mocha Test Explorer Extension](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter) is a great way to execute & debug your Mocha tests! It's included in the template's VSCode [workspace recommendations](./.vscode/extensions.json), and the template contains related [workspace settings](./.vscode/settings.json), so be sure to install recommended extensions when prompted!

## Bundling

This template uses [Rollup](https://rollupjs.org) to bundle your code. See the [References](#references) section for more detailed notes. It will output three different formats:

- ESM, for import into most TS/JS code.
- IIFE ([Immediately Invoked Function Expression](https://medium.com/@rabailzaheer/iife-explained-immediately-invoked-function-expressions-fccd8f53123d)), for direct browser import.
- CJS, for lulz.

Type declarations are properly bundled and should be available no matter how your package is imported.

Just run `npm run build` to bundle your code. The output will be in the `dist` directory.

See [`rollup.config.ts`](./rollup.config.ts) for details.

## Publishing

This template uses [ReleaseIt](https://github.com/release-it/release-it?tab=readme-ov-file#release-it-) to create a release on GitHub and publish your package to NPM.

Just run `npm run release` and the following will happen:

- ESLint will lint your code.
- Mocha will execute your tests and NYC will assess code coverage. Open `coverage/index.html` to see the results.
- Rollup will bundle your code.
- ReleaseIt will create a release on GitHub and publish your package to NPM.

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

- [Bundling TypeScript in different formats with rollup.js](https://datomarjanidze.medium.com/bundling-typescript-in-different-formats-with-rollup-js-3397b3a84e4e)

- [TypeScript and NPM package.json exports the 2024 way](https://www.kravchyk.com/typescript-npm-package-json-exports/). Note that [this snippet](https://www.kravchyk.com/typescript-npm-package-json-exports/#:~:text=the%20types%20may%20need%20to%20be%20.d.cjs) is wrong; it should read _the types may need to be `.d.cts`_. That's how this template is implemented. Also note that we're just using a second (and third) `rollup` type declarations target instead of employing [rollup-plugin-copy](https://www.npmjs.com/package/rollup-plugin-copy) as suggested in the article.

- [Naming conventions for Git Branches — a Cheatsheet](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534)

## Coming Soon

- CLI support with [`commander`](https://www.npmjs.com/package/commander)
- DotEnv support with [`get-dotenv`](https://www.npmjs.com/package/@karmaniverous/get-dotenv)

---

See more great templates and other tools on
[my GitHub Profile](https://github.com/karmaniverous)!
