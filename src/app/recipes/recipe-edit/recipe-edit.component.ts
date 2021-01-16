import { Recipe } from './../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm!: FormGroup;

  ingredients!: Ingredient;

  edit = false;
  editIndex!: number;

  recipes!: Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment)=>{
      fragment === 'edit' ? this.initForm() : this.updateForm();
    })
  }

  private initForm(){
    this.edit = true;
    this.recipeForm = new FormGroup({
      'recipeName' : new FormControl('',Validators.required),
      'imagePath': new FormControl('',Validators.required),
      'description': new FormControl('',Validators.required),
      'ingredients': new FormArray([])
    });
  }

  private updateForm(){
    this.edit = false;
    let recipe: any;
    let ingredients = new FormArray([]);
    this.route.queryParams.subscribe((queryParams)=>{
      this.editIndex = +queryParams['id'];
      recipe = this.recipeService.getRecipe(this.editIndex);
      if(recipe.ingredients){
        for (let ingredient of recipe.ingredients){
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, Validators.required)
          }))
        }
      }
    });

    this.recipeForm = new FormGroup({
      'recipeName': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': ingredients
    })

  }

  onSubmit(){

    let recipe;

    if(this.edit){
      this.edit = true;
      recipe = new Recipe(
        this.recipeService.getLength(),
        this.recipeForm.get('recipeName')?.value,
        this.recipeForm.get('description')?.value,
        this.recipeForm.get('imagePath')?.value,
        this.recipeForm.get('ingredients')?.value
        );
        this.recipeService.setRecipes(recipe);
    }else{
      this.edit = false;
      recipe = new Recipe(
        this.editIndex,
        this.recipeForm.get('recipeName')?.value,
        this.recipeForm.get('description')?.value,
        this.recipeForm.get('imagePath')?.value,
        this.recipeForm.get('ingredients')?.value
        );
        this.recipeService.updateRecipes(this.editIndex, recipe);
      }
      this.recipeForm.reset();
      this.router.navigate(['/'],{fragment: 'success'});
  }

  addIngredients(){
    const group = new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl('', Validators.required)
    });
    (this.recipeForm.get('ingredients') as FormArray).push(group);
  }

  get controls(){
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
    this.recipeForm.reset();
  }

  removeIngredient(index: number){
    (this.recipeForm.get('ingredients')  as FormArray).removeAt(index);
  }

}
