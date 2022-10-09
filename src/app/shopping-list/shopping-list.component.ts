import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shared/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]

  constructor(private shoppingservice :ShoppingService, private logservice: LoggingService) { }

  ngOnInit(): void {
    this.logservice.printLog("Hello from ShoppingListComp")
    this.ingredients = this.shoppingservice.ingredients
    }

    onEditItem(index: number){
       this.shoppingservice.editIng.next(index)    
      }
  }
  // pushEvent(event: Ingredient){
  //   this.shoppingservice.addItem(event)
  // }
