<template>
  <div class="input">
    <fieldset class="input__group">
      <label v-if="label" :for="id">{{ label }} <b-icon
        v-if="warningIcon"
        icon="asterisk"
        color="red"
        width="7"
        height="7"
        class="mb-2"
      /></label>
      <b-form-select
        :id="id"
        :name="id"
        :value="value"
        :options="options"
        :required="required"
        :disabled="disabled"
        @input="handleInput"
        @change="handleChange"
      />
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'BaseInputSelect',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    warningIcon: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => [{ value: '', text: 'Please select' }]
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e)
    },
    handleChange (e) {
      this.$emit('change', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  &__group {
    margin-bottom: 20px;
    label {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
  &__errors {
    margin-top: 10px;
    > * {
      font-size: 12px;
      color: red;
    }
  }
}
</style>
