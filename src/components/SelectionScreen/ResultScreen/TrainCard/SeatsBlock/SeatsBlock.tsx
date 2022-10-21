/* eslint-disable camelcase */

import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import s from './SeatsBlock.module.scss';
import { SeatsBlockRow } from './SeatBlockRow';
import { ServiceBlock } from '../../../ServicesBlock';
import { ITrain } from '../../../../../interfaces/Interfaces';
import {
  appStateResetTrainOutbound,
  appStateSetProgress,
  appStateSetTrainOutbound,
} from '../../../../../reducers/appState';
import { orderReset } from '../../../../../reducers/order';
import { AppDispatch } from '../../../../../store';

export type Props = {
  className?: string;
  train: ITrain;
  place: 'select' | 'summary';
};

const carriageType = {
  class4: 'Сидячий',
  class3: 'Плацкарт',
  class2: 'Купе',
  class1: 'Люкс',
};

export const SeatsBlock = memo<Props>(({ className, train, place }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    departure: {
      have_wifi,
      have_air_conditioning,
      is_express,
      have_fourth_class: class4,
      have_third_class: class3,
      have_second_class: class2,
      have_first_class: class1,
      available_seats_info: { fourth: count4, third: count3, second: count2, first: count1 },
      price_info: { fourth: price4, third: price3, second: price2, first: price1 },
    },
  }: ITrain = train;

  const selectTrain = (payload: ITrain) => {
    dispatch(appStateSetTrainOutbound(payload));
  };

  return (
    <div className={cn(s.root, className)}>
      <div className={s.upper_block}>
        {class4 && count4 && price4 && (
          <SeatsBlockRow carriageClass={carriageType.class4} ticketsAmount={count4} ticketsPrice={price4} />
        )}
        {class3 && count3 && price3 && (
          <SeatsBlockRow carriageClass={carriageType.class3} ticketsAmount={count3} ticketsPrice={price3} />
        )}
        {class2 && count2 && price2 && (
          <SeatsBlockRow carriageClass={carriageType.class2} ticketsAmount={count2} ticketsPrice={price2} />
        )}
        {class1 && count1 && price1 && (
          <SeatsBlockRow carriageClass={carriageType.class1} ticketsAmount={count1} ticketsPrice={price1} />
        )}
      </div>
      <div className={s.bottom_block}>
        <ServiceBlock services={{ have_wifi, is_express, have_air_conditioning }} className="ticketCard" />
        {place === 'select' && (
          <Button className={s.btn} onClick={() => selectTrain(train)}>
            Выбрать места
          </Button>
        )}
        {place === 'summary' && (
          <Button
            className={s.btn_summary}
            onClick={() => {
              dispatch(orderReset());
              dispatch(appStateResetTrainOutbound());
              dispatch(appStateSetProgress(0));
            }}
          >
            Изменить
          </Button>
        )}
      </div>
    </div>
  );
});
