import { useContext } from "react"

import CartButton from "./CartButton"
import logo from "../assets/logo.jpg"
import { FoodOrderContext } from "../store/food-order-context"

export default function Header() {
  const { foodOrder } = useContext(FoodOrderContext)
  // TODO - have the foodOrder.length replaced with something that
  //     recognises whether foodOrder array items have quantities of over 1 and take
  //     them into account

  const totalItems = foodOrder.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  )
  console.log("HEADER: - ", foodOrder.length)
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>REACTFOOD</h1>
      </div>
      <CartButton itemsInCart={totalItems} />
    </header>
  )
}
