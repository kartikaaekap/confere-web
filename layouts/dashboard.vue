<template>
  <div>
    <top-navigation />
    <div class="content pb-5">
      <nuxt />
    </div>
    <footer class="section__footer py-3 px-0">
      <b-row class="align-items-center mx-0">
        <b-col md="3" />
        <b-col cols="12" md="6">
          <ul class="px-2 mb-0 text-center">
            <li>
              <p class="section__text section__text--white mb-sm-0">
                Design By : @Confere2020
              </p>
            </li>
          </ul>
        </b-col>
        <b-col cols="12" md="3" class="text-md-right text-center">
          <p class="section__text section__text--white mb-0">
            Version 1.0.0
          </p>
        </b-col>
      </b-row>
    </footer>
  </div>
</template>

<script>
import TopNavigation from '~/components/TopNavigation'

export default {
  components: { TopNavigation }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.section {
  &__footer {
    background: rgb(60, 60, 218);
    ul li {
      list-style: none;
      display: inline-block;
    }
  }
  &__company {
    font-size: 18px;
    strong {
      font-weight: bold;
    }
    &--white {
      color: white;
    }
  }
  &__text {
    font-size: 18px;
    strong {
      font-weight: 500;
    }
    &--white {
      color: white;
    }
  }
}
</style>
