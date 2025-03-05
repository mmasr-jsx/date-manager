export interface Mascota {
  id: number;
  name: string;
  owner: string;
  phone: number;
  breed: string;
  prize: number;
  size: string;
  warning: boolean;
  description: string;
}

export class NewMascota implements Mascota {
  id: number;
  name: string;
  owner: string;
  phone: number;
  breed: string;
  prize: number;
  size: string;
  warning: boolean;
  description: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.owner = "";
    this.phone = 0;
    this.breed = "";
    this.prize = 0;
    this.size = "";
    this.warning = false;
    this.description = "";
  }
}
