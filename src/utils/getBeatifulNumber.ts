export const getBeautifulNumber = (value: number | string, separator = ' '): string =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

export const formatPrice = (price: string | number, makeCorrect = false): string => {
  const v = price
    .toString()
    .replace(',', '.')
    .replace(/[^\d.]/g, '')
    .replace(/^0+(\d)/, '$1');

  if (v === '0') {
    return makeCorrect ? '0.00' : '0.';
  }

  if (v === '') {
    return makeCorrect ? '0.00' : '';
  }

  let indexDot = null;
  let res = '';
  for (let i = 0; i < v.length; i++) {
    if (v[i] === '.') {
      if (indexDot === null) {
        if (i === 0) {
          indexDot = 1;
          res += '0.';
        } else {
          indexDot = i;
          res += '.';
        }
      }
    } else {
      res += v[i];
    }
  }

  if (indexDot !== null) {
    const dif = res.length - indexDot - 3;
    if (dif > 0) {
      if (makeCorrect) {
        res = res.slice(0, -dif);
      }
    } else if (makeCorrect && dif < 0) {
      res = res.padEnd(res.length + Math.abs(dif), '0');
    }
  } else if (makeCorrect) {
    res += '.00';
  }

  return res;
};
