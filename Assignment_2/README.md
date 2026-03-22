# Todo App - React Assignment 2

## Mục tiêu bài tập
Hiểu state là "bộ nhớ của component"; nắm cách đọc/ghi state đúng chuẩn.
Xử lý sự kiện (onChange, onSubmit, onClick) để cập nhật UI.
Render danh sách từ mảng đối tượng với key ổn định.
Conditional rendering: empty state, completed style, counters.
Tổ chức component: TodoInput, TodoItem, TodoList, TodoFooter (tùy chọn).

## Kiến thức cần nắm

### 1. State trong React
- **State là gì?** State là bộ nhớ nội bộ của component, lưu trữ dữ liệu có thể thay đổi theo thời gian.
- **useState Hook:** Sử dụng `useState` để khai báo state. Nó trả về một mảng với giá trị hiện tại và hàm setter.
  ```jsx
  const [todos, setTodos] = useState([]);
  ```
- **Cập nhật state:** Luôn sử dụng hàm setter để cập nhật state. Không thay đổi trực tiếp.
  ```jsx
  setTodos([...todos, newTodo]); // Thêm item
  setTodos(todos.map(todo => ...)); // Cập nhật item
  setTodos(todos.filter(todo => ...)); // Xóa item
  ```

### 2. Xử lý sự kiện
- **onChange:** Sử dụng cho input controlled. Cập nhật state khi người dùng nhập.
  ```jsx
  const [inputValue, setInputValue] = useState('');
  <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
  ```
- **onSubmit:** Ngăn form submit mặc định, xử lý logic thêm item.
  ```jsx
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic thêm todo
  };
  <form onSubmit={handleSubmit}>
  ```
- **onClick:** Xử lý click để toggle hoặc delete.
  ```jsx
  <button onClick={() => onToggle(todo.id)}>Toggle</button>
  ```

### 3. Render danh sách với key
- **Key ổn định:** Mỗi item trong list cần key duy nhất, không thay đổi. Sử dụng `id` từ timestamp hoặc counter.
  ```jsx
  const newTodo = { id: Date.now(), text, completed: false };
  {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
  ```
- **Tại sao cần key?** React sử dụng key để xác định item nào thay đổi, thêm, xóa để tối ưu re-render.

### 4. Conditional Rendering
- **Empty state:** Hiển thị message khi list rỗng.
  ```jsx
  if (todos.length === 0) return <p>No todos yet. Add one above!</p>;
  ```
- **Completed style:** Sử dụng className để style khác nhau.
  ```jsx
  <li className={todo.completed ? 'completed' : ''}>
  ```
- **Counters:** Tính toán và hiển thị số item chưa hoàn thành.
  ```jsx
  const itemsLeft = todos.filter(todo => !todo.completed).length;
  ```

### 5. Controlled Input
- **Controlled component:** Input value được kiểm soát bởi state.
- **Ưu điểm:** Dễ validate, format, và đồng bộ với state.
- **Ví dụ:**
  ```jsx
  const [inputValue, setInputValue] = useState('');
  <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
  ```

### 6. Lifting State Up
- **State ở component cha:** State `todos` đặt ở `App`, truyền xuống con qua props.
- **Handlers cũng truyền xuống:** `onAddTodo`, `onToggle`, `onDelete` là props từ cha.
- **Lợi ích:** Dễ quản lý state tập trung, components con chỉ nhận data và handlers.

### 7. Tổ chức Component
- **TodoInput:** Xử lý input và submit để thêm todo.
- **TodoItem:** Hiển thị một todo item với checkbox, text, delete button.
- **TodoList:** Render list các TodoItem, hoặc empty state.
- **TodoFooter:** Hiển thị counter "items left".

### 8. Props và Component Communication
- **Props:** Dữ liệu truyền từ cha xuống con. Read-only, không thay đổi trực tiếp.
- **Callback props:** Truyền hàm từ cha để con gọi khi cần cập nhật state.

### 9. Immutability
- **Không mutate state trực tiếp:** Luôn tạo object/array mới khi cập nhật.
  ```jsx
  // Sai: todos[0].completed = true;
  // Đúng: setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
  ```

### 11. Edit
- **Inline Editing:** Double-click để edit text, Enter để save, Escape để cancel.
- **Cancel:** Nhấn Escape hoặc click ra ngoài (blur) khi đang edit.

## Cách chạy
1. `npm install`
2. `npm run dev`
3. Mở http://localhost:5173

## Chức năng
- Thêm todo bằng cách nhập text và nhấn Add hoặc Enter.
- Click checkbox để đánh dấu hoàn thành/bỏ hoàn thành.
- Click Delete để xóa todo.
- Double-click trên text để edit todo.
- Hiển thị số item chưa hoàn thành.
- Empty state khi không có todo nào.
