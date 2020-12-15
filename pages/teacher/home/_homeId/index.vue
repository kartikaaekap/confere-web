<template>
  <div>
    <section id="title" class="section__top">
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
                  Zoom Link: <a :href="linkClassZoom" class="section__link" target="_blank">{{ classDetail.zoomLink }}</a>
                </p>
                <p class="section__text">
                  Youtube Link: <a :href="linkClassYoutube" class="section__link" target="_blank">{{ classDetail.youtubeLink }}</a>
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
    <section id="tableMember" class="mt-5">
      <b-container>
        <base-button @click="handleCreateClass">
          coba
        </base-button>
        <h3>Members ({{ classDetail.studentsId.length }})</h3>
        <div class="mt-3" style="overflow-x:auto;">
          <table id="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="classDetail.studentsId.length === 0" class="text-center">
              <tr>
                <td colspan="3">
                  There are no record to show
                </td>
              </tr>
            </tbody>
            <tbody v-for="item in classDetail.studentsId" v-else :key="item._id">
              <tr>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>
                  <b-link class="ml-2" @click="showModalDelete (item._id, item.name)">
                    Delete
                  </b-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <base-modal
          v-if="isModalDelete"
          v-model="isModalDelete"
          title="Delete Student"
          is-danger
          ok-label="Delete"
          @ok="handleDeleteClass"
        >
          <p>Are you sure to delete <strong>{{ form.name }}</strong> from this class ? </p>
        </base-modal>
      </b-container>
    </section>
  </div>
</template>

<script>

export default {
  layout: 'dashboard',
  async asyncData ({ store, params }) {
    return {
      classDetail: await store.dispatch('getClassTeacherDetail', params.homeId)
    }
  },
  data: () => {
    return {
      isLoading: false,
      isModalDelete: false,
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'action', label: 'Action' }
      ],
      form: {
        _id: '',
        name: ''
      }
    }
  },
  computed: {
    areAllInputsEmpty () {
      return Object.values(this.form).some(value => !value)
    },
    linkClassZoom () {
      return this.classDetail.zoomLink
    },
    linkClassYoutube () {
      return this.classDetail.youtubeLink
    }
  },
  methods: {
    handleCreateClass () {
      console.log(this.classDetail)
      console.log(this.handleRefreshList)
    },
    handleDeleteClass () {
      const userId = this.form._id
      const classId = this.classDetail._id
      this.$store
        .dispatch('deleteStudentFromClass', { classId, userId })
        .then(() => this.handleRefreshList().then(() => (this.isLoading = false)))
        .catch(() => (this.isLoading = false))
    },
    showModalDelete (_id, name) {
      this.isModalDelete = true
      this.form = { ...this.form, _id, name }
    },
    async handleRefreshList () {
      this.classDetail = await this.$store.dispatch('getClassTeacherDetail', this.$route.params.homeId)
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
#table {
  border-collapse: collapse;
  width: 100%;
}

#table td, #table th {
  border: 1px solid rgb(182, 179, 179);
  padding: 8px;
}

#table tr:nth-child(even){background-color: #f2f2f2;}

#tabe tr:hover {background-color: #ddd;}

#table td {
  font-size: 18px;
}

#table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: rgb(78, 78, 141);
  color: white;
  font-size: 18px;
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
