# Copy-On-Click-Directive

## Use
```html
<input type="text" [copyOnClick]="copyText" />
```

```typescript
@Component({
    imports: [
        CopyOnClickDirective,
        ...
    ],
    ...
})
export class AppComponent {
    copyText: string = 'CopyText...'
}
```