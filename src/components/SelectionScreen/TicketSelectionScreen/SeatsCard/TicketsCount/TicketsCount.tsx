import React, { memo, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import s from './TicketsCount.module.scss';

export type Props = {
  getTicketsCount: (adultCount: number, childrenCount: number, toddlerCount: number) => void;
};

export const TicketsCount = memo<Props>(({ getTicketsCount }) => {
  const maxAdultTicketsCount = 5;
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [childrenMax, setChildrenMax] = useState<number>(0);
  const [toddlerCount, setToddlerCount] = useState<number>(0);
  const [toddlerMax, setToddlerMax] = useState<number>(0);

  useEffect(() => {
    const rest = adultCount * 2 - childrenCount - toddlerCount;
    if (rest < 0 && toddlerCount > 0) {
      setToddlerCount(toddlerCount - 1);
    }
    if (rest < 0 && toddlerCount === 0) {
      setChildrenCount(childrenCount - 1);
    }
    setChildrenMax(rest);
    setToddlerMax(rest);
    getTicketsCount(adultCount, childrenCount, toddlerCount);
  }, [adultCount, childrenCount, getTicketsCount, toddlerCount]);

  return (
    <>
      <div className={s.ticketsCountTitle}>Количество билетов</div>
      <Form className={s.ticketsTypeRow}>
        <Form.Item className={s.inputCard}>
          <Input
            type="number"
            prefix="Взрослых — "
            defaultValue={0}
            value={adultCount}
            min={0}
            max={maxAdultTicketsCount}
            className={s.input}
            onChange={(e) => setAdultCount(Number(e.target.value))}
          />
          <div>Можно добавить еще {maxAdultTicketsCount - adultCount} пассажиров</div>
        </Form.Item>
        <Form.Item className={s.inputCard}>
          <Input
            type="number"
            prefix="Детских — "
            defaultValue={0}
            value={childrenCount}
            min={0}
            max={childrenMax + childrenCount}
            className={s.input}
            id="kids"
            onChange={(e) => setChildrenCount(Number(e.target.value))}
          />
          <div>
            Можно добавить еще {childrenMax} билетов для детей до 10 лет. Свое место в вагоне, как у взрослых, но
            дешевле в среднем на 50-65%
          </div>
        </Form.Item>
        <Form.Item className={s.inputCard}>
          <Input
            type="number"
            prefix="Детских «без места» — "
            defaultValue={0}
            value={toddlerCount}
            min={0}
            max={toddlerMax + toddlerCount}
            className={s.input}
            onChange={(e) => setToddlerCount(Number(e.target.value))}
          />
          <div>Можно добавить еще {toddlerMax} билетов для младенцев.</div>
        </Form.Item>
      </Form>
    </>
  );
});
