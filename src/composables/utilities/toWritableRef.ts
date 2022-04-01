import type { Ref } from 'vue';

export function toWritableRef<T extends object, K extends keyof T>(object: T, key: K) {
  const val = ref(object[key]) as Ref<T[K]>;

  watch(
    () => object[key],
    (newValue) => {
      val.value = newValue;
    },
    { flush: 'sync', deep: false, immediate: true }
  );

  return val;
}
