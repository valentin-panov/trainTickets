import React, { memo } from 'react';
import cn from 'clsx';
import { Switch } from 'antd';
import s from './SelectionFilterItem.module.scss';
import './reant.css';
import { filtersCollection } from '../../../collections/collections';

export type Props = {
  className?: string;
  filter: string;
  onChange: (filter: string, state: boolean) => void;
  checked: boolean | undefined;
};

export const SelectionFilterItem = memo<Props>(({ className, filter, onChange, checked = false }) => {
  const filterItem = filtersCollection[filter];
  return (
    <li className={cn(s.root, className)}>
      <div className={s.icon}>{filterItem.element}</div>
      <div className={s.txt}>{filterItem.title}</div>
      <div className={s.switch}>
        <Switch
          checked={checked}
          onChange={(state) => {
            onChange(filter, state);
          }}
        />
      </div>
    </li>
  );
});
