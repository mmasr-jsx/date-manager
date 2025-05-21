import { Mascota } from './Mascota';

export interface Cliente {
  id?: string;
  name: string;
  last_name?: string;
  phone?: string;
  sec_phone?: string;
  pets?: Mascota[];
}
