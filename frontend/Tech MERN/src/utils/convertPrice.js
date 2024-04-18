import { useSelector } from 'react-redux';

const ConvertPriceHook = () => {
  const { currency } = useSelector((state) => state.currencyStore);
  const convertPrice = (price) => {
    if (currency === 'EUR') {
      return `${(price * 1).toFixed(2)} EUR`;
    } else if (currency === 'USD') {
      return `${(price * 1.07).toFixed(2)} $`;
    } else if (currency === 'RSD') {
      return `${(price * 117).toLocaleString()} RSD`;
    }
  };

  return convertPrice;
};
export default ConvertPriceHook;
