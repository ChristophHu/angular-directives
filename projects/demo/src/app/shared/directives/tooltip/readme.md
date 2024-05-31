# Tooltip-Directive

## Use
```html
<div class="h-12 w-12 stroke-2" [tooltip]="'Tooltip on the right!'" [position]="TooltipPosition.RIGHT">
    
</div>
```

```typescript
@Component({
    imports: [
        TooltipModule,
        ...
    ],
    ...
})
```