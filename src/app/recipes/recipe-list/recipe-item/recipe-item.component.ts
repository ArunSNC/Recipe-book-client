import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('recipeItem') recipe: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  onRecipe(){
    // this.recipeService.storeRecipes(this.recipe)
    this.router.navigate(['details'], {queryParams: {id: this.recipe.id, name: this.recipe.name}, relativeTo: this.route})
  }

}
