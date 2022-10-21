export const capitalize = (str: string): string => {
  const stringArray = str.split(/([\s-(])/g);
  return stringArray.map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join('');
};
