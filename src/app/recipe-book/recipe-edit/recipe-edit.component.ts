import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  index: string;
  editMode = false;
  recipeform : FormGroup
  editIndex: number;
  constructor(private route: ActivatedRoute, private recipeservice: RecipeService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.editIndex = params['rid'];
      if (this.editIndex == undefined){
        this.editMode = false;
      }
      else{
        this.editMode = true;
      }
      this.makeForm();
      })
    // this.ingarray = new FormArray<FormGroup>()
  }

  makeForm(){
    let url: string = null
    let name: string = null
    let desc: string = null
    let ingreds = new FormArray([])
    
    if (this.editMode){
      let data = this.recipeservice.fetchRecipe(this.editIndex)
      url = data.imagePath
      name = data.name
      desc = data.description
      if (data.ingrediants){
        for (let ingredient of data.ingrediants){
          ingreds.push(
            new FormGroup({
              "ingname":new FormControl(ingredient.name, [Validators.required]),
              "amount":new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeform = new FormGroup({
      "url": new FormControl(url, [Validators.required]),
      "name": new FormControl(name, [Validators.required]),
      "description": new FormControl(desc, [Validators.required]),
      "ingrediants": ingreds
    })
  }

  onAdd(){
    (<FormArray>this.recipeform.get('ingrediants')).push(new FormGroup({
      "ingname": new FormControl(null, [Validators.required]),
      "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  get controls(){
    return (<FormArray>this.recipeform.get('ingrediants')).controls
  }

  onSubmit(){
    let recipe: Recipe = {
      name: this.recipeform.get("name").value,
      description: this.recipeform.get("description").value,
      imagePath: this.recipeform.get("url").value,
      ingrediants:[] 
    }
    for (let control of this.controls){
      recipe.ingrediants.push({
        name: control.value.ingname,
        amount: control.value.amount
      })
    }
    if (this.editMode == true){
      this.recipeservice.setRecipe(this.editIndex, recipe)
      this.editMode = false
      this.recipeform.reset()
    }
    else{
      this.recipeservice.addRecipe(recipe)
      this.recipeservice.changedRecipe()
      this.recipeform.reset()
    }
    this.onCancel()
  }
  deleteIng(index: number){
    (<FormArray>this.recipeform.get('ingrediants')).removeAt(index)
  }

  onCancel(){
    this.editMode = false
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
