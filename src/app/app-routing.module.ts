import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { FavoritesComponent } from './favorites/favorites.component';

import { AuthGuard } from './guards';

const routes: Routes = [
    { 
    	path: '', component: HomeComponent, canActivate: [AuthGuard] 
    },
    { 
    	path: 'login', component: LoginComponent 
    },
    {
      path: 'artist/:id',
      component: ArtistComponent
    },
    {
      path: 'album/:id',
      component: AlbumComponent
    },
    {
      path: 'favorites',
      component: FavoritesComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
