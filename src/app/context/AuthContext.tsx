import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getMe, login as apiLogin, register as apiRegister } from "../api/auth";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (localStorage.getItem("chitrakala_token")) {
        try {
          const u = await getMe();
          setUser(u);
        } catch (err) {
          localStorage.removeItem("chitrakala_token");
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    const data = await apiLogin(email, pass);
    localStorage.setItem("chitrakala_token", data.token);
    setUser(data);
  };

  const register = async (data: any) => {
    const res = await apiRegister(data);
    localStorage.setItem("chitrakala_token", res.token);
    setUser(res);
  };

  const logout = () => {
    localStorage.removeItem("chitrakala_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
