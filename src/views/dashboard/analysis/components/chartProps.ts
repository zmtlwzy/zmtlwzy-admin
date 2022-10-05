import { propTypes } from '/@/utils/propTypes'

export const basicProps = (h: string, w = '100%') => ({
  width: propTypes.string.def(w),
  height: propTypes.string.def(h),
})
