import { useState, useReducer } from "react";
import GoalList from ".GoalList";
import "./Goal.css";


// Initial state for the goal list
const initialState = {
  goals: [],
};

// Reducer function to handle state updates
function goalReducer(state, action) {
  switch (action.type) {
    case "ADD_goal":
      return { goals: [{ ...action.payload, id: Date.now() }, ...state.goals] };

    case "DELETE_goal":
      return {
        goals: state.goals.filter((goal) => goal.id !== action.payload),
      };

    case "TOGGLE_COMPLETE":
      return {
        goals: state.goals.map((goal) =>
          goal.id === action.payload
            ? { ...goal, complete: !goal.complete }
            : goal
        ),
      };

    case "EDIT_goal":
      return {
        goals: state.goals.map((goal) =>
          goal.id === action.payload.id
            ? { ...goal, desc: action.payload.desc }
            : goal
        ),
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(goalReducer, initialState);
  const [newgoal, setNewgoal] = useState("");

  const handleAddgoal = (e) => {
    e.preventDefault();
    if (!newgoal.trim()) return;
    dispatch({
      type: "ADD_goal",
      payload: { desc: newgoal, complete: false },
    });
    setNewgoal("");
  };

  return (
    <div className="app-container">
      <h1>Goal List</h1>
      <form onSubmit={handleAddgoal}>
        <input
          type="text"
          value={newgoal}
          onChange={(e) => setNewgoal(e.target.value)}
          placeholder="What do you have to do?"
        />
        <button type="submit">Add goal</button>
      </form>
      <GoalList goals={state.goals} dispatch={dispatch} />
    </div>
  );
}

export default App;