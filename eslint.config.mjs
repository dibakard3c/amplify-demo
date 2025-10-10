import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import i18next from 'eslint-plugin-i18next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // lint rules to catch all untranslated strings
    ...i18next.configs['flat/recommended'],
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    // files: ['src/app/*/*/**/*.{js,jsx,ts,tsx}'],
    ignores: [
      '**/node_modules/**',
      'src/assets/**',
      'src/constants/**',
      'src/store/**',
      'src/translations/**',
      'src/typings/**',
      'src/utils/**',
      'src/components/ui/**',
      'src/networking/endpoints/**',
    ],
    rules: {
      ...i18next.configs['flat/recommended'].rules,
      'i18next/no-literal-string': [
        'warn',
        {
          mode: 'all',
          'jsx-attributes': {
            include: [],
            exclude: [
              'className',
              'styleName',
              'style',
              'type',
              'key',
              'id',
              'width',
              'height',
              // custom
              'className',
              'titleClassName',
              'messageClassName',
              'inputClassName',
              'contentClassName',
              'sizeClassName',
              'containerClassName',
              'inputContainerClassName',
              'size',
              'name',
              'variant',
              /data-[a-zA-Z0-9-]+(?:\s*=\s*"[^"]*")?/g,
              'theme',
              'numberName',
              'align',
              'mode',
              'loading',
              'fill',
              'dataKey',
              'position',
              'side',
              'indicator',
              'stroke',
              'verticalAlign',
              'role',
            ],
          },
          words: {
            include: [],
            exclude: [
              '[0-9!-/:-@[-`{-~]+',
              '[A-Z_-]+',
              /^\p{Emoji}+$/u,
              // custom
              'use client',
              'use server',
              'email',
              'onChange',
              /^.*[_/].*$/,
              /^(?:est|estia|en|el|eur|€|el-GR)$/i,
              'always',
              'auto',
              /(?=.*€)(?=.*[KM])/i,
              'Bearer',
              'get',
              /\b[a-zA-Z_]\w*\.[a-zA-Z_]\w*\b/g,
            ],
          },
          'object-properties': {
            exclude: [
              '[A-Z_-]+',
              //custom
              'behavior',
              'defaultValues',
              'value',
              'key',
              /\bkey\w*|\w*key\b/i,
              'legalAddress',
              'countryName',
              'id',
              'themeColor',
              'width',
              'colorScheme',
              'rel',
              'media',
              'desktop',
              'fill',
              'position',
              'textAnchor',
              'type',
              'lineHeight',
              'autoComplete',
            ],
          },
          callees: {
            exclude: [
              'i18n(ext)?',
              't',
              'require',
              'addEventListener',
              'removeEventListener',
              'postMessage',
              'getElementById',
              'dispatch',
              'commit',
              'includes',
              'indexOf',
              'endsWith',
              'startsWith',
              // custom
              'generateMeta', // Todo
              'watch',
              'setValue',
              'append',
              'on',
              'log',
              'warn',
              'set',
              'get',
              'executeRecaptcha',
              'createAction',
              'getValue',
              'getIsSelected',
              'format',
              'createApi',
              'success',
              'error',
              'info',
              'compareIgnoreCase',
              'setItem',
              'replace',
              'getValues',
              'formatDate',
              'useState',
              'jsPDF',
              'formatCurrency',
            ],
          },
        },
      ], // custom option
    },
  },
];

export default eslintConfig;
