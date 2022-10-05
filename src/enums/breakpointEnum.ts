export enum sizeEnum {
  XXS = '2xs',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = '2xl',
}

export enum screenEnum {
  XXS = 376,
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600,
}

const screenMap = new Map<sizeEnum, number>()

screenMap.set(sizeEnum.XXS, screenEnum.XXS)
screenMap.set(sizeEnum.XS, screenEnum.XS)
screenMap.set(sizeEnum.SM, screenEnum.SM)
screenMap.set(sizeEnum.MD, screenEnum.MD)
screenMap.set(sizeEnum.LG, screenEnum.LG)
screenMap.set(sizeEnum.XL, screenEnum.XL)
screenMap.set(sizeEnum.XXL, screenEnum.XXL)

function genBreakpoint<T>(suffix?: T): Record<string, T extends string ? string : number> {
  return Object.fromEntries(
    [...screenMap.entries()].map(([key, val]) => {
      if (suffix && typeof suffix === 'string')
        return [key, `${val}${suffix}`]
      else
        return [key, val]
    }),
  )
}

const getBreakpoint = genBreakpoint()
const getWindiBreakpoint = genBreakpoint('px')

export { screenMap, getBreakpoint, getWindiBreakpoint }
