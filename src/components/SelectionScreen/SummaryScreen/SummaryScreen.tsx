import React, { memo, useEffect } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './SummaryScreen.module.scss';
import { TrainCard } from '../ResultScreen/TrainCard';
import {AppDispatch, RootState} from '../../../store';
import { SummaryPassengers } from './SummaryPassengers';
import { SummaryPayment } from './SummaryPayment';
import { asyncPostOrder } from '../../../reducers/order';

export const SummaryScreen = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useNavigate();
  const trainsList = useSelector((store: RootState) => store.getRoute.data.items);
  const order = useSelector((store: RootState) => store.order);
  // eslint-disable-next-line no-underscore-dangle
  const train = trainsList.filter((el) => el[0].departure._id === Number(order.departure.route_direction_id));

  const onFinish = () => {
    dispatch(asyncPostOrder(order));
  };

  useEffect(() => {
    if (order.status === 'success') {
      history('/success');
    }
  }, [history, order]);

  return (
    <div className={s.root}>
      <div className={s.card}>
        <div className={cn(s.row_subheading, s.row_padding)}>Поезд</div>
        <div className={s.row_trainCard}>
          <TrainCard trains={train[0]} place="summary" />
        </div>
      </div>
      <div className={s.card}>
        <div className={cn(s.row_subheading, s.row_padding)}>Пассажиры</div>
        <div>
          <SummaryPassengers />
        </div>
      </div>
      <div className={s.card}>
        <div className={cn(s.row_subheading, s.row_padding)}>Способ оплаты</div>
        <div>
          <SummaryPayment />
        </div>
      </div>
      <Button className={s.btn} onClick={onFinish}>
        Подтвердить
      </Button>
    </div>
  );
});
