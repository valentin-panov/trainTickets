import React, { memo, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Collapse } from 'antd';
import s from './PassengerCards.module.scss';
import {AppDispatch, RootState} from '../../../../store';
import { PassengerCard } from './PassengerCard';
import { ReactComponent as Minus } from '../../../../svg/passCardMinus.svg';
import { ReactComponent as Plus } from '../../../../svg/passCardPlus.svg';
import './reant.css';
import { IOrderSeat } from '../../../../interfaces/Interfaces';
import { orderSetSeats } from '../../../../reducers/order';
import { appStateSetProgress } from '../../../../reducers/appState';

const { Panel } = Collapse;

export type Props = {
  className?: string;
};

export const PassengerCards = memo<Props>(({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector((store: RootState) => store.order);
  const title = useRef<HTMLDivElement>(document.createElement('div'));
  const [activeKey, setActiveKey] = useState<string>('0');
  const [newOrder, setNewOrder] = useState<IOrderSeat[]>([]);

  const nextPassengerHandler = (data: IOrderSeat, nextKey: string) => {
    setActiveKey(nextKey);
    if (newOrder.length < Number(nextKey)) {
      setNewOrder([...newOrder, data]);
    } else {
      const temp = [...newOrder];
      temp.splice(Number(nextKey) - 1, 1, data);
      setNewOrder(temp);
    }
  };

  useEffect(() => {
    title.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className={cn(s.root, className, 'PassengerCard')} ref={title}>
      <Collapse
        accordion
        activeKey={activeKey}
        ghost
        destroyInactivePanel={false}
        expandIconPosition="left"
        expandIcon={({ isActive }) => (isActive ? <Minus /> : <Plus />)}
      >
        {order.departure.seats.map((el, index) => (
          <Panel
            key={`key${el.coach_id}${el.seat_number}`}
            className={s.panel}
            header={
              <button
                type="button"
                onClick={() => {
                  setActiveKey(index.toString());
                }}
                className={s.title}
              >
                Пассажир {index + 1}
              </button>
            }
          >
            <PassengerCard element={el} activeKey={activeKey} nextPassengerHandler={nextPassengerHandler} />
          </Panel>
        ))}
      </Collapse>
      <Button
        className={s.btn}
        disabled={newOrder.length !== order.departure.seats.length}
        onClick={() => {
          dispatch(orderSetSeats(newOrder));
          dispatch(appStateSetProgress(2));
        }}
      >
        ДАЛЕЕ
      </Button>
    </div>
  );
});
