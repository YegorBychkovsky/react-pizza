import { CartItem } from '../redux/slices/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
//тут фишка в том, что мы просто берем "localStorage.getItem('cart')" и
//определяем как data, а потом уже если дата не null, то парсим JSON
//Если бы я этого не сделал, то TS ругался бы на меня за то, что
//"localStorage.getItem('cart')" может быть равен null, даже если до этого
//я бы проверил его на наличие данных (localStorage.getItem('cart') ? ... : ...)
