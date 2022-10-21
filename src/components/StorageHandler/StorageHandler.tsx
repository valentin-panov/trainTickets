import { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { storageHandlerAdapter } from 'packages/storage/adapters/StorageHandlerAdapter';
import { setToken } from '../../reducers/token';

export type Props = {
  className?: string;
  children?: never;
};

export const StorageHandler = memo<Props>(() => {
  const { token } = useSelector((store: RootState) => store);
  const dispatch = useDispatch<AppDispatch>();

  const mounted = useRef<boolean>(false);

  useEffect(() => {
    // Если монтирование
    if (!mounted.current) {
      mounted.current = true; // Отмечаем, что монтирование было

      // данные из локального стора помещаем в стэйт менеджер
      storageHandlerAdapter.get().then((data) => {
        if (!data) return;
        if (data.token) dispatch(setToken(data.token));
      });
    } else {
      storageHandlerAdapter.set({ token });
    }
  }, [dispatch, token]);

  return null;
});
