import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router' 

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  inpDet: Recipe;
  rid: number;
  constructor(private recipeservice: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  this.route.params.subscribe((params: Params)=>{
    this.rid = +params["rid"]
    this.inpDet = this.recipeservice.fetchRecipe(this.rid);
  })
  }
  
  sendIngredients(){
    this.recipeservice.addIngredients(this.inpDet.ingrediants)
  }

  onEdit(index: number){
    this.recipeservice.editSubject.next(index)
  }

  onDelete(){
    this.recipeservice.removeRecipe(this.rid)
    this.recipeservice.changedRecipe();
    this.router.navigate(['/recipe'])
  }
}
