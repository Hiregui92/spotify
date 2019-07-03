import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User, Album } from '../models';
import { Router } from '@angular/router';

import { AuthenticationService, AlertService } from '../services';

@Component({
  selector: 'app-element-card',
  templateUrl: './element-card.component.html',
  styleUrls: ['./element-card.component.css']
})
export class ElementCardComponent implements OnInit {
	@Input() album: Album;
  @Output() albumValueChange: EventEmitter<any>;
	currentUser: User;
  	constructor(
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      public router: Router
      ) { 
      this.albumValueChange = new EventEmitter();
    }

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
        this.alertService.success('Elemento agregado satisfactoriamente a favoritos');
  			localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  		}
  	}

  	removeFavorite(id) {
      console.log(id);
  		let favorites = [];
  		if(this.currentUser.favorites) {
  			favorites = this.currentUser.favorites.split(',');
  		}
  		var a = favorites.indexOf(id);
  		if (a !== -1) {
        console.log('id');
  			favorites.splice(a, 1);
  			var faStr = favorites.toString();
  			this.currentUser.favorites = faStr;
        this.albumValueChange.emit({id: id, type: "delete"});
        this.alertService.error('Elemento eliminado satisfactoriamente');
  			localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  		}
  	}
  playAlbum(id) {
    this.router.navigate(['album', id]);
  }

}
