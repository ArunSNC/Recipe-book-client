import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent, resolve: [RecipeResolverService], children: [
    {path : '', component: LoadingComponent},
    {path: 'details', component: RecipeDetailComponent},
    {path : 'update', component: RecipeEditComponent},
    {path : 'new', component: RecipeEditComponent},
  ]},
  { path: 'shopping', component: ShoppingListComponent},
  { path : 'auth' , children: [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
