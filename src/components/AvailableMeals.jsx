import { useState, useEffect, useContext } from "react"
import Meals from "./Meals.jsx"
import Error from "./Error"
import { fetchAvailableMeals } from "../http.js"
import { useFetch } from "../hooks/useFetch.js"
import { FoodOrderContext } from "../store/food-order-context.jsx"

async function fetchMeals() {
  const meals = await fetchAvailableMeals()
  return meals
}

export default function AvailableMeals() {
  const {} = useContext(FoodOrderContext)

  const {
    isFetching,
    error,
    fetchedData: availableMeals,
  } = useFetch(fetchMeals, [])

  console.log(availableMeals)

  if (error) {
    return (
      <Error
        title="An error occurred fetching the meals"
        message={error.message}
      />
    )
  }

  return (
    <Meals
      meals={availableMeals}
      isLoading={isFetching}
      loadingText="Fetching meal data..."
      fallbackText="No meals available."
    />
  )
}
