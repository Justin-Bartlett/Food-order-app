export default function MealItem({ image, title, price, description }) {
  return (
    <article className="meal-item">
      <img src={image} alt="meal image" />
      <h3>{title}</h3>
      <p className="meal-item-price">£{price}</p>
      <p className="meal-item-description">{description}</p>
      <button className="button meal-item-actions">Add to Cart</button>
    </article>
  )
}
