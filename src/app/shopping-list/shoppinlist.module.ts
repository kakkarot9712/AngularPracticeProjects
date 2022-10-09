import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListRouterModule } from "./shoppinglist-router.module";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports:[
        CommonModule,
        SharedModule,
        RouterModule,
        FormsModule,
        SharedModule,
        ShoppingListRouterModule
    ]
})

export class ShoppingListModule{}