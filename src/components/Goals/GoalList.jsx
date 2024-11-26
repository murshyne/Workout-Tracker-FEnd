import React, { useState } from "react";
import GoalForm from "./GoalForm";

const GoalList = ({ goals, dispatch }) => {
  const [editingGoal, setEditingGoal] = useState(null);
  const [showMenu, setShowMenu] = useState(null);

  const handleToggleComplete = (id) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };

  const handleDeleteGoal = (id) => {
    dispatch({ type: "DELETE_GOAL", payload: id });
  };

  const handleEditGoal = (id, newDesc) => {
    dispatch({ type: "EDIT_GOAL", payload: { id, desc: newDesc } });
    setEditingGoal(null);
  };

  return (
    <ul className="goal-list">
      {goals.map((goal) => (
        <li
          key={goal.id}
          className={`goal-item ${goal.complete ? "completed" : ""}`}
        >
          {editingGoal?.id === goal.id ? (
            <GoalForm
              goal={goal}
              onSave={handleEditGoal}
              onCancel={() => setEditingGoal(null)}
            />
          ) : (
            <>
              <input
                type="checkbox"
                checked={goal.complete}
                onChange={() => handleToggleComplete(goal.id)}
              />
              <span
                style={{
                  textDecoration: goal.complete ? "line-through" : "none",
                }}
              >
                {goal.desc}
              </span>
              <div className="kebab-menu">
                <button onClick={() => setShowMenu(goal.id)}>
                  &#x22EE; {/* Kebab Menu */}
                </button>
                {showMenu === goal.id && (
                  <div className="menu-options">
                    <button
                      onClick={() => {
                        setEditingGoal(goal);
                        setShowMenu(null);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteGoal(goal.id)}
                      disabled={!goal.complete}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default GoalList;