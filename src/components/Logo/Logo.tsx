import React, { memo } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import smoothscroll from 'smoothscroll-polyfill';

import cn from 'clsx';
import s from './Logo.module.scss';

export type Props = {
  className?: string;
};

// kick off the polyfill!
smoothscroll.polyfill();

export const Logo = memo<Props>(({ className }) => (
  <Link smooth to="/" className={cn(s.root, className)}>
    Лого
  </Link>
));
