import React, { memo } from 'react';
import cn from 'clsx';
import s from './MSHeaderMotto.module.scss';

export type Props = {
  className?: string;
};

export const MSHeaderMotto = memo<Props>(({ className }) => (
  <div className={cn(s.root, className)}>
    <span>Вся жизнь -</span>
    <span className={s.secondLine}>путешествие!</span>
  </div>
));
