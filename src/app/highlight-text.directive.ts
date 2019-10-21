import { Directive, ElementRef, Renderer, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective {
  /*constructor(elRef: ElementRef, renderer: Renderer) { 
    //elRef.nativeElement.style.color = 'red';
    renderer.setElementStyle(elRef.nativeElement, 'color', 'red')
  }*/

  @HostBinding('style.backgroundColor') color = 'red'
    
  @HostListener('mouseenter') mouseenter() {
    this.color = 'blue'
  }

  @HostListener('mouseleave') mouseleave() {
    this.color = 'red'
  }
}