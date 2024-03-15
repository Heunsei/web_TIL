import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCT = [
  {
    id: 'p1',
    price: 6,
    title: 'first book',
    description: 'the first book'
  },
  {
    id: 'p2',
    price: 3,
    title: 'second book',
    description: 'the second book'
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCT.map((element) => {
            return (
              <ProductItem
                key={element.id}
                id={element.id}
                title={element.title}
                price={element.price}
                description={element.description}
              />
            )
          })
        }

      </ul>
    </section>
  );
};

export default Products;
