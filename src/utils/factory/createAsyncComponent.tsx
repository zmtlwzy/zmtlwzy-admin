import { defineAsyncComponent, AsyncComponentOptions } from 'vue';
import { NSpin } from 'naive-ui';
import { noop } from '/@/utils/index';

interface Options extends AsyncComponentOptions {
  size?: 'small' | 'medium' | 'large' | number;
  loading?: boolean;
  retry?: boolean;
}

export function createAsyncComponent(loader: Fn, options?: Omit<Options, 'loader'>) {
  options = options || {};
  const {
    size = 'small',
    delay = 100,
    timeout = 30000,
    loading = false,
    loadingComponent,
    retry = true,
  } = options;
  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? <NSpin size={size} style="margin:1rem;" /> : loadingComponent,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    // TODO
    timeout,
    // errorComponent
    // Defining if component is suspensible. Default: true.
    // suspensible: false,
    delay,
    /**
     *
     * @param {*} error Error message object
     * @param {*} retry A function that indicating whether the async component should retry when the loader promise rejects
     * @param {*} fail  End of failure
     * @param {*} attempts Maximum allowed retries number
     */
    onError: !retry
      ? noop
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            // retry on fetch errors, 3 max attempts
            retry();
          } else {
            // Note that retry/fail are like resolve/reject of a promise:
            // one of them must be called for the error handling to continue.
            fail();
          }
        },
  });
}
