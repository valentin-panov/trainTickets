/* eslint-disable no-underscore-dangle  */
/* eslint-disable camelcase */
import React, { memo } from 'react';
import s from './ChooseCarriageTypeSection.module.scss';
import { CarriageTypeButton } from './CarriageTypeButton';

export type Props = {
  data: {
    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
  };
  chooseCarriageType: (value: CarriageType) => void;
  activeType: CarriageType;
};

export type CarriageType = undefined | 'first' | 'second' | 'third' | 'fourth';

export const ChooseCarriageTypeSection = memo<Props>(({ chooseCarriageType, data, activeType }) => (
  <>
    <div className={s.carriageTypeTitle}>Тип вагона</div>
    <div className={s.carriageTypeIcons}>
      <CarriageTypeButton
        active={activeType}
        carriageType="fourth"
        toggleType={chooseCarriageType}
        available={data.have_fourth_class}
      />
      <CarriageTypeButton
        active={activeType}
        carriageType="third"
        toggleType={chooseCarriageType}
        available={data.have_third_class}
      />
      <CarriageTypeButton
        active={activeType}
        carriageType="second"
        toggleType={chooseCarriageType}
        available={data.have_second_class}
      />
      <CarriageTypeButton
        active={activeType}
        carriageType="first"
        toggleType={chooseCarriageType}
        available={data.have_first_class}
      />
    </div>
  </>
));
