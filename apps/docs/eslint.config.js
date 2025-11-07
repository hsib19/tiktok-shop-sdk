import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
	{
		ignores: ['.svelte-kit', 'node_modules', 'build', 'dist']
	},

	js.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],

	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021
			}
		}
	},

	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelte.parser,
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.svelte'],
				project: './tsconfig.json',
				tsconfigRootDir: process.cwd()
			}
		},
		rules: {
			'svelte/no-href-without-resolve': 'off',
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/valid-compile': 'warn',
			'svelte/no-at-html-tags': 'off',
			'svelte/no-unused-svelte-ignore': 'off',
			'svelte/no-inline-styles': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
		}
	},

	prettier
];
