import React, { memo } from 'react';
import cn from 'clsx';
import s from './OrderTitle.module.scss';

export type Props = {
  className?: string;
};

export const OrderTitle = memo<Props>(({ className }) => <div className={cn(s.root, className)}>Детали поездки</div>);
