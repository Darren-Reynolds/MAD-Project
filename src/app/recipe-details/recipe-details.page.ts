import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { StorageService } from '../services/storage.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {
  recipe: any = null;
  currentUnit: string = 'metric';
  isFav: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private storage: StorageService
  ) {
    addIcons({ heart, heartOutline });
  }

  async ngOnInit() {
    // Get recipe ID from URL
    const id = this.route.snapshot.paramMap.get('id');
    
    // Get stored Unit preference [cite: 44]
    this.currentUnit = await this.storage.getUnit();

    if (id) {
      // Check if already favourite [cite: 51]
      this.isFav = await this.storage.isFavourite(Number(id));

      // Fetch details from API
      this.recipeService.getRecipeDetails(id).subscribe((data) => {
        this.recipe = data;
      });
    }
  }

  async toggleFavourite() {
    if (this.isFav) {
      await this.storage.removeFavourite(this.recipe.id);
      this.isFav = false;
    } else {
      // We save a minimal object to display on Favourites page
      const savableRecipe = {
        id: this.recipe.id,
        title: this.recipe.title,
        image: this.recipe.image
      };
      await this.storage.addFavourite(savableRecipe);
      this.isFav = true;
    }
  }
}
