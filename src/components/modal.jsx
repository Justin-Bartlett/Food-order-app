import { useRef, useEffect } from "react"
import { createPortal } from "react-dom"

export default function Modal({ open, children }) {
  const dialog = useRef()

  useEffect(() => {
    if (!dialog.current) return

    if (open && !dialog.current.open) {
      dialog.current.showModal()
    } else if (!open && dialog.current.open) {
      dialog.current.close()
    }
  }, [open])

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  )
}
