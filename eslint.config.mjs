import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import originalGlobals from 'globals'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginImport from 'eslint-plugin-import'
import pluginPrettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// Create a cleaned copy of browser globals
const cleanedBrowserGlobals = { ...originalGlobals.browser }
const problematicKey = 'AudioWorkletGlobalScope ' // Key with trailing space
const correctedKey = problematicKey.trim() // 'AudioWorkletGlobalScope'
if (Object.hasOwn(cleanedBrowserGlobals, problematicKey)) {
  const originalValue = cleanedBrowserGlobals[problematicKey]
  delete cleanedBrowserGlobals[problematicKey]
  cleanedBrowserGlobals[correctedKey] = originalValue
  console.warn(`ESLint Config: Corrected global key with whitespace: "${problematicKey}"`)
}

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'jsx-a11y': pluginJsxA11y,
    },
    rules: {
      ...pluginJsxA11y.configs.recommended.rules,
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/first': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // Prettier configuration - MUST COME LAST!
  // Applies Prettier formatting as ESLint rules and disables conflicting ESLint rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...eslintConfigPrettier.rules, // Disables conflicting rules
      'prettier/prettier': 'warn',
    },
    languageOptions: {
      globals: {
        ...cleanedBrowserGlobals, // Add browser globals
        ...originalGlobals.node, // Add node globals if applicable (e.g., for config files)
        React: 'readonly',
      },
    },
  },

  {
    ignores: [
      '.next/',
      'node_modules/',
      // Add other ignored paths like build outputs, etc.
    ],
  },
]

export default eslintConfig
