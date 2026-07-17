import { createContext, useReducer, useCallback, useEffect } from "react"

import { useFetch } from "../hooks/useFetch"
import { fetchAvailableMeals } from "../http"

export const FoodOrderContext = createContext({
  foodOrder: [],
  availableMeals: [],
  resetFoodOrder: () => {},
  addMealToOrder: () => {},
  removeMealFromOrder: () => {},
  updateMealQuantity: () => {},
})

const foodOrderReducer = (state, action) => {
  console.log("foodOrder = : ", state.foodOrder)
  const updatedMeals = [...state.foodOrder]
  switch (action.type) {
    case "SET_AVAILABLE_MEALS": {
      return {
        ...state,
        availableMeals: action.payload,
      }
    }
    case "RESET_FOOD_ORDER": {
      return {
        ...state,
        foodOrder: [],
      }
    }
    case "ADD": {
      const meal = state.availableMeals.find(
        (meal) => meal.id === action.payload,
      )

      const alreadyOrderedMealIndex = updatedMeals.findIndex(
        (item) => item.id === action.payload,
      )

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

      return {
        ...state,
        foodOrder: updatedMeals,
      }
    }
    case "REMOVE": {
      const meal = updatedMeals.find((meal) => meal.id === action.payload)
      console.log("meal.quantity = : ", meal.quantity)

      if (meal.quantity > 1) {
        const mealToRemoveIndex = updatedMeals.findIndex(
          (item) => item.id === action.payload,
        )
        updatedMeals[mealToRemoveIndex] = {
          ...updatedMeals[mealToRemoveIndex],
          quantity: updatedMeals[mealToRemoveIndex].quantity - 1,
        }
      } else {
        const mealsWithOneRemoved = updatedMeals.filter(
          (meal) => meal.id !== action.payload,
        )
        return {
          ...state,
          foodOrder: mealsWithOneRemoved,
        }
      }
      return {
        ...state,
        foodOrder: updatedMeals,
      }
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

  function handleResetFoodOrder() {
    foodOrderDispatch({
      type: "RESET_FOOD_ORDER",
    })
  }

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
    resetFoodOrder: handleResetFoodOrder,
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
