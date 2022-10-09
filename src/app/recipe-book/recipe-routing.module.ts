import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { EmptyRecipeComponent } from "./empty-recipe/empty-recipe.component";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesResolver } from "./recipe-resolver";

const routes: Routes = [
    {path: "", component:RecipeBookComponent, canActivate:[AuthGuard], children:[
        {path:'', component: EmptyRecipeComponent, pathMatch:'full', resolve: [RecipesResolver]},
        {path:'new', component: RecipeEditComponent},
        {path:':rid', component: RecipeDetailsComponent, resolve: [RecipesResolver]},
        {path:':rid/edit', component: RecipeEditComponent, resolve: [RecipesResolver]},
    ]},
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class RecipeRotingModule{

}