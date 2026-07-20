import { useContext } from "react"

import Button from "./UI/Button"
import logo from "../assets/logo.jpg"
import { FoodOrderContext } from "../store/food-order-context"

export default function Header({ ordermodalisopen, setordermodalisopen }) {
  const { foodOrder } = useContext(FoodOrderContext)
  let totalItems
  if (foodOrder && foodOrder.length > 0) {
    totalItems = foodOrder.reduce((sum, item) => sum + (item.quantity || 1), 0)
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>REACTFOOD</h1>
      </div>
      <Button
        onClick={setordermodalisopen}
        itemsInCart={totalItems > 0 ? totalItems : 0}
        textOnly
      >
        Cart
      </Button>
    </header>
  )
}
