import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { SpotifyService } from '../services';
import { User, Album } from '../models';

import { map } from 'rxjs/operators';

@Component({
	selector: 'app-media-list',
	templateUrl: './media-list.component.html',
	styleUrls: ['./media-list.component.css'],
	providers: [SpotifyService]
})
export class MediaListComponent implements OnInit {

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
				this._spotifyService.getAlbumsIds(id, res["access_token"], "summary")
				.subscribe(data => {
					console.log(data)
					this.albums = data["albums"];
				});
			});
		});
	}

}
