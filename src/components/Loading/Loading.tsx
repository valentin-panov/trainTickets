import React, { memo } from 'react';
import cn from 'clsx';
import s from './Loading.module.scss';
import loadingImg from './img/loading.gif';
// нужно как-то закешировать эту картинку до того момента, как она понадобится

export type Props = {
  className?: string;
};

export const Loading = memo<Props>(({ className }) => (
  <div className={cn(s.root, className)}>
    <div className={s.bar} />
    <img src={loadingImg} alt="loading..." />
  </div>
));
