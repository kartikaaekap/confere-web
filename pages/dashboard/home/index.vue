<template>
  <div>
    <section id="welcome" class="section__top">
      <b-container>
        <b-container>
          <b-row class="pt-3">
            <b-col
              cols="12"
              md="8"
              lg="8"
              xl="8"
              class="d-flex flex-column justify-content-center"
            >
              <div class="section__title">
                Welcome to Confere
              </div>
              <div class="section__subtitle">
                You can search for all the classes and then enter the enrollment key form your teacher to join those class
              </div>
            </b-col>
            <b-col
              cols="12"
              md="4"
              lg="4"
              xl="4"
            >
              <div class="align-items-center ml-0 ml-md-5 pt-4 pt-md-0">
                <b-img class="imgResize" src="~/assets/img/scene-dashboard-fix.png" />
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </section>
    <section id="filterClass" class="mt-5">
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
    <section>
      <b-container>
        <b-row>
          <b-col
            v-for="studentClass in filteredClass"
            :key="studentClass._id"
            :busy="isLoading"
            cols="12"
            md="4"
            class="mt-3 mt-sm-4"
          >
            <b-card class="section__list overflow-hidden" @click="handleCheckCondition (studentClass._id)">
              <b-row no-gutters>
                <b-col md="6" class="d-flex flex-column justify-content-center">
                  <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0" />
                </b-col>
                <b-col md="6">
                  <b-card-body>
                    <div class="section__titleCard">
                      {{ studentClass.name }}
                    </div>
                    <b-card-text class="section__subtitleCard pt-4">
                      Dosen : {{ studentClass.teacherId.name }}
                    </b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
              <!-- <div class="text-right">
                <base-button @click="coba">
                  Join Class
                </base-button>
              </div> -->
            </b-card>
          </b-col>
        </b-row>
        <base-modal v-if="isPopUp" v-model="isPopUp" title="Enrollment Key" ok-label="Join Class" @ok="handleJoinClass">
          <b-form @submit.prevent="handleJoinClass">
            <base-input
              id="key"
              v-model="form.key"
              type="text"
              size="large"
              placeholder="Input Enrollemnt Key from Your teacher"
              required
            />
          </b-form>
        </base-modal>
      </b-container>
    </section>
  </div>
</template>

<script>

export default {
  layout: 'dashboard',
  async asyncData ({ store }) {
    // await store.restored
    // console.log(store.state)
    // const token = store.state.user.accessToken
    // $axios.setToken(token)
    return {
      studentClass: await store.dispatch('getAllClass')
    }
  },
  data: () => {
    return {
      filter: '',
      isLoading: false,
      isPopUp: false,
      isClassId: '',
      form: {
        key: ''
      }
    }
  },
  computed: {
    filteredClass () {
      return this.studentClass.filter(({ name }) => {
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
    handleJoinClass (_id) {
      const { key } = this.form
      const userId = this.$store.state.user.id
      const classId = this.isClassId
      this.isLoading = true
      this.$store
        .dispatch('joinClass', [userId, { key, classId }])
        .then(() => this.handleClassDetail(classId).then(() => (this.isLoading = false)))
        .catch(() => (this.isLoading = false))
    },
    showPopUp () {
      this.isPopUp = true
    },
    async handleCheckCondition (_id) {
      const userId = this.$store.state.user.id
      const classId = _id
      this.isLoading = true
      try {
        const isJoinClass = await this.$store.dispatch('checkClass', { userId, classId })
        if (isJoinClass.enrolled === false) {
          this.showPopUp()
          this.isClassId = classId
        } else {
          this.handleClassDetail(_id)
        }
      } catch (error) {
        this.isLoading = false
      }
    },
    handleClassDetail (_id) {
      this.$router.push(`/dashboard/home/${_id}`)
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
  &__top {
    padding-top: 100px;
    padding-bottom: 20px;
    background: rgb(231, 222, 255);
  }
  &__list {
    background: rgba(81, 123, 160, 0.030);
    cursor: pointer;
    :hover{
      background: white;
    }
    border-radius: 20px;
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
  &__titleCard {
    font-size: 16px;
    font-weight: bold;
    color: rgb(102, 101, 101);
  }
  &__subtitleCard {
    font-size: 14px;
    color: rgb(102, 101, 101);
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
  .section {
    &__title {
      font-size: 30px;
    }
  }
}
</style>
