<template>
  <div>
    <section id="welcome" class="section__top">
      <b-container>
        <b-container>
          <b-row class="pt-3">
            <b-col
              cols="12"
              md="5"
              lg="5"
              xl="5"
            >
              <div class="align-items-center ml-0 ml-md-5 pt-4 pt-md-0">
                <b-img class="imgResize" src="~/assets/img/scene-classlist.png" />
              </div>
            </b-col>
            <b-col
              cols="12"
              md="7"
              lg="7"
              xl="7"
              class="d-flex flex-column justify-content-center"
            >
              <div class="section__title">
                Class Lists
              </div>
              <div class="section__subtitle">
                Check out Your classes, here!
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </section>
    <section id="title" class="mt-5 mb-2">
      <b-container>
        <b-row>
          <b-col cols="5" />
          <b-col cols="7">
            <base-input
              id="filter"
              v-model="filter"
              type="search"
              size="large"
              placeholder="Search Class by Name"
              append="search"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section id="table">
      <b-container>
        <b-table
          responsive
          striped
          hover
          show-empty
          :items="filteredClass"
          :fields="fields"
          :busy="isLoading"
        >
          <template v-slot:cell(name)="{ item: { _id, name } }">
            <b-link @click="handleClassDetail(_id)">
              <u>{{ name }}</u>
            </b-link>
          </template>
          <template v-slot:cell(schedule)="{ item: { schedule } }">
            <span>{{ schedule }}</span>
          </template>
          <template v-slot:empty>
            <p class="text-center mb-0">
              {{ noResultMessage }}
            </p>
          </template>
        </b-table>
      </b-container>
    </section>
  </div>
</template>

<script>

export default {
  layout: 'dashboard',
  async asyncData ({ store, params }) {
    const userId = store.state.user.id
    return {
      classStudentById: await store.dispatch('getClassStudentById', userId)
    }
  },
  data: () => {
    return {
      filter: '',
      fields: [
        { key: 'name', label: 'Class Name' },
        { key: 'schedule', label: 'Schedule' }
      ],
      isLoading: false
    }
  },
  computed: {
    filteredClass () {
      return this.classStudentById.filter(({ name }) => {
        return name
          .toLowerCase()
          .split(' ')
          .join()
          .includes(this.filter.trim().toLowerCase())
      })
    },
    noResultMessage () {
      const filter = this.filter.trim().toLowerCase()
      return filter ? `No class with "${filter}"` : 'No class to show'
    }
  },
  methods: {
    resetForm () {
      Object.keys(this.form).forEach(key => (this.form[key] = ''))
    },
    handleClassDetail (_id) {
      this.$router.push(`/dashboard/home/${_id}`)
    },
    async handleRefreshList () {
      const userId = this.$store.state.user.id
      this.classStudentById = await this.$store.dispatch('getClassStudentById', userId)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Nunito Sans';
}
h1 {
  font-size: 35px;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 30px;
  color: rgb(114, 114, 114);
}
@media only screen and (max-width: 600px) {
  h1 {
    font-size: 20px;
  }
  .section {
    &__title {
      font-size: 30px;
    }
  }
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
    background:  rgba(207, 236, 253, 0.692);
  }
  &__title {
    font-size: 60px;
    color: rgb(102, 101, 101);
    font-weight: bold;
  }
    &__subtitle {
    font-size: 20px;
    color: rgb(102, 101, 101);
  }
}
</style>
