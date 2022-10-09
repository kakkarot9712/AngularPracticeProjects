import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "../recipe-book/recipe.model";
import { Ingredient } from "./ingredient.model";
import { ShoppingService } from "./shopping.service";
import { Subject } from 'rxjs'

@Injectable({providedIn:'root'})

export class RecipeService implements OnInit{
    recipeChanged = new Subject<Recipe[]>();
    editSubject = new Subject<number>();
    constructor(private shoppinglistservice: ShoppingService){}
    private recipes: Recipe[] = []
    ngOnInit(): void {
    }
    //[new Recipe('Test Recipe', 'This is simple test', 'https://s3.us-west-1.amazonaws.com/www.vivaglammagazine.com/wp-content/uploads/2022/09/vegan-zucchini-bread-recipe-viva-glam-magazine-1000x600.jpg?resolution=1536,1.25',[{name: "Apple", amount: 5},{name: "Onion", amount: 10}]),
    // new Recipe('Test2 ', 'This is another simple test', 'https://s3.us-west-1.amazonaws.com/www.vivaglammagazine.com/wp-content/uploads/2022/09/vegan-zucchini-bread-recipe-viva-glam-magazine-1000x600.jpg?resolution=1536,1.25',[{name: "Potato", amount: 10},{name: "Bread", amount: 2}])]

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice())
    }

    removeRecipe(id: number){
        this.recipes.splice(id, 1);
    }

    getRecipes(){
        return this.recipes.slice();
    }

    changedRecipe(){
        this.recipeChanged.next(this.recipes.slice())
    }

    addIngredients(inglist: Ingredient[]){
              // ingrediants.forEach(Ingredient => {
      //   this.shoppingservice.addItem(Ingredient);
      // });
        this.shoppinglistservice.ingredients.push(...inglist)
    }

    fetchRecipe(id :number){
        return this.recipes[id];
    }

    deleteIngrediant(rid: number, index: number){
        this.recipes[rid].ingrediants.splice(index, 1)
        this.changedRecipe();
    }

    setRecipe(index: number, newrec: Recipe){
        this.recipes[index] = newrec
        this.changedRecipe()
    }

    replaceRecipes(recipes: Recipe[]){
        this.recipes = recipes
        this.changedRecipe()
    }
}
// 