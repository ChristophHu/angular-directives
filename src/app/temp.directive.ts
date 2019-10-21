import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appTemp]'
})
export class TempDirective {
  @Input('appTemp') set unless(condition: boolean) {
    if (condition) {
      this.viewContainerRef.clear()
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }

}
