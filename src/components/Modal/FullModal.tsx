import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FullModalOrigin, Props as FullModalOriginProps } from './FullModalOrigin';

export type Props = FullModalOriginProps & {
  visible: boolean;
};

export const FullModal = memo<Props>(({ children, visible, ...props }) => {
  const [mounted, setMounted] = useState(visible);
  useEffect(() => {
    if (visible) {
      setMounted(true);
    }
  }, [visible]);

  const visibleCopy = useRef(visible);
  useEffect(() => {
    visibleCopy.current = visible;
  }, [visible]);

  const onTransitionEnd = useCallback(() => {
    if (!visibleCopy.current) {
      setMounted(false);
    }
  }, []);

  const [debouncedVisible, setDebouncedVisible] = useState(visible);
  useEffect(() => {
    setTimeout(() => setDebouncedVisible(visible));
  }, [visible]);

  if (!mounted) return null;

  return createPortal(
    <FullModalOrigin onTransitionEnd={onTransitionEnd} visible={debouncedVisible} {...props}>
      {children}
    </FullModalOrigin>,
    document?.body
  );
});
