import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../../recipe.model';
import { ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  @Input("ind")Index: number;
  btnInfo: string = "More Info";
  recipes: Recipe[];
  recipe: Recipe;
  constructor(private recipeservice: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeservice.getRecipes()
  }

  }
  // showDetails(index: number){
  //   if(this.btnInfo === "More Info"){
  //     this.btnInfo = "Collapse Info"
  //     this.event.emit(this.recipe);
  //   }
  //   else{
  //     this.btnInfo = "More Info"
  //     // this.EmitEvent.emit({name: "null", description: "null", imagePath: "null"});
  //   }
// 