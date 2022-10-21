import React, { memo } from 'react';
import cn from 'clsx';
import s from './Skeleton.module.scss';

export type Props = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = memo<Props>(({ className, ...props }) => <div {...props} className={cn(s.root, className)} />);
