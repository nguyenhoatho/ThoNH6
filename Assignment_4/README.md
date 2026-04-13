# React User Management App

Ứng dụng React sử dụng TypeScript và Vite để quản lý danh sách người dùng với các tính năng sau:

## Tính năng

- **Quản lý Theme**: Chuyển đổi giữa chế độ sáng và tối sử dụng Context API.
- **Tìm kiếm**: Lọc danh sách người dùng theo tên, email hoặc username.
- **Fetch API**: Lấy dữ liệu từ JSONPlaceholder API với xử lý loading và error.
- **useEffect**: Minh họa các biến thể useEffect (mount, dependencies, cleanup).
- **Cleanup**: Sử dụng AbortController để tránh memory leaks khi unmount.

## Cấu trúc dự án

- `src/App.tsx`: Component chính với logic fetch data và filter.
- `src/ThemeContext.tsx`: Context API cho quản lý theme.
- `src/Header.tsx`: Header với toggle theme và ô tìm kiếm.
- `src/DataList.tsx`: Hiển thị danh sách người dùng.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

Ứng dụng sẽ chạy trên http://localhost:5173 (hoặc port khác nếu 5173 bị chiếm).

## Build

```bash
npm run build
```

## Các khái niệm React được minh họa

1. **useState**: Quản lý state cho users, loading, error, searchQuery, theme.
2. **useEffect**:
   - Fetch data khi component mount.
   - Cập nhật document.title khi searchQuery thay đổi.
   - Cleanup với AbortController.
3. **useContext**: Quản lý theme toàn cục.
4. **Props drilling**: Truyền props giữa components.
5. **Conditional rendering**: Hiển thị loading, error, hoặc data.

## API

Sử dụng [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) để lấy dữ liệu người dùng mẫu.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
