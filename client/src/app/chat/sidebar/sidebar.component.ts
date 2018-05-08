import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	private currentTab: string = "groups";

  constructor() { }

  ngOnInit() {
  }

	changeTab(tab:string){
			this.currentTab = tab;
	}

}
