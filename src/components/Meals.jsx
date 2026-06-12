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
        <div className="cart">
          <h3>Your Order</h3>
          <div id="meals">
            <ul>
              {foodOrder.map((meal) => (
                <li key={foodOrder.indexOf(meal)} className="cart-item">
                  <p>{`${meal.name} - ${meal.quantity} x £${meal.price}`}</p>
                  <div className="cart-item-actions"></div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p>
              Total Price: £
              {foodOrder
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </OrderModal>
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
