import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListComponent } from "./shopping-list.component";

const routes: Routes = [
    {path: "", component: ShoppingListComponent}
]

@NgModule({
    imports:[
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class ShoppingListRouterModule{}