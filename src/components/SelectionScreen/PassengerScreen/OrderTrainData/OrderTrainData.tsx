/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

import React, { memo, ReactElement, useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'clsx';
import { Collapse } from 'antd';

import { ReactComponent as Plus } from '../../../../svg/icon_dest_plus.svg';
import { ReactComponent as Minus } from '../../../../svg/icon_dest_minus.svg';

import s from './OrderTrainData.module.scss';
import './rewrite.css';
import { RootState } from '../../../../store';
import { secToDate, secToDateTime } from '../../../../utils/secToDateTime';
import { iconsCollection } from '../../../../collections/collections';
import { capitalize } from '../../../../utils/capitalize';

const { Panel } = Collapse;

export type Props = {
  className?: string;
  icon: ReactElement;
  type: 'outbound' | 'return';
};

export type MindedParams = {
  outbound: {
    title: 'Туда';
  };
  return: {
    title: 'Обратно';
  };
};

export const OrderTrainData = memo<Props>(({ className, icon, type }) => {
  const forward = useRef(null);
  const trainID = useSelector((store: RootState) => store.order.departure.route_direction_id);
  const trains = useSelector((store: RootState) => store.getRoute.data.items);

  const text: MindedParams = {
    outbound: {
      title: 'Туда',
    },
    return: {
      title: 'Обратно',
    },
  };

  const train =
    type === 'outbound'
      ? trains.filter((el) => el[0].departure._id === Number(trainID))[0][0].departure
      : trains.filter((el) => el[0].departure._id === Number(trainID))[0][1].departure;
  const {
    from: { datetime: departureDate },
    to: { datetime: arrivalDate },
    train: { _id: trainId, name: trainName },
  } = train;
  const pointA = capitalize(train.from.city.name);
  const pointB = capitalize(train.to.city.name);
  const stationA = capitalize(train.from.railway_station_name);
  const stationB = capitalize(train.to.railway_station_name);
  const duration = secToDateTime(train.duration);
  const timeA = secToDateTime(train.from.datetime);
  const timeB = secToDateTime(train.to.datetime);

  return (
    <div className={cn(s.root, className)}>
      <Collapse ghost expandIconPosition="right" expandIcon={({ isActive }) => (isActive ? <Minus /> : <Plus />)}>
        <Panel
          header={
            <div className={s.header}>
              <div className={s.icon}>{icon}</div>
              <div className={s.sideSelection__title}>
                {text[type].title} <span className={s.sideSelection__timestamp}>{secToDate(departureDate)}</span>
              </div>
            </div>
          }
          key={1}
        >
          <div className={s.timePickerPanel} ref={forward}>
            <div className={cn(s.timePickerSubTitle, s.trainIdTitle)}>№ Поезда</div>
            <div className={cn(s.timePickerSubTitle, s.trainIdNumber)}>{trainId}</div>
            <div className={cn(s.timePickerSubTitle, s.trainNameTitle)}>Название</div>
            <div className={cn(s.timePickerSubTitle, s.trainName)}>{trainName}</div>
            <div className={cn(s.timePickerSubTitle, s.duration)}>{duration}</div>
            <div className={cn(s.timePickerSubTitle, s.departureDateTime)}>{timeA}</div>
            <div className={cn(s.timePickerSubTitle, s.direction)}>
              {type === 'outbound' ? iconsCollection.arrowRY : iconsCollection.arrowLY}
            </div>
            <div className={cn(s.timePickerSubTitle, s.arrivalDateTime)}>{timeB}</div>
            <div className={cn(s.timePickerSubTitle, s.departureDate, s.subText)}>{secToDate(departureDate)}</div>
            <div className={cn(s.timePickerSubTitle, s.arrivalDate, s.subText)}>{secToDate(arrivalDate)}</div>
            <div className={cn(s.timePickerSubTitle, s.departureCity)}>{pointA}</div>
            <div className={cn(s.timePickerSubTitle, s.departureStation, s.subText)}>{stationA}</div>
            <div className={cn(s.timePickerSubTitle, s.arrivalCity)}>{pointB}</div>
            <div className={cn(s.timePickerSubTitle, s.arrivalStation, s.subText)}>{stationB}</div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
});
