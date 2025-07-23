export interface User {
  id: string;
  email: string;
  name: string;
  surName: string;
  fullName: string;
  birthDate?: string | null;
  telephone?: string | null;
  employment?: string | null;
  createdAt: string;
  userAgreement?: boolean;
}
