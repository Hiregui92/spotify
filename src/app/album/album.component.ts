import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services';
import { Artist, Album } from '../models';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  providers: [SpotifyService]
})
export class AlbumComponent implements OnInit {
  id: string;
  album: Album;
  constructor(private _spotifyService: SpotifyService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params
      .pipe(map(params => params['id']))
      .subscribe((id) => {
        this._spotifyService.getAuth()
          .subscribe(res => {
            this._spotifyService.getAlbum(id, res["access_token"])
              .subscribe(album => {
                this.album = album;
              });
          });
      });
  }

}

