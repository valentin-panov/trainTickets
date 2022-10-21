import React, { memo } from 'react';
import cn from 'clsx';
import { Button, Rate } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import s from './Success.module.scss';
import { ReactComponent as Icon1 } from './svg/Group1.svg';
import { ReactComponent as Icon2 } from './svg/Group2.svg';
import { ReactComponent as Icon3 } from './svg/Group3.svg';
import { RootState } from '../../store';
import { getBeautifulNumber } from '../../utils/getBeatifulNumber';
import { iconsCollection } from '../../collections/collections';

export type Props = {
  className?: string;
};

export const Success = memo<Props>(({ className }) => {
  const history = useNavigate();
  const user = useSelector((store: RootState) => store.order.user);
  const selectedSeats = useSelector((store: RootState) => store.selectedSeats);
  const orderSummary = selectedSeats.reduce((sum, el): number => sum + Number(el.price), 0);
  const firstName = user?.first_name;
  const patronymic = user?.patronymic;

  return (
    <div className={cn(s.root, className)}>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.header__order}>
            <div>№Заказа&nbsp;</div>
            <div>285АА</div>
          </div>
          <div className={s.header__price}>
            <div>сумма</div>
            <div className={s.price}>{getBeautifulNumber(orderSummary)}</div>
            <div className={s.currency}>{iconsCollection.rub}</div>
          </div>
        </div>
        <div className={s.icons}>
          <div className={s.icons__item}>
            <div className={s.iconsItem__svg}>
              <Icon1 />
            </div>
            <div className={s.iconsItem__txt}>
              билеты будут отправлены на ваш <span className={s.iconsItem__txt_bold}>e-mail</span>
            </div>
          </div>
          <div className={s.icons__item}>
            <div className={s.iconsItem__svg}>
              <Icon2 />
            </div>
            <div className={s.iconsItem__txt}>
              <span className={s.iconsItem__txt_bold}>распечатайте</span>
              <br />и сохраняйте билеты до даты поездки
            </div>
          </div>
          <div className={s.icons__item}>
            <div className={s.iconsItem__svg}>
              <Icon3 />
            </div>
            <div className={s.iconsItem__txt}>
              <span className={s.iconsItem__txt_bold}>предьявите</span>
              <br />
              распечатанные билеты при посадке
            </div>
          </div>
        </div>
        <div className={s.msg}>
          <div className={s.msg__title}>{`${firstName} ${patronymic}!`}</div>
          <div className={s.msg__stub}>
            Ваш заказ успешно оформлен.
            <br />В ближайшее время с вами свяжется наш оператор для подтверждения.
          </div>
          <div className={s.msg__connect}>Благодарим Вас за оказанное доверие и желаем приятного путешествия!</div>
        </div>
        <div className={s.footer}>
          <div className={s.rate}>
            <div className={s.rate__msg}>Оценить сервис</div>

            <Rate character={<StarOutlined style={{ fontSize: '48px' }} />} />
          </div>
          <Button
            className={s.success__return_btn}
            onClick={() => {
              history('/');
            }}
          >
            вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
});
