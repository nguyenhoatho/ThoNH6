import React from 'react';
import { useTheme } from './ThemeContext';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>React App</h1>
          <p className="theme-status">Theme: {theme}</p>
        </div>
        <div className="header-right">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={toggleTheme} className="toggle-btn">
            {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;