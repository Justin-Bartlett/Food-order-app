import { useState, useContext } from "react"
import { FoodOrderContext } from "../store/food-order-context"
import Button from "./Button"
import OrderModal from "./OrderModal"
import CheckoutModal from "./CheckoutModal"
import OrderPlacedModal from "./OrderPlacedModal"

export default function Meals({
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
  const [orderModalIsOpen, setOrderModalIsOpen] = useState(false)
  const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false)
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false)
  const [orderPlacedModalIsOpen, setOrderPlacedModalIsOpen] = useState(false)

  function handleAddMealToOrder(id) {
    foodOrder === undefined && resetFoodOrder()
    addMealToOrder(id)
    setOrderModalIsOpen(true)
  }

  function handleRemoveMealFromOrder(meal) {
    meal.quantity > 0 && removeMealFromOrder(meal.id)
    meal.quantity === 1 && setOrderModalIsOpen(false)
  }

  function handleCheckout() {
    setOrderModalIsOpen(false)
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
        setOrderModalIsOpen={setOrderModalIsOpen}
        orderModalIsOpen={orderModalIsOpen}
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
              <li key={meal.id} className="meal-item">
                <article>
                  <img
                    src={`http://localhost:3000/${meal.image.src}`}
                    alt={meal.name}
                  />
                  <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">£{meal.price}</p>
                    <p className="meal-item-description">{meal.description}</p>
                    <Button
                      className="button meal-item-actions"
                      onClick={() => handleAddMealToOrder(meal.id)}
                    >
                      Add to Order
                    </Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
