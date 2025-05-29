import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: parserTs,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': eslintPluginTs,
        },
        rules: {
            ...eslintPluginTs.configs.recommended.rules,
        },
    },
        {
        ignores: [
            "node_modules/",
            "dist/"                                                                                                             ,
            "coverage/",
            "test/",
            "examples/",
            "*.d.ts",
        ],
    }
]);
