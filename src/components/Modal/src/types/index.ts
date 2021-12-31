import type { ModalProps } from 'naive-ui';
/**
 * @description: 弹窗对外暴露的方法
 */
export interface BasicModalMethods {
  setProps: (props: BasicModalProps) => void;
  openModal: () => void;
  closeModal: () => void;
  setSubLoading: (status?: boolean) => void;
}

export interface BasicModalProps extends ModalProps {
  draggable?: string;
  subBtuText?: string;
  destroyOnClose?: boolean;
  onOk?: () => void;
}

export type RegisterFn = (ModalInstance: BasicModalMethods) => void;

export type UseModalReturnType = [RegisterFn, BasicModalMethods];

/* interface ModalProps = {
     to?: string | HTMLElement;
     show?: boolean;
     title?: string;
     preset?: 'dialog' | 'card' | 'confirm';
     showIcon?: boolean;
     maskClosable?: boolean;
     transformOrigin?: 'mouse' | 'center';
     displayDirective?: 'show' | 'if';
     onClose: () => Promise<boolean> | boolean | any;
     onUpdateShow: MaybeArray<(value: boolean) => void>;
     onAfterEnter: () => void;
     onBeforeLeave: () => void;
     onNegativeClick: () => Promise<boolean> | boolean | any;
     onPositiveClick: () => Promise<boolean> | boolean | any;
} */
