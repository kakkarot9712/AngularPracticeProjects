import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
    {path: "", redirectTo: 'recipe', pathMatch: 'full'},
    {path: 'recipe', 
    loadChildren: () => import ('./recipe-book/recipes.module').then(mod=>mod.RecipesModule)},
    { path: 'shopping',
    loadChildren: () => import('./shopping-list/shoppinlist.module').then(mod=>mod.ShoppingListModule)},
    { path: 'auth',loadChildren: () => import('./auth/auth.module').then(mod=>mod.AuthModule)}
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{}
