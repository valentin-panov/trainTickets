import { IPriceInfo, ITrain } from '../interfaces/Interfaces';

const toArray = (obj: IPriceInfo): Array<number> => {
  const result: [number] = [0];
  const values = Object.values(obj);
  values.forEach((value) => {
    if (value !== null) {
      result.push(Math.max.apply(null, Object.values(value)));
    }
  });
  return result;
};

const getMaxPrice = (train: ITrain) => {
  const prices = train.departure.price_info;
  const pricesArray = toArray(prices);
  return Math.max.apply(null, pricesArray);
};

export const getPriceRange = (data: ITrain[][]): { minPrice: number; maxPrice: number } => {
  const minPrice =
    Math.floor(data.reduce((prev, curr) => (prev[0].min_price < curr[0].min_price ? prev : curr))[0].min_price / 100) *
    100;
  const maxPrice =
    Math.ceil(
      getMaxPrice(data.reduce((prev, curr) => (getMaxPrice(prev[0]) > getMaxPrice(curr[0]) ? prev : curr))[0]) / 100
    ) * 100;

  return { minPrice, maxPrice };
};
