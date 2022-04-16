import { isClient } from '/@/utils/is';

interface NetworkInformation {
  readonly downlink: number;
  readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  readonly rtt: number;
  readonly saveData: boolean;
}

const conn = isClient && (navigator.connection as unknown as NetworkInformation);
export const canPrefetch = conn && !/(?<!\d+)2g/.test(conn.effectiveType) && !conn.saveData;
