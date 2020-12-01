<template>
  <div>
    <section id="title" class="section__top">
      <b-container>
        <b-row>
          <b-col cols="5">
            <h1>Your Class List</h1>
          </b-col>
          <b-col cols="7">
            <base-input
              id="filter"
              v-model="filter"
              type="search"
              size="large"
              placeholder="Filter companies"
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
          <template v-slot:cell(action)="row">
            <b-link @click="showModalEdit(row)">
              Edit
            </b-link>
            <b-link class="ml-2" @click="showModalDelete(row)">
              Delete
            </b-link>
          </template>
          <template v-slot:empty>
            <p class="text-center mb-0">
              {{ noResultMessage }}
            </p>
          </template>
        </b-table>
        <base-modal v-if="isModalEdit" v-model="isModalEdit" title="Edit Class" ok-label="Save" @ok="handleEditClass">
          <b-form @submit.prevent="handleEditClass">
            <base-input
              id="name"
              v-model="form.name"
              type="text"
              size="large"
              label="Class Name"
              placeholder="Input Class Name"
              required
            />
            <base-input
              id="key"
              v-model="form.key"
              type="text"
              size="large"
              label="Enrollment Key"
              placeholder="Example: ABW2020"
              required
            />
            <base-input
              id="schedule"
              v-model="form.schedule"
              type="text"
              size="large"
              label="Schedule"
              placeholder="Example: 20 Desember 2020, 08.00 pm"
              required
            />
            <base-input
              id="zoomLink"
              v-model="form.zoomLink"
              type="text"
              size="large"
              label="Zoom Link"
              placeholder="Input Zoom Link of the Class"
              required
            />
            <base-input
              id="youtubeLink"
              v-model="form.youtubeLink"
              type="text"
              size="large"
              label="Youtube Link"
              placeholder="Input Youtube Link of the Class"
              required
            />
          </b-form>
        </base-modal>
        <base-modal
          v-if="isModalDelete"
          v-model="isModalDelete"
          title="Delete this Class?"
          is-danger
          ok-label="Delete"
          @ok="handleDeleteClass"
        >
          <p>Are you sure to delete class: <strong>{{ form.name }}</strong> ? </p>
        </base-modal>
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
      classTeacherById: await store.dispatch('getClassTeacherById', userId)
    }
  },
  data: () => {
    return {
      filter: '',
      form: {
        _id: '',
        name: '',
        key: '',
        schedule: '',
        zoomLink: '',
        youtubeLink: ''
      },
      fields: [
        { key: 'name', label: 'Class Name' },
        { key: 'schedule', label: 'Schedule' },
        { key: 'action', label: 'Action' }
      ],
      isLoading: false,
      isModalEdit: false,
      isModalDelete: false
    }
  },
  computed: {
    filteredClass () {
      return this.classTeacherById.filter(({ name }) => {
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
  watch: {
    isModalEdit (value) {
      if (!value) {
        this.resetForm()
      }
    }
  },
  methods: {
    resetForm () {
      Object.keys(this.form).forEach(key => (this.form[key] = ''))
    },
    handleNewClass () {
      console.log(this.classTeacherById)
      this.$router.push('/teacher/newClass')
    },
    handleClassDetail (_id) {
      this.$router.push(`/teacher/home/${_id}`)
    },
    handleEditClass () {
      const { _id, name, key, schedule, zoomLink, youtubeLink } = this.form
      this.isLoading = true
      this.$store
        .dispatch('updateClassTeacher', [_id, { name, key, schedule, zoomLink, youtubeLink }])
        .then(() => this.handleRefreshList().then(() => (this.isLoading = false)))
        .catch(() => (this.isLoading = false))
    },
    handleDeleteClass () {
      this.$store
        .dispatch('deleteClassTeacher', this.form._id)
        .then(() => this.handleRefreshList().then(() => (this.isLoading = false)))
        .catch(() => (this.isLoading = false))
    },
    showModalEdit ({ item: { _id, name, key, schedule, zoomLink, youtubeLink } }) {
      this.isModalEdit = true
      this.form = { ...this.form, _id, name, key, schedule, zoomLink, youtubeLink }
    },
    showModalDelete ({ item: { _id, name } }) {
      this.isModalDelete = true
      this.form = { ...this.form, _id, name }
    },
    async handleRefreshList () {
      const userId = this.$store.state.user.id
      this.classTeacherById = await this.$store.dispatch('getClassTeacherById', userId)
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
}
</style>
