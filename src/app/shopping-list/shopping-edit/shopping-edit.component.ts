import { ShoppingService } from './../shopping.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // @ViewChild('nameInput', {static : true}) nameInput!: ElementRef;
  // @ViewChild('amountInput', {static: true}) amountInput! : ElementRef;

  btnName = "Add";
  editMode = false;
  editIndex!: number;

  @ViewChild('list', {static: true}) list!: NgForm;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.shoppingService.resetFormOnDelete = this.list;
    this.shoppingService.editDetails.subscribe((index: any) =>{
      let editIngredient =  this.shoppingService.getIngredient(index);
      this.editIndex = index;
      this.editMode = true;
      this.list.form.patchValue({
        "items": editIngredient.name,
        "amount": editIngredient.amount
      })
    })
  }

  onDetails(){

    if(this.editMode){
    this.shoppingService.updateIngredient(this.editIndex, new Ingredient(this.list.value['items'], this.list.value['amount']));
    }else{

      this.shoppingService.setIngredient({
        name: this.list.value['items'],
        amount: this.list.value['amount']
      });
    }
    this.editMode = false;
    this.list.reset();
  }

  onReset(){
    this.editMode = false;
    this.list.reset();
  }
}
