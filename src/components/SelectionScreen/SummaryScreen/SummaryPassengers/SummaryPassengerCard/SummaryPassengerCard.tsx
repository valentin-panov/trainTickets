import React, { memo } from 'react';
import s from './SummaryPassangerCard.module.scss';
import { IOrderSeat } from '../../../../../interfaces/Interfaces';
import { iconsCollection } from '../../../../../collections/collections';
import { YYYYMMDD2DDMMYYYY } from '../../../../../utils/secToDateTime';

export type Props = {
  className?: string;
  element: IOrderSeat;
};

export const SummaryPassengerCard = memo<Props>(({ element }) => {
  if (!element.person_info) {
    return null;
  }
  const {
    first_name: firstName,
    last_name: lastName,
    patronymic: middleName,
    gender,
    birthday,
    document_type: docType,
    document_data: docData,
  } = element.person_info;
  const isChild = element.is_child;
  const isTodder = element.include_children_seat;

  return (
    <div className={s.root}>
      <div className={s.iconArea}>
        <div className={s.iconArea_icon}>{iconsCollection.bigPassenger}</div>
        <div className={s.iconArea_text}>
          {(isChild || isTodder) && 'Детский'}
          {!isChild && !isTodder && 'Взрослый'}
        </div>
      </div>
      <div className={s.person}>
        <div>{lastName}</div>
        <div>{firstName}</div>
        <div>{middleName}</div>
      </div>
      <div className={s.gender}>
        <div>Пол</div>
        <div>{gender ? 'мужской' : 'женский'}</div>
      </div>
      <div className={s.birthdate}>
        <div>Дата рождения</div>
        <div>{YYYYMMDD2DDMMYYYY(birthday)}</div>
      </div>
      <div className={s.docData}>
        <div>{docType}</div>
        <div>{docData}</div>
      </div>
    </div>
  );
});
