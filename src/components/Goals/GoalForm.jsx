import React, { useState, useEffect } from "react";

const GoalForm = ({ goal, onSave, onCancel }) => {
  const [newDesc, setNewDesc] = useState(goal.desc);

  useEffect(() => {
    setNewDesc(goal.desc);
  }, [goal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDesc.trim()) {
      onSave(goal.id, newDesc);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <input
        type="text"
        value={newDesc}
        onChange={(e) => setNewDesc(e.target.value)}
        placeholder="Edit Goal"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default GoalForm;