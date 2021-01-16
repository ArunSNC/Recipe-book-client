import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-list';

  switch: boolean = true;
  constructor() {}


  onNavItemSelected(evt: any):void{
   evt.value == "recipe" ? this.switch = true : this.switch = false
  }
}
