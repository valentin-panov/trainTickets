import React, { memo, useEffect } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import s from './LastTickets.module.scss';
import { LastTicketCard } from './LastTicketCard';
import {AppDispatch, RootState} from '../../../store';
import { lastTicketsFetchData } from '../../../reducers/lastTickets';

export type Props = {
  className?: string;
};

export const LastTickets = memo<Props>(({ className }) => {
  const status = useSelector((store: RootState) => store.lastTickets.status);
  const items = useSelector((store: RootState) => store.lastTickets.items);

  const dispatch = useDispatch<AppDispatch>();
  const cardsToShowCount = 3;

  useEffect(() => {
    dispatch(lastTicketsFetchData());
  }, [dispatch]);

  return (
    <section className={cn(s.root, className)}>
      {status === 'success' && (
        <>
          <div className={s.lastTicketsTitle}>последние билеты</div>
          {items.slice(0, cardsToShowCount).map((el) => (
            // eslint-disable-next-line no-underscore-dangle
            <LastTicketCard train={el} key={el.departure._id} />
          ))}
        </>
      )}
    </section>
  );
});
