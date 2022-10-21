import React, { memo } from 'react';
import cn from 'clsx';
import s from './FooterSubtitle.module.scss';

export type Props = {
  className?: string;
  text: string;
};

export const FooterSubtitle = memo<Props>(({ className, text }) => (
  <div className={cn(s.root, className)}>
    <span>{text}</span>
  </div>
));
