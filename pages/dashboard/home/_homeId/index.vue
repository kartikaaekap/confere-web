<template>
  <div>
    <section id="title" class="section__top mb-2 mb-md-5">
      <b-container>
        <b-container>
          <h1>Detail Class</h1>
          <b-row class="pt-3">
            <b-col
              cols="12"
              md="6"
              lg="6"
              xl="6"
              class="d-flex flex-column justify-content-center"
            >
              <b-card>
                <p class="section__text">
                  Name: <span class="section__subtext">{{ classDetail.name }}</span>
                </p>
                <p class="section__text">
                  Schedule: <span class="section__subtext">{{ classDetail.schedule }}</span>
                </p>
                <p class="section__text">
                  Zoom Link: <a class="section__link">{{ classDetail.zoomLink }}</a>
                </p>
                <p class="section__text">
                  Youtube Link: <a class="section__link">{{ classDetail.youtubeLink }}</a>
                </p>
              </b-card>
            </b-col>
            <b-col
              cols="12"
              md="6"
              lg="6"
              xl="6"
            >
              <div class="align-items-center ml-0 ml-md-5">
                <b-img class="imgResize" src="~/assets/img/scene-detail-class.png" />
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </section>
  </div>
</template>

<script>

export default {
  layout: 'dashboard',
  async asyncData ({ store, params }) {
    return {
      classDetail: await store.dispatch('getClassStudentDetail', params.homeId)
    }
  },
  data: () => {
    return {
      isLoading: false
    }
  },
  computed: {
    areAllInputsEmpty () {
      return Object.values(this.form).some(value => !value)
    }
  },
  methods: {
    handleCreateClass () {
      console.log(this.classDetail)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
h1 {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  color: rgb(114, 114, 114);
}
.section {
  &__text {
    font-size: 20px;
    font-weight: bold;
    color:  rgb(114, 114, 114);
  }
  &__subtext {
    font-size: 20px;
    font-weight: 300;
    color:  rgb(114, 114, 114);
  }
    &__link {
    font-size: 20px;
    font-weight: 300;
    color: rgb(41, 108, 235);
    cursor: pointer;
  }
  &__top {
    padding-top: 100px;
    padding-bottom: 20px;
  }
}
@media screen and (max-width: 600px) {
  .imgResize {
    width: 90%;
  }
  h1 {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  color: rgb(114, 114, 114);
  }
}
</style>
