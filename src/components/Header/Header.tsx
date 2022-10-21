import React, { memo, useEffect, useState } from 'react';
import cn from 'clsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { DestinationPicker } from 'components/Pickers/DestinationPicker';
import { DatePickerOrigin } from 'components/Pickers/DatePickerOrigin';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import s from './Header.module.scss';
import { Logo } from '../Logo';
import { HeaderMenu } from '../Menu';
import { MSHeaderMotto } from './MSHeaderMotto';
import headerMain from './img/header_main.png';
import headerTrain from './img/header_train.png';
import headerSuccess from './img/header_success.png';
import { appURL } from '../../App';
import { AppDispatch, RootState } from '../../store';
import { getRouteFetchData } from '../../reducers/getRoute';
import { orderReset } from '../../reducers/order';
import { selectedSeatsReset } from '../../reducers/selectedSeats';

export type Props = {
  className?: string;
};

export const Header = memo<Props>(({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [findDisabled, setFindDisabled] = useState<boolean>(true);
  const searchParams = useSelector((store: RootState) => store.searchParams);
  const location = useLocation();
  const history = useNavigate();
  const { pathname } = location;
  const splitLocation: string = pathname.replace(appURL, '').split('/')[1];

  const activePreset: {
    class: string;
    back: string;
  } = { class: 'main', back: headerMain };

  switch (splitLocation) {
    case 'select':
      activePreset.class = 'select';
      activePreset.back = headerTrain;
      break;
    case 'success':
      activePreset.class = 'success';
      activePreset.back = headerSuccess;
      break;
    default:
      activePreset.class = 'main';
      activePreset.back = headerMain;
      break;
  }

  const findTickets = () => {
    dispatch(orderReset());
    dispatch(selectedSeatsReset());
    dispatch(getRouteFetchData(searchParams));
    history('/select');
  };

  useEffect(() => {
    // TODO cache images
    const imgHeaderTrain = new Image();
    imgHeaderTrain.src = headerTrain;
    const imgHeaderSuccess = new Image();
    imgHeaderSuccess.src = headerSuccess;
    const loadingImg = new Image();
    loadingImg.src = 'src/components/Loading/img/loading.gif';
  }, []);

  useEffect(() => {
    if (searchParams.cityDeparture.value && searchParams.cityArrival.value) {
      setFindDisabled(false);
    } else {
      setFindDisabled(true);
    }
  }, [searchParams.cityDeparture.value, searchParams.cityArrival.value]);

  return (
    <header className={cn(s.root, className, s[activePreset.class])}>
      <div className={s.content}>
        <div className={s.logo_holder}>
          <Logo />
        </div>

        <HeaderMenu location={splitLocation} />

        {activePreset.class === 'main' && (
          <div className={s.header__controls_main}>
            <div className={s.header__controls_col}>
              <div className={s.motto_holder}>
                <MSHeaderMotto />
              </div>
            </div>

            <div className={s.header__controls_col}>
              <div className={cn(s.picker_holder_main)}>
                <div className={s.picker_holder_main_destination_helper}>
                  <DestinationPicker />
                </div>
                <DatePickerOrigin pickerPlace="headerPicker" />
                <div className={s.search_btn_holder}>
                  <Button className={s.searchBtn} onClick={findTickets} disabled={findDisabled}>
                    НАЙТИ БИЛЕТЫ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePreset.class === 'select' && (
          <div className={s.header__controls_select}>
            <div className={cn(s.picker_holder_select)}>
              <div className={s.picker_holder_select_row}>
                <DestinationPicker />
                <DatePickerOrigin pickerPlace="headerPicker" />
              </div>
              <div className={s.search_btn_holder_select}>
                <Button className={s.searchBtn} onClick={findTickets} disabled={findDisabled}>
                  НАЙТИ БИЛЕТЫ
                </Button>
              </div>
            </div>
          </div>
        )}

        {activePreset.class === 'success' && <div className={s.success__msg}>Благодарим Вас за заказ!</div>}
      </div>

      <img className={s.back} src={activePreset.back} alt="header background" />
    </header>
  );
});
