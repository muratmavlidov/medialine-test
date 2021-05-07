import { IGood, IName, INameBData } from '../../services/api';
import ProductCard from '../product-card';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from "@chakra-ui/react";

import bookImage from '../../images/book.jpeg';
import foodImage from '../../images/food.jpeg';
import plumbingImage from '../../images/plumbing.jpeg';
import souvenirImage from '../../images/souvenir.jpeg';
import sparesImage from '../../images/spares.jpeg';
import sportImage from '../../images/sport.png';

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
        return bookImage
      case groupId == "2":
        return foodImage
      case groupId == "5":
        return sportImage
      case groupId == "8":
        return plumbingImage
      case groupId == "10":
        return sparesImage
      case groupId == "15":
        return souvenirImage
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