import React, { memo } from 'react';
import { secToDateTime } from 'utils/secToDateTime';
import cn from 'clsx';
import s from './TrainCard.module.scss';
import { iconsCollection } from '../../../../collections/collections';
import { capitalize } from '../../../../utils/capitalize';
import { sec2hhmm } from '../../../../utils/sec2hhmm';
import { ITrain } from '../../../../interfaces/Interfaces';

export type Props = {
  className?: string;
  train: ITrain;
  direction: boolean;
};

export const TrainRow = memo<Props>(({ className, train, direction }) => {
  // eslint-disable-next-line no-underscore-dangle
  const pointA = capitalize(train.departure.from.city.name);
  const pointB = capitalize(train.departure.to.city.name);
  const stationA = capitalize(train.departure.from.railway_station_name);
  const stationB = capitalize(train.departure.to.railway_station_name);
  const duration = sec2hhmm(train.departure.duration);
  const timeA = secToDateTime(train.departure.from.datetime);
  const timeB = secToDateTime(train.departure.to.datetime);

  return (
    <div className={cn(s.row, className)}>
      <div className={s.col1}>
        <div className={s.time}>{timeA}</div>
        <div className={s.city}>{pointA}</div>
        <div className={s.station}>{stationA}</div>
      </div>
      <div className={s.col2}>
        <div className={s.duration}>{`${duration.hh}:${duration.mm}`}</div>
        <div className={s.arrow}>{direction ? iconsCollection.arrowRY : iconsCollection.arrowLY}</div>
      </div>
      <div className={s.col1}>
        <div className={s.time}>{timeB}</div>
        <div className={s.city}>{pointB}</div>
        <div className={s.station}>{stationB}</div>
      </div>
    </div>
  );
});
