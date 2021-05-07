import { IGood, IName, INameBData } from '../../services/api';
import ProductCard from '../product-card';
import Image from 'next/image'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from "@chakra-ui/react";
interface IProductItem {
  item: [string, IName],
  products: IGood[],
  addProductToCart: Function,
  usd: number
}

const ProductItem = ({ item, products, addProductToCart, usd }: IProductItem) => {

  const [groupId, itemData] = item;

  const getImage = (groupId: string) => {
    switch(true) {
      case groupId == "1":
        return '/book.jpeg'
      case groupId == "2":
        return "/food.jpeg"
      case groupId == "5":
        return "/sport.png"
      case groupId == "8":
        return "/plumbing.jpeg"
      case groupId == "10":
        return "/spares.jpeg"
      case groupId == "15":
        return "/souvenir.jpeg"
      default:
        return null
    }
  }

  const renderProductCard = (name: [string, INameBData]) => {
    const [id, data] = name;
    const product = products.find(({ T }) => T.toString() == id);

    if (!product) return;

    const addToCart = () => {
      addProductToCart(productData)
    }

    const productData = {
      image: getImage(groupId),
      title: data.N,
      price: product.C,
      count: product.P,
      inCartCount: 1,
      id
    }

    return <ProductCard 
      productData={productData} 
      isCart={false} 
      addToCart={addToCart}
      usd={usd}
    />
  }

  return (
    <Accordion defaultIndex={[1]} allowMultiple key={groupId}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {itemData.G}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <div className="b-productsList">
            {Object.entries(itemData.B).map(renderProductCard)}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default ProductItem;