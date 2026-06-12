import { createContext, useReducer, useCallback, useEffect } from "react"

import { useFetch } from "../hooks/useFetch"
import { fetchAvailableMeals } from "../http"

export const FoodOrderContext = createContext({
  foodOrder: [],
  availableMeals: [],
  addMealToOrder: () => {},
  removeMealFromOrder: () => {},
  updateMealQuantity: () => {},
})

const foodOrderReducer = (state, action) => {
  switch (action.type) {
    case "SET_AVAILABLE_MEALS": {
      return {
        ...state,
        availableMeals: action.payload,
      }
    }
    case "ADD": {
      const updatedMeals = [...state.foodOrder]
      const meal = state.availableMeals.find(
        (meal) => meal.id === action.payload,
      )

      const alreadyOrderedMealIndex = updatedMeals.findIndex(
        (item) => item.id === action.payload,
      )

      console.log("state.availableMeals: ", state.availableMeals)
      console.log("UPDATED MEALS: ", updatedMeals)
      console.log("MEAL: ", meal)

      if (alreadyOrderedMealIndex !== -1) {
        updatedMeals[alreadyOrderedMealIndex] = {
          ...updatedMeals[alreadyOrderedMealIndex],
          quantity: updatedMeals[alreadyOrderedMealIndex].quantity + 1,
        }
      } else {
        updatedMeals.push({
          id: action.payload,
          name: meal.name,
          price: meal.price,
          quantity: 1,
        })
      }

      console.log("UPDATED MEALS(after push): ", updatedMeals)

      return {
        ...state,
        foodOrder: updatedMeals,
      }
    }
    case "REMOVE": {
      return state
    }
    case "UPDATE": {
      return state
    }
  }
  return {
    ...state,
    foodOrder: state.foodOrder,
  }
}

export default function FoodOrderContextProvider({ children }) {
  const fetchMeals = useCallback(async () => {
    const meals = await fetchAvailableMeals()
    return meals
  }, [])

  const {
    isFetching,
    error,
    fetchedData: availableMeals,
  } = useFetch(fetchMeals, [])

  const [foodOrderState, foodOrderDispatch] = useReducer(foodOrderReducer, {
    foodOrder: [],
    availableMeals: availableMeals || [],
  })

  useEffect(() => {
    foodOrderDispatch({
      type: "SET_AVAILABLE_MEALS",
      payload: availableMeals || [],
    })
  }, [availableMeals])

  function handleAddMealToOrder(id) {
    foodOrderDispatch({
      type: "ADD",
      payload: id,
    })
  }

  function handleRemoveMealFromOrder(id) {
    foodOrderDispatch({
      type: "REMOVE",
      payload: id,
    })
  }

  function handleUpdateMealQuantity(mealId, amount) {
    foodOrderDispatch({
      type: "UPDATE",
      payload: {
        mealId,
        amount,
      },
    })
  }

  const ctxValue = {
    foodOrder: foodOrderState.foodOrder,
    availableMeals: availableMeals || [],
    addMealToOrder: handleAddMealToOrder,
    removeMealFromOrder: handleRemoveMealFromOrder,
    updateMealQuantity: handleUpdateMealQuantity,
  }

  return (
    <FoodOrderContext.Provider value={ctxValue}>
      {children}
    </FoodOrderContext.Provider>
  )
}
