import { useState } from "react"

import AvailableMeals from "./components/AvailableMeals"
import Header from "./components/Header"
import FoodOrderContextProvider from "./store/food-order-context.jsx"

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <FoodOrderContextProvider>
      <Header />
      <AvailableMeals />
    </FoodOrderContextProvider>
  )
}

export default App
