import { useState } from "react"

import AvailableMeals from "./components/AvailableMeals"
import Header from "./components/Header"
import FoodOrderContextProvider from "./store/food-order-context.jsx"

function App() {
  const [orderModalIsOpen, setOrderModalIsOpen] = useState(false)

  return (
    <FoodOrderContextProvider>
      <Header
        ordermodalisopen={orderModalIsOpen}
        setordermodalisopen={setOrderModalIsOpen}
      />
      <AvailableMeals
        ordermodalisopen={orderModalIsOpen}
        setordermodalisopen={setOrderModalIsOpen}
      />
    </FoodOrderContextProvider>
  )
}

export default App
