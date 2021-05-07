import { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react"
import Image from 'next/image'

export interface IProductData {
  image: string,
  title: string,
  price: number,
  count: number,
  id: string,
  inCartCount: number
}

interface IProductCardProps {
  productData: IProductData,
  isCart: boolean,
  addToCart?: Function,
  updateCartItem?: Function,
  usd: number
}

const ProductCard = ({ productData, isCart, addToCart, updateCartItem, usd }: IProductCardProps) => {
  const [inCartCount, setInCartCount] = useState(productData.inCartCount || 1);
  const [itemAdded, setItemAdded] = useState(false);
  const usdRef = useRef(usd);
  const [rate, setRate] = useState('increased')

  useEffect(() => {
    updateCartItem?.(productData.id, inCartCount)
  }, [inCartCount])

  const onDecreaseInCartCount = () => {
    if (inCartCount == 1) return;
    setInCartCount(inCartCount - 1)
  }

  const onIncreaseInCartCount  = () => {
    if (inCartCount == productData.count) return;
    setInCartCount(inCartCount + 1)
  }

  const addItem = () => {
    addToCart();
    setItemAdded(true);
  }

  useEffect(() => {
    const prevUsd = usdRef.current;
    prevUsd > usd ? setRate('increased') : setRate('decreased');
    usdRef.current = usd;
  }, [usd])

  return (
    <div className="b-products__item">
      <div className="b-products__itemImage">
        <Image src={productData.image} width="100%" height="100%" />
      </div>
      <div className="b-products__itemBody">
        <h3 className="b-products__itemTitle">{productData.title}</h3>
        <div className={`b-products__itemPrice b-products__itemPrice--${rate}`}>Цена: <strong>{(productData.price * usd).toFixed(2)} р.</strong></div>
        <div className="b-products__itemCount">В наличии: <strong>{productData.count}шт</strong>.</div>

        {isCart && (
          <div className="b-products__itemControlPanel">
            <button className="b-products__itemControlButton" onClick={onDecreaseInCartCount}>-</button>
            <div className="b-products__itemControlButton">{inCartCount}</div>
            <button className="b-products__itemControlButton" onClick={onIncreaseInCartCount}>+</button>
          </div>
        )}

        <div className="b-products__itemButton">
          {!isCart && !itemAdded && (<Button colorScheme="blue" onClick={addItem}>Купить</Button>)}
          {itemAdded && (
              <Button colorScheme="teal" variant="outline">
                В корзину
              </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard;