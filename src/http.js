export async function fetchAvailableMeals() {
  const response = await fetch("http://localhost:3000/meals")
  const resData = await response.json()

  if (!response.ok) {
    throw new Error("Failed to fetch meals")
  }

  return resData.meals
}

export async function postOrder(orderData) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit order")
  }

  return result
}
