import React, { memo } from 'react';
import cn from 'clsx';
import s from './About.module.scss';

export type Props = {
  className?: string;
};

export const About = memo<Props>(({ className }) => (
  <div className={cn(s.root, className)} id="about">
    <span className={s.title}>о нас</span>
    <div className={s.textBlock}>
      <span>
        Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше людей
        заказывают жд билеты через интернет.
      </span>
      <span>
        Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем о
        преимуществах заказа через интернет.
      </span>
      <span className={s.highlight}>
        Покупать жд билеты дешево можно за 90 суток до отправления поезда. Благодаря динамическому ценообразованию цена
        на билеты в это время самая низкая.
      </span>
    </div>
  </div>
));
