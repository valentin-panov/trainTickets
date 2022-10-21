import { Link } from 'react-router-dom';
import React, { memo, ReactElement } from 'react';
import cn from 'clsx';
import s from './SocialIcon.module.scss';

export type Props = {
  className?: string;
  iconLink: string;
  icon: ReactElement;
};

export const SocialIcon = memo<Props>(({ className, iconLink, icon }) => (
  <li className={cn(s.root, className)}>
    <Link to={iconLink}>
      <div className={s.socials__image}>
        {icon}
        {/* <img src={iconSrc} alt={iconAlt} /> */}
      </div>
    </Link>
  </li>
));
