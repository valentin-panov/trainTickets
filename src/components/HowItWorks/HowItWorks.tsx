import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import s from './HowItWorks.module.scss';
import backImg from './img/howBckg.png';
import icon1 from './img/group1.svg';
import icon2 from './img/group2.svg';
import icon3 from './img/group3.svg';

export type Props = {
  className?: string;
};

export const HowItWorks = memo<Props>(({ className }) => (
  <div className={cn(s.root, className)} id="how">
    <div className={s.content}>
      <div className={s.titleRow}>
        <span className={s.title}>как это работает</span>
        <Button className={s.btn}>Узнать больше</Button>
      </div>
      <div className={s.iconBlock}>
        <div className={s.iconCard}>
          <div className={s.icon__container}>
            <img src={icon1} alt="icon" className={s.icon__image} />
          </div>
          <div className={s.iconCard__text}>Удобный заказ на&nbsp;сайте</div>
        </div>
        <div className={s.iconCard}>
          <div className={s.icon__container}>
            <img src={icon2} alt="icon" className={s.icon__image} />
          </div>
          <div className={s.iconCard__text}>Нет необходимости ехать в офис</div>
        </div>
        <div className={s.iconCard}>
          <div className={s.icon__container}>
            <img src={icon3} alt="icon" className={s.icon__image} />
          </div>
          <div className={s.iconCard__text}>Огромный выбор направлений</div>
        </div>
      </div>
    </div>
    <img className={s.back} src={backImg} alt="header background" />
  </div>
));
