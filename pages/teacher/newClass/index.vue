<template>
  <div>
    <section id="title" class="section__top">
      <b-container>
        <b-container>
          <h1>Create a New Class</h1>
          <b-row class="pt-3">
            <b-col cols="12" md="6" lg="6" xl="6">
              <div class="align-items-center">
                <b-img class="imgResize" src="~/assets/img/scene-new-class.svg" />
              </div>
            </b-col>
            <b-col cols="12" md="6" lg="6" xl="6">
              <b-form class="d-flex flex-column" @submit.prevent="handleCreateClass">
                <base-input
                  id="name"
                  v-model="form.name"
                  label="Class Name"
                  type="name"
                  size="large"
                  placeholder="Input Class Name"
                  required
                />
                <base-input
                  id="key"
                  v-model="form.key"
                  label="Enrollment Key"
                  type="key"
                  size="large"
                  placeholder="Example: ABW2020"
                  required
                />
                <base-input
                  id="schedule"
                  v-model="form.schedule"
                  label="Class Schedule"
                  type="schedule"
                  size="large"
                  placeholder="Example: 20 Desember 2020, 08.00 pm"
                  required
                />
                <base-input
                  id="zoomLink"
                  v-model="form.zoomLink"
                  label="Zoom Link"
                  type="zoomLink"
                  size="large"
                  placeholder="Input Zoom Link of the Class"
                  required
                />
                <base-input
                  id="youtubeLink"
                  v-model="form.youtubeLink"
                  label="Youtube Link"
                  type="youtubeLink"
                  size="large"
                  placeholder="Input Youtube Link of the Class"
                  required
                />
                <div class="text-right">
                  <base-button type="submit" :disabled="isLoading || areAllInputsEmpty" class="mt-4">
                    <span>Create Class</span>
                  </base-button>
                </div>
              </b-form>
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
  data: () => {
    return {
      form: {
        name: '',
        key: '',
        schedule: '',
        zoomLink: '',
        youtubeLink: ''
      },
      isLoading: false
    }
  },
  computed: {
    areAllInputsEmpty () {
      return Object.values(this.form).some(value => !value)
    }
  },
  methods: {
    async handleCreateClass () {
      const teacherId = this.$store.state.user.id
      const { name, key, schedule, zoomLink, youtubeLink } = this.form
      this.isLoading = true
      try {
        await this.$store.dispatch('createClass', { teacherId, name, key, schedule, zoomLink, youtubeLink })
        this.isLoading = false
        this.$router.push('/teacher/home')
        this.$toast.success('Class successfully created')
      } catch (error) {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  color: rgb(114, 114, 114);
}
.section {
  &__text {
    font-size: 16px;
  }
  &__link {
    font-size: 12px;
    color: rgb(0, 162, 255);
  }
  &__top {
    padding-top: 100px;
    padding-bottom: 20px;
  }
  &__img {
    width: 100%;
  }
}
@media screen and (max-width: 600px) {
  .imgResize {
    width: 90%;
  }
}
</style>
