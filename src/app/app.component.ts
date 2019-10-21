import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Directives</h1>
    <h2>Attribute Directives</h2>
    <h3>ngStyle</h3>
    <div [ngStyle]="{'background-color': color}"></div>

    <hr>
    <h3>Eigene Directives</h3>
    <p appHighlightText>Hervorgehobener Text!</p>

    
    <h2>Structural Directive</h2>
    <h3>*ngIf</h3>
    <div *ngIf="switch">Ist nicht immer zu sehen</div>
    <button (click)="switch = !switch">Switch</button>
    
    <hr>
    <h3>*ngFor</h3>
    <ul>
      <li *ngFor="let element of elements; let i = index">{{ i }} - {{ element }}</li>
    </ul>

    <hr>
    <h3>ngSwitch</h3>
    <div [ngSwitch]="value">
      <p *ngSwitchCase="10">10</p>
      <p *ngSwitchCase="100">100</p>
      <p *ngSwitchCase="1000">1000</p>
      <p *ngSwitchDefault>Sonstige</p>
    </div>
  `,
  styles: [`
    div {
      width: 100%;
      height: 50px;
    }
    `
  ]
})
export class AppComponent {
  title = 'angular-directives'
  color = 'red'
  switch = true
  elements = ['text', 2, 3, 4, 5]
  value = 101
  
  constructor() {
    setTimeout(() => {
      this.color = 'green'
    }, 3000);
  }
}