import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import s from './ResultsLimit.module.scss';

export type Props = {
  className?: string;
  variants: number[];
  active: number;
  onClick: (arg0: number) => void;
};

export const ResultsLimit = memo<Props>(({ className, variants, active, onClick }) => (
  <div className={cn(s.root, className)}>
    {variants.map((el) => (
      <Button
        type="text"
        className={cn(s.btn, el === active ? s.active : '')}
        key={el}
        size="small"
        onClick={() => onClick(el)}
      >
        {el}
      </Button>
    ))}
  </div>
));
