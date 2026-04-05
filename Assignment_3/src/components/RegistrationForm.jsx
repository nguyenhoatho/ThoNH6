import { useState, useRef } from 'react'

/**
 * RegistrationForm Component
 * Demonstrates:
 * - Controlled inputs (name, email, password)
 * - Form validation with error messages
 * - useRef for uncontrolled input (Promo Code)
 */
function RegistrationForm() {
  // Controlled form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  // Validation errors state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  })

  // Success message state
  const [successMessage, setSuccessMessage] = useState('')

  // useRef for uncontrolled Promo Code input
  const promoCodeRef = useRef(null)

  // Validation rules
  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: ''
    }

    // Validate name - không rỗng
    if (!formData.name.trim()) {
      newErrors.name = '❌ Tên không được để trống'
    } else if (formData.name.length < 2) {
      newErrors.name = '❌ Tên phải có ít nhất 2 ký tự'
    }

    // Validate email - regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = '❌ Email không được để trống'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '❌ Email không hợp lệ (định dạng: user@domain.com)'
    }

    // Validate password - >= 6 ký tự
    if (!formData.password.trim()) {
      newErrors.password = '❌ Mật khẩu không được để trống'
    } else if (formData.password.length < 6) {
      newErrors.password = '❌ Mật khẩu phải có ít nhất 6 ký tự'
    }

    setErrors(newErrors)
    return !newErrors.name && !newErrors.email && !newErrors.password
  }

  // Handle input change (Controlled)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    setSuccessMessage('')
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Get promo code from uncontrolled input
      const promoCode = promoCodeRef.current?.value || ''
      
      console.log('✅ Form submitted successfully!')
      console.log('Form data:', formData)
      console.log('Promo Code:', promoCode)
      
      setSuccessMessage(`✅ Đăng ký thành công! Mã khuyến mãi: ${promoCode || 'Không có'}`)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: ''
      })
      if (promoCodeRef.current) {
        promoCodeRef.current.value = ''
      }
    }
  }

  // Handle Focus button for uncontrolled input
  const handleFocusPromoCode = () => {
    if (promoCodeRef.current) {
      promoCodeRef.current.focus()
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="registration-form">
        
        {/* Success Message */}
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">👤 Tên <span className="required">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nhập tên của bạn"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">📧 Email <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Nhập email của bạn"
            className={`form-input ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">🔐 Mật khẩu <span className="required">*</span></label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
            className={`form-input ${errors.password ? 'input-error' : ''}`}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        {/* Uncontrolled Input - Promo Code with useRef */}
        <div className="form-group uncontrolled-section">
          <h3>🎁 Mã Khuyến Mãi (Uncontrolled Input + useRef)</h3>
          <div className="promo-code-wrapper">
            <input
              type="text"
              ref={promoCodeRef}
              placeholder="Nhập mã khuyến mãi (tùy chọn)"
              className="form-input uncontrolled-input"
            />
            <button
              type="button"
              onClick={handleFocusPromoCode}
              className="focus-btn"
              title="Click để focus vào input"
            >
              📌 Focus
            </button>
          </div>
          <p className="info-text">
            💡 Input này là <strong>Uncontrolled</strong> - giá trị được quản lý bởi DOM, không bởi React state. 
            Sử dụng <code>useRef</code> để truy cập trực tiếp.
          </p>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          ✅ Đăng Ký Ngay
        </button>
      </form>

      {/* Validation Info */}
      <div className="validation-info">
        <h4>📋 Quy tắc Validation:</h4>
        <ul>
          <li>✓ <strong>Tên:</strong> Không rỗng, tối thiểu 2 ký tự</li>
          <li>✓ <strong>Email:</strong> Phải đúng định dạng (user@domain.com)</li>
          <li>✓ <strong>Mật khẩu:</strong> Tối thiểu 6 ký tự</li>
          <li>✓ <strong>Mã khuyến mãi:</strong> Không bắt buộc (Uncontrolled Input)</li>
        </ul>
      </div>
    </div>
  )
}

export default RegistrationForm
