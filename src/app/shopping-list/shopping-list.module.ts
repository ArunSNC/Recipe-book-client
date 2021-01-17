import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports: [RouterModule, CommonModule, FormsModule, ShoppingListRoutingModule]
})
export class ShoppingListModule{}