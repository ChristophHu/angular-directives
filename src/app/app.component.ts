import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Directives</h1>
    <h2>Attribute Directives</h2>
    <h3>ngStyle</h3>
    <div [ngStyle]="{'background-color': color}"></div>
    
  `,
  styles: [`
    div {
      width: 100px;
      height: 100px;
    }
    `
  ]
})
export class AppComponent {
  title = 'angular-directives'
  color = 'red'
  
  constructor() {
    setTimeout(() => {
      this.color = 'green'
    }, 3000);
  }
}