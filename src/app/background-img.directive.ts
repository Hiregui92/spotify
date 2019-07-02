import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
	selector: '[appBackgroundImg]'
})
export class BackgroundImgDirective {

	private el: HTMLElement;

	constructor(el: ElementRef) {
		this.el = el.nativeElement;
	}

	@Input('appBackgroundImg') backgroundImage: string;

	ngAfterViewInit() {
		this.el.style.backgroundImage = 'url(' + this.backgroundImage + ')';
	}

}
