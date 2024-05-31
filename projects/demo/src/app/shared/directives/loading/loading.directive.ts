import { ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import { LoadingComponent } from '../../components/loading/loading.component'

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  });
}

@Directive({
  selector: '[loading]',
  standalone: true
})
export class LoadingDirective {
  @Input() set loading(loading: boolean) {
    if (loading) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent)
      this.view.createComponent(componentFactory)
    } else {
      this.view.clear()
      this.view.createEmbeddedView(this.template)
    }
  }

  constructor(private view: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, private template: TemplateRef<AnimationPlayState>) {}
}
