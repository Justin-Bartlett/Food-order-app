import { useActionState, useCallback, useEffect, useState } from "react"

import Error from "./Error"
import { useFetch } from "../hooks/useFetch.js"

import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualToOtherValue,
} from "./util/validation"

import Modal from "./modal"
import OrderPlacedModal from "./OrderPlacedModal.jsx"
import { postOrder } from "../http"

function checkoutAction(prevCheckoutState, formData, foodOrder) {
  const name = formData.get("name")
  const email = formData.get("email")
  const street = formData.get("street")
  const postcode = formData.get("postcode")
  const city = formData.get("city")

  let errors = []

  if (!isNotEmpty(name)) {
    errors.push("Please provide your full name")
  }

  if (!isNotEmpty(email) && !isEmail(email)) {
    errors.push("Invalid email address...")
  }

  if (!isNotEmpty(street)) {
    errors.push("Please provide a street name")
  }

  if (!isNotEmpty(postcode)) {
    errors.push("Please provide a postcode")
  }

  if (!isNotEmpty(city)) {
    errors.push("Please provide a city")
  }

  if (errors.length > 0) {
    return {
      errors,
      enteredValues: {
        name,
        email,
        street,
        postcode,
        city,
      },
    }
  }

  const orderData = {
    order: {
      items: foodOrder,
      customer: {
        name,
        email,
        street,
        "postal-code": postcode,
        city,
      },
    },
  }

  return {
    errors: null,
    enteredValues: {
      name,
      email,
      street,
      postcode,
      city,
    },
    orderData,
  }
}

export default function CheckoutModal({
  foodOrder,
  checkoutModalIsOpen,
  setCheckoutModalIsOpen,
  setOrderPlacedModalIsOpen,
  handleOrderPlaced,
}) {
  const [formState, formAction] = useActionState(
    (prev, formData) => checkoutAction(prev, formData, foodOrder),
    {
      errors: null,
    },
  )

  const postOrderFn = useCallback(() => {
    if (!formState.orderData) {
      return null
    }

    return postOrder(formState.orderData)
  }, [formState.orderData])

  const [orderPlaced, setOrderPlaced] = useState(false)

  const { isFetching, error, fetchedData } = useFetch(
    formState.orderData ? postOrderFn : null,
    null,
  )

  useEffect(() => {
    if (fetchedData && !isFetching && !orderPlaced) {
      setOrderPlaced(true)
      handleOrderPlaced()
    }
  }, [fetchedData, isFetching, orderPlaced, handleOrderPlaced])

  if (error) {
    return (
      <Error
        title="An error occurred adding the order"
        message={error.message}
      />
    )
  }

  return (
    <>
      <Modal open={checkoutModalIsOpen}>
        <form action={formAction}>
          <h3>Checkout</h3>
          <p className="">
            Total amount: £
            {foodOrder &&
              foodOrder
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
          </p>
          <div className="control">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={formState.enteredValues?.name}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              defaultValue={formState.enteredValues?.email}
            />

            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="street"
              name="street"
              defaultValue={formState.enteredValues?.street}
            />

            <div className="control-row">
              <div>
                <label htmlFor="postcode">Postcode</label>
                <input
                  id="postcode"
                  type="postcode"
                  name="postcode"
                  defaultValue={formState.enteredValues?.postcode}
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="city"
                  name="city"
                  defaultValue={formState.enteredValues?.city}
                />
              </div>
            </div>
          </div>

          {formState.errors && (
            <ul className="error">
              {formState.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          {fetchedData && !isFetching && (
            <p className="success">Thank you for your order!</p>
          )}

          <div className="modal-actions">
            <button
              className="text-button"
              onClick={() => setCheckoutModalIsOpen(false)}
            >
              Close
            </button>
            <button className="button">Submit Order</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
