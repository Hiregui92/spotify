import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services';
import { Album, Artist } from '../models';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-artist',
	templateUrl: './artist.component.html',
	styleUrls: ['./artist.component.css'],
	providers: [SpotifyService]
})
export class ArtistComponent implements OnInit {

	id: string;
	artist: Artist;
	albums: Album[];
	constructor(private _spotifyService: SpotifyService,
		private _route: ActivatedRoute) { }

	ngOnInit() {
		this._route.params
		.pipe(map(params => params['id']))
		.subscribe((id) => {
			this._spotifyService.getAuth()
			.subscribe(res => {
				this._spotifyService.getArtist(id, res["access_token"])
				.subscribe(artist => {
					console.log(artist);
					this.artist = artist;
				});
				this._spotifyService.getAlbums(id, res["access_token"])
				.subscribe(albums => {
					console.log(albums);
					this.albums = albums.items;
				});
			});
		});
	}

}

