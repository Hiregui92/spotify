import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, empty, of } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

import { map } from 'rxjs/operators';

import { Album } from '../models';

@Injectable()
export class SpotifyService {
  private searchUrl: string;
  private artistUrl: string;
  private albumsUrl: string;
  private albumUrl: string;
  private clientId: string = environment.clientId;
  private clientSecret: string = environment.clientSecret;
  private body: any;


  constructor(private _http: HttpClient, private authenticationService: AuthenticationService) { }


  // Get access token from Spotify to use API
  getAuth = () => {
     const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.clientId + ":" + this.clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const params = new HttpParams({
      fromObject: {
        grant_type: 'client_credentials'
      }
    });

    const formData = new FormData();
    formData.append('grant_type', 'client_credentials');

    return this._http.post('https://accounts.spotify.com/api/token', params, httpOptions)
      .pipe(map(res => {
        console.log(res);
        return res;
      }));

  }

  // Get search results for a query
  searchMusic(query: string, type = 'artist', authToken: string) {
     const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + authToken
      })
    };

    this.searchUrl = environment.spotifyApi + 'search?query=' + 
        query + '&offset=0&limit=20&type=' + type + '&market=US';

    return this._http.get(`${this.searchUrl}`, httpOptions)
      .pipe(map(res => res));
  }

  // Get data about artist that has been chosen to view
  getArtist(id: string, authToken: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + authToken
      })
    };


    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + authToken);

    this.artistUrl = environment.spotifyApi+'artists/' + id;

    return this._http.get(this.artistUrl, httpOptions)
      .pipe(map(res => res));
  }

  // Get the albums about the artist that has been chosen
  getAlbums(id: string, authToken: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + authToken
      })
    };

    this.albumsUrl = environment.spotifyApi+'artists/' + id + '/albums?market=US&album_type=single';

    return this._http.get(this.albumsUrl, httpOptions)
      .pipe(map(res => res));
  }

  getParentAlbum(id: string, authToken: string, type): any {
    if (type == "artist") {
      return this.getAlbums(id, authToken);
    } else {
      return this.getAlbumsIds(id, authToken, type);
    }
  }


  // Get Tracks in ablum selected
   getAlbum(id: string, authToken: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + authToken
      })
    };

    this.albumUrl = environment.spotifyApi+'albums/' + id;

    return this._http.get(this.albumUrl, httpOptions)
      .pipe(map(res => res));
  }

   // Get Tracks in ablum selected
  getAlbumsIds(id: string, authToken: string, type) {
    var ids = [];
    var data = id;
    if (id == undefined) {
      const currentUser = this.authenticationService.currentUserValue;
      if (type == "summary") {
        data = currentUser.albums;
      } else{
        data = currentUser.favorites;
      }

    }

    if (data == undefined) {
       return of({});
    }
    ids = data.split(',');
    
    this.albumUrl = environment.spotifyApi+'albums?ids=' + ids.join("%2C") + "&market=ES";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + authToken
      })
    };
    
    return this._http.get(this.albumUrl, httpOptions)
    .pipe(map(res => res));
  }
  
}
