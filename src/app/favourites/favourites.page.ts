import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class FavouritesPage {
  favouriteRecipes: any[] = [];

  constructor(private storage: StorageService) { }

  // Use ionViewWillEnter to reload list every time page is viewed
  async ionViewWillEnter() {
    this.favouriteRecipes = await this.storage.getFavourites();
  }
}