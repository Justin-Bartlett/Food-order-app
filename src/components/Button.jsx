export default function Button({
  children,
  itemsInCart,
  className,
  textOnly,
  ...props
}) {
  let cssClasses = textOnly ? "text-button" : "button"
  cssClasses += " " + className

  return (
    <button className={cssClasses} {...props}>
      {children}
      {textOnly ? `(${itemsInCart})` : ""}
    </button>
  )
}
