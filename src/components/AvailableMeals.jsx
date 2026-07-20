import { useState, useEffect } from "react"
import Meals from "./Meals.jsx"
import Error from "./Error"
import { fetchAvailableMeals } from "../http.js"
import { useFetch } from "../hooks/useFetch.js"

async function fetchMeals() {
  const meals = await fetchAvailableMeals()
  return meals
}

export default function AvailableMeals({
  ordermodalisopen,
  setordermodalisopen,
}) {
  const {
    isFetching,
    error,
    fetchedData: availableMeals,
  } = useFetch(fetchMeals, [])

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
      ordermodalisopen={ordermodalisopen}
      setordermodalisopen={setordermodalisopen}
      meals={availableMeals}
      isLoading={isFetching}
      loadingText="Fetching meal data..."
      fallbackText="No meals available."
    />
  )
}
