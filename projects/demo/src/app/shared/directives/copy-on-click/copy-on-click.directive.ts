import { Directive, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[copyOnClick]',
  standalone: true
})
export class CopyOnClickDirective {
  @Input() public copyOnClick = 'T'

  constructor() {}

  @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
    event.preventDefault()
    if (!this.copyOnClick) {
      return
    }
    navigator.clipboard.writeText(this.copyOnClick.toString())
  }
}
