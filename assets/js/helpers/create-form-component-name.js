/* 
  Get component name for dynamic form
*/

export function createComponentName (type) {
  switch (type) {
  case 'checkbox':
    return 'BaseCheckbox'

  case 'checkboxGroup':
    return 'BaseCheckboxGroup'

  case 'radio':
    return 'BaseRadioGroup'

  case 'dropdown':
    return 'BaseDropdown'

  case 'date':
    return 'BaseDatePicker'

  case 'hidden':
    return 'input'

  default:
    return 'BaseTextField'
  }
}
