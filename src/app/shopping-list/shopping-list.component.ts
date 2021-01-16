import { ShoppingService } from './shopping.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private shopSrv: ShoppingService) { }

  ingredients! :Ingredient[];
  igChangeSub!: Subscription;

  ngOnInit(): void {
    this.ingredients = this.shopSrv.getIngredients()
    this.igChangeSub = this.shopSrv.sendDetails.subscribe((data :any) =>{
      this.ingredients = data;
    });
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }

  editItem(index: number){
    // console.log(this.ingredients[index])
    this.shopSrv.editDetails.next(index);
  }

  removeIngredient(index: number){
    this.shopSrv.resetFormOnDelete.reset();
    this.shopSrv.removeIngredient(index);
    this.ingredients = this.shopSrv.getIngredients();
  }

}
