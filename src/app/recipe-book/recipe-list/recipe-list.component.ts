import { Component, OnInit, OnDestroy} from '@angular/core';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { DataStorage } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[]
  recipeobserver: Subscription;

  constructor(private recipeservice : RecipeService, private database: DataStorage) { }
  ngOnInit(): void {
    this.recipes = this.recipeservice.getRecipes();
    this.recipeobserver = this.recipeservice.recipeChanged.subscribe((recipes: Recipe[])=>{
      this.recipes = recipes
    })
  }
  
  ngOnDestroy(): void {
   this.recipeobserver.unsubscribe(); 
  }
  
}
// 