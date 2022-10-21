import React, { HTMLAttributes, memo } from 'react';
import cn from 'clsx';
import s from './FullModal.module.sass';
import { Icon } from '../Icon';

export type Props = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children: React.ReactChildren | React.ReactNode;
  onClose?: () => void;
  visible: boolean;
};

export const FullModalOrigin = memo<Props>(({ className, visible, onClose, children, ...props }) => (
  <div {...props} className={cn(s.root, visible && s.visible, className)}>
    <Icon type="close" className={s.close} onClick={onClose} />
    {children}
  </div>
));
