/* eslint-disable camelcase */

import React, { memo, ReactElement, useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'clsx';
import { Collapse } from 'antd';

import { ReactComponent as Plus } from '../../../svg/icon_dest_plus.svg';
import { ReactComponent as Minus } from '../../../svg/icon_dest_minus.svg';

import s from './SelectionFilterTime.module.scss';
import './rewrite.css';
import { SelectionFilterTimeOrigin } from './SelectionFilterTimeOrigin';
import { RootState } from '../../../store';

const { Panel } = Collapse;

export type Props = {
  className?: string;
  icon: ReactElement;
  type: 'outbound' | 'return';
};

export type MindedParams = {
  outbound: {
    title: 'Туда';
    first: 'start_departure';
    second: 'start_arrival';
    firstRange: [number, number];
    secondRange: [number, number];
  };
  return: {
    title: 'Обратно';
    first: 'end_departure';
    second: 'end_arrival';
    firstRange: [number, number];
    secondRange: [number, number];
  };
};

export const SelectionFilterTime = memo<Props>(({ className, icon, type }) => {
  const forward = useRef(null);
  const filters = useSelector((store: RootState) => store.searchParams.filters);

  const min = 0;
  const max = 1440;
  const {
    start_departure_hour_from = min,
    start_departure_hour_to = max,
    start_arrival_hour_from = min,
    start_arrival_hour_to = max,
    end_departure_hour_from = min,
    end_departure_hour_to = max,
    end_arrival_hour_from = min,
    end_arrival_hour_to = max,
  } = filters;

  const text: MindedParams = {
    outbound: {
      title: 'Туда',
      first: 'start_departure',
      second: 'start_arrival',
      firstRange: [start_departure_hour_from, start_departure_hour_to],
      secondRange: [start_arrival_hour_from, start_arrival_hour_to],
    },
    return: {
      title: 'Обратно',
      first: 'end_departure',
      second: 'end_arrival',
      firstRange: [end_departure_hour_from, end_departure_hour_to],
      secondRange: [end_arrival_hour_from, end_arrival_hour_to],
    },
  };
  // TODO pluck ranges from store
  // Здесь можно было бы, по аналогии с тем, как я вытаскиваю диапазон цен, получить диапазон доступных
  // временных интервалов, однако сервер отдаёт слишком мало вариантов, чтобы строить диапазоны

  return (
    <div className={cn(s.root, className)}>
      <Collapse ghost expandIconPosition="right" expandIcon={({ isActive }) => (isActive ? <Minus /> : <Plus />)}>
        <Panel
          header={
            <div className={s.header}>
              <div className={s.icon}>{icon}</div>
              <div className={s.sideSelection__title}>{text[type].title}</div>
            </div>
          }
          key={1}
        >
          <div className={s.timePickerPanel} ref={forward}>
            <div className={cn(s.timePickerSubTitle, s.firstST)}>Время отбытия</div>
            <SelectionFilterTimeOrigin initialRange={text[type].firstRange} type={text[type].first} />
            <div className={cn(s.timePickerSubTitle, s.secondST)}>Время прибытия</div>
            <SelectionFilterTimeOrigin initialRange={text[type].secondRange} type={text[type].second} />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
});
