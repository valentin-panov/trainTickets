import React, { memo } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import s from './SummaryPayment.module.scss';
import { AppDispatch, RootState } from '../../../../store';
import { appStateSetProgress } from '../../../../reducers/appState';

export const SummaryPayment = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const paymantMethod = useSelector((store: RootState) => store.order.user?.payment_method);

  const onClick = () => {
    dispatch(appStateSetProgress(2));
  };

  return (
    <div className={s.root}>
      <div className={s.cardsContainer}>{paymantMethod === 'online' ? 'Онлайн' : 'Наличными'}</div>
      <div className={s.buttonContainer}>
        <Button className={s.btn} onClick={onClick}>
          Изменить
        </Button>
      </div>
    </div>
  );
});
