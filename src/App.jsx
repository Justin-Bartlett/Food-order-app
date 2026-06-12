import { useState } from "react"

import AvailableMeals from "./components/AvailableMeals"
import Header from "./components/Header"

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <>
      <Header />
      <AvailableMeals />
    </>
  )
}

export default App
