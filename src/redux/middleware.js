export const middleware = (store) => (next) => (action) => {
  const currentState = store.getState();
  console.log('currentState :>> ', currentState);
  if (action.type === "cars/addToCart") {
    const existingItem = currentState.products.basket.find(item => item.id === action.payload.id);

    if (existingItem) {
      const updatedProducts = currentState.products.basket.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      action.payload = [...updatedProducts]
    } else {
      action.payload = [...currentState.products.basket, { ...action.payload, quantity: 1 }]

    }
    localStorage.setItem("basket", JSON.stringify(action.payload));
  } else if (action.type === "cars/removeToCart") {
    const updatedProducts = currentState.products.basket.map(item => {
      if (item.id === action.payload.id) {
        if (item.quantity === 1) {
          return null;
        } else {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    }).filter(item => item !== null);
    action.payload = [...updatedProducts]
    localStorage.setItem("basket", JSON.stringify(action.payload));
  }
  next(action);
};