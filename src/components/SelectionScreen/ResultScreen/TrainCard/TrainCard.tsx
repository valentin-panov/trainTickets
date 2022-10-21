import React, { memo } from 'react';
import cn from 'clsx';
import s from './TrainCard.module.scss';
import { ReactComponent as Icon } from '../../../../svg/train_icon.svg';
import { iconsCollection } from '../../../../collections/collections';
import { capitalize } from '../../../../utils/capitalize';
import { TrainRow } from './TrainRow';
import { SeatsBlock } from './SeatsBlock';
import { ITrain } from '../../../../interfaces/Interfaces';

export type Props = {
  className?: string;
  trains: ITrain[];
  place: 'select' | 'summary';
};

export const TrainCard = memo<Props>(({ className, trains, place }) => {
  const train0 = trains[0];
  // eslint-disable-next-line no-underscore-dangle
  const trainId = train0.departure.train._id;
  const trainName = train0.departure.train.name;
  const pointA = capitalize(train0.departure.from.city.name);
  const pointB = capitalize(train0.departure.to.city.name);

  const train1 = trains[1];

  return (
    <div className={cn(s.root, className)}>
      <div className={s.general}>
        <div className={s.icon}>
          <Icon />
        </div>
        <div className={s.general__txt}>
          <div className={s.trainId}>{trainId}</div>
          <div>
            <div className={s.textContainer}>
              {pointA}&nbsp;
              {iconsCollection.arrowRB}
            </div>
            <div className={s.textContainer}>{pointB}</div>
            {trainName && <div className={s.textContainer}>&laquo;{trainName}&raquo;</div>}
          </div>
        </div>
      </div>
      <div className={s.params}>
        <div className={s.params__schedule}>
          <TrainRow train={train0} direction />
          {train1 && <TrainRow train={train1} direction={false} />}
        </div>
        <div className={s.seats}>
          <SeatsBlock train={train0} place={place} />
        </div>
      </div>
    </div>
  );
});
