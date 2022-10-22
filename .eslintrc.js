module.exports = {
  extends: [
    '@zmtlwzy',
    './.eslintrc-auto-import.json',
  ],
  settings: {
    'import/core-modules': ['uno.css', '~icons/*', 'virtual:svg-icons-register'],
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'pathGroups': [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'vue-router',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'pinia',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'naive-ui',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '/@/config',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/settings',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/design',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/enum',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/layouts',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/views',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/components',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/router',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/api',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/store',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/composables',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/hooks',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/utils',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '/@/assets',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
        ],
        'pathGroupsExcludedImportTypes': ['vue', 'vue-router', 'pinia', 'naive-ui'],
      },
    ],
  },
}
