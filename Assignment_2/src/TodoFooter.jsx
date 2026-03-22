function TodoFooter({ itemsLeft }) {
  return (
    <footer>
      <p>{itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left</p>
    </footer>
  );
}

export default TodoFooter;