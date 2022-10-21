import React, { memo, useState } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import s from './ResultScreen.module.scss';
import { CascaderValueType, SortFilter } from './SortFilter';
import { ResultsLimit } from './ResultsLimit';
import { TrainCard } from './TrainCard';
import { PaginationOrigin } from '../PaginationOrigin';
import {AppDispatch, RootState} from '../../../store';
import ZeroFound from '../../ZeroFound/ZeroFound';
import { ISortOptions } from '../../../interfaces/Interfaces';
import { searchParamsLimitSet, searchParamsOffsetSet, searchParamsSortSet } from '../../../reducers/searchParams';

export type Props = {
  className?: string;
};

export const sortOptions: ISortOptions = [
  {
    value: 'date',
    label: 'времени',
  },
  {
    value: 'price_min',
    label: 'стоимости',
  },
  {
    value: 'duration',
    label: 'длительности',
  },
];

export const ResultScreen = memo<Props>(({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSelector((store: RootState) => store.searchParams);
  const { limit, sort, offset } = searchParams;

  const totalCount = useSelector((store: RootState) => store.getRoute.data.totalCount);
  const trainsList = useSelector((store: RootState) => store.getRoute.data.items);

  const [activeSort, setActiveSort] = useState<CascaderValueType>([sort]);
  const [currentPage, setCurrentPage] = useState(offset / limit + 1);

  const onClickLimit = (el: number) => {
    dispatch(searchParamsLimitSet(el));
    dispatch(searchParamsOffsetSet(0));
  };

  const onChangeSort = (value: CascaderValueType) => {
    setActiveSort(value);
    const valueStr = `${value}`;
    dispatch(searchParamsSortSet(valueStr));
    dispatch(searchParamsOffsetSet(0));
  };

  const onChangePage = (value: number) => {
    setCurrentPage(value);
    dispatch(searchParamsOffsetSet(value * limit - limit));
  };

  return (
    <section className={cn(s.root, className)}>
      <div className={s.header}>
        <div>найдено&nbsp;{totalCount}</div>
        <div>
          сортировать по:
          <SortFilter onChange={onChangeSort} active={activeSort} options={sortOptions} />
        </div>
        <div>
          показывать по:&nbsp;
          <ResultsLimit variants={[5, 10, 20]} active={limit} onClick={onClickLimit} />
        </div>
      </div>
      {totalCount !== 0 && (
        <>
          <div className={s.trainList}>
            {trainsList.map((trainsPair) => {
              // eslint-disable-next-line no-underscore-dangle
              const key = trainsPair[0].departure.train._id;
              return <TrainCard trains={trainsPair} key={key} place="select" />;
            })}
          </div>
          <div className={s.pagination}>
            <PaginationOrigin
              data={{ current: currentPage, total: totalCount, pageSize: limit, onChange: onChangePage }}
            />
          </div>
        </>
      )}
      {!totalCount && <ZeroFound />}
    </section>
  );
});
