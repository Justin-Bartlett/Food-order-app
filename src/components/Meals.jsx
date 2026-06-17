import { useState, useContext } from "react"
import { FoodOrderContext } from "../store/food-order-context"
import OrderModal from "./OrderModal"
import FormModal from "./CheckoutModal"

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
      <FormModal
        foodOrder={foodOrder}
        checkoutModalIsOpen={checkoutModalIsOpen}
        setCheckoutModalIsOpen={setCheckoutModalIsOpen}
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
                    alt="meal image"
                  />
                  <h3>{meal.title}</h3>
                  <p className="meal-item-price">£{meal.price}</p>
                  <p className="meal-item-description">{meal.description}</p>
                  <button
                    className="button meal-item-actions"
                    onClick={() => handleAddMealToOrder(meal.id)}
                  >
                    Add to Order
                  </button>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
