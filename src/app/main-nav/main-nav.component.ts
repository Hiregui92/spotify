import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

import { AuthenticationService } from '../services';
import { User } from '../models';

@Component({
	selector: 'app-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

	currentUser: User;

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
	.pipe(
		map(result => result.matches)
		);

	constructor(
		private router: Router,
		private breakpointObserver: BreakpointObserver,
		private authenticationService: AuthenticationService
		) {
		this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
	}

	logout() {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
	}

}
