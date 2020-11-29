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

    case "ADD_NEW_MESSAGE":
      for (let i = 0; i < state.conversations.length; i++) {
        if (
          String(action.data.conversationId) ===
          String(state.conversations[i]._id)
        ) {
          console.log("id 1 = " + String(action.data.conversationId));
          console.log("id 2 = " + String(state.conversations[i]._id));
          state.conversations[i].messages.push(action.data.message);
          console.log(state.conversations[i]);
          return {
            ...state,
          };
        }
      }
    default:
      break;
  }
};

export default reducer;
