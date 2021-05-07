import { getData, changeCart, updateUSD } from '../store/actions';
import { ProductsList, Cart } from '../components';
import { connect, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';

const dataRequestDelay = 15000;
const usdRequestDelay = 20000;

const Home = (props) => {
  const { products, names } = useSelector(state => state.products);
  const { items, usd } = useSelector(state => state.cart);

  const addProductToCart = (data) => {
    const cart = [...items, data];
    localStorage.setItem("cart", JSON.stringify(cart));
    props.changeCart(cart)
  }

  const updateCartItem = (id, inCartCount) => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));

    if (!isEmpty(savedCart)) {
      const newCart = savedCart.map(item => {
        if (item.id == id) {return { ...item, inCartCount }}
        return item;
      })
      props.changeCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart)) 
    }
  }

  const productsProps = { 
    products, 
    names,
    addProductToCart,
    updateCartItem,
    usd
  };

  useEffect(() => {
    const id = setInterval(props.getData, dataRequestDelay)
    const savedCartData = JSON.parse(localStorage.getItem("cart"));

    if (!isEmpty(savedCartData)) {
      props.changeCart(savedCartData)
    }

    props.getData();
    return () => clearInterval(id);
  }, [])

  const randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  const updateCurrency = () => {
    const apdatedUSD = randomInteger(50, 80);
    props.updateUSD(apdatedUSD)
  }

  useEffect(() => {
    const id = setInterval(updateCurrency, usdRequestDelay)
    return () => clearInterval(id);
  }, [])

  return (
    <div className="p-home">
      <div className="b-home">
        <div className="b-home__products">
          {products && names && <ProductsList {...productsProps} usd={usd} />}
        </div>
        <div className="b-home__cart">
          <Cart items={items} updateCartItem={updateCartItem} usd={usd} />
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  getData,
  changeCart,
  updateUSD
}
export default connect(null, mapDispatchToProps)(Home);