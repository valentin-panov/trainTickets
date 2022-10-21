/* eslint-disable no-underscore-dangle */
import React, { memo, useCallback, useEffect, useState } from 'react';
import cn from 'clsx';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import s from './SeatsCard.module.scss';
import './reant.css';
import { ICoach, ISelectedSeat, IService, ITrain } from '../../../../interfaces/Interfaces';
import { iconsCollection } from '../../../../collections/collections';
import { capitalize } from '../../../../utils/capitalize';
import { sec2hhmm } from '../../../../utils/sec2hhmm';
import { secToDateTime } from '../../../../utils/secToDateTime';
import { appStateResetTrainOutbound, appStateResetTrainReturn } from '../../../../reducers/appState';
import { getBeautifulNumber } from '../../../../utils/getBeatifulNumber';
import { CarriageScheme, SelectSeatsArgs } from './CarriageScheme';
import { CarriageNumberButton } from './CarriageNumberButton';
import { trainSeatsReset } from '../../../../reducers/getSeats';
import { TrainData } from './TrainData';
import { TicketsCount } from './TicketsCount';
import { AppDispatch, RootState } from '../../../../store';
import { ChooseCarriageTypeSection } from './ChooseCarriageTypeSection';
import { ServicesBlock } from './ServicesBlock';
import { selectedSeatsSet } from '../../../../reducers/selectedSeats';

export type Props = {
  className?: string;
  type: 'outbound' | 'return';
  data: ITrain;
};
const clearCarriage: ICoach = {
  coach: {
    _id: 0,
    name: '',
    class_type: 'first',
    have_wifi: false,
    have_air_conditioning: false,
    price: 0,
    top_price: 0,
    bottom_price: 0,
    side_price: 0,
    linens_price: 0,
    wifi_price: 0,
    is_linens_included: false,
    available_seats: 0,
    train: 0,
  },
  seats: [
    {
      index: 1,
      available: false,
    },
  ],
};

export type SelectedSeatsArray = SelectSeatsArgs[];

export type CarriageType = undefined | 'first' | 'second' | 'third' | 'fourth';

export type SelectedServices = {
  coachId: number;
  wifi: IService;
  linen: IService;
}[];

