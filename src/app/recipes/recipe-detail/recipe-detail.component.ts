import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  storedRecipe: any;
  id!: number;
  name!: string;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((queryParams: Params) =>{
      this.id = +queryParams['id'];
      this.name = queryParams['name'];
      console.log(this.id);
      this.recipeStored(this.recipeService.getRecipe(this.id));
    });

  }

  recipeStored(recipe: any){
    this.storedRecipe = recipe;
    console.log(this.storedRecipe);
  }

  sendToShoppinglist(data:any){
    this.recipeService.addItemsToShoppinglist(data);
  }

  updateRecipe(){
    this.router.navigate(['../update'], {relativeTo: this.route, queryParams: {id: this.id, name: this.name}, fragment: 'update'})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
