export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  created: Date;
  isActive: boolean;
  role: string;
}

export interface DbUser {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  created: Date;
  is_active: boolean;
  role: string;
}
