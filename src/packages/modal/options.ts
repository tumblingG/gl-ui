export interface Options {
  isFullScreen?: boolean;
  minHeight?: string;
  width?: string;
  maskClick?: boolean;
  showCloseIcon?: boolean;
  onOk?: (componentRef: any) => Promise<any> | boolean;
  onClose?: (componentRef: any) => Promise<any> | boolean;
  component?: any;
  componentParams?: any;
}
