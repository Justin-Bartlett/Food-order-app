import Modal from "./modal"

export default function OrderPlacedModal({
  setOrderModalIsOpen,
  orderPlacedModalIsOpen,
  handleFinishOrder,
}) {
  return (
    <Modal open={orderPlacedModalIsOpen}>
      <h3>Success!</h3>
      <p>Your order was submitted successfully.</p>
      <p>
        We will get back to you with more details via email within the next few
        minutes.
      </p>
      <button className="button" onClick={handleFinishOrder}>
        Okay
      </button>
    </Modal>
  )
}
