export interface Mascota {
  id?: string;
  created_at?: Date;
  name: string;
  breed?: string;
  prize?: number;
  size?: string;
  warning?: boolean;
  description?: string;
  ownerId: string;
}

export class NewMascota implements Mascota {
  id: string;
  created_at: Date;
  name: string;
  breed: string;
  prize: number;
  size: string;
  warning: boolean;
  description: string;
  ownerId: string;

  constructor() {
    this.id = '0';
    this.name = '';
    this.breed = '';
    this.prize = 0;
    this.size = '';
    this.warning = false;
    this.description = '';
    this.ownerId = '0';
  }
}
