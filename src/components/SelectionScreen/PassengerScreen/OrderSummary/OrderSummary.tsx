import React, { memo } from 'react';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import s from './OrderSummary.module.scss';
import { RootState } from '../../../../store';
import { iconsCollection } from '../../../../collections/collections';
import { getBeautifulNumber } from '../../../../utils/getBeatifulNumber';

export type Props = {
  className?: string;
};

export const OrderSummary = memo<Props>(({ className }) => {
  const selectedSeats = useSelector((store: RootState) => store.selectedSeats);
  const orderSummary = selectedSeats.reduce((sum, el): number => sum + Number(el.price), 0);
  return (
    <div className={cn(s.root, className)}>
      <div className={s.title}>Итого</div>
      <div className={s.amount}>{getBeautifulNumber(orderSummary)}</div>
      <div className={s.currency}>{iconsCollection.rub}</div>
    </div>
  );
});
