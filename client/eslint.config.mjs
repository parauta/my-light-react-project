import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Calculate current filename and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat for compatibility with old ESLint configs
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        // Files/directories to ignore
        ignores: [
            '**/node_modules',
            '**/dist',
            '**/build',
            '**/vite.config.ts',
            '**/eslint.config.mjs',
        ],
    },
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended', // Basic recommended rules
            'plugin:react/recommended', // Recommended rules for React
            'plugin:react-hooks/recommended', // Specific rules for React Hooks
            'plugin:@typescript-eslint/recommended', // Rules for TypeScript
        )
    ),
    {
        // Plugins used
        plugins: {
            react: fixupPluginRules(react),
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 2022,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },

                project: './tsconfig.json',
            },
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            'react/react-in-jsx-scope': 'off', // No need for React import in modern JSX
            'react/prop-types': 'off', // PropTypes are not necessary with TypeScript

            "quotes": ["warn", "double"], // Use double quotes
            "semi": ["warn", "always"], // Always use semicolons
            "prefer-const": "error", // Prefer `const` over `let`
            "no-multiple-empty-lines": ["warn", { "max": 1 }], // Allow only one empty line

            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_', // Ignore arguments starting with underscore
                    varsIgnorePattern: '^_', // Ignore variables starting with underscore
                },
            ], // Warn for unused variables
            '@typescript-eslint/explicit-function-return-type': 'error', // Block TypeScript to infer return types
            '@typescript-eslint/no-explicit-any': 'warn', // Block the use of `any`
            '@typescript-eslint/no-non-null-assertion': 'warn', // Warn for non-null assertions
            '@typescript-eslint/consistent-type-imports': 'warn', // Consistent type imports
        },
    },
];
