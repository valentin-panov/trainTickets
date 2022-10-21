import React, { memo } from 'react';
import cn from 'clsx';
import { Pagination } from 'antd';
import s from './PaginationOrigin.module.scss';
import './reant.css';

export type Props = {
  className?: string;
  data: { current: number; total: number; pageSize: number; onChange: (value: number) => void };
};

export const PaginationOrigin = memo<Props>(({ className, data }) => {
  const { total, current, pageSize, onChange } = data;
  return (
    <div className={cn(s.root, className)}>
      <Pagination
        current={current}
        total={total}
        hideOnSinglePage
        pageSize={pageSize}
        onChange={onChange}
        showLessItems
        showSizeChanger={false}
      />
    </div>
  );
});
