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

const screenMap = new Map<sizeEnum, number>();

screenMap.set(sizeEnum.XXS, screenEnum.XXS);
screenMap.set(sizeEnum.XS, screenEnum.XS);
screenMap.set(sizeEnum.SM, screenEnum.SM);
screenMap.set(sizeEnum.MD, screenEnum.MD);
screenMap.set(sizeEnum.LG, screenEnum.LG);
screenMap.set(sizeEnum.XL, screenEnum.XL);
screenMap.set(sizeEnum.XXL, screenEnum.XXL);

function genBreakpoint(suffix?: string) {
  const breakpoints: { [k: string]: string | number } = {};
  for (const [key, val] of screenMap) {
    breakpoints[key] = suffix ? `${val}${suffix}` : val;
  }
  return breakpoints;
}

const getBreakpoint = genBreakpoint();
const getWindiBreakpoint = genBreakpoint('px');

export { screenMap, getBreakpoint, getWindiBreakpoint };
