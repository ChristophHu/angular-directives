import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[mask]',
  standalone: true
})
/**
 * The default `ControlValueAccessor` for writing a value and listening to changes on input
 * elements. The accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * {@searchKeywords ngDefaultControl}
 *
 * @usageNotes
 *
 * ### Using the default value accessor
 *
 * The following example shows how to use an input element that activates the default value accessor
 * (in this case, a text field).
 *
 * ```ts
 * const firstNameControl = new FormControl();
 * ```
 *
 * ```
 * <input type="text" [formControl]="firstNameControl">
 * ```
 *
 * This value accessor is used by default for `<input type="text">` and `<textarea>` elements, but
 * you could also use it for custom components that have similar behavior and do not require special
 * processing. In order to attach the default value accessor to a custom element, add the
 * `ngDefaultControl` attribute as shown below.
 *
 * ```
 * <custom-input-component ngDefaultControl [(ngModel)]="value"></custom-input-component>
 * ```
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
export class MaskDirective {
  @Input('mask') mask!: string

  private inputElem!: HTMLInputElement
  private _lastMaskedValue = ''

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.inputElem = this.el.nativeElement
  }

  @HostListener('input') onInput() {
    this.inputElem.value = this._maskValue(this.inputElem.value)
  }

  private _maskValue(val: string): string {
    if (!val || !this.mask || val === this._lastMaskedValue) {
      return val
    }

    const maskedVal = this._lastMaskedValue =
      valueToFormat(
        val,
        this.mask,
        this._lastMaskedValue.length > val.length,
        this._lastMaskedValue
      )

    return maskedVal
  }

}

const _formatToRegExp: any = {
  '0': /[0-9]/, 'a': /[a-z]/, 'A': /[A-Z]/, 'B': /[a-zA-Z]/, 'C': /[0-9a-zA-Z]/,
}

const _allFormatsStr = '(' +
  Object.keys(_formatToRegExp)
    .map(key => _formatToRegExp[key].toString())
    .map(regexStr => regexStr.substr(1, regexStr.length - 2))
    .join('|')
  + ')'

const _allFormatsGlobal = getAllFormatRegexp('g')

/**
* Apply format to a value string
*
* Format can be constructed from next symbols:
*  - '0': /[0-9]/,
*  - 'a': /[a-z]/,
*  - 'A': /[A-Z]/,
*  - 'B': /[a-zA-Z]/
*  - 'C': /[0-9a-zA-Z]/
*
* Example: 'AAA-00BB-aaaa'
* will accept 'COD-12Rt-efww'
*
* @param value Current value
* @param format Format
* @param goingBack Indicates if change was done by BackSpace
* @param prevValue Pass to precisely detect formatter chars
*/
function valueToFormat(value: string, format: string, goingBack = false, prevValue?: string): string {

  let maskedValue = ''
  const unmaskedValue = unmaskValue(value)

  const isLastCharFormatter = !getAllFormatRegexp().test(value[value.length - 1])
  const isPrevLastCharFormatter = prevValue && !getAllFormatRegexp().test(prevValue[prevValue.length - 1])

  let formatOffset = 0
  for (let i = 0, maxI = Math.min(unmaskedValue.length, format.length); i < maxI; ++i) {
    const valueChar = unmaskedValue[i]
    let formatChar = format[formatOffset + i]
    let formatRegex = getFormatRegexp(formatChar)

    if (formatChar && !formatRegex) {
      maskedValue += formatChar
      formatChar = format[++formatOffset + i]
      formatRegex = getFormatRegexp(formatChar)
    }

    if (valueChar && formatRegex) {
      if (formatRegex && formatRegex.test(valueChar)) {
        maskedValue += valueChar
      } else {
        break
      }
    }

    const nextFormatChar = format[formatOffset + i + 1]
    const nextFormatRegex = getFormatRegexp(nextFormatChar)
    const isLastIteration = i === maxI - 1

    if (isLastIteration && nextFormatChar && !nextFormatRegex) {
      if (!isLastCharFormatter && goingBack) {
        if (prevValue && !isPrevLastCharFormatter) {
          continue
        }
        maskedValue = maskedValue.substr(0, formatOffset + i)
      } else {
        maskedValue += nextFormatChar
      }
    }
  }

  return maskedValue
}

function unmaskValue(value: string): string {
  const unmaskedMathes = value.replace(' ', '').match(_allFormatsGlobal)
  return unmaskedMathes ? unmaskedMathes.join('') : ''
}

function getAllFormatRegexp(flags?: string) {
  return new RegExp(_allFormatsStr, flags)
}

function getFormatRegexp(formatChar: string): RegExp | null {
  return formatChar && _formatToRegExp[formatChar] ? _formatToRegExp[formatChar] : null
}
