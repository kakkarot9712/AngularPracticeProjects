import { formatCurrency } from '@angular/common';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/shared/shopping.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingservice: ShoppingService) { }
  subscription: Subscription;
  ngOnInit(): void { 
    this.subscription = this.shoppingservice.editIng.subscribe((index)=>{
      this.editindex = index
      this.sform.setValue({
        name: this.shoppingservice.ingredients[index].name,
        amount: this.shoppingservice.ingredients[index].amount
      })
    })
  }

  @ViewChild("shoppingform")sform: NgForm;
  @Input("ind")id: number;
  editindex = -1;
  onSubmit(){
    if(this.editindex == -1){
      this.shoppingservice.addItem(this.sform.value)
    }
    else{
      this.shoppingservice.ingredients[this.editindex].name = this.sform.value.name
      this.shoppingservice.ingredients[this.editindex].amount = this.sform.value.amount
      this.editindex = -1
    }
    this.sform.reset()
  }

  onReset(){
    this.sform.reset()
    this.editindex = -1
  }

  onDelete(){
    this.shoppingservice.removeItem(this.editindex)
    this.editindex = -1
    this.sform.reset()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // removeIngredient(index: number){
  //   this.shoppingservice.removeItem(index)
  // }
}
// 
