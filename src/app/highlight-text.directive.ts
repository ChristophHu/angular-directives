import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective {

  constructor(elRef: ElementRef, renderer: Renderer) { 
    //elRef.nativeElement.style.color = 'red';
    renderer.setElementStyle(elRef.nativeElement, 'color', 'red')
  }
}