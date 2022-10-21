import React, { memo } from 'react';
import cn from 'clsx';
import s from './FooterTitle.module.scss';

export type Props = {
  className?: string;
  text: string;
};

export const FooterTitle = memo<Props>(({ className, text }) => (
  <div className={cn(s.root, className)}>
    <span>{text}</span>
  </div>
));
