/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import { format } from 'date-fns'

const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm'
const DATE_FORMAT = 'yyyy-MM-dd '

export function formatToDateTime(
  date: Date | number = Date.now(),
  formatType = DATE_TIME_FORMAT,
): string {
  return format(date, formatType)
}

export function formatToDate(date: Date | number = Date.now(), formatType = DATE_FORMAT): string {
  return format(date, formatType)
}
