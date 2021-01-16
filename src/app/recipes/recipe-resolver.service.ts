import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<any[]>{

    constructor(private data:DataStorageService, private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipe = this.recipeService.getRecipes();

        if(recipe.length === 0){
            return this.data.fetchRecipes();
        }else{
            return recipe;
        }
    }

}