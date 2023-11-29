export const formattedNumber = (value) => {
  return new Intl.NumberFormat().format(value) + '원';
};
