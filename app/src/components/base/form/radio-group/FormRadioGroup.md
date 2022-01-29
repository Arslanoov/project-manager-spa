FormRadioGroup example:
```vue
<FormRadioGroup
  @change="(value) => {}"
  :selected="'Dark'"
  :values="['Light', 'Dark']"
  class="form__group"
  name="theme"
/>
```