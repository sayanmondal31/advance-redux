import { uiActions } from "./ui-slice";
import { cartAction } from "./cart-slice";

// custom action creator function =>  thunk
export const sendCartData = (cart) => {
  return async (dispatch) => {
    //⏰ pending notification
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    // 📈 send data to database
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-a8a2e-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            cartItems: cart.cartItems,
            totaItem: cart.totaItem,
          }),
        }
      );

      // checking response status
      if (!response.ok) {
        throw Error("sending cart data failed");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending data to db failed",
        })
      );
    }
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-a8a2e-default-rtdb.firebaseio.com/cart.json",
        {
          method: "GET",
        }
      );

      // checking response status
      if (!response.ok) {
        throw Error("sending cart data failed");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartAction.replaceCart({
          cartItems: cartData.cartItems || [],
          totaItem:cartData.totaItem
      }));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "fetching data to db failed",
        })
      );
    }
  };
};
