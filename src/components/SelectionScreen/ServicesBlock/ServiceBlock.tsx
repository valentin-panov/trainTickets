import React, { memo } from 'react';
import cn from 'clsx';
import s from './ServiceBlock.module.scss';
import { filtersCollection } from '../../../collections/collections';
import { IServices } from '../../../interfaces/Interfaces';

export type Props = {
  className: string;
  services: IServices;
};

export const ServiceBlock = memo<Props>(({ className, services }) => {
  const services2render: [string, boolean][] = Object.entries(services).map((el) => [`${el[0]}`, el[1]]);
  return (
    <div className={cn(s.root, s[className])}>
      {services2render.map((el) => (
        <div className={cn(s.service__icon, el[1] ? s.active : '')} key={el[0]}>
          {filtersCollection[el[0]].element}
        </div>
      ))}
    </div>
  );
});
