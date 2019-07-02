import { Component, OnInit, Input } from '@angular/core';
import { User, Album } from '../models';

import { AuthenticationService } from '../services';

@Component({
  selector: 'app-element-card',
  templateUrl: './element-card.component.html',
  styleUrls: ['./element-card.component.css']
})
export class ElementCardComponent implements OnInit {
	@Input() album: Album;
	currentUser: User;
  	constructor(private authenticationService: AuthenticationService) { }

  	ngOnInit() {
  		this.currentUser = this.authenticationService.currentUserValue;
  	}

  	addFavorite(id) {
  		let favorites = [];
  		if(this.currentUser.favorites) {
  			favorites = this.currentUser.favorites.split(',');
  		}
		var a = favorites.indexOf(id);
		if (a == -1) {
			favorites.push(id);
			var faStr = favorites.toString();
			this.currentUser.favorites = faStr;
			localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
		}
  	}

  	removeFavorite(id) {
  		let favorites = [];
  		if(this.currentUser.favorites) {
  			favorites = this.currentUser.favorites.split(',');
  		}
		var a = favorites.indexOf(id);
		if (a !== -1) {
			favorites.splice(a, 1);
			var faStr = favorites.toString();
			this.currentUser.favorites = faStr;
			localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
		}
  	}

}
