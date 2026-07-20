import { useState, useContext } from "react"
import { FoodOrderContext } from "../store/food-order-context"
import OrderModal from "./OrderModal"
import CheckoutModal from "./CheckoutModal"
import OrderPlacedModal from "./OrderPlacedModal"
import MealItem from "./MealItem"

export default function Meals({
  ordermodalisopen,
  setordermodalisopen,
  meals,
  title,
  price,
  description,
  isLoading,
  loadingText,
  fallbackText,
}) {
  const { resetFoodOrder, addMealToOrder, removeMealFromOrder, foodOrder } =
    useContext(FoodOrderContext)
  const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false)
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false)
  const [orderPlacedModalIsOpen, setOrderPlacedModalIsOpen] = useState(false)

  function handleAddMealToOrder(id) {
    foodOrder === undefined && resetFoodOrder()
    addMealToOrder(id)
    setordermodalisopen(true)
  }

  function handleRemoveMealFromOrder(meal) {
    meal.quantity > 0 && removeMealFromOrder(meal.id)
    meal.quantity === 1 && setordermodalisopen(false)
  }

  function handleCheckout() {
    setordermodalisopen(false)
    setCheckoutModalIsOpen(true)
  }

  function handleOrderPlaced() {
    setCheckoutModalIsOpen(false)
    setOrderPlacedModalIsOpen(true)
  }

  function handleFinishOrder() {
    setOrderPlacedModalIsOpen(false)
    resetFoodOrder()
  }

  return (
    <>
      <OrderModal
        foodOrder={foodOrder}
        setOrderModalIsOpen={setordermodalisopen}
        orderModalIsOpen={ordermodalisopen}
        handleCheckout={handleCheckout}
        addMealToOrder={addMealToOrder}
        handleRemoveMealFromOrder={handleRemoveMealFromOrder}
      />
      <CheckoutModal
        foodOrder={foodOrder}
        checkoutModalIsOpen={checkoutModalIsOpen}
        setCheckoutModalIsOpen={setCheckoutModalIsOpen}
        setOrderPlacedModalIsOpen={setOrderPlacedModalIsOpen}
        handleOrderPlaced={handleOrderPlaced}
      />
      <OrderPlacedModal
        orderPlacedModalIsOpen={orderPlacedModalIsOpen}
        handleFinishOrder={handleFinishOrder}
      />

      <section className="meal-category">
        {isLoading && <p className="fallback-text">{loadingText}</p>}
        {!isLoading && meals.length === 0 && (
          <p className="fallback-text">{fallbackText}</p>
        )}
        {!isLoading && meals.length > 0 && (
          <ul id="meals">
            {meals.map((meal) => (
              <MealItem
                key={meal.id}
                meal={meal}
                handleAddMealToOrder={handleAddMealToOrder}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
