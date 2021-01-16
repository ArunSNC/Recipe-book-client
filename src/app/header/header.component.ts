import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private data:DataStorageService) { }

  ngOnInit(): void {
  }

  onSave(){
    this.data.storeRecipes();
  }

  onFetch(){
    this.data.fetchRecipes().subscribe();
  }

}
