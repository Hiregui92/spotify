import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services';
import { FormControl } from '@angular/forms';

import { Artist } from '../models/Artist';

import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
	selector: 'app-search',
  	templateUrl: './search.component.html',
  	styleUrls: ['./search.component.css'],
   	providers: [SpotifyService]
})
export class SearchComponent implements OnInit {
  searchStr: string;
  results: Artist[];
  query: FormControl = new FormControl();

  constructor(private _spotifyService: SpotifyService) { }

  ngOnInit() {
    this.query.valueChanges
      .pipe(debounceTime(400))
      .pipe(distinctUntilChanged())
      .subscribe(query => this._spotifyService.getAuth()
        .subscribe(res => this._spotifyService.searchMusic(query, 'artist', res["access_token"]).subscribe(
          res => {
            console.log(res["artists"].items)
            if (res["artists"] && res["artists"].items) {
            	this.results = res["artists"].items
            }
          })
        ));
  }
}
