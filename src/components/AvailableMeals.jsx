import Meals from "./Meals"
import Error from "./Error"
import { fetchAvailableMeals } from "../../http"
import { useFetch } from "../hooks/useFetch"

async function fetchMeals() {
  const meals = await fetchAvailableMeals()
}

export default function Meals() {
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
      meals={availableMeals}
      isLoading={isFetching}
      loadingText="Fetching meal data..."
      fallbackText="No meals available."
    />
  )
}
