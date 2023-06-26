export const addReview = (review) => {
  return {
    type: "ADD_REVIEW",
    payload: review,
  };
};

export const commentTodoId = (state, todoId) => {
  return state.reviews.filter((review) => review.todoId === todoId);
};

const initialState = {
  review: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_REVIEW":
      return [...state.review, action.payload];

    default:
      return state;
  }
};

export default rootReducer;
