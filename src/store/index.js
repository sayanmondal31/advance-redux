import { configureStore} from "@reduxjs/toolkit";
import uiReducer from "./app/ui-slice"
import cartSliceReducer from "./app/cart-slice"

const store = configureStore({
    reducer: {ui:uiReducer, cart: cartSliceReducer}
})

export default store