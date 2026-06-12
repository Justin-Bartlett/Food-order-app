import { useState, useContext } from "react"
import { FoodOrderContext } from "../store/food-order-context"
import OrderModal from "../components/OrderModal"

export default function Meals({
  meals,
  title,
  price,
  description,
  isLoading,
  loadingText,
  fallbackText,
}) {
  const { addMealToOrder, foodOrder } = useContext(FoodOrderContext)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function handleAddMealToOrder(id) {
    addMealToOrder(id)
    setModalIsOpen(true)
  }

  return (
    <>
      <OrderModal open={modalIsOpen}>
        <h3>Your Order</h3>
        <ul className="meals">
          {foodOrder.map((meal) => (
            <li key={meal.id} className="meal-item">
              <p>{meal.title}</p>
              <p className="meal-item-price">£{meal.price}</p>
              <p className="meal-item-description">{meal.description}</p>
            </li>
          ))}
        </ul>
      </OrderModal>
      <section className="meal-category">
        {isLoading && <p className="fallback-text">{loadingText}</p>}
        {!isLoading && meals.length === 0 && (
          <p className="fallback-text">{fallbackText}</p>
        )}
        {!isLoading && meals.length > 0 && (
          <ul className="meals">
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
