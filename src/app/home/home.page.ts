import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { addIcons } from 'ionicons';
import { heart, settings } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class HomePage {
  searchQuery: string = '';
  recipes: any[] = [];

  constructor(private recipeService: RecipeService) {
    addIcons({ heart, settings });
  }

  search() {
    if (this.searchQuery.trim().length > 0) {
      // Query parameters: query & apiKey handled in service [cite: 73]
      this.recipeService.searchRecipes(this.searchQuery).subscribe((data: any) => {
        this.recipes = data.results;
      });
    }
  }
}