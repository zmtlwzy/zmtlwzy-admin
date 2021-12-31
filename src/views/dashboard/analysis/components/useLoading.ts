import { createSharedComposable, useToggle } from '@vueuse/core';

export const useLoading = createSharedComposable(useToggle);
