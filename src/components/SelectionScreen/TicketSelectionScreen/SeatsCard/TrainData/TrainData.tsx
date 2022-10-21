import React, { memo } from 'react';
import s from './TrainData.module.scss';
import { iconsCollection } from '../../../../../collections/collections';

export type Props = {
  data: {
    type: 'outbound' | 'return';
    trainId: number;
    pointA: string;
    stationA: string;
    timeA: string;
    pointB: string;
    stationB: string;
    timeB: string;
    duration: {
      hours: string;
      minutes: string;
    };
  };
};

export type CarriageType = undefined | 'first' | 'second' | 'third' | 'fourth';

export const TrainData = memo<Props>(({ data }) => {
  const { type, trainId, pointA, stationA, timeA, pointB, stationB, timeB, duration } = data;
  return (
    <div className={s.trainData}>
      <div className={s.index}>
        <div className={s.icon}>{iconsCollection.trainSmall}</div>

        <div className={s.textIndex}>
          <div className={s.trainId}>{trainId}</div>
          <div>
            <div className={s.textContainer}>
              {pointA}&nbsp;
              {iconsCollection.arrowRB}
            </div>
            <div className={s.textContainer}>{pointB}</div>
          </div>
        </div>
      </div>

      <div className={s.points}>
        <div className={s.col1}>
          <div className={s.time}>{timeA}</div>
          <div className={s.city}>{pointA}</div>
          <div className={s.station}>{stationA}</div>
        </div>
        <div className={s.col2}>{type === 'outbound' ? iconsCollection.arrowRY : iconsCollection.arrowLY}</div>
        <div className={s.col1}>
          <div className={s.time}>{timeB}</div>
          <div className={s.city}>{pointB}</div>
          <div className={s.station}>{stationB}</div>
        </div>
      </div>
      <div className={s.duration}>
        {iconsCollection.clock}
        <div className={s.durationText}>
          <div>{duration.hours}</div>
          <div>{duration.minutes}</div>
        </div>
      </div>
    </div>
  );
});
