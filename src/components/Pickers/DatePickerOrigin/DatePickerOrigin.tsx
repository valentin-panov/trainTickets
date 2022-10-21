import React, { memo, useMemo, useState } from 'react';
import cn from 'clsx';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import s from './DatePickerOrigin.module.scss';
import { DatePickerOriginUnit, DateType } from './DatePickerOriginUnit';
import {AppDispatch, RootState} from '../../../store';
import { searchParamsDateOutboundSet, searchParamsDateReturnSet } from '../../../reducers/searchParams';

export type Props = {
  className?: string;
  pickerPlace: 'headerPicker' | 'asidePicker';
};

export type TimeObj = moment.Moment | undefined;

export const DatePickerOrigin = memo<Props>(({ className, pickerPlace }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [forwardMoment, setForwardMoment] = useState<TimeObj>(undefined);
  const [returnMoment, setReturnMoment] = useState<TimeObj>(undefined);
  const forwardStore = useSelector((store: RootState) => store.searchParams.dateOutbound);
  const returnStore = useSelector((store: RootState) => store.searchParams.dateReturn);

  const onChange = (value: moment.Moment | null, dateType: DateType) => {
    const date = value ? value.format('YYYY-MM-DD') : null;
    if (dateType === 'forward') {
      dispatch(searchParamsDateOutboundSet(date));
    } else if (dateType === 'return') {
      dispatch(searchParamsDateReturnSet(date));
    }
  };

  useMemo(() => {
    if (forwardStore) {
      setForwardMoment(moment(forwardStore, 'YYYY-MM-DD'));
    } else {
      setForwardMoment(undefined);
    }
  }, [forwardStore]);

  useMemo(() => {
    if (returnStore) {
      setReturnMoment(moment(returnStore, 'YYYY-MM-DD'));
    } else {
      setReturnMoment(undefined);
    }
  }, [returnStore]);

  const outboundPicker = (givenClassName: string) => (
    <DatePickerOriginUnit
      dateType="forward"
      defaultValue={forwardMoment}
      disableDate={moment()}
      getDate={onChange}
      className={givenClassName}
    />
  );

  const returnPicker = (givenClassName: string) => (
    <DatePickerOriginUnit
      dateType="return"
      defaultValue={returnMoment}
      disableDate={forwardMoment || moment()}
      getDate={onChange}
      className={givenClassName}
    />
  );

  return (
    <>
      {pickerPlace === 'headerPicker' && (
        <div className={cn(s.root, className)}>
          <span className={s.title}>Дата</span>
          <div className={s.input_holder}>
            {outboundPicker(pickerPlace)}
            {returnPicker(pickerPlace)}
          </div>
        </div>
      )}
      {pickerPlace === 'asidePicker' && (
        <div className={s.datePicker}>
          <div className={s.sideSelection__title}>Дата поездки</div>
          {outboundPicker(pickerPlace)}
          <div className={s.sideSelection__title}>Дата возвращения</div>
          {returnPicker(pickerPlace)}
        </div>
      )}
    </>
  );
});
