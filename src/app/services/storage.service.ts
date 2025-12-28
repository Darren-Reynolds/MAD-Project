import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private FAV_KEY = 'favourites';
  private UNIT_KEY = 'units';

  constructor() { }

  // --- Settings ---
  async setUnit(unit: string) {
    await Preferences.set({ key: this.UNIT_KEY, value: unit });
  }

  async getUnit(): Promise<string> {
    const { value } = await Preferences.get({ key: this.UNIT_KEY });
    // Default to 'metric' if not set [cite: 59]
    return value ? value : 'metric';
  }

  // --- Favourites ---
  async addFavourite(recipe: any) {
    const current = await this.getFavourites();
    current.push(recipe);
    await Preferences.set({ key: this.FAV_KEY, value: JSON.stringify(current) });
  }

  async removeFavourite(recipeId: number) {
    let current = await this.getFavourites();
    current = current.filter((r: any) => r.id !== recipeId);
    await Preferences.set({ key: this.FAV_KEY, value: JSON.stringify(current) });
  }

  async getFavourites(): Promise<any[]> {
    const { value } = await Preferences.get({ key: this.FAV_KEY });
    return value ? JSON.parse(value) : [];
  }

  async isFavourite(recipeId: number): Promise<boolean> {
    const current = await this.getFavourites();
    return current.some((r: any) => r.id === recipeId);
  }
}