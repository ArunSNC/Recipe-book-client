import { ShoppingService } from './../shopping-list/shopping.service';
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService{

  addOrUpdateRecipes = new Subject<any>();

    constructor(private shoppingService: ShoppingService){}

    // private recipes: Recipe[] = [
    //     new Recipe(0,'Dosa',
    //     'this is south indian meal',
    //     'https://www.dishesguru.com/uploads/recipe/masala-dosa-810-810.jpg',
    //     [
    //         new Ingredient('Dosa', 1),
    //         new Ingredient('Chutney',1),
    //         new Ingredient('Sambar',1),
    //         new Ingredient('Potato Curry',1)
    //     ]),
    //     new Recipe(1,'Chole Bhatura',
    //     'this is north indian meal',
    //     'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/kxklpwomraaw2ijhm5mp',
    //     [
    //         new Ingredient('Poori',2),
    //         new Ingredient('Chole Masala',1),
    //         new Ingredient('Onions',4),
    //         new Ingredient('Tomato',1)
    //     ])
    //   ];

    private recipes: Recipe[] = [];

      getRecipe(id: any){
        return this.recipes[id];
      }

      getRecipes(){
        return this.recipes.slice();
      }

      setRecipes(recipe : any){
        this.recipes.push(recipe);
        this.addOrUpdateRecipes.next(this.recipes.slice());
      }

      updateRecipes(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.addOrUpdateRecipes.next(this.recipes.slice());
      }

      addItemsToShoppinglist(ingredients: Ingredient[]){
        this.shoppingService.getItemsFromRecipe(ingredients)
      }

      getLength(){
        return this.recipes.length;
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.addOrUpdateRecipes.next(this.recipes.slice());
      }

      recipeSet(recipe: any){
        this.recipes = recipe;
        this.addOrUpdateRecipes.next(this.recipes.slice());
      }

}