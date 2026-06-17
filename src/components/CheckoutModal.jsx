import { useActionState, useState } from "react"

import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualToOtherValue,
} from "./util/validation"

import Modal from "./modal"

function checkoutAction(prevCheckoutState, formData) {
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

  return { errors: null }
}

export default function CheckoutModal({
  foodOrder,
  checkoutModalIsOpen,
  setCheckoutModalIsOpen,
}) {
  const [formState, formAction] = useActionState(checkoutAction, {
    errors: null,
  })

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

          <div className="modal-actions">
            <button
              className="text-button"
              onClick={() => setOrderModalIsOpen(false)}
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
