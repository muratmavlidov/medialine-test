import { IGood, INamesResult } from '../../services/api';
import ProductItem from './product-item';

interface IProductsListProps {
  products: IGood[],
  names: INamesResult,
  addProductToCart: Function,
  usd: number
}

const ProductsList = (props: IProductsListProps) => {
  const { products, names, usd } = props;

  return (
    <div className="b-products">
      {Object.entries(names).map(item => {
        return <ProductItem 
          item={item} products={products} 
          addProductToCart={props.addProductToCart} 
          usd={usd} 
        />
      })}
    </div>
  )
}

export default ProductsList;