import React, { memo } from 'react';
import cn from 'clsx';
import s from './Progress.module.scss';
import { ReactComponent as Circle1 } from './svg/1.svg';

export type Props = {
  className?: string;
};

export const ProgressItem = memo<Props>(({ className }) => (
  <div className={cn(s.progress__item, className)}>
    <Circle1 />
    <span>Билеты</span>
  </div>
));
