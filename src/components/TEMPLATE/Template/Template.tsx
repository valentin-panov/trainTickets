import React, { memo } from 'react';
import cn from 'clsx';
import s from './Template.module.scss';

export type Props = {
  className?: string;
};

export const Template = memo<Props>(({ className }) => (
  <div className={cn(s.root, className)}>
    <p>HELLO</p>
  </div>
));
