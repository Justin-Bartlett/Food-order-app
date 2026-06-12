import { createContext, useReducer } from "react"

export const FoodOrderContext = CreateContext({
  foodOrder: [],
  addMealToOrder: () => {},
  removeMealFromOrder: () => {},
  updateMealQuantity: () => {},
})

const foodOrderReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const updatedMeals = [...state.foodOrder]
      return state
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
    foodOrder,
  }
}

export default function FoodOrderContextProvider({ children }) {
  const [foodOrderState, foodOrderDispatch] = useReducer(foodOrderReducer, {
    foodOrder: [],
  })

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
