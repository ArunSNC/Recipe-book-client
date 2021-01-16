import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from 'lodash';
import { map, tap, toArray } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http:HttpClient, private recipeService: RecipeService){}


    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        recipes.forEach(recipe => {
            let filteredRecipes = _.omit(recipe, ['id'])
            this.http.post('http://localhost:1337/api/add/recipes',filteredRecipes).subscribe(data => {
                console.log(data);
            })
        })
    }

    fetchRecipes(){
        console.log('Fetching recipes..');
        let i = 0;
        let filteredRecipes: any;
        return this.http.get<any[]>('http://localhost:1337/api/recipes')
        .pipe(map((recipes) => {
            let recipe = _.pick(recipes, ['recipes'])
            for(let item in recipe){
                filteredRecipes = recipe[item].map( (data: any) => {
                    return {
                        id: i++,
                        name: data.name,
                        imagePath: data.imagePath,
                        description: data.description,
                        ingredients: data.ingredientsId.ingredientsName ? data.ingredientsId.ingredientsName : []
                    }
                })
            }
            return filteredRecipes;
        }),tap(recipes => {
            this.recipeService.recipeSet(recipes);
    })
    )
    }
}