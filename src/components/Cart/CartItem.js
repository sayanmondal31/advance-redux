import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/app/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;

  const dispatch = useDispatch()

  const removeItemHandler = () =>{
    dispatch(cartAction.removeFromCart(id))
  }

  const addItemHandler = () =>{
    dispatch(cartAction.addToCart({id,title,price}))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total}
          <span className={classes.itemprice}>(${price}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler} >+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
