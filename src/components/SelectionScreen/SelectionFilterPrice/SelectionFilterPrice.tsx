import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';
import { Slider } from 'antd';
import s from './SelectionFilterPrice.module.scss';
import './rewrite.css';
import { searchParamsFiltersSet } from '../../../reducers/searchParams';
import {AppDispatch} from "../../../store";

export type Range = [number, number];

export type Props = {
  className?: string;
  initialRange: Range;
  stubRange: { min: number; max: number };
};

export const SelectionFilterPrice = memo<Props>(({ className, initialRange, stubRange }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [range, setRange] = useState<Range>(initialRange);
  const min = initialRange[0];
  const max = initialRange[1];

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
      dispatch(searchParamsFiltersSet({ price_from: value[0], price_to: value[1] }));
      setRange(setValue);
    }
  };

  // ВАЖНО! подписи перекрывают друг друга, если сводить ползунки близко, посмотрите, как сделано на авиасэйлс

  return (
    <div className={cn(s.root, className)}>
      <Slider
        min={stubRange.min}
        max={stubRange.max}
        range={{ draggableTrack: true }}
        step={10}
        defaultValue={range}
        tooltipVisible
        tooltipPlacement="bottom"
        onChange={(value: number | Range) => onChangeRange(value)}
      />
    </div>
  );
});
