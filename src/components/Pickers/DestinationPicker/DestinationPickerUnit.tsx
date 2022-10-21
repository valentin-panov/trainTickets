import { AutoComplete, Input } from 'antd';
import React, { memo, useMemo, useState } from 'react';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoadingOutlined } from '@ant-design/icons';
import s from './DestinationPicker.module.scss';
import './reant.css';
import { ReactComponent as GeoMark } from '../../../svg/icon_geo.svg';
import { ICity } from '../../../interfaces/Interfaces';
import { autocomplete, fetch$, ResponseOptions } from '../../../utils/throttlingInput';

export type Props = {
  className?: string;
  defaultValue: string;
  point: Point;
  onSelect: (value: ICity, point: Point) => void;
};

export type Point = 'departure' | 'arrival';

export const DestinationPickerUnit = memo<Props>(({ className, defaultValue, onSelect, point }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<ICity[]>([]);
  const [value, setValue] = useState<string>(defaultValue);
  const term$ = useMemo(() => new BehaviorSubject<string>(defaultValue), [defaultValue]);
  const results$ = useMemo(
    () => term$.pipe(autocomplete(1000, (term: string): Observable<ResponseOptions> => fetch$(term))),
    [term$]
  );

  // subscription for triggering loading state
  React.useEffect(() => {
    const loadingSubscription = term$.subscribe({
      next: (term) => {
        if (term !== defaultValue) {
          setLoading(true);
        }
        setValue(term);
      },
    });
    return () => loadingSubscription.unsubscribe();
  }, [term$, defaultValue]);

  // Update value in input components
  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  // Subscription to the input stream
  React.useEffect(() => {
    const subscription = results$.subscribe({
      next: (term) => {
        // store new value in the state
        setLoading(false);
        setOptions(term);
      },
      error: (err) =>
        // handle error here
        of(err),
    });
    return () => subscription.unsubscribe();
  }, [results$]);

  // return selected option to parent component
  const returnSelectedCity = (payload: string, array: ICity[], mode: Point) => {
    const selected: ICity | undefined = array.find((el) => el.value === payload);
    if (selected) {
      onSelect(selected, mode);
    }
  };

  return (
    <AutoComplete
      backfill
      dropdownClassName="destinationDropdown"
      dropdownMatchSelectWidth
      defaultOpen={false}
      value={value}
      options={options}
      filterOption={(inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      onSelect={(payload: string) => returnSelectedCity(payload, options, point)}
      onChange={(payload: string) => {
        term$.next(payload);
      }}
      className={className}
      notFoundContent="начните вводить название города"
    >
      <Input
        className={s.autocomplete}
        placeholder={point === 'departure' ? 'Откуда' : 'Куда'}
        suffix={<div className={s.geoIcon}>{loading ? <LoadingOutlined /> : <GeoMark />}</div>}
      />
    </AutoComplete>
  );
});
