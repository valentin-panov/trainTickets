import React, { memo } from 'react';
import cn from 'clsx';
import s from './LandingPage.module.scss';
import { About } from '../About';
import { HowItWorks } from '../HowItWorks';
import { Reviews } from '../Reviews';

export type Props = {
  className?: string;
};

export const LandingPage = memo<Props>(({ className }) => (
  <div className={cn(s.root, className)}>
    <About />
    <HowItWorks />
    <Reviews />
  </div>
));
