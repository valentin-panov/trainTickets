import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import s from './DestinationPicker.module.scss';
import { ReactComponent as SwapBtn } from '../../../svg/swapBtn.svg';

import { DestinationPickerUnit, Point } from './DestinationPickerUnit';
import {AppDispatch, RootState} from '../../../store';
import { ICity } from '../../../interfaces/Interfaces';
import { searchParamsCityArrivalSet, searchParamsCityDepartureSet } from '../../../reducers/searchParams';

export type Props = {
  className?: string;
};

export const DestinationPicker = memo<Props>(({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const departureStore = useSelector((store: RootState) => store.searchParams.cityDeparture);
  const arrivalStore = useSelector((store: RootState) => store.searchParams.cityArrival);

  const selectPoint = (value: ICity, point: Point) => {
    if (point === 'departure') {
      dispatch(searchParamsCityDepartureSet(value));
    } else {
      dispatch(searchParamsCityArrivalSet(value));
    }
  };

  const swapPoints = () => {
    dispatch(searchParamsCityArrivalSet(departureStore));
    dispatch(searchParamsCityDepartureSet(arrivalStore));
  };

  const unitDeparture = (
    <DestinationPickerUnit point="departure" defaultValue={departureStore.value} onSelect={selectPoint} />
  );
  const unitArrival = (
    <DestinationPickerUnit point="arrival" defaultValue={arrivalStore.value} onSelect={selectPoint} />
  );

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Направление</span>
      <div className={s.input_holder}>
        {unitDeparture}
        <Button shape="circle" className={s.geoIcon} onClick={swapPoints}>
          <SwapBtn />
        </Button>
        {unitArrival}
      </div>
    </div>
  );
});
