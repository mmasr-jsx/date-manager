export interface MascotaDto {
  id?: string;
  name: string;
  owner: string;
  owner_lastName?: string;
  ownerId?: string;
  phone: number | string;
  sec_phone: number | string;
  breed?: string;
  prize?: number;
  size?: string;
  warning?: boolean;
  description?: string;
}

export class NewMascotaDto implements MascotaDto {
  id?: string;
  name: string;
  owner: string;
  ownerId: string;
  phone: number | string;
  sec_phone: number | string;
  breed: string;
  prize: number;
  size: string;
  warning: boolean;
  description: string;

  constructor() {
    this.id = '0';
    this.name = '';
    this.owner = '';
    this.ownerId = '0';
    this.phone = 0;
    this.sec_phone = 0;
    this.breed = '';
    this.prize = 0;
    this.size = '';
    this.warning = false;
    this.description = '';
  }
}
