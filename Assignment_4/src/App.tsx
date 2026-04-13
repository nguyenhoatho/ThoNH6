import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import Header from './Header';
import DataList from './DataList';
import './App.css';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const AppContent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { theme } = useTheme();

  // Fetch data on mount
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', { signal });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        if (isMounted) {
          setUsers(data);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError' && isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Update document title when search query changes
  useEffect(() => {
    document.title = searchQuery ? `Search: ${searchQuery}` : 'React App';
  }, [searchQuery]);

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={theme === 'dark' ? 'dark-theme' : ''}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="main-container">
        <DataList users={filteredUsers} loading={loading} error={error} />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
