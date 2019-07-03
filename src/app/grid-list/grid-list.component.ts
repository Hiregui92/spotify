import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SpotifyService } from '../services';
import { User, Album } from '../models';

import { map } from 'rxjs/operators';

@Component({
	selector: 'app-grid-list',
	templateUrl: './grid-list.component.html',
	styleUrls: ['./grid-list.component.css'],
   	providers: [SpotifyService]
})
export class GridListComponent implements OnInit {
  	@Input() type: string;
	currentUser: User;
	id: string;
	albums: Album[];
	constructor(private _spotifyService: SpotifyService,
		private _route: ActivatedRoute) { }

	ngOnInit() {
	    this._route.params
	      .pipe(map(params => params['id']))
	      .subscribe((id) => {
	        this._spotifyService.getAuth()
	          .subscribe(res => {
	            this._spotifyService.getParentAlbum(id, res["access_token"], this.type)
	              .subscribe(data => {
	                if (this.type == "artist") {
	                	this.albums = data["items"];
	                } else {
	                	this.albums = data["albums"];
	                }
	              });
	          });
	      });
	 
	}

	story: string = '';

  getStory(story) {
  	console.log('getStory');
    this.story = story;
  }


	albumValueChange(event) {
	    this.albums = this.albums.filter( Album => Album.id !== event.id);
	}

}
