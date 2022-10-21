import React, { memo, useRef } from 'react';
import cn from 'clsx';
import { Tooltip } from 'antd';
import s from './SeatsBlock.module.scss';
import { iconsCollection } from '../../../../../collections/collections';
import { minValue } from '../../../../../utils/minValue';

export type Props = {
  className?: string;
  carriageClass: string;
  ticketsAmount: number;
  ticketsPrice: { [key: string]: number };
};

export const SeatsBlockRow = memo<Props>(({ className, carriageClass, ticketsAmount, ticketsPrice }) => {
  const row = useRef(null);

  const lowPrice = minValue(ticketsPrice);

  const makeTooltipData = (data: { [key: string]: number }) => {
    const arr = Object.entries(data);
    const newArr: [string, number][] = [];
    arr.forEach((el) => {
      switch (el[0]) {
        case 'top_price':
          newArr.push(['верхние', el[1]]);
          break;
        case 'bottom_price':
          newArr.push(['нижние', el[1]]);
          break;
        case 'side_price':
          newArr.push(['боковые', el[1]]);
          break;
        case 'price':
          newArr.push(['СВ', el[1]]);
          break;
        default:
          break;
      }
    });
    return newArr;
  };

  const pricesArray = makeTooltipData(ticketsPrice);

  const tooltip = (
    <div className={s.tooltip__container}>
      {pricesArray.map((el) => (
        <div className={s.tooltip__row} key={el[0]}>
          <div className={s.tooltip__txt}>{el[0]}</div>
          <div className={s.tooltip__price}>{el[1]}</div>
          <div className={s.tooltip__rub}>{iconsCollection.rub}</div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {(carriageClass === 'Люкс' || carriageClass === 'Сидячий') && (
        <div className={cn(s.row, className)} ref={row}>
          <div className={s.carriageClass}>{carriageClass}</div>
          <div className={s.ticketsAmount}>{ticketsAmount}</div>
          <div className={s.ticketsPrice}>
            <span>от&nbsp;</span>
            {lowPrice}
          </div>
          <div className={s.moneySymbol}>{iconsCollection.rub}</div>
        </div>
      )}
      {carriageClass !== 'Люкс' && carriageClass !== 'Сидячий' && (
        <Tooltip
          placement="bottom"
          title={tooltip}
          mouseEnterDelay={0.3}
          mouseLeaveDelay={0.3}
          trigger="hover"
          getPopupContainer={() => row.current as unknown as HTMLElement}
          overlayClassName={s.tooltip}
          destroyTooltipOnHide
        >
          <div className={cn(s.row, className)} ref={row}>
            <div className={s.carriageClass}>{carriageClass}</div>
            <div className={s.ticketsAmount}>{ticketsAmount}</div>
            <div className={s.ticketsPrice}>
              <span>от&nbsp;</span>
              {lowPrice}
            </div>
            <div className={s.moneySymbol}>{iconsCollection.rub}</div>
          </div>
        </Tooltip>
      )}
    </>
  );
});