export const SeatsCard = memo<Props>(({ className, type, data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const trainSeats = useSelector((store: RootState) => store.trainSeats.items);

  const trainId = data.departure.train._id;
  const pointA = capitalize(data.departure.from.city.name);
  const pointB = capitalize(data.departure.to.city.name);
  const stationA = capitalize(data.departure.from.railway_station_name);
  const stationB = capitalize(data.departure.to.railway_station_name);
  const timeA = secToDateTime(data.departure.from.datetime);
  const timeB = secToDateTime(data.departure.to.datetime);
  const duration = sec2hhmm(data.departure.duration);

  const [carriageType, setCarriageType] = useState<CarriageType>(undefined);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [activeCarriage, setActiveCarriage] = useState<ICoach>(clearCarriage);
  const [ticketsCount, setTicketsCount] = useState({ adultCount: 0, childrenCount: 0, toddlerCount: 0 });
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeatsArray>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedServices>([]);

  const anotherTrain = (arg: string) => {
    if (arg === 'outbound') {
      dispatch(appStateResetTrainOutbound());
    } else if (arg === 'return') {
      dispatch(appStateResetTrainReturn());
    }
    dispatch(trainSeatsReset());
  };

  const chooseCarriageType = (value: CarriageType) => {
    setCarriageType(value);
  };

  const toggleCarriage = (e: number): void => {
    const newCarriage = trainSeats.find((coach) => coach.coach._id === e);
    if (newCarriage) {
      setActiveCarriage(newCarriage);
    }
  };

  const selectSeats = (arg: SelectSeatsArgs): void => {
    const existId = selectedSeats.findIndex((el) => el.coachId === arg.coachId && el.seatId === arg.seatId);
    if (existId === -1) {
      const availableToAdd = ticketsCount.adultCount + ticketsCount.childrenCount - selectedSeats.length;
      if (availableToAdd > 0) {
        setSelectedSeats([...selectedSeats, arg]);
      } else {
        const warning = () => {
          message.warning('Нельзя выбрать больше мест, чем выбрано билетов').then();
        };
        warning();
      }
    } else {
      setSelectedSeats(selectedSeats.filter((el, idx) => idx !== existId));
    }
  };

  useEffect(() => {
    const firstCoach = trainSeats
      .filter((coach) => coach.coach.class_type === carriageType)
      .find((coach) => coach.coach._id);
    if (firstCoach) {
      setActiveCarriage(firstCoach);
    }
  }, [carriageType, trainSeats]);

  const getTicketsCount = useCallback((adultCount: number, childrenCount: number, toddlerCount: number) => {
    setTicketsCount({ adultCount, childrenCount, toddlerCount });
  }, []);

  useEffect(() => {
    const canGetSeats = ticketsCount.adultCount + ticketsCount.childrenCount;
    if (canGetSeats < selectedSeats.length) {
      const tempArr = [...selectedSeats];
      tempArr.length = canGetSeats;
      setSelectedSeats(tempArr);
    }
  }, [selectedSeats, ticketsCount]);

  useEffect(() => {
    const seatsSummaryPrice = selectedSeats.reduce(
      (sum, current) =>
        sum +
        current.price +
        Number(
          selectedServices.filter((el) => el.coachId === current.coachId).map((el) => el.linen.price + el.wifi.price)
        ),
      0
    );
    setTotalPrice(seatsSummaryPrice);

    if (selectedSeats.length === ticketsCount.adultCount + ticketsCount.childrenCount) {
      const selected = selectedSeats.map(
        (el): ISelectedSeat => ({
          route_direction_id: `${trainId}`,
          price: `${
            el.price +
            Number(
              selectedServices.filter((ser) => ser.coachId === el.coachId).map((i) => i.linen.price + i.wifi.price)
            )
          }`,
          coach_id: `${el.coachId}`,
          seat_number: `${el.seatId}`,
          is_child: true,
          include_children_seat: false,
        })
      );
      for (let i = 0; i < ticketsCount.adultCount; i += 1) {
        selected[i].is_child = false;
      }

      if (ticketsCount.toddlerCount > 0) {
        const childSeat: ISelectedSeat[] = [];
        for (let i = 0; i < ticketsCount.toddlerCount; i += 1) {
          childSeat.push({
            route_direction_id: `${trainId}`,
            price: '0',
            coach_id: `0`,
            seat_number: '0',
            is_child: false,
            include_children_seat: true,
          });
        }
        dispatch(selectedSeatsSet([...selected, ...childSeat]));
      } else {
        dispatch(selectedSeatsSet(selected));
      }
    } else {
      dispatch(selectedSeatsSet([]));
    }
  }, [
    dispatch,
    selectedSeats,
    selectedServices,
    ticketsCount.adultCount,
    ticketsCount.childrenCount,
    ticketsCount.toddlerCount,
    trainId,
  ]);

  return (
    <section className={cn(s.root, className)}>
      <div className={s.header}>
        {type === 'outbound' && iconsCollection.forwardBig}
        {type === 'return' && iconsCollection.backwardBig}
        <Button className={s.btnHeader} onClick={() => anotherTrain(type)}>
          Выбрать другой поезд
        </Button>
      </div>

      <TrainData data={{ type, trainId, pointA, stationA, timeA, pointB, stationB, timeB, duration }} />

      <TicketsCount getTicketsCount={getTicketsCount} />

      <div className={s.divider} />

      <ChooseCarriageTypeSection
        data={{
          have_first_class: data.departure.have_first_class,
          have_second_class: data.departure.have_second_class,
          have_third_class: data.departure.have_third_class,
          have_fourth_class: data.departure.have_fourth_class,
        }}
        chooseCarriageType={chooseCarriageType}
        activeType={carriageType}
      />

      {carriageType !== undefined && (
        <>
          <div className={s.carriageList}>
            <div className={s.carriages}>Вагоны</div>
            <div className={s.carriagesNumbers}>
              {trainSeats
                .filter((coach) => coach.coach.class_type === carriageType)
                .map((coach) => (
                  <CarriageNumberButton
                    key={coach.coach._id}
                    buttonNumber={coach.coach._id}
                    toggleCarriage={(e) => toggleCarriage(e)}
                    activeCarriage={activeCarriage.coach._id}
                  />
                ))}
            </div>
            <div className={s.carriages}>Нумерация вагонов начинается с головы поезда</div>
          </div>

          <div className={s.selectedCarriage}>
            <div className={s.selectedCarriageNumber}>
              <div className={s.number}>{activeCarriage.coach._id}</div>
              <div className={s.subNumber}>вагон</div>
            </div>
            <div className={s.selectedCarriageInfoBox}>
              <div className={s.selectedCarriageInfo}>
                <div className={s.sciBlock}>
                  <div className={s.seatsPrice}>
                    <div>
                      <div>
                        Места <span className={s.seatsCount}>{activeCarriage.seats.length}</span>
                      </div>
                      {carriageType === 'first' && <> </>}
                      {carriageType === 'second' && (
                        <>
                          <div className={s.seatsType}>
                            Верхние
                            <span className={s.seatsTypeNumber}>{activeCarriage.seats.length}</span>
                          </div>
                          <div className={s.seatsType}>
                            Нижние
                            <span className={s.seatsTypeNumber}>{activeCarriage.seats.length}</span>
                          </div>
                        </>
                      )}
                      {carriageType === 'third' && (
                        <>
                          <div className={s.seatsType}>
                            Верхние
                            <span className={s.seatsTypeNumber}>{activeCarriage.seats.length}</span>
                          </div>
                          <div className={s.seatsType}>
                            Нижние
                            <span className={s.seatsTypeNumber}>{activeCarriage.seats.length}</span>
                          </div>
                          <div className={s.seatsType}>
                            Боковые
                            <span className={s.seatsTypeNumber}>{activeCarriage.seats.length}</span>
                          </div>
                        </>
                      )}
                      {carriageType === 'fourth' && <> </>}
                    </div>
                    <div>
                      <div>Стоимость</div>
                      {carriageType === 'first' && data.departure.price_info.first && (
                        <div className={s.price}>
                          {getBeautifulNumber(data.departure.price_info.first.price)}
                          <div className={s.rub}>{iconsCollection.rub}</div>
                        </div>
                      )}
                      {carriageType === 'second' && data.departure.price_info.second && (
                        <>
                          <div className={s.price}>
                            {getBeautifulNumber(data.departure.price_info.second.top_price)}
                            <div className={s.rub}>{iconsCollection.rub}</div>
                          </div>
                          <div className={s.price}>
                            {getBeautifulNumber(data.departure.price_info.second.bottom_price)}
                            <div className={s.rub}>{iconsCollection.rub}</div>
                          </div>
                        </>
                      )}
                      {carriageType === 'third' && data.departure.price_info.third && (
                        <>
                          <div className={s.price}>
                            {getBeautifulNumber(data.departure.price_info.third.top_price)}
                            <div className={s.rub}>{iconsCollection.rub}</div>
                          </div>
                          <div className={s.price}>
                            {getBeautifulNumber(data.departure.price_info.third.bottom_price)}
                            <div className={s.rub}>{iconsCollection.rub}</div>
                          </div>
                          <div className={s.price}>
                            {getBeautifulNumber(data.departure.price_info.third.side_price)}
                            <div className={s.rub}>{iconsCollection.rub}</div>
                          </div>
                        </>
                      )}
                      {carriageType === 'fourth' && data.departure.price_info.fourth && (
                        <div className={s.price}>
                          {getBeautifulNumber(data.departure.price_info.fourth.top_price)}
                          <div className={s.rub}>{iconsCollection.rub}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <ServicesBlock
                  data={activeCarriage}
                  selectedServices={selectedServices}
                  setSelectedServices={setSelectedServices}
                  selectedSeats={selectedSeats}
                />
              </div>
            </div>
          </div>
          <div className={s.preSchemeDivider}>
            <div className={s.preSchemeDividerTooltip}>{11} человек выбирают места в этом поезде</div>
          </div>

          <div className={s.carriageScheme}>
            <CarriageScheme activeCarriage={activeCarriage} selectedSeats={selectedSeats} selectSeats={selectSeats} />
          </div>

          {totalPrice !== 0 && (
            <div className={s.totalPrice}>
              <div className={s.totalPriceNumbers}>{getBeautifulNumber(totalPrice)}</div>
              <div className={s.totalPriceSymbol}>{iconsCollection.rub}</div>
            </div>
          )}
        </>
      )}
    </section>
  );
});
