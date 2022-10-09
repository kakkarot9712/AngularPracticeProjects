import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { DataStorage } from "../shared/data-storage.service";
import { RecipeService } from "../shared/recipe.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})

export class RecipesResolver implements Resolve<Recipe[]> {
    constructor(private database: DataStorage, private recipeservice: RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let recipes = this.recipeservice.getRecipes()
        if(recipes.length === 0){
            return this.database.fetchData()
        }
        else{
            return recipes
        }
    }
}