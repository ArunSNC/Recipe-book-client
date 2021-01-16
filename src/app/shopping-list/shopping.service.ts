import { NgForm } from '@angular/forms';
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingService{

  sendDetails: any = new Subject<any>();
  editDetails: any = new Subject<any>();

  // itemsFromRecipe: any = new Subject<any>();


    receiveDetails!: any;
    resetFormOnDelete!: NgForm

    private ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)
    ]

    getIngredients(){
      return this.ingredients.slice();
    }

    getIngredient(index: number){
      let item = this.ingredients[index];
      return item;
    }

    setIngredient(data: any){
      this.ingredients.push(data);
      this.sendDetails.next(this.ingredients.slice())
    }

    getItemsFromRecipe(items: Ingredient[]){
      this.ingredients.push(...items);
      this.sendDetails.next(this.ingredients.slice())
    }

    updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index] = newIngredient;
      this.sendDetails.next(this.ingredients.slice());
    }

    removeIngredient(index: number){
      this.ingredients.splice(index, 1);
    }
}