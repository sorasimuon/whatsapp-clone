import isEmpty from "is-empty";

export const initialState = {
  user: null,
  conversations: [],
  sideSection: "conversations",
  contacts: [],
  currentConversation: {},
  displaySideBar: false,
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
          state.conversations[i].messages.push(action.data.message);
          return {
            ...state,
          };
        }
      }
      break;
    case "DISPLAY_SIDEBAR":
      return {
        ...state,
        displaySideBar: !state.displaySideBar,
      };
      break;
    default:
      break;
  }
};

export default reducer;
