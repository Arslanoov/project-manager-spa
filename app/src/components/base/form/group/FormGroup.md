FormGroup example:
```vue
<FormGroup
  @change="(value) => {}"
  @update-error-state="(hasErrors) => {}"
  :clear-count="0"
  :value="'some password'"
  :rules="(v) => !!v || 'Password required'"
  name="Password"
  id="password"
  type="password"
/>
```