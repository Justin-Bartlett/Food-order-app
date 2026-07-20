import Button from "./UI/Button"

import { currencyFormatter } from "./util/formatting"

export default function MealItem({ meal, handleAddMealToOrder }) {
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image.src}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
          <Button
            className="button meal-item-actions"
            onClick={() => handleAddMealToOrder(meal.id)}
          >
            Add to Order
          </Button>
        </div>
      </article>
    </li>
  )
}
