import { useBreakpoints } from '@vueuse/core'
import { getBreakpoint, sizeEnum } from '/@/enums/breakpointEnum'

let breakpoints: ReturnType<typeof useBreakpoints>
export function useBreakpoint() {
  if (!breakpoints)
    breakpoints = useBreakpoints(getBreakpoint)

  return { ...breakpoints, sizeEnum }
}
