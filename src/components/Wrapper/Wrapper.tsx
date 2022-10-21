import React, { ReactElement, useEffect, useMemo } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { BehaviorSubject, of } from 'rxjs';
import s from './Wrapper.module.scss';
import { AppDispatch, RootState } from '../../store';
import { getRouteFetchData } from '../../reducers/getRoute';
import { searchParamsDateReturnSet } from '../../reducers/searchParams';
import { IFilters } from '../../interfaces/Interfaces';
import { throttling } from '../../utils/throttling';

export type Props = {
  className?: string;
  children: React.ReactNode;
};

export function Wrapper({ className, children }: Props): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSelector((store: RootState) => store.searchParams);
  const { dateOutbound, dateReturn, filters } = searchParams;
  const filters$ = useMemo(() => new BehaviorSubject<IFilters>(filters), [filters]);
  const result$ = useMemo(
    () => filters$.pipe(throttling<IFilters>(1500, (arg) => new BehaviorSubject<IFilters>(arg))),
    [filters$]
  );

  // Subscription to the input stream
  useEffect(() => {
    const subscription = result$.subscribe({
      next: () => {
        // fire update
        if (searchParams.cityDeparture.value && searchParams.cityArrival.value) {
          dispatch(getRouteFetchData(searchParams));
        }
      },
      error: (err) =>
        // handle error here
        of(err),
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result$]);

  useEffect(() => {
    if (dateReturn && dateOutbound && dateReturn < dateOutbound) {
      dispatch(searchParamsDateReturnSet(null));
      const warning = () => {
        message.warning('Нельзя вернуться раньше, чем отправиться. Выберите новую дату возвращения.').then();
      };
      warning();
    }
  }, [dateReturn, dateOutbound, dispatch]);

  useEffect(() => {
    dispatch(getRouteFetchData(searchParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.sort, searchParams.offset, searchParams.limit]);

  return <div className={cn(s.root, className)}>{children}</div>;
}

Wrapper.defaultProps = { className: '' };
