import * as React from 'react';
import { HTMLAttributes, memo } from 'react';
import cn from 'clsx';
import s from './CarraigeScheme.module.scss';
import first from './img/1.png';
import second from './img/2.png';
import third from './img/3.png';
import fourth from './img/4.png';
import { ICoach } from '../../../../../interfaces/Interfaces';
import './seatsGridAreas.css';
import { SelectedSeatsArray } from '../SeatsCard';

export type SelectSeatsArgs = {
  coachId: number;
  seatId: number;
  price: number;
};

export type Props = HTMLAttributes<HTMLElement> & {
  children?: never;
  activeCarriage: ICoach;
  selectedSeats: SelectedSeatsArray;
  selectSeats: (args: SelectSeatsArgs) => void;
};

type Schemas = { [key: string]: string };

const schemas: Schemas = {
  first,
  second,
  third,
  fourth,
};

export const CarriageScheme = memo<Props>(({ activeCarriage, selectSeats, selectedSeats }) => {
  const {
    seats,
    coach: { class_type: carriageType, _id: coachId },
  } = activeCarriage;

  const selected = selectedSeats.filter((el) => el.coachId === coachId).map((el) => el.seatId);

  const onSeatSelect = (idx: number) => {
    let price: number | undefined;
    if (carriageType === 'first') {
      price = activeCarriage.coach.price; // данные в запросах по разным ручкам различаются
    }
    if (carriageType === 'fourth') {
      price = activeCarriage.coach.top_price; // сервер отдаёт top_price, не price
    }
    if (carriageType === 'second') {
      price = idx % 2 ? activeCarriage.coach.bottom_price : activeCarriage.coach.top_price;
    }
    if (carriageType === 'third') {
      if (idx < 33) {
        price = idx % 2 ? activeCarriage.coach.bottom_price : activeCarriage.coach.top_price;
      }
      if (idx >= 33) {
        price = activeCarriage.coach.side_price;
      }
    }
    selectSeats({ coachId, seatId: idx, price: price || 0 });
  };

  return (
    <div className={s.root}>
      <img src={schemas[carriageType]} className={cn(s.schemeImg)} alt="carriage scheme" />
      <div className={s.schemeLayout}>
        <div className={s.carriageNumber}>{coachId}</div>
        <div className={s.scheme}>
          <div className={s[carriageType]}>
            {seats.map((seat) => (
              <button
                type="button"
                key={seat.index}
                className={cn(s.seat, `seat${seat.index}`, selected.some((el) => el === seat.index) ? s.selected : '')}
                disabled={!seat.available}
                onClick={() => onSeatSelect(seat.index)}
              >
                {seat.index}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
