import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../models';

@Component({
	selector: 'app-element-list',
	templateUrl: './element-list.component.html',
	styleUrls: ['./element-list.component.css']
})
export class ElementListComponent implements OnInit {
	@Input() album: Album;
	constructor() { }

	ngOnInit() {
		
	}

}
