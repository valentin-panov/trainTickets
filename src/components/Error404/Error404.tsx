import React, { ReactElement } from 'react';
import cn from 'clsx';
import s from './Error404.module.scss';

export default function Error404(): ReactElement {
  return (
    <section className={cn(s.root)}>
      <h2>Ошибка 404: страница не найдена</h2>
      <p>Извините, такая страница не найдена. Начните новый поиск направления.</p>
    </section>
  );
}
