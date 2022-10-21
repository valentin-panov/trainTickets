import React, { FormEvent, memo, useEffect, useState } from 'react';
import cn from 'clsx';
import { Button, Input, message, Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import s from './Footer.module.scss';
import { ContactItem } from './ContactItem';
import { Logo } from '../Logo';
import { ReactComponent as IconCall } from './img/iconCall.svg';
import { ReactComponent as IconMail } from './img/iconMail.svg';
import { ReactComponent as IconSkype } from './img/iconSkype.svg';
import { ReactComponent as IconGeo } from './img/iconGeo.svg';
import { ReactComponent as Fb } from './img/fb.svg';
import { ReactComponent as Youtube } from './img/youtube.svg';
import { ReactComponent as GPlus } from './img/gPlus.svg';
import { ReactComponent as Twt } from './img/twt.svg';
import { ReactComponent as LinkedIn } from './img/linkedIn.svg';
import { ReactComponent as BtnUp } from './img/btnUp.svg';

import { FooterTitle } from './FooterTitle';
import { FooterSubtitle } from './FooterSubtitle';
import { postSubscription, subscriptionSetIdle } from '../../reducers/subrcribe';
import { AppDispatch, RootState } from '../../store';
import { Icon } from '../Icon';

export type Props = {
  className?: string;
};

export const Footer = memo<Props>(({ className }) => {
  const [submitBtnActive, setSubmitBtnActive] = useState<boolean>(false);
  const [subscriptionEmail, setSubscriptionEmail] = useState<string>('');
  const [subscriptionModalVisible, setSubscriptionModalVisible] = useState<boolean>(false);

  const status = useSelector((store: RootState) => store.subscribe.status);

  const dispatch = useDispatch<AppDispatch>();

  const checkSubmittable = (arg: string) => {
    setSubmitBtnActive(!!arg);
    setSubscriptionEmail(arg);
  };

  const onFinish = (event: FormEvent) => {
    event.preventDefault();
    dispatch(postSubscription(subscriptionEmail));
    setSubscriptionEmail('');
  };

  useEffect(() => {
    if (status === 'pending') {
      message
        .loading({
          content: 'ожидаем ответ сервера..',
          key: 'pending',
          duration: 0,
        })
        .then();
    }
    if (status === 'success' || status === 'error') {
      message.destroy('pending');
    }
    if (status === 'success') {
      setSubscriptionModalVisible(true);
    }
  }, [status]);

  return (
    <footer className={cn(s.root, className)} id="contacts">
      <div className={s.top}>
        <section className={s.topSection}>
          <FooterTitle text="Свяжитесь с нами" />
          <ul className={s.connectBlockContainer}>
            <ContactItem connectLink="/" connectIconSrc={<IconCall />} connectText="8 (800) 000 00 00" />
            <ContactItem connectLink="/" connectIconSrc={<IconMail />} connectText="inbox@mail.ru" />
            <ContactItem connectLink="/" connectIconSrc={<IconSkype />} connectText="tu.train.tickets" />
            <ContactItem
              connectLink="/"
              connectIconSrc={<IconGeo />}
              connectText="г. Москва<br>ул. Московская 27-35<br>555 555"
            />
          </ul>
        </section>
        <section className={s.topSection}>
          <FooterTitle text="Подписка" />
          <FooterSubtitle text="Будьте в курсе событий" />
          <form
            id="subscription"
            name="subscription"
            className={s.subscriptionForm}
            onSubmit={(event) => onFinish(event)}
          >
            <Input
              type="email"
              name="email"
              inputMode="email"
              placeholder="e-mail"
              className={s.emailInput}
              value={subscriptionEmail}
              required
              onChange={(e) => checkSubmittable(e.target.value)}
            />
            <Button className={s.btn} htmlType="submit" disabled={!submitBtnActive}>
              ОТПРАВИТЬ
            </Button>
          </form>
          <FooterTitle text="Подписывайтесь на нас" />
          <ul className={s.socials__imageContainer}>
            <Youtube />
            <LinkedIn />
            <GPlus />
            <Fb />
            <Twt />
          </ul>
        </section>
      </div>
      <div className={s.bottom}>
        <Logo />
        <Button
          shape="circle"
          className={s.upBtn}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          <BtnUp />
        </Button>
        <span className={s.date}>2018 Web</span>
      </div>
      <Modal
        closable={false}
        centered
        footer={null}
        visible={subscriptionModalVisible}
        bodyStyle={{
          height: '418px',
          width: '666px',
          background: '#FBFBFB',
          border: '1px solid #C4C4C4',
          boxShadow: '0 2px 2px rgba(0, 0, 0, 0.25)',
          padding: '0',
        }}
      >
        <div className={s.subscModalWrapper}>
          <div className={s.modalHeader}>
            <Icon type="info" />
          </div>
          <div className={s.modalBody}>
            <p>Ваш адрес email добавлен в базу новостной рассылки.</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum ducimus hic maiores odio qui sed vitae
              voluptas. Atque eaque eius error et maxime modi necessitatibus quod reiciendis rerum sint? Expedita!
            </p>
          </div>
          <div className={s.modalFooter}>
            <Button
              onClick={() => {
                setSubscriptionModalVisible(false);
                dispatch(subscriptionSetIdle());
              }}
              className={s.modalBtn}
            >
              понятно
            </Button>
          </div>
        </div>
      </Modal>
    </footer>
  );
});
