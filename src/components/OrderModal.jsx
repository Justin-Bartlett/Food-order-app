import Modal from "./modal"

export default function OrderModal({
  foodOrder,
  setOrderModalIsOpen,
  orderModalIsOpen,
  handleCheckout,
  addMealToOrder,
  handleRemoveMealFromOrder,
}) {
  return (
    <Modal open={orderModalIsOpen}>
      <div className="cart">
        <h3>Your Order</h3>
        <div id="meals">
          <ul>
            {foodOrder &&
              foodOrder.map((meal) => (
                <li key={foodOrder.indexOf(meal)} className="cart-item">
                  <p>{`${meal.name} - ${meal.quantity} x £${meal.price}`}</p>
                  <div className="cart-item-actions">
                    <button onClick={() => handleRemoveMealFromOrder(meal)}>
                      -
                    </button>
                    {meal.quantity}
                    <button onClick={() => addMealToOrder(meal.id)}>+</button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <p className="cart-total">
          £
          {foodOrder &&
            foodOrder
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}
        </p>
        <div className="modal-actions">
          <button
            className="text-button"
            onClick={() => setOrderModalIsOpen(false)}
          >
            Close
          </button>
          <button className="button" onClick={handleCheckout}>
            Go to Checkout
          </button>
        </div>
      </div>
    </Modal>
  )
}
