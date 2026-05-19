import CartButton from "./CartButton"
import logo from "../assets/logo.jpg"

export default function Header() {
  let numItems = 3
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo" />
        <h1>REACTFOOD</h1>
      </div>
      <CartButton itemsInCart={numItems} />
    </header>
  )
}
