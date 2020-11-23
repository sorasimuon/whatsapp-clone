export const initialState = {
  user: null,
  conversations: [],
  sideSection: "conversations",
  contacts: [],
  currentConversation: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_SIDEBAR_SECTION":
      return {
        ...state,
        sideSection: action.sideSection,
      };
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.contacts,
      };
    case "SET_CURRENT_CONVERSATION":
      return {
        ...state,
        currentConversation: action.currentConv,
      };
    case "ADD_CONVERSATION":
      return {
        ...state,
        conversations: [...state.conversations, action.conversation],
      };
    case "SET_CONVERSATIONS_LIST":
      return {
        ...state,
        conversations: action.convs,
      };
    default:
      break;
  }
};

export default reducer;
