import { Photo } from './Photo';

export interface User {
  id: number;
  userName: string;
  knownAs: string;
  age: number;
  dateOfBirth: Date;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interest?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
}
