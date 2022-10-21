import React from 'react';
import { ReactComponent as Rub } from '../svg/rub.svg';
import { ReactComponent as Express } from '../svg/service_express.svg';
import { ReactComponent as WiFi } from '../svg/service_wifi.svg';
import { ReactComponent as Platz } from '../svg/filter_platz.svg';
import { ReactComponent as AC } from '../svg/service_ac.svg';
import { ReactComponent as Cup } from '../svg/service_cup.svg';
import { ReactComponent as Linen } from '../svg/service_linen.svg';
import { ReactComponent as Coupe } from '../svg/filter_coupe.svg';
import { ReactComponent as Seat } from '../svg/filter_seat.svg';
import { ReactComponent as Lux } from '../svg/filter_lux.svg';
import { ReactComponent as Forward } from '../svg/icon_dest_forward.svg';
import { ReactComponent as Backward } from '../svg/icon_dest_back.svg';
import { ReactComponent as BackwardBig } from '../svg/icon_dest_back_big.svg';
import { ReactComponent as ArrowRB } from '../svg/arrow_right_black.svg';
import { ReactComponent as ArrowRG } from '../svg/arrow_right_grey.svg';
import { ReactComponent as ArrowRY } from '../svg/arrow_right_yellow.svg';
import { ReactComponent as ArrowLY } from '../svg/arrow_left_yellow.svg';
import { ReactComponent as ForwardBig } from '../svg/icon_dest_forward_big.svg';
import { ReactComponent as TrainSmall } from '../svg/icon_train_small.svg';
import { ReactComponent as Clock } from '../svg/icon_clock.svg';
import { ReactComponent as BigSeat } from '../svg/big_seat.svg';
import { ReactComponent as BigPlatz } from '../svg/big_platz.svg';
import { ReactComponent as BigCoupe } from '../svg/big_coupe.svg';
import { ReactComponent as BigLux } from '../svg/big_lux.svg';
import { ReactComponent as Passenger } from '../svg/icon_passenger.svg';
import { ReactComponent as BigPassenger } from '../svg/icon_big_pass.svg';
import { IFilterItem } from '../interfaces/Interfaces';

export const filtersCollection: IFilterItem = {
  have_wifi: { element: <WiFi />, title: 'Wi-Fi' },
  is_express: { element: <Express />, title: 'Экспресс' },
  have_air_conditioning: { element: <AC />, title: 'Кондиционер' },
  cup: { element: <Cup />, title: 'Ресторан' },
  linen: { element: <Linen />, title: 'Бельё' },
  have_third_class: { element: <Platz />, title: 'Плацкарт' },
  have_second_class: { element: <Coupe />, title: 'Купе' },
  have_fourth_class: { element: <Seat />, title: 'Сидячий' },
  have_first_class: { element: <Lux />, title: 'Люкс' },
};

export const iconsCollection = {
  rub: <Rub />,
  forward: <Forward />,
  backward: <Backward />,
  arrowRB: <ArrowRB />,
  arrowRG: <ArrowRG />,
  arrowRY: <ArrowRY />,
  arrowLY: <ArrowLY />,
  forwardBig: <ForwardBig />,
  backwardBig: <BackwardBig />,
  trainSmall: <TrainSmall />,
  clock: <Clock />,
  bigSeat: <BigSeat />,
  bigPlatz: <BigPlatz />,
  bigCoupe: <BigCoupe />,
  bigLux: <BigLux />,
  passenger: <Passenger />,
  bigPassenger: <BigPassenger />,
};
