import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "../auth.gaurd";
import { LoadingComponent } from "../shared/loading/loading.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";



const routes: Routes = [
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGaurd] ,resolve: [RecipeResolverService],
      children: [
        {path : '', component: LoadingComponent},
        {path: 'details', component: RecipeDetailComponent},
        {path : 'update', component: RecipeEditComponent},
        {path : 'new', component: RecipeEditComponent},
    ]},
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule{

}