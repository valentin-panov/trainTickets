import React, { memo, useRef } from 'react';
import cn from 'clsx';
import { Collapse } from 'antd';
import { useSelector } from 'react-redux';
import s from './OrderPassengers.module.scss';
import { RootState } from '../../../../store';
import { ReactComponent as Minus } from '../../../../svg/icon_dest_minus.svg';
import { ReactComponent as Plus } from '../../../../svg/icon_dest_plus.svg';
import { iconsCollection } from '../../../../collections/collections';
import { IOrderSeat } from '../../../../interfaces/Interfaces';
import { getBeautifulNumber } from '../../../../utils/getBeatifulNumber';

const { Panel } = Collapse;

export type Props = {
  className?: string;
};

type Accumulator = { child: number; adult: number; adultCost: number; childCost: number; toddler: number };

export const OrderPassengers = memo<Props>(({ className }) => {
  const forward = useRef(null);
  const {
    departure: { seats },
  } = useSelector((store: RootState) => store.order);

  const ticketTypes = seats.reduce(
    (acc: Accumulator, el: IOrderSeat): Accumulator => {
      if (el.is_child) {
        return { ...acc, child: acc.child + 1, childCost: acc.childCost + Number(el.price) };
      }
      if (!el.is_child && el.include_children_seat) {
        return { ...acc, toddler: acc.toddler + 1 };
      }
      return { ...acc, adult: acc.adult + 1, adultCost: acc.adultCost + Number(el.price) };
    },
    { adult: 0, child: 0, adultCost: 0, childCost: 0, toddler: 0 }
  );

  return (
    <div className={cn(s.root, className)}>
      <Collapse ghost expandIconPosition="right" expandIcon={({ isActive }) => (isActive ? <Minus /> : <Plus />)}>
        <Panel
          header={
            <div className={s.header}>
              <div className={s.icon}>{iconsCollection.passenger}</div>
              <div className={s.sideSelection__title}>Пассажиры</div>
            </div>
          }
          key={1}
        >
          <div className={s.timePickerPanel} ref={forward}>
            {ticketTypes.adult > 0 && (
              <div className={cn(s.timePickerSubTitle)}>
                <div className={s.title}>Взрослых:</div>
                <div className={s.amount}>{ticketTypes.adult}</div>
                <div className={s.price}>{getBeautifulNumber(ticketTypes.adultCost)}</div>
                <div className={s.currency}>{iconsCollection.rub}</div>
              </div>
            )}
            {ticketTypes.child > 0 && (
              <div className={cn(s.timePickerSubTitle)}>
                <div className={s.title}>Детей:</div>
                <div className={s.amount}>{ticketTypes.child}</div>
                <div className={s.price}>{getBeautifulNumber(ticketTypes.childCost)}</div>
                <div className={s.currency}>{iconsCollection.rub}</div>
              </div>
            )}
            {ticketTypes.toddler > 0 && (
              <div className={cn(s.timePickerSubTitle)}>
                <div className={s.title}>Младенцев:</div>
                <div className={s.amount}>{ticketTypes.toddler}</div>
                <div className={s.price} />
                <div className={s.currency} />
              </div>
            )}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
});
