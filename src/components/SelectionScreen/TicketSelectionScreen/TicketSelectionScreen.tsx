import React, { memo, useEffect, useRef } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import s from './TicketSelectionScreen.module.scss';
import { AppDispatch, RootState } from '../../../store';
import { SeatsCard } from './SeatsCard';
import { trainSeatsFetchData } from '../../../reducers/getSeats';
import { appStateSetProgress } from '../../../reducers/appState';
import { orderAddRoute, orderAddSeat } from '../../../reducers/order';

export type Props = {
  className?: string;
};

export const TicketSelectionScreen = memo<Props>(({ className }) => {
  const title = useRef<HTMLDivElement>(document.createElement('div'));
  const dispatch = useDispatch<AppDispatch>();
  const selectedTrain = useSelector((store: RootState) => store.appState.trainOutbound);
  const selectedTrainReturn = useSelector((store: RootState) => store.appState.trainReturn);
  const selectedSeats = useSelector((store: RootState) => store.selectedSeats);
  // const orderSeats = useSelector((store: RootState) => store.order.departure.seats);

  // eslint-disable-next-line no-underscore-dangle
  const trainId = selectedTrain ? selectedTrain.departure._id : 0;
  if (trainId !== 0) {
    dispatch(trainSeatsFetchData(trainId));
  }

  useEffect(() => {
    title.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className={cn(s.root, className)}>
      <h2 className={s.title} ref={title}>
        Выбор мест
      </h2>
      {selectedTrain && <SeatsCard type="outbound" data={selectedTrain} />}
      {selectedTrain && selectedTrainReturn && <SeatsCard type="return" data={selectedTrainReturn} />}
      <Button
        className={s.btn}
        disabled={selectedSeats.length === 0}
        onClick={() => {
          dispatch(orderAddRoute(`${trainId}`));
          selectedSeats.forEach((el) => dispatch(orderAddSeat(el)));
          dispatch(appStateSetProgress(1));
        }}
      >
        ДАЛЕЕ
      </Button>
    </div>
  );
});
