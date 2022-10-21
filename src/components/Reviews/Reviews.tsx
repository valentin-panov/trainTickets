import React, { memo } from 'react';
import cn from 'clsx';
import { Carousel } from 'antd';
import s from './Reviews.module.scss';
import './slider.css';
import ava1 from './img/ava1.png';
import ava2 from './img/ava2.png';
import openQ from './img/open.svg';
import closeQ from './img/close.svg';

export type Props = {
  className?: string;
};

export const Reviews = memo<Props>(({ className }) => (
  <div className={cn(s.root, className)} id="reviews">
    <span className={s.title}>отзывы</span>
    <div className={s.slidesBlock}>
      <Carousel slidesToShow={2} autoplay pauseOnHover>
        <div>
          <div className={s.reviewCard}>
            <div className={s.avatar__container}>
              <img src={ava1} alt="avatar" className={s.avatar__image} />
            </div>
            <div className={s.review}>
              <div className={s.review__title}>Екатерина Вальнова</div>
              <div className={s.review__text}>
                <span>
                  <img src={openQ} alt="open quota" className={s.openQ} />
                  Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить
                  авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.
                  <img src={closeQ} alt="open quota" className={s.closeQ} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={s.reviewCard}>
            <div className={s.avatar__container}>
              <img src={ava2} alt="avatar" className={s.avatar__image} />
            </div>
            <div className={s.review}>
              <div className={s.review__title}>Евгений Стрыкало</div>
              <div className={s.review__text}>
                <span>
                  <img src={openQ} alt="open quota" className={s.openQ} />
                  СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам
                  СМС-напоминание о поездке. <img src={closeQ} alt="open quota" className={s.closeQ} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={s.reviewCard}>
            <div className={s.avatar__container}>
              <img src={ava1} alt="avatar" className={s.avatar__image} />
            </div>
            <div className={s.review}>
              <div className={s.review__title}>Екатерина Вальнова</div>
              <div className={s.review__text}>
                <span>
                  <img src={openQ} alt="open quota" className={s.openQ} />
                  Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить
                  авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.
                  <img src={closeQ} alt="open quota" className={s.closeQ} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={s.reviewCard}>
            <div className={s.avatar__container}>
              <img src={ava2} alt="avatar" className={s.avatar__image} />
            </div>
            <div className={s.review}>
              <div className={s.review__title}>Евгений Стрыкало</div>
              <div className={s.review__text}>
                <span>
                  <img src={openQ} alt="open quota" className={s.openQ} />
                  СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам
                  СМС-напоминание о поездке. <img src={closeQ} alt="open quota" className={s.closeQ} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  </div>
));
