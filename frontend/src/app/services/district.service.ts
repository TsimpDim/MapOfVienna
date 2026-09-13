import { Injectable } from '@angular/core';

export interface District {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private districts: District[] = [
    { id: 1, name: 'Innere Stadt' },
    { id: 2, name: 'Leopoldstadt' },
    { id: 3, name: 'Landstraße' },
    { id: 4, name: 'Wieden' },
    { id: 5, name: 'Margareten' },
    { id: 6, name: 'Mariahilf' },
    { id: 7, name: 'Neubau' },
    { id: 8, name: 'Josefstadt' },
    { id: 9, name: 'Alsergrund' },
    { id: 10, name: 'Favoriten' },
    { id: 11, name: 'Simmering' },
    { id: 12, name: 'Meidling' },
    { id: 13, name: 'Hietzing' },
    { id: 14, name: 'Penzing' },
    { id: 15, name: 'Rudolfsheim-Fünfhaus' },
    { id: 16, name: 'Ottakring' },
    { id: 17, name: 'Hernals' },
    { id: 18, name: 'Währing' },
    { id: 19, name: 'Döbling' },
    { id: 20, name: 'Brigittenau' },
    { id: 21, name: 'Floridsdorf' },
    { id: 22, name: 'Donaustadt' },
    { id: 23, name: 'Liesing' },
  ];

  getDistricts(): District[] {
    return this.districts;
  }

  getDistrictName(id: number): string {
    const district = this.districts.find(d => d.id === id);
    return district ? district.name : `District ${id}`;
  }
}
