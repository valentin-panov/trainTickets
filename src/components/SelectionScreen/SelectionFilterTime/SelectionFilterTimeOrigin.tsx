import React, { memo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Slider } from 'antd';
import { searchParamsFiltersSet } from '../../../reducers/searchParams';
import {AppDispatch} from "../../../store";

export type Range = [number, number];

export type Props = {
  initialRange: Range;
  type: string;
};

export const SelectionFilterTimeOrigin = memo<Props>(({ initialRange, type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const forward = useRef(null);

  const [range, setRange] = useState<Range>(initialRange);
  const min = 0;
  const max = 1440;

  const onChangeRange = (value: number | Range): void => {
    if (typeof value === 'number') {
      const minValue = 0;
      const maxValue = max > value ? value : max;
      const setValue: Range = [minValue, maxValue];
      setRange(setValue);
    } else {
      const minValue = min < value[0] ? value[0] : min;
      const maxValue = max > value[1] ? value[1] : max;
      const setValue: Range = [minValue, maxValue];
      dispatch(searchParamsFiltersSet({ [`${type}_hour_from`]: value[0], [`${type}_hour_to`]: value[1] }));
      setRange(setValue);
    }
  };

  const formatterDuration = (value: number | undefined): string => {
    if (typeof value === 'undefined') {
      return '';
    }
    const hour = Math.floor(value / 60);
    const minutes = value - hour * 60;
    return `${`0${hour}`.slice(-2)}:${`0${minutes}`.slice(-2)}`;
  };

  return (
    <div ref={forward}>
      <Slider
        max={max}
        min={min}
        range={{ draggableTrack: true }}
        step={30}
        defaultValue={range}
        tooltipVisible
        tooltipPlacement="bottom"
        tipFormatter={(value) => formatterDuration(value)}
        onChange={(value: number | Range) => onChangeRange(value)}
        getTooltipPopupContainer={() => forward.current as unknown as HTMLElement}
      />
    </div>
  );
});
