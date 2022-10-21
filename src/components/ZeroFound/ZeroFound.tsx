import React, { ReactElement } from 'react';
import s from './ZeroFound.module.scss';

export default function ZeroFound(): ReactElement {
  return (
    <section className={s.root}>
      <h2>По выбранным параметрам совпадений не найдено.</h2>
      <p>Попробуйте другие параметры поиска</p>
    </section>
  );
}
