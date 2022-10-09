import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

import { Recipe } from '../recipe-book/recipe.model';
import { RecipeService } from './recipe.service';
import { map, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })

export class DataStorage {
    constructor(private http: HttpClient, private recipeservice: RecipeService, private auth: AuthService) { }
    saveData() {
        let recipes = this.recipeservice.getRecipes()
        this.http.put('https://recipedatabase-d6390-default-rtdb.firebaseio.com/recipe.json', recipes).subscribe((response) => { console.log(response) })
    }

    fetchData() {
        return this.http.get<Recipe[]>('https://recipedatabase-d6390-default-rtdb.firebaseio.com/recipe.json').pipe(map((recipes: Recipe[]) => {
            return recipes.map((recipe: Recipe) => {
                return { ...recipe, ingrediants: recipe.ingrediants ? recipe.ingrediants : [] }
            })
        }), tap((recipes: Recipe[]) => {
            this.recipeservice.replaceRecipes(recipes)
        }
        ))
    }
}
