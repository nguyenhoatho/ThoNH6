# 📝 Assignment 3 - React Form & Lifecycle Management

## 🎯 Mục tiêu Bài Tập

Bài tập này nhằm giúp bạn hiểu sâu về:

1. **Controlled Components** - Quản lý form state qua React
2. **Form Validation** - Kiểm tra dữ liệu và hiển thị lỗi
3. **Uncontrolled Components** - Quản lý input qua DOM trực tiếp
4. **useRef Hook** - Truy cập và thao tác DOM trực tiếp
5. **React Lifecycle** - Mapping giữa class methods và hooks
6. **useEffect Hook** - Xử lý side effects và cleanup

---

## 📋 Cấu Trúc Dự Án

```
Assignment_3/
├── index.html                    # Entry HTML
├── package.json                  # Dependencies & scripts
├── vite.config.js               # Vite configuration
│
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Root component
│   ├── styles/
│   │   └── App.css             # Global styles
│   └── components/
│       ├── RegistrationForm.jsx # Controlled form + validation
│       └── LifecycleDemo.jsx    # Lifecycle demonstration
│
├── .gitignore                   # Git ignore rules
└── README.md                    # Documentation (this file)
```

---

## ✨ Tính Năng Chính

### 1️⃣ Registration Form (Controlled + Validation)

**Công nghệ sử dụng:**
- Controlled Components (state-driven)
- Real-time validation
- Error messages
- Uncontrolled input với useRef

**Các trường form:**
```
┌─────────────────────────────────┐
│ Registration Form               │
├─────────────────────────────────┤
│ Name: [________________]         │
│       ❌ (nếu có lỗi)           │
│                                 │
│ Email: [________________]        │
│        ❌ (nếu có lỗi)          │
│                                 │
│ Password: [________________]     │
│           ❌ (nếu có lỗi)       │
│                                 │
│ Promo Code: [_______]  [Focus]  │
│ (Uncontrolled + useRef)         │
│                                 │
│ [✅ Đăng Ký Ngay]              │
└─────────────────────────────────┘
```

**Validation Rules:**
| Field | Rule | Error Message |
|-------|------|---------------|
| Name | Không rỗng; min 2 ký tự | ❌ Tên không được để trống / Tên phải có ít nhất 2 ký tự |
| Email | Phải match regex | ❌ Email không hợp lệ |
| Password | Min 6 ký tự | ❌ Mật khẩu phải có ít nhất 6 ký tự |
| Promo Code | Không bắt buộc | - |

**Key Code Examples:**

```jsx
// Controlled Input
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: ''
})

const handleInputChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))
}

// Uncontrolled Input with useRef
const promoCodeRef = useRef(null)

const handleFocusPromoCode = () => {
  if (promoCodeRef.current) {
    promoCodeRef.current.focus()
  }
}

// Validation
const validateForm = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // validation logic
}
```

---

### 2️⃣ Lifecycle Demo (Mount/Update/Unmount)

**Mapping: Class Component → Hooks**

| Class Component | React Hook | When |
|-----------------|-----------|------|
| `componentDidMount` | `useEffect(..., [])` | Runs once when component mounts |
| `componentDidUpdate` | `useEffect(..., [dep])` | Runs when dependencies change |
| `componentWillUnmount` | Cleanup function in `useEffect` | Runs when component unmounts |

**Code Examples:**

```jsx
// MOUNT - runs once on mount
useEffect(() => {
  console.log('✅ Component Mounted!')
  
  // Cleanup (UNMOUNT)
  return () => {
    console.log('❌ Component Unmounted!')
  }
}, []) // Empty dependency array

// UPDATE - runs when 'count' changes
useEffect(() => {
  console.log('🔄 Count Updated:', count)
}, [count])

// MOUNT + UPDATE - runs on every render
useEffect(() => {
  console.log('render occurred')
})
```

**Interactive Features:**
- Counter state (triggers UPDATE)
- Input state (triggers UPDATE)
- Show/Hide component (triggers MOUNT/UNMOUNT)
- Real-time lifecycle logs
- Console output (F12)

---

## 🚀 Cài Đặt & Chạy

### 1. Cài đặt Dependencies

```bash
npm install
```

### 2. Chạy Development Server

```bash
npm run dev
```

Server sẽ khởi động tại: `http://localhost:5173`

### 3. Build Production

```bash
npm run build
```

Output: `dist/` folder

### 4. Preview Build

```bash
npm run preview
```

---

## 📖 Khái Niệm Chính

### Controlled vs Uncontrolled

**Controlled Component:**
```jsx
// React quản lý value
const [value, setValue] = useState('')
<input value={value} onChange={(e) => setValue(e.target.value)} />
```

**Uncontrolled Component:**
```jsx
// DOM quản lý value, React chỉ access khi cần
const inputRef = useRef(null)
<input ref={inputRef} />
// Access: inputRef.current.value
```

### Form Validation Pattern

```jsx
const [errors, setErrors] = useState({})

const validate = () => {
  const newErrors = {}
  
  if (!name.trim()) {
    newErrors.name = '❌ Không được rỗng'
  }
  
  if (!emailRegex.test(email)) {
    newErrors.email = '❌ Email không hợp lệ'
  }
  
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = (e) => {
  e.preventDefault()
  if (validate()) {
    console.log('Form hợp lệ!')
  }
}
```

### Lifecycle Pattern

```jsx
useEffect(() => {
  // MOUNT - initialization
  console.log('Component mounted')
  
  // SUBSCRIBE
  const unsubscribe = eventEmitter.subscribe(...)
  
  return () => {
    // UNMOUNT - cleanup
    console.log('Component will unmount')
    unsubscribe() // Clean up subscription
  }
}, []) // Mount/Unmount only
```

---

## 🎨 Styling

- **CSS Variables** cho dễ customize
- **Gradient backgrounds** cho modern UI
- **Animations** cho smooth UX
- **Responsive design** cho mobile
- **Custom scrollbar** cho logs section

---

## 💡 Tips

1. **Kiểm tra Console**: Mở DevTools (F12) để xem lifecycle logs chi tiết
2. **useRef vs useState**: 
   - `useState` → trigger re-render
   - `useRef` → NO re-render, persistent value
3. **Cleanup function**: Luôn cleanup subscriptions, timers, API requests
4. **Validation feedback**: Cung cấp error messages rõ ràng, user-friendly

---

## 🔧 Tech Stack

- **React 18+** - UI Library
- **Vite** - Build tool
- **CSS3** - Styling (no external CSS framework)
- **JavaScript ES6+** - Language

---

## 📝 Assignment Checklist

- [x] Tạo registration form với controlled inputs
- [x] Validate: name empty, email regex, password >= 6 chars
- [x] Hiển thị error messages
- [x] Tạo uncontrolled input với useRef (Promo Code)
- [x] Focus button cho uncontrolled input
- [x] LifecycleDemo component với mount/update/unmount logs
- [x] Mapping lifecycle: class methods → hooks
- [x] Cleanup function demonstration
- [x] Console logging
- [x] Professional UI/UX

---

## 📚 Tài Liệu Tham Khảo

- [React Documentation](https://react.dev)
- [useEffect Hook](https://react.dev/reference/react/useEffect)
- [useRef Hook](https://react.dev/reference/react/useRef)
- [Form Handling](https://react.dev/learn/handling-user-input)

---

## ✉️ Ghi Chú

Dự án này được tạo như một bài tập học tập để hiểu sâu về React fundamentals. 
Mở console (F12) để xem lifecycle logs và debug information.

Happy Coding! 🎉

---

**Created:** 2026
**Version:** 1.0.0
