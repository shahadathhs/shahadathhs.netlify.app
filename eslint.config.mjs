import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    'node_modules/*',
    '.next/*',
    '.vercel/*',
    '.open-next/*',
    '.wrangler/*',
    '.dev.vars/*',
    '.releaserc.js',
    'commitlint.config.js',
    'components.json',
    'lint-staged.config.js',
    'next.config.ts',
    'open-next.config.ts',
    'package.json',
    'prettier.config.js',
    'src/constant/aboutMe.ts',
    'src/constant/certificates.ts',
    'src/constant/contactInfo.ts',
    'src/constant/experienceData.ts',
    'src/constant/heroData.ts',
    'src/constant/navigationLinks.ts',
    'src/constant/repoCategories.ts',
    'src/constant/skillsData.ts',
    'src/constant/socialLinks.ts',
    'tsconfig.json',
  ]),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      react: pluginReact,
    },
    rules: {
      'no-console': [
        'warn',
        { allow: ['warn', 'error', 'info', 'group', 'groupEnd'] },
      ],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-unused-expressions': 'error',
    },
  },

  // TypeScript config
  ...tseslint.configs.recommended,

  // React config
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },

  // TypeScript config
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'warn',
      'no-undef': 'off',
    },
  },

  // Prettier config
  eslintPluginPrettierRecommended,
]);
