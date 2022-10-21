import React, { memo } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import s from './Progress.module.scss';
import { ReactComponent as Circle1 } from './svg/1.svg';
import { ReactComponent as Circle2 } from './svg/2.svg';
import { ReactComponent as Circle3 } from './svg/3.svg';
import { ReactComponent as Circle4 } from './svg/4.svg';
import { AppDispatch, RootState } from '../../../store';
import { appStateSetProgress } from '../../../reducers/appState';
import { orderReset } from '../../../reducers/order';

export type Props = {
  className?: string;
};

export const Progress = memo<Props>(({ className }) => {
  const progress = useSelector((store: RootState) => store.appState.progress);
  const dispatch = useDispatch<AppDispatch>();
  const setProgress = (stage: number) => {
    if (stage >= progress) {
      return;
    }
    if (stage === 0) {
      dispatch(orderReset());
    }
    dispatch(appStateSetProgress(stage));
  };

  return (
    <div className={cn(s.root, className)}>
      <div className={cn(s.progress__item, s.progress__item_active)}>
        <button
          className={s.progress__item_button}
          type="button"
          onClick={() => {
            setProgress(0);
          }}
        >
          <div className={cn(s.container)}>
            <Circle1 />
            <span>Билеты</span>
          </div>
        </button>
      </div>

      <div className={cn(s.progress__item, `${progress >= 1 ? s.progress__item_active : ''}`)}>
        <button
          className={s.progress__item_button}
          disabled={progress < 1}
          type="button"
          onClick={() => {
            setProgress(1);
          }}
        >
          <div className={cn(s.container)}>
            <Circle2 />
            <span>Пассажиры</span>
          </div>
        </button>
      </div>

      <div className={cn(s.progress__item, `${progress >= 2 ? s.progress__item_active : ''}`)}>
        <button
          className={s.progress__item_button}
          disabled={progress < 2}
          type="button"
          onClick={() => {
            setProgress(2);
          }}
        >
          <div className={cn(s.container)}>
            <Circle3 />
            <span>Оплата</span>
          </div>
        </button>
      </div>

      <div className={cn(s.progress__item, `${progress >= 3 ? s.progress__item_active : ''}`)}>
        <button
          className={s.progress__item_button}
          disabled={progress < 3}
          type="button"
          onClick={() => {
            setProgress(3);
          }}
        >
          <div className={cn(s.container)}>
            <Circle4 />
            <span>Проверка</span>
          </div>
        </button>
      </div>
    </div>
  );
});
