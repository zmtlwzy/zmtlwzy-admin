import { TimeProps as NTimeProps } from 'naive-ui';

export interface TimeProps extends NTimeProps {
  step?: 'requestAnimationFrame' | number;
}
