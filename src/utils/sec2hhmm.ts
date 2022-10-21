import { declOfNum } from './declOfNum';

export const sec2hhmm = (sec: number): { hh: string; mm: string; hours: string; minutes: string } => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  const hh = hours > 9 ? hours : `0${hours}`;
  const mm = minutes > 9 ? minutes : `0${minutes}`;
  return {
    hh: `${hh}`,
    mm: `${mm}`,
    hours: `${hours} ${declOfNum(hours, ['час', 'часа', 'часов'])}`,
    minutes: `${minutes} ${declOfNum(minutes, ['минута', 'минуты', 'минут'])}`,
  };
};
