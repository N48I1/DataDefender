export interface User {
  email: string;
  name: string;
  role: 'admin' | 'engineer' | 'viewer';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}