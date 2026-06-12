import { useRef } from "react"
import { createPortal } from "react-dom"

export default function OrderModal({ open, children }) {
  const dialog = useRef()
  //   dialog.current.showModal()

  return createPortal(
    <dialog className="dialog" ref={dialog} open={open}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  )
}
