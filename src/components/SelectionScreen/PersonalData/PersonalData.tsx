import React, { memo } from 'react';
import cn from 'clsx';
import { Button, Form, Input, Radio, Space } from 'antd';
import './reant.css';
import { useDispatch } from 'react-redux';
import s from './PersonalData.module.scss';
import { orderSetPD } from '../../../reducers/order';
import { appStateSetProgress } from '../../../reducers/appState';
import { IPersonalData } from '../../../interfaces/Interfaces';
import {AppDispatch} from "../../../store";

export const PersonalData = memo(() => {
  const dispatch = useDispatch<AppDispatch>();

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: 'Поле "${label}" обязательно',
    types: {
      email: '"${label}" не валидный адрес',
      number: '"${label}" не валидное значение',
    },
    number: {
      range: '$"{label}" must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: IPersonalData) => {
    dispatch(orderSetPD(values));
    dispatch(appStateSetProgress(3));
  };

  return (
    <Form
      className={s.root}
      layout="vertical"
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <div className={s.card}>
        <div className={cn(s.row_subheading, s.row_padding)}>Персональные данные</div>
        <div className={cn(s.row_padding, s.row_personal)}>
          <Form.Item name="last_name" label="Фамилия" rules={[{ required: true }]}>
            <Input className={s.inputField} placeholder="Фамилия" />
          </Form.Item>
          <Form.Item name="first_name" label="Имя" rules={[{ required: true }]}>
            <Input className={s.inputField} placeholder="Имя" />
          </Form.Item>
          <Form.Item name="patronymic" label="Отчество" rules={[{ required: true }]}>
            <Input className={s.inputField} placeholder="Отчество" />
          </Form.Item>
        </div>
        <div className={cn(s.row_phone, s.row_padding)}>
          <Form.Item name="phone" label="Контактный телефон" rules={[{ required: true }]}>
            <Input className={s.inputField} prefix="+7" placeholder="_ _ _  _ _ _  _ _  _ _" />
          </Form.Item>
        </div>
        <div className={cn(s.row_padding, s.row_email)}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input className={s.inputField} placeholder="email" />
          </Form.Item>
        </div>
        <div className={cn(s.row_subheading, s.row_padding)}>Способ оплаты</div>
        <div className={cn(s.row_btn)}>
          <Form.Item name="payment_method">
            <Radio.Group style={{ width: '100%' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Radio value="online" className={cn(s.row_padding, s.bottom_dash, 'payments')}>
                  Онлайн
                  <div className={s.onlinePayments}>
                    <span>Банковской картой</span>
                    <span>PayPal</span>
                    <span>Visa QIWI Wallet</span>
                  </div>
                </Radio>
                <Radio value="cash" className={cn(s.row_padding, 'payments')}>
                  Наличными
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </div>
      </div>
      <Button className={s.btn} htmlType="submit">
        купить билеты
      </Button>
    </Form>
  );
});
