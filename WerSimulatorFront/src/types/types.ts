export interface User {
    id: string;
    userName: string;
    organization: string;
    subOrganization?: string; 
    token: string; 
  }
  
  export interface UserState {
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  