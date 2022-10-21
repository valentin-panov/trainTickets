import React, { memo } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import s from './SummaryPassengers.module.scss';
import { IOrderSeat } from '../../../../interfaces/Interfaces';
import { AppDispatch, RootState } from '../../../../store';
import { appStateSetProgress } from '../../../../reducers/appState';
import { orderReset } from '../../../../reducers/order';
import { SummaryPassengerCard } from './SummaryPassengerCard';
import { getBeautifulNumber } from '../../../../utils/getBeatifulNumber';
import { iconsCollection } from '../../../../collections/collections';

export const SummaryPassengers = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const seats = useSelector((store: RootState) => store.order.departure.seats);
  const selectedSeats = useSelector((store: RootState) => store.selectedSeats);
  const orderSummary = selectedSeats.reduce((sum, el): number => sum + Number(el.price), 0);

  const onClick = () => {
    dispatch(orderReset());
    dispatch(appStateSetProgress(0));
  };

  return (
    <div className={s.root}>
      <div className={s.cardsContainer}>
        {seats.map((el: IOrderSeat) => (
          <SummaryPassengerCard element={el} />
        ))}
      </div>
      <div className={s.buttonContainer}>
        <div className={s.summary}>
          <div className={s.title}>Всего</div>
          <div className={s.amount}>{getBeautifulNumber(orderSummary)}</div>
          <div className={s.currency}>{iconsCollection.rub}</div>
        </div>
        <Button className={s.btn} onClick={onClick}>
          Изменить
        </Button>
      </div>
    </div>
  );
});
