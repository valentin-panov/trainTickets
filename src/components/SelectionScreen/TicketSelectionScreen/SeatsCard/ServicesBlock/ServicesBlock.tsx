/* eslint-disable no-underscore-dangle */
import React, { Dispatch, memo, SetStateAction, useCallback, useEffect, useRef } from 'react';
import cn from 'clsx';
import { message, Tooltip } from 'antd';
import s from './ServicesBlock.module.scss';
import { ICoach } from '../../../../../interfaces/Interfaces';
import { filtersCollection, iconsCollection } from '../../../../../collections/collections';
import { SelectedSeatsArray, SelectedServices } from '../SeatsCard';

export type Props = {
  data: ICoach;
  selectedServices: SelectedServices;
  setSelectedServices: Dispatch<SetStateAction<SelectedServices>>;
  selectedSeats: SelectedSeatsArray;
};

export const ServicesBlock = memo<Props>(({ data, selectedServices, setSelectedServices, selectedSeats }) => {
  const {
    have_air_conditioning: ac,
    have_wifi: wifi,
    wifi_price: wifiPrice,
    is_linens_included: linensInc,
    linens_price: linenPrice,
    _id: coachId,
  } = data.coach;
  const wifiElement = useRef(null);
  const linenElement = useRef(null);

  const activeCarriageSelectedServices = selectedServices.find((el) => el.coachId === coachId);
  const hasSelectedSeats = selectedSeats.some((el) => el.coachId === coachId);

  const wifiSelected = activeCarriageSelectedServices ? activeCarriageSelectedServices.wifi.isSelected : false;
  const linenSelected = activeCarriageSelectedServices ? activeCarriageSelectedServices.linen.isSelected : false;

  const clearServices = useCallback(() => {
    const servicesObj = {
      coachId,
      wifi: { isSelected: false, price: 0 },
      linen: { isSelected: false, price: 0 },
    };
    const existId = selectedServices.findIndex((el) => el.coachId === coachId);
    if (existId === -1) {
      selectedServices.push(servicesObj);
    } else {
      selectedServices.splice(existId, 1, servicesObj);
    }
    setSelectedServices(selectedServices);
  }, [coachId, selectedServices, setSelectedServices]);

  useEffect(() => {
    if (!hasSelectedSeats) {
      clearServices();
    }
  }, [clearServices, hasSelectedSeats]);

  const toggleService = (service: string) => {
    if (!hasSelectedSeats) {
      const warning = () => {
        message.warning('Сначала выберите места.').then();
      };
      warning();
    }
    if (hasSelectedSeats) {
      const newArr = [...selectedServices];
      let servicesObj = {
        coachId,
        wifi: { isSelected: wifiSelected, price: wifiSelected ? wifiPrice : 0 },
        linen: { isSelected: linenSelected, price: linenSelected ? linenPrice : 0 },
      };

      if (service === 'wifi') {
        servicesObj = {
          ...servicesObj,
          wifi: { isSelected: !wifiSelected, price: wifiSelected ? 0 : wifiPrice },
        };
      }
      if (service === 'linen') {
        servicesObj = {
          ...servicesObj,
          linen: { isSelected: !linenSelected, price: linenSelected ? 0 : linenPrice },
        };
      }
      const existId = selectedServices.findIndex((el) => el.coachId === coachId);
      if (existId === -1) {
        newArr.push(servicesObj);
      } else {
        newArr.splice(existId, 1, servicesObj);
      }
      setSelectedServices(newArr);
    }
  };

  const tooltipWifi = (
    <div className={s.tooltip_inside}>
      <div className={s.tooltip_inside_content}>Стоимость Wi-Fi: {wifiPrice}</div>
      <div className={s.tooltip_inside_moneySymbol}>{iconsCollection.rub}</div>
    </div>
  );
  const tooltipLinen = (
    <div className={s.tooltip_inside}>
      <div className={s.tooltip_inside_content}>Стоимость белья: {linenPrice} </div>
      <div className={s.tooltip_inside_moneySymbol}>{iconsCollection.rub}</div>
    </div>
  );

  return (
    <div className={s.sciBlock}>
      <div>Обслуживание ФПК</div>
      <div className={s.sciBlockServices}>
        {ac && (
          <button type="button" disabled className={cn(s.serviceIcon)}>
            {filtersCollection.have_air_conditioning.element}
          </button>
        )}
        {wifi && (
          <Tooltip
            placement="bottom"
            title={tooltipWifi}
            mouseEnterDelay={0.3}
            mouseLeaveDelay={0.3}
            trigger="hover"
            getPopupContainer={() => wifiElement.current as unknown as HTMLElement}
            overlayClassName={s.tooltip}
            destroyTooltipOnHide
          >
            <button
              type="button"
              className={cn(s.serviceIcon, wifiSelected ? s.selected : '')}
              ref={wifiElement}
              onClick={() => toggleService('wifi')}
              // disabled={!hasSelectedSeats}
            >
              {filtersCollection.have_wifi.element}
            </button>
          </Tooltip>
        )}
        {linensInc ? (
          <button type="button" disabled className={cn(s.serviceIcon, s.included)}>
            {filtersCollection.linen.element}
          </button>
        ) : (
          <Tooltip
            placement="bottom"
            title={tooltipLinen}
            mouseEnterDelay={0.3}
            mouseLeaveDelay={0.3}
            trigger="hover"
            getPopupContainer={() => linenElement.current as unknown as HTMLElement}
            overlayClassName={s.tooltip}
            destroyTooltipOnHide
          >
            <button
              type="button"
              className={cn(s.serviceIcon, linenSelected ? s.selected : '')}
              ref={linenElement}
              onClick={() => toggleService('linen')}
              // disabled={!hasSelectedSeats}
            >
              {filtersCollection.linen.element}
            </button>
          </Tooltip>
        )}

        <button type="button" disabled className={cn(s.serviceIcon)}>
          {filtersCollection.cup.element}
        </button>
      </div>
    </div>
  );
});
