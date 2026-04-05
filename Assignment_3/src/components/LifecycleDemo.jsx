import { useState, useEffect } from 'react'

/**
 * LifecycleDemo Component
 * Demonstrates React Lifecycle using Hooks:
 * - useEffect with empty dependency array = componentDidMount (runs once on mount)
 * - useEffect with dependencies = componentDidUpdate (runs when dependencies change)
 * - Cleanup function in useEffect = componentWillUnmount (runs on unmount)
 */
function LifecycleDemo() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [logs, setLogs] = useState([])

  // ===== LIFECYCLE: MOUNT =====
  // Equivalent to componentDidMount
  useEffect(() => {
    const mountLog = `✅ [MOUNT] Component được mount tại ${new Date().toLocaleTimeString()}`
    console.log(mountLog)
    setLogs(prev => [...prev, mountLog])

    // Cleanup function = componentWillUnmount
    return () => {
      const unmountLog = `❌ [UNMOUNT] Component được unmount tại ${new Date().toLocaleTimeString()}`
      console.log(unmountLog)
      // Note: setLogs won't work here because component is being removed
      // This is just for demonstration in console
    }
  }, []) // Empty dependency = runs only on mount/unmount

  // ===== LIFECYCLE: UPDATE (Count) =====
  // Equivalent to componentDidUpdate with specific dependencies
  useEffect(() => {
    if (count > 0) {
      const updateLog = `🔄 [UPDATE] Count updated to ${count} at ${new Date().toLocaleTimeString()}`
      console.log(updateLog)
      setLogs(prev => [...prev, updateLog])
    }
  }, [count]) // Runs every time 'count' changes

  // ===== LIFECYCLE: UPDATE (Input) =====
  // Equivalent to componentDidUpdate for input changes
  useEffect(() => {
    if (inputValue.length > 0) {
      const inputLog = `⌨️  [UPDATE] Input changed to: "${inputValue}" at ${new Date().toLocaleTimeString()}`
      console.log(inputLog)
      setLogs(prev => [...prev, inputLog])
    }
  }, [inputValue]) // Runs every time 'inputValue' changes

  // ===== LIFECYCLE: BOTH MOUNT AND UPDATE =====
  // Equivalent to componentDidMount + componentDidUpdate (no deps array)
  useEffect(() => {
    console.log(`📊 [MOUNT/UPDATE] Component rendered/updated at ${new Date().toLocaleTimeString()}`)
  }) // No dependency array = runs on every render

  const handleIncrement = () => setCount(count + 1)
  const handleDecrement = () => count > 0 && setCount(count - 1)
  const handleReset = () => {
    setCount(0)
    setInputValue('')
    setLogs([])
  }

  return (
    <div className="lifecycle-demo">
      <div className="lifecycle-content">
        
        {/* Component Info */}
        <div className="info-box">
          <h3>🎯 Component Lifecycle Mapping</h3>
          <div className="lifecycle-mapping">
            <div className="mapping-item">
              <span className="hook">useEffect(..., [])</span>
              <span className="separator">→</span>
              <span className="lifecycle">componentDidMount + cleanup = componentWillUnmount</span>
            </div>
            <div className="mapping-item">
              <span className="hook">useEffect(..., [dep])</span>
              <span className="separator">→</span>
              <span className="lifecycle">componentDidUpdate</span>
            </div>
            <div className="mapping-item">
              <span className="hook">useEffect(...)</span>
              <span className="separator">→</span>
              <span className="lifecycle">componentDidMount + componentDidUpdate</span>
            </div>
          </div>
        </div>

        {/* Interactive Section */}
        <div className="interactive-section">
          <h3>🎮 Interactive Demo</h3>
          
          {/* Counter */}
          <div className="demo-group">
            <label>📊 Counter State:</label>
            <div className="counter-display">
              Count: <strong>{count}</strong>
            </div>
            <div className="button-group">
              <button onClick={handleIncrement} className="btn-primary">
                ➕ Tăng (+1)
              </button>
              <button onClick={handleDecrement} className="btn-primary">
                ➖ Giảm (-1)
              </button>
            </div>
            <p className="info-text">
              💡 Mỗi lần bạn click để thay đổi count, 
              <code>componentDidUpdate</code> sẽ được gọi (kiểm tra console)
            </p>
          </div>

          {/* Input */}
          <div className="demo-group">
            <label htmlFor="lifecycle-input">⌨️  Input State:</label>
            <input
              id="lifecycle-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Gõ gì đó để trigger componentDidUpdate..."
              className="form-input"
            />
            {inputValue && <p className="info-text">📝 Input value: <strong>{inputValue}</strong></p>}
          </div>

          {/* Reset Button */}
          <button onClick={handleReset} className="btn-danger">
            🔄 Reset All
          </button>
        </div>

        {/* Lifecycle Logs */}
        <div className="logs-section">
          <h3>📋 Lifecycle Logs</h3>
          <div className="logs-container">
            {logs.length === 0 ? (
              <div className="log-item empty">
                <p>👉 Tương tác với component để xem logs...</p>
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="log-item">
                  <span className="log-number">{index + 1}.</span>
                  <span className="log-text">{log}</span>
                </div>
              ))
            )}
          </div>

          {logs.length > 0 && (
            <div className="console-hint">
              💡 <strong>Mở Console (F12)</strong> để xem logs chi tiết hơn bao gồm UNMOUNT log khi component bị remove
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="explanation-box">
        <h4>📚 Giải thích chi tiết:</h4>
        <ul>
          <li>
            <strong>componentDidMount:</strong> Chạy một lần khi component được mount. 
            Dùng để: khởi tạo state, gọi API, subscribe events.
          </li>
          <li>
            <strong>componentDidUpdate:</strong> Chạy mỗi lần component được update (state/props thay đổi).
            Dùng để: xử lý side effects theo sự thay đổi của data.
          </li>
          <li>
            <strong>componentWillUnmount:</strong> Chạy trước khi component bị remove khỏi DOM.
            Dùng để: cleanup (unsubscribe, cancel API request, clear timers).
          </li>
          <li>
            <strong>Cleanup Function:</strong> Return function từ useEffect để làm công việc cleanup.
            Chạy khi component unmount hoặc trước lần run tiếp theo của effect.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LifecycleDemo
