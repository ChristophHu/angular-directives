import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective {

  constructor(elRef: ElementRef) { 
    elRef.nativeElement.style.color = 'red';
  }
}