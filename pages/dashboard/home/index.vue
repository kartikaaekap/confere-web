<template>
  <section>
    <p>COBA DULU</p>
    <p>COBA DULU</p>
    <p>COBA DULU</p>
    <p>COBA DULU</p>
    <p>COBA DULU</p>
    <p>COBA DULU</p>
    <p>COBA DULU</p>
    <p>COBA DULU</p>
    <p>COBA DULU</p>
    <p>COBA DULU</p>
    <base-button @click="coba">
      Coba
    </base-button>
  </section>
</template>

<script>

export default {
  layout: 'dashboard',
  methods: {
    coba () {
      console.log(this.$store.state.user)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
.section {
  &__text {
    font-size: 16px;
  }
  &__link {
    font-size: 12px;
    color: rgb(0, 162, 255);
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
.backgroundLogin {
  width: 100%;
  height: auto;
}
@media screen and (max-width: 600px) {
  .content-desktop {
    display: none;
  }
}
</style>
