import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { EmptyRecipeComponent } from "./empty-recipe/empty-recipe.component";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeRotingModule } from "./recipe-routing.module";

@NgModule({
    declarations:[
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailsComponent,
        RecipeBookComponent,
        RecipeEditComponent,
        EmptyRecipeComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RecipeRotingModule,
    ],
})

export class RecipesModule{

}