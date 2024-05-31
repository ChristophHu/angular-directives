import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[template]',
  standalone: true
})
export class TemplateDirective {
  @Input('template') set unless(condition: boolean) {
    if (condition) {
      this.viewContainerRef.clear()
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }
}
