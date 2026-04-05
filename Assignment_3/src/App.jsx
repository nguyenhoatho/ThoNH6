import { useState } from 'react'
import RegistrationForm from './components/RegistrationForm'
import LifecycleDemo from './components/LifecycleDemo'

function App() {
  const [showLifecycleDemo, setShowLifecycleDemo] = useState(true)

  return (
    <div className="app-container">
      <header className="header">
        <h1>📝 React Form & Lifecycle Assignment</h1>
        <p>Controlled Forms, Validation, useRef, & Lifecycle Methods</p>
      </header>

      <main className="main-content">
        {/* Registration Form Section */}
        <section className="section">
          <h2>1️⃣ Registration Form (Controlled + Validation)</h2>
          <RegistrationForm />
        </section>

        {/* Lifecycle Demo Section */}
        <section className="section">
          <div className="lifecycle-header">
            <h2>2️⃣ Lifecycle Demo (Mount/Update/Unmount)</h2>
            <button 
              className="toggle-btn"
              onClick={() => setShowLifecycleDemo(!showLifecycleDemo)}
            >
              {showLifecycleDemo ? '❌ Hide' : '✅ Show'} Lifecycle Component
            </button>
          </div>
          
          {showLifecycleDemo && (
            <div className="lifecycle-container">
              <LifecycleDemo />
            </div>
          )}
          <p className="info-text">
            💡 Check the browser console to see lifecycle logs when showing/hiding the component.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
