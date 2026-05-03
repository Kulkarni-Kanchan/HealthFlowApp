import { createContext, useContext, useEffect, useReducer } from "react";
import { getVisibleSteps } from "../constants/steps";
import { getProgress, postProgress } from "../services/api";
import { loadProgress, saveProgress } from "../utils/storage";

const FlowContext = createContext();

const initialState = {
  answers: {},
  currentStepIndex: 0,
  userId: null,
  loading: true,
  apiError: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "RESTORE":
      return { ...state, ...action.payload, loading: false };
    case "SET_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.stepId]: action.value },
      };
    case "SET_STEP":
      return { ...state, currentStepIndex: action.index };
    case "SET_API_ERROR":
      return { ...state, apiError: action.error };
    case "CLEAR_API_ERROR":
      return { ...state, apiError: null };
    case "SET_LOADING":
      return { ...state, loading: action.value };
    default:
      return state;
  }
}

export function FlowProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // On mount: load local progress, then try API
  useEffect(() => {
    async function init() {
      const local = await loadProgress();
      if (local) {
        dispatch({ type: "RESTORE", payload: local });
        // Also try syncing from backend
        try {
          if (local.userId) {
            const remote = await getProgress(local.userId);
            if (remote) {
              dispatch({
                type: "RESTORE",
                payload: { ...local, ...remote, loading: false },
              });
            }
          }
        } catch (_) {}
      } else {
        const uid = "user_" + Date.now();
        dispatch({
          type: "RESTORE",
          payload: { ...initialState, userId: uid, loading: false },
        });
      }
    }
    init();
  }, []);

  // Persist locally and to API on answers/step change
  useEffect(() => {
    if (state.loading) return;
    const data = {
      answers: state.answers,
      currentStepIndex: state.currentStepIndex,
      userId: state.userId,
    };
    saveProgress(data);
    // Fire-and-forget API save
    postProgress(data).catch(() => {});
  }, [state.answers, state.currentStepIndex]);

  const visibleSteps = getVisibleSteps(state.answers);

  function setAnswer(stepId, value) {
    dispatch({ type: "SET_ANSWER", stepId, value });
  }

  function goNext() {
    if (state.currentStepIndex < visibleSteps.length - 1) {
      dispatch({ type: "SET_STEP", index: state.currentStepIndex + 1 });
    }
  }

  function goBack() {
    if (state.currentStepIndex > 0) {
      dispatch({ type: "SET_STEP", index: state.currentStepIndex - 1 });
    }
  }

  function goToStep(index) {
    dispatch({ type: "SET_STEP", index });
  }

  function retryApi() {
    dispatch({ type: "CLEAR_API_ERROR" });
    const data = {
      answers: state.answers,
      currentStepIndex: state.currentStepIndex,
      userId: state.userId,
    };
    postProgress(data).catch((e) =>
      dispatch({ type: "SET_API_ERROR", error: e.message }),
    );
  }

  return (
    <FlowContext.Provider
      value={{
        state,
        visibleSteps,
        setAnswer,
        goNext,
        goBack,
        goToStep,
        retryApi,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  return useContext(FlowContext);
}
