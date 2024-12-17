// JobActions.jsx
import React from 'react';

const JobActions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2">
      <button onClick={onEdit} className="btn btn-primary btn-sm">
        Edit
      </button>
      <button onClick={onDelete} className="btn btn-error btn-sm">
        Delete
      </button>
    </div>
  );
};

export default JobActions;
