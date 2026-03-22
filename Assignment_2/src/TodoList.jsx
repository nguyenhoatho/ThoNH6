import TodoItem from './TodoItem';

function TodoList({
  todos,
  editingId,
  editText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange
}) {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          editText={editText}
          onToggle={onToggle}
          onDelete={onDelete}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onEditTextChange={onEditTextChange}
        />
      ))}
    </ul>
  );
}

export default TodoList;