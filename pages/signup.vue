<template>
  <b-row class="mx-0">
    <b-col cols="12" md="7" lg="7" xl="7" class="content-desktop p-0">
      <div class="align-items-center">
        <b-img class="backgroundSignup" src="../assets/img/frame-sign-up.png" />
      </div>
    </b-col>
    <b-col cols="12" md="4" lg="4" xl="4" class="item-align-center ml-0 ml-md-3 ml-lg-4 ml-xl-5 pl-xl-4">
      <div is-link class="logo mt-5">
        <a :href="href" class="logo__img">
          <b-img src="~/assets/img/logo-getdebug.svg" :class="{ 'logo__img--small': isSmall }" fluid />
        </a>
      </div>
      <p class="signup__text text-center mt-4">
        Sign up for an account
      </p>
      <b-form class="d-flex flex-column" @submit.prevent="handleSubmit">
        <base-input
          id="name"
          v-model="form.name"
          label="Fullname"
          type="name"
          size="large"
          placeholder="Full name"
          required
        />
        <base-input
          id="email"
          v-model="form.email"
          label="Email"
          type="email"
          size="large"
          placeholder="Email"
          required
        />
        <base-input
          id="password"
          v-model="form.password"
          label="Password"
          size="large"
          placeholder="Password"
          required
          :type="isPaswordVisible ? 'text' : 'password'"
          :append="isPaswordVisible ? 'eye' : 'eye-slash'"
          @click="togglePassword"
        />
        <span class="signup__note">Your password must be at least 8 characters that include at least 1 uppercase letter, 1 lowercase letter, and 1 number.</span>
        <base-input
          id="confirmPassword"
          v-model="form.confirmPassword"
          label="Re-type password"
          size="large"
          placeholder="Re-enter password"
          required
          :type="isConfirmPaswordVisible ? 'text' : 'password'"
          :append="isConfirmPaswordVisible ? 'eye' : 'eye-slash'"
          class="mt-3"
          @click="toggleConfirmPassword"
        />
        <base-button type="submit" :disabled="isLoading || areAllInputsEmpty" class="mx-auto mt-4">
          <base-loading v-if="isLoading" variant="light" />
          <span v-else>Sign Up</span>
        </base-button>
      </b-form>
      <b-link to="/signin" class="signup__link d-flex justify-content-center mb-5 mt-4">
        Sign in instead
      </b-link>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    isLink: {
      type: Boolean,
      default: false
    },
    isSmall: {
      type: Boolean,
      default: false
    }
  },
  auth: 'guest',
  validate ({ query, store }) {
    return !query.token ? true : store.dispatch('validateInviteConfirm', { token: query.token, companyId: query.companyId }).then(() => true)
  },
  data: () => {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      isLoading: false,
      isPaswordVisible: false,
      isConfirmPaswordVisible: false
    }
  },
  computed: {
    areAllInputsEmpty () {
      return Object.values(this.form).some(value => !value)
    },
    href () {
      return this.isLink ? (this.user ? (this.user.isAdmin ? '/admin' : '/dashboard') : '/') : false
    }
  },
  mounted () {
    this.form.email = this.$route.query.email
  },
  methods: {
    togglePassword () {
      this.isPaswordVisible = !this.isPaswordVisible
    },
    toggleConfirmPassword () {
      this.isConfirmPaswordVisible = !this.isConfirmPaswordVisible
    },
    handleSubmit () {
      const { name, email, password, confirmPassword } = this.form
      const { token } = this.$route.query
      const query = {}
      if (password !== confirmPassword) {
        this.$toast.error('Both passwords must match')
        return false
      }
      if (token) { query.token = token }
      this.isLoading = true
      this.$store
        .dispatch('createUser', [{ name, email, password }, query])
        .then(({ message }) => {
          this.isLoading = false
          this.$toast.success(message)
          this.$router.push(`/signin?email=${email}`)
        })
        .catch(() => (this.isLoading = false))
    }
  }
}
</script>

<style lang="scss" scoped>
.signup {
  &__text {
    @include dashboardParagraph;
  }
  &__note {
    @include dashboardDateTime;
  }
  &__link {
    @include link;
  }
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  &__img {
    img {
      max-height: 80px;
      &.logo__img--small {
        max-height: 50px;
        padding-bottom: 5px;
      }
    }
  }
}
.backgroundSignup {
  width: 100%;
  height: auto;
}
@media screen and (max-width: 600px) {
  .content-desktop {
    display: none;
  }
}
</style>
