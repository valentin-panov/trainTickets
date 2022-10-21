import React, { memo } from 'react';
import cn from 'clsx';
import { Alert } from 'antd';
import s from './Error.module.scss';

export type Props = {
  className?: string;
  message: string;
};

export const Error = memo<Props>(({ className, message }) => (
  <div className={cn(s.root, className)}>
    <Alert message={`${message}`} type="error" showIcon />
  </div>
));
