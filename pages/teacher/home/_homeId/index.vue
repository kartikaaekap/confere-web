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
                  Zoom Link: <a class="section__link">{{ classDetail.zoomLink }}</a>
                </p>
                <p class="section__text">
                  Youtube Link: <a class="section__link">{{ classDetail.youtubeLink }}</a>
                </p>
                <div>{{ classDetail.studentsId[0].name }}</div>
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
    <section id="table" class="mt-5">
      <b-container>
        <h2>Members ({{ classDetail.studentsId.length }})</h2>
        <!-- <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody v-for="item in classDetail.studentsId" :key="item._id">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
            </tr>
          </tbody>
        </table> -->
        <b-table
          responsive
          striped
          hover
          show-empty
          :items="items"
          :fields="fields"
          :busy="isLoading"
        />
        <!-- <template v-slot:cell(name)="{ item: { studentsId } }">
          <span>{{ studentsId.name }}</span>
        </template>
        <template v-slot:cell(email)="{ item: { studentsId } }">
          <span>{{ studentsId.email }}</span>
        </template>
        <template v-slot:cell(action)>
          <b-link class="ml-2">
            Delete
          </b-link>
        </template> -->
        <base-button @click="handleCreateClass">
          Coba
        </base-button>
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
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'action', label: 'Action' }
      ],
      items: [
        { name: 'kuku', email: 'jjj', action: 'Macdonald' }
      ]
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
    // cobain () {
    //   let i
    //   for (i = 0; i < this.classDetail.studentsId.length; i++) {
    //     classDetail.studentsId
    //   }
    // }
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
}
</style>
