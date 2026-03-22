function TodoItem({
  todo,
  isEditing,
  editText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange
}) {
  const handleEditSubmit = (e) => {
    e.preventDefault();
    onSaveEdit();
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSaveEdit();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="todo-edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
            onKeyDown={handleEditKeyDown}
            onBlur={onSaveEdit}
            autoFocus
          />
        </form>
      ) : (
        <span onDoubleClick={() => onStartEdit(todo.id, todo.text)}>{todo.text}</span>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;