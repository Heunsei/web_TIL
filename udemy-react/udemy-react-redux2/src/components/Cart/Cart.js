import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItem = useSelector((state) => state.cart.items)

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {
          cartItem.map((element) => {
            return (
              <CartItem
                key={element.id}
                item={{
                  id: element.id,
                  title: element.name,
                  quantity: element.quantity,
                  total: element.totalPrice,
                  price: element.price
                }}
              />
            )
          })
        }

      </ul>
    </Card>
  );
};

export default Cart;
