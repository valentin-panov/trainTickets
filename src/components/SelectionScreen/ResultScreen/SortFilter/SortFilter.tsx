import React, { memo } from 'react';
import cn from 'clsx';
import { Select } from 'antd';
import './reant.css';
import s from './SortFilter.module.scss';
import { ISortOptions } from '../../../../interfaces/Interfaces';

export type CascaderValueType = (string | number)[];

export type Props = {
  className?: string;
  active: CascaderValueType;
  options: ISortOptions;
  onChange: (value: CascaderValueType) => void;
};

export const SortFilter = memo<Props>(({ className, onChange, active, options }) => (
  <Select
    className={cn(s.root, className)}
    dropdownClassName={cn(s.dropdown, 'sort')}
    options={options}
    onChange={onChange}
    allowClear={false}
    bordered={false}
    defaultValue={active}
  />
));
