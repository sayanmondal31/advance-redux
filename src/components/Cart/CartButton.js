import { useDispatch,useSelector } from 'react-redux';
import { uiActions } from '../../store/app/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch()
  const cartQuanty = useSelector(state => state.cart.totaItem)
  function toggleHandler(){
    dispatch(uiActions.toggle())
  }
  return (
    <button onClick={toggleHandler}  className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuanty}</span>
    </button>
  );
};

export default CartButton;
