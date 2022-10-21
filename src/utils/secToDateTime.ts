export const secToDateTime = (secs: number): string => new Date(secs * 1000).toISOString().substring(11, 16);

export const secToDate = (secs: number): string => {
  const date = new Date(secs * 1000);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

export const YYYYMMDD2DDMMYYYY = (source: string): string => {
  const date = new Date(source);
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  return `${day.length === 1 ? 0 + day : day}.${month.length === 1 ? 0 + month : month}.${date.getFullYear()}`;
};
