# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.3.0 (2022-10-22)


### ⚠ BREAKING CHANGES

* **composables:** useMessage useWrapperMessage -> useDescreteApi

### Features

* **AppLogo:** add canGoHome props ([035dcf0](https://github.com/zmtlwzy/zmtlwzy-admin/commit/035dcf077fe18293f9c7b07b9a30b73dd321e7ab))
* **BasicForm:** add bindVal bindEvent props ([fb0c800](https://github.com/zmtlwzy/zmtlwzy-admin/commit/fb0c8004bc9aacdea419f32b0293a5c215a13081))
* **comp:** add datajson preview comp ([6bc1715](https://github.com/zmtlwzy/zmtlwzy-admin/commit/6bc1715964e1cd75d29ec065fae63215fc7f32be))
* **components:** add appSearch components ([c53a221](https://github.com/zmtlwzy/zmtlwzy-admin/commit/c53a2216b62731bc1ca4331b45fb2ef8fb9d2491))
* **composables:** feat: add useDiscreteApi ([12edca9](https://github.com/zmtlwzy/zmtlwzy-admin/commit/12edca9a7cfa7c90151df962525443d3d02813ea))
* config unocss fileSystemIconLoader feature ([9bc5252](https://github.com/zmtlwzy/zmtlwzy-admin/commit/9bc5252aa30d568f94fb8029e2cd7fb7935c72be))
* **CountdownInput:** perf style ([a645204](https://github.com/zmtlwzy/zmtlwzy-admin/commit/a64520425204ce793bb228e3e08b36254d19a020))
* **loginPage:** perf loginPage and add some comp ([b78473a](https://github.com/zmtlwzy/zmtlwzy-admin/commit/b78473a3926a64f6222b14af89ab4c3468024259))
* **page:** loading title can custom title ([0db94f8](https://github.com/zmtlwzy/zmtlwzy-admin/commit/0db94f8d263c3c72e0c9b2c51a5aa1c341b11e01))
* **pageWrapper:** add back btn ([2b4f3ea](https://github.com/zmtlwzy/zmtlwzy-admin/commit/2b4f3ea4f365062f541e5b61fcdfa39cbd103145))
* **views:** add detail page demo ([e472089](https://github.com/zmtlwzy/zmtlwzy-admin/commit/e472089eb22402aaedfbea968b7e7510338d2b2a))


### Bug Fixes

* **AppSearch:** darkMode backroundColor bad ([1c473c3](https://github.com/zmtlwzy/zmtlwzy-admin/commit/1c473c3c1000cfb6a6002968a092daa3103e5cce))
* **BasicForm:** n-input-group width invalid ([edd21ba](https://github.com/zmtlwzy/zmtlwzy-admin/commit/edd21ba46b8ce89de254e2fee895baf75c1b2a76))
* demo avatar src fixed ([8f2ea4a](https://github.com/zmtlwzy/zmtlwzy-admin/commit/8f2ea4a2d1bd0090082f19b298e9942b0b9e0d12))
* dropdown item hover icon blocked ([6247e4a](https://github.com/zmtlwzy/zmtlwzy-admin/commit/6247e4af9656b1ba5e4c86a3a6662aa3bc08a46a))
* **useRedo:** missing params on refresh ([cb3f744](https://github.com/zmtlwzy/zmtlwzy-admin/commit/cb3f744ff2a744fb4eab62f65d16a1bd77865ee5))

### [0.2.5](https://github.com/zmtlwzy/zmtlwzy-admin/compare/0.2.0...0.2.5)(2022-06-11)

### Features

* add mixSidebarTrigger setting ([3e11c6f](https://github.com/zmtlwzy/zmtlwzy-admin/commit/3e11c6f824d67f23b3b75f9c6ca8ff4934111aa0))
* add prefetch componets ([c351a46](https://github.com/zmtlwzy/zmtlwzy-admin/commit/c351a463f67eabfa26cffec0dea10ca94e92a063))
* add upload server test ([6530f52](https://github.com/zmtlwzy/zmtlwzy-admin/commit/6530f52adb031a6ad66ec924d94a727d6714a321))
* **demo:** update useForm demo page ([769d5b2](https://github.com/zmtlwzy/zmtlwzy-admin/commit/769d5b26fd97863d825b3410b6f5ce127b73bfad))
* **LoadingCard:** add more layout props ([db8cab7](https://github.com/zmtlwzy/zmtlwzy-admin/commit/db8cab74c0640427b4807b58b48aff457725ef98))


### Bug Fixes

* can not change themeColor in darkMode ([e8f70a3](https://github.com/zmtlwzy/zmtlwzy-admin/commit/e8f70a30965204519cf6873d46ecaea52d517d64))
* fix themeColor change logic ([1383037](https://github.com/zmtlwzy/zmtlwzy-admin/commit/1383037265c1cb9b9002b1adf5e470f6be3c134f))
* **msw:** iP地址环境下，[msw]headers属性参数兼容 ([7d2fb8a](https://github.com/zmtlwzy/zmtlwzy-admin/commit/7d2fb8a07b8593e9c1aba8472655e8b65d26cd71)), closes [#4](https://github.com/zmtlwzy/zmtlwzy-admin/issues/4)
* **tableComponent:** css style fix ([48860f9](https://github.com/zmtlwzy/zmtlwzy-admin/commit/48860f9760aeab94fcdf1e90cfdbd6e6f31738bd))


# [0.2.0](https://github.com/zmtlwzy/zmtlwzy-admin/compare/0.1.1...0.2.0) (2022-04-03)


### Refactor

- Switch Windicss to Unocss
- Switch vite-plugin-mock to msw
- Switch mockjs to faker-js

### Features

- Add Vitest and demos
- Add Stylelint
- Add unplugin-auto-import


## [0.1.1](https://github.com/zmtlwzy/zmtlwzy-admin/compare/0.1.0...0.1.1) (2022-03-08)

### Bug Fixes

- **i18n:** add i18n translate data ([93cf3d4](https://github.com/zmtlwzy/zmtlwzy-admin/commit/93cf3d45b95672db3daa4b078f8d768454f17d56))
- **tabs:** affix tab should hide close btn ([91f5420](https://github.com/zmtlwzy/zmtlwzy-admin/commit/91f5420dc05a54b39f77ee3f777e0b256016dd8f)), closes [#3](https://github.com/zmtlwzy/zmtlwzy-admin/issues/3)

### Features

- add mixsider logo size transition ([56957d0](https://github.com/zmtlwzy/zmtlwzy-admin/commit/56957d09795ab964d99b18194262d417a2647d9f))
- support for hiding child-items in menus ([feedf26](https://github.com/zmtlwzy/zmtlwzy-admin/commit/feedf2662e53c5e75ad24a2527043d2bbcb5ec11))

### Performance Improvements

- **analysis:** useToggle replace autoResetRef ([49b7df2](https://github.com/zmtlwzy/zmtlwzy-admin/commit/49b7df2e9968d6787bb72784dc4f8066a7da0118))

# [0.1.0](https://github.com/zmtlwzy/zmtlwzy-admin/compare/7ee982c24f6ae70ebc9b1867d6f2e69568ca26d0...0.1.0) (2022-01-20)

### Bug Fixes

- badge count should update ([2fb0c76](https://github.com/zmtlwzy/zmtlwzy-admin/commit/2fb0c7602deb39f8388fddcfa6a98d6280536000))
- headerMenu should responsive and scroll ([232f52b](https://github.com/zmtlwzy/zmtlwzy-admin/commit/232f52bdd735a0424b8a2e9e7291429687287a92))

### Features

- add menuIndent and mixSiderLayout setting ([a84a0bc](https://github.com/zmtlwzy/zmtlwzy-admin/commit/a84a0bc8d382b1b8bc49b268c3e8e944f3581610))
- add mixSiderLayout ([f0e82ea](https://github.com/zmtlwzy/zmtlwzy-admin/commit/f0e82ea1f9e14bdc1244c44dd0d12dacc7532196))
- **component:** add scrollbar comp ([f752e46](https://github.com/zmtlwzy/zmtlwzy-admin/commit/f752e46e63c84ead0a02f5408684c34c6f83a1c8))
- first commit ([7ee982c](https://github.com/zmtlwzy/zmtlwzy-admin/commit/7ee982c24f6ae70ebc9b1867d6f2e69568ca26d0))
- improve details ([2609f1f](https://github.com/zmtlwzy/zmtlwzy-admin/commit/2609f1fd99683abc5f4ce7e8802538939cfca541))
