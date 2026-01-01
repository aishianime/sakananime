import { useState, useEffect } from "react";

interface User {
  email: string;
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    window.location.href = "/";
  };

  const isAuthenticated = !!user;

  return { user, isLoading, isAuthenticated, logout };
};
