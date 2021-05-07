import { isEmpty } from 'lodash';
import ProductCard, { IProductData } from '../product-card';

interface ICartProps {
  items: IProductData[],
  updateCartItem: Function,
  usd: number
}

const Cart = ({ items, updateCartItem, usd }: ICartProps) => {

  const renderItem = (item: IProductData) => {
    return (
      <div className="b-cart__listItem">
        <ProductCard productData={item} isCart={true} updateCartItem={updateCartItem} usd={usd} />
      </div>
    )
  }

  const getFinalSum = () => {
    return items.reduce((acc, curr) => {
      const coef = curr.inCartCount ? curr.inCartCount : 1;
      return acc + curr.price * coef * usd;
    }, 0)
  }

  if (isEmpty(items)) {
    return (
      <div className="b-cart__message">В корзине пусто</div>
    )
  }

  return (
    <div className="b-cart">
      <h3 className="b-cart__title">Корзина</h3>

      <div className="b-cart__list">
        {items.map(renderItem)}
      </div>

      <div className="b-cart__amount">
        Итого: <strong>{getFinalSum().toFixed(2)} р.</strong>
      </div>
    </div>
  )
}

export default Cart;