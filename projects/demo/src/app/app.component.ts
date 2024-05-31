import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FocusOnDirective } from './shared/directives/focus-on/focus-on.directive';
import { MaskDirective } from './shared/directives/mask/mask.directive';
import { CopyOnClickDirective } from './shared/directives/copy-on-click/copy-on-click.directive';
import { TooltipModule } from './shared/directives/tooltip/tooltip.module';
import { TooltipPosition, TooltipTheme } from './shared/directives/tooltip/tooltip.enums';
import { LoadingDirective } from './shared/directives/loading/loading.directive';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { HighlightTextDirective } from './shared/directives/highlight-text/highlight-text.directive';
import { TemplateDirective } from './shared/directives/template/template.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    CopyOnClickDirective,
    FocusOnDirective,
    FormsModule,
    HighlightTextDirective,
    LoadingDirective,
    LoadingComponent,
    MaskDirective,
    RouterOutlet,
    ReactiveFormsModule,
    TemplateDirective,
    TooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  form!: FormGroup
  copyText: string = 'CopyText...'
  isLoading: boolean = true;

  constructor() {
    this.form = new FormGroup({
      copy    : new FormControl('Test'),
      focus   : new FormControl(''),
      nofocus : new FormControl(''),
      mask    : new FormControl(''),
    })
  }

  TooltipPosition: typeof TooltipPosition = TooltipPosition
  x = 0
  y = 0
  coordinates = ""
  p = TooltipPosition.LEFT
  th = TooltipTheme.LIGHT

  delete(key: string) {
    this.form.get(key)?.setValue('')
  }
}
