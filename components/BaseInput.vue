<template>
  <div class="input mb-3">
    <fieldset class="input__group">
      <label v-if="label" :for="id">{{ label }} <b-icon
        v-if="warningIcon"
        icon="asterisk"
        color="red"
        width="7"
        height="7"
        class="mb-2"
      /></label>
      <div class="input__box" :class="classes">
        <span v-if="prepend" class="input__prependix">{{ prepend }}</span>
        <input
          :id="id"
          :name="id"
          :value="value"
          :type="type"
          :placeholder="placeholder"
          :min="min"
          :max="max"
          :step="step"
          :disabled="disabled"
          :required="required"
          :class="{ 'border-right-0': append }"
          @input="handleInput"
        >
        <button v-if="append" type="button" class="input__appendix" tabindex="-1" @click="handleButton">
          <b-icon :icon="append" />
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'large'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    prepend: {
      type: String,
      default: ''
    },
    append: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    warningIcon: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return `input--${this.size} ${this.append ? 'input--appended' : ''} ${this.prepend ? 'input--prepended' : ''}`
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    },
    handleButton (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  &__group {
    label {
      font-size: 16px;
      margin-bottom: 0.5rem;
    }
  }
  &__box {
    display: flex;
    input {
      display: block;
      width: 100%;
      padding: 1rem;
      border-radius: 4px;
      border: 1px solid gray;
      background: white;
      &[type='number'] {
        text-align: right;
      }
      &::placeholder {
        font-size: 16px;
      }
      &:hover,
      &:active,
      &:focus {
        outline: unset;
      }
    }
    button {
      background-color: white;
      border-radius: 4px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border: 1px solid gray;
      border-left-style: none;
    }
  }
  &__errors {
    margin-top: 0.5rem;
    > * {
      font-size: 12px;
      color: red;
    }
  }
  &__prependix {
    font-size: 14px;
    padding: 1rem;
  }

  // general modifiers
  &--prepended {
    input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  &--appended {
    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  // size modifiers
  &--large {
    height: 2.5rem;
    span {
      padding: 0.25rem;
    }
    button {
      min-width: 2.5rem;
    }
  }
  &--small,
  &--medium {
    height: 2.25rem;
    span {
      padding: 0.25rem;
    }
    button {
      min-width: 2.25rem;
    }
  }
}
</style>
