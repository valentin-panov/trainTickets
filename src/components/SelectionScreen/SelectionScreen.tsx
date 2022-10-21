import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import s from './SelectionScreen.module.scss';
import { SelectionFilterItem } from './SelectionFilterItem';
import { SelectionFilterPrice } from './SelectionFilterPrice';
import { SelectionFilterTime } from './SelectionFilterTime';
import { LastTickets } from './LastTickets';
import { iconsCollection } from '../../collections/collections';
import { ResultScreen } from './ResultScreen';
import { Progress } from './Progress';
import { Loading } from '../Loading';
import { AppDispatch, RootState } from '../../store';
import Error404 from '../Error404/Error404';
import { DatePickerOrigin } from '../Pickers/DatePickerOrigin';
import { getPriceRange } from '../../utils/getPriceRange';
import { searchParamsFiltersSet } from '../../reducers/searchParams';
import { TicketSelectionScreen } from './TicketSelectionScreen';
import { OrderSummary } from './PassengerScreen/OrderSummary';
import { OrderTitle } from './PassengerScreen/OrderTitle';
import { OrderPassengers } from './PassengerScreen/OrderPassengers';
import { OrderTrainData } from './PassengerScreen/OrderTrainData';
import { PassengerCards } from './PassengerScreen/PassengerCards';
import { PersonalData } from './PersonalData';
import { SummaryScreen } from './SummaryScreen';

export type Props = {
  className?: string;
};

export const SelectionScreen = memo<Props>(({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((store: RootState) => store.getRoute.status);
  const trainsList = useSelector((store: RootState) => store.getRoute.data.items);
  const filters = useSelector((store: RootState) => store.searchParams.filters);
  const selectedTrain = useSelector((store: RootState) => store.appState.trainOutbound);
  const progress = useSelector((store: RootState) => store.appState.progress);

  const stubRange = { min: 0, max: 10000 };

  const changeFilter = (filter: string, state: boolean) => {
    dispatch(searchParamsFiltersSet({ [filter]: state }));
  };

  const priceRange: {
    minPrice?: number;
    maxPrice?: number;
  } = useMemo(() => {
    switch (true) {
      case !!trainsList.length:
        return getPriceRange(trainsList);
      case !!filters.price_from && !!filters.price_to:
        return {
          minPrice: filters.price_from,
          maxPrice: filters.price_to,
        };
      default:
        return {
          minPrice: stubRange.min,
          maxPrice: stubRange.max,
        };
    }
  }, [filters.price_from, filters.price_to, trainsList, stubRange.min, stubRange.max]);

  return (
    <div className={cn(s.root, className)}>
      {status === 'idle' && <Error404 />}
      {/* {status === 'error' && <TicketSelectionScreen />} */}
      {status === 'error' && <Error404 />}
      {status === 'pending' && <Loading />}
      {status === 'success' && (
        <>
          <Progress />
          <div className={s.mainRow}>
            {progress === 0 && (
              <>
                <div>
                  <section className={s.sideSelection}>
                    <DatePickerOrigin pickerPlace="asidePicker" />
                    <div className={s.divider} />
                    <ul className={s.filterList}>
                      <SelectionFilterItem
                        onChange={changeFilter}
                        filter="have_second_class"
                        checked={filters.have_second_class}
                      />
                      <SelectionFilterItem
                        onChange={changeFilter}
                        filter="have_third_class"
                        checked={filters.have_third_class}
                      />
                      <SelectionFilterItem
                        onChange={changeFilter}
                        filter="have_fourth_class"
                        checked={filters.have_fourth_class}
                      />
                      <SelectionFilterItem
                        onChange={changeFilter}
                        filter="have_first_class"
                        checked={filters.have_first_class}
                      />
                      <SelectionFilterItem onChange={changeFilter} filter="have_wifi" checked={filters.have_wifi} />
                      <SelectionFilterItem onChange={changeFilter} filter="is_express" checked={filters.is_express} />
                    </ul>
                    <div className={s.divider} />
                    <div className={s.sideSelection__title}>Стоимость</div>
                    <div className={s.pricePickerLabels}>
                      <span>от</span>
                      <span>до</span>
                    </div>
                    <SelectionFilterPrice
                      initialRange={[priceRange.minPrice || stubRange.min, priceRange.maxPrice || stubRange.max]}
                      stubRange={stubRange}
                    />
                    <div className={s.divider} />
                    <SelectionFilterTime icon={iconsCollection.forward} type="outbound" />
                    <div className={s.divider} />
                    <SelectionFilterTime icon={iconsCollection.backward} type="return" />
                  </section>
                  <LastTickets />
                </div>
                <div>
                  {!selectedTrain && <ResultScreen />}
                  {selectedTrain && <TicketSelectionScreen />}
                </div>
              </>
            )}
            {progress >= 1 && (
              <>
                <div>
                  <section className={s.sideSelection}>
                    <OrderTitle />
                    <div className={s.divider} />
                    <OrderTrainData icon={iconsCollection.forward} type="outbound" />
                    <div className={s.divider} />
                    <OrderTrainData icon={iconsCollection.backward} type="return" />
                    <div className={s.divider} />
                    <OrderPassengers />
                    <div className={s.divider} />
                    <OrderSummary />
                  </section>
                </div>
                {progress === 1 && <PassengerCards />}
                {progress === 2 && <PersonalData />}
                {progress === 3 && <SummaryScreen />}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
});
