import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "./ingredient.model";

@Injectable({providedIn:'root'})

export class ShoppingService{
    constructor(){}
    ingredients: Ingredient[] = [new Ingredient("Apple", 5), new Ingredient("Tomato", 15)]

    editIng = new Subject<number>()

    addItem(ingredient: Ingredient){
        this.ingredients.push(ingredient)
    }
    removeItem(id: number){
        this.ingredients.splice(id, 1)
    }
    resetItems(){
        this.ingredients = [];
    }
}
