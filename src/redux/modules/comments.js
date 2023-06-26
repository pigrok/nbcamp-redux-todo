const initialState = [];

// 리듀서
const comments = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return [...state, action.payload];

    case "DELETE_COMMENT":
      return state.filter((comment) => comment.id !== action.payload);

    default:
      return state;
  }
};

export default comments;
