import * as React from 'react';
import { HTMLAttributes, memo } from 'react';
import cn from 'clsx';
import s from './CarriageNumberButton.module.scss';

export type Props = HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: never;
  buttonNumber: number;
  toggleCarriage: (value: number) => void;
  activeCarriage: number;
};

export const CarriageNumberButton = memo<Props>(({ toggleCarriage, activeCarriage, buttonNumber }) => (
  <button
    type="button"
    className={cn(s.carriageNumber, { [s.active]: activeCarriage === buttonNumber })}
    onClick={() => toggleCarriage(buttonNumber)}
    disabled={activeCarriage === buttonNumber}
  >
    {buttonNumber}
  </button>
));
