After cloning repository, run:

```bash
npm i
npx lefthook install
```

## Validating Your Package

Use [this utility](https://arethetypeswrong.github.io/) to validate that the types in your package are actually accessible in key target development environments.

## References

- [TypeScript and NPM package.json exports the 2024 way](https://www.kravchyk.com/typescript-npm-package-json-exports/). Note that [this snippet](https://www.kravchyk.com/typescript-npm-package-json-exports/#:~:text=the%20types%20may%20need%20to%20be%20.d.cjs) is wrong; it should read _the types may need to be `.d.cts`_. That's how this template is implemented. Also note that we're just using a second (and third) `rollup` type declarations target instead of employing [rollup-plugin-copy](https://www.npmjs.com/package/rollup-plugin-copy) as suggested in the article.
