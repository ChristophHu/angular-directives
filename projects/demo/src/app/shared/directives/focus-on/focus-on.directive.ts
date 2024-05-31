import { Directive, ElementRef, Input } from '@angular/core'

@Directive({
  selector: '[focusOn]',
  standalone: true
})
export class FocusOnDirective {
  @Input() set focusOn(focus: boolean) {
    if (focus) {
      this.hostElement.nativeElement.focus()
    }
  }

  constructor(private hostElement: ElementRef) { }
}
