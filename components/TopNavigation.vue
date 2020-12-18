<template>
  <b-container fluid class="px-0">
    <b-navbar fixed="top" class="navbar" :class="{ 'navbar--shadow': scrollPosition }">
      <b-container class="px-0 px-sm-3">
        <b-col cols="4" class="d-block d-md-none">
          <dropdown-menu v-model="isDropdownOpenMenu" left hover>
            <base-button
              variant="secondary"
              icon="list"
              size="small"
              class="ml-3"
              icon-only
            />
            <div slot="dropdown">
              <template>
                <base-button v-if="this.$store.state.user.roles === 'student'" variant="text" to="/dashboard/home">
                  Home
                </base-button>
                <base-button v-else variant="text" to="/teacher/home">
                  Home
                </base-button>
                <base-button v-if="this.$store.state.user.roles === 'student'" variant="text" to="/dashboard/classlist">
                  List Class
                </base-button>
              </template>
            </div>
          </dropdown-menu>
        </b-col>
        <b-col cols="4" md="2" class="d-flex px-0 px-md-3">
          <b-navbar-brand href="#" class="d-flex px-0 px-md-3">
            <b-img src="~/assets/img/logo-confere.png" fluid />
          </b-navbar-brand>
        </b-col>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <template>
              <base-button v-if="this.$store.state.user.roles === 'student'" variant="text" is-long class="d-none d-md-flex mr-3" to="/dashboard/home">
                Home
              </base-button>
              <base-button v-else variant="text" is-long class="d-none d-md-flex mr-3" to="/teacher/home">
                Home
              </base-button>
              <base-button v-if="this.$store.state.user.roles === 'student'" variant="text" is-long class="d-none d-md-flex mr-3" to="/dashboard/classlist">
                List Class
              </base-button>
            </template>
            <dropdown-menu v-model="isDropdownOpen" right hover>
              <base-button
                id="user"
                variant="secondary"
                icon="person"
                size="small"
                class="ml-3"
                icon-only
                is-circle
              />
              <div slot="dropdown">
                <template>
                  <p class="profil__name pl-2 py-2 mb-0">
                    {{ this.$store.state.user.name }}
                  </p>
                  <p class="profil__description pl-2 pb-2 mt-0">
                    {{ this.$store.state.user.email }}
                  </p>
                </template>
                <b-link class="dropdown__item p-2" to="/signout">
                  Sign out
                </b-link>
              </div>
            </dropdown-menu>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <aside class="sidebar" :class="{ 'sidebar--open': isSidebarOpen }">
      <b-container class="px-0 px-sm-3">
        <b-col cols="4" class="d-block d-md-none">
          <dropdown-menu v-model="isDropdownOpenMenu" left hover>
            <base-button
              variant="secondary"
              icon="list"
              size="small"
              class="ml-3"
              icon-only
            />
            <div slot="dropdown">
              <template>
                <base-button v-if="this.$store.state.user.roles === 'student'" variant="text" to="/dashboard/home">
                  Home
                </base-button>
                <base-button v-else variant="text" to="/teacher/home">
                  Home
                </base-button>
                <base-button v-if="this.$store.state.user.roles === 'student'" variant="text" to="/dashboard/classlist">
                  List Class
                </base-button>
              </template>
            </div>
          </dropdown-menu>
        </b-col>
        <b-col cols="4" md="2" class="d-flex px-0 px-md-3">
          <b-navbar-brand href="#" class="d-flex px-0 px-md-3">
            <b-img src="~/assets/img/logo-confere.png" fluid />
          </b-navbar-brand>
        </b-col>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <template>
              <base-button v-if="this.$store.state.user.roles === 'student'" variant="text" is-long class="d-none d-md-flex mr-3" to="/dashboard/home">
                Home
              </base-button>
              <base-button v-else variant="text" is-long class="d-none d-md-flex mr-3" to="/teacher/home">
                Home
              </base-button>
              <base-button v-if="this.$store.state.user.roles === 'student'" variant="text" is-long class="d-none d-md-flex mr-3" to="/dashboard/classlist">
                List Class
              </base-button>
            </template>
            <dropdown-menu v-model="isDropdownOpen" right hover>
              <base-button
                id="user"
                variant="secondary"
                icon="person"
                size="small"
                class="ml-3"
                icon-only
                is-circle
              />
              <div slot="dropdown">
                <template>
                  <p class="profil__name pl-2 py-2 mb-0">
                    {{ this.$store.state.user.name }}
                  </p>
                  <p class="profil__description pl-2 pb-2 mt-0">
                    {{ this.$store.state.user.email }}
                  </p>
                </template>
                <b-link class="dropdown__item p-2" to="/signout">
                  Sign out
                </b-link>
              </div>
            </dropdown-menu>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </aside>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DropdownMenu from '@innologica/vue-dropdown-menu'

export default {
  name: 'TopNavigation',
  components: { DropdownMenu },
  // async asyncData () {
  //   return {
  //     userAuth: await window.localStorage.getItem('user')
  //   }
  // },
  data: () => {
    return {
      scrollPosition: null,
      isDropdownOpen: false,
      isDropdownOpenMenu: false,
      openModal: ''
    }
  },
  computed: {
    ...mapState(['isSidebarOpen'])
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  destroy () {
    window.removeEventListener('scroll', this.updateScroll)
  },
  methods: {
    ...mapMutations(['toggleSidebar']),
    updateScroll () {
      this.scrollPosition = window.scrollY
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: white;
  height: 70px;
  width: 100%;
  &__nav {
    display: flex;
    align-items: center;
    a {
      color: blue;
    }
  }
  &--shadow {
    box-shadow: 0px 5px 10px rgba(black, 0.12);
    transition: box-shadow 0.2s ease-in-out;
  }
}
.profil {
  &__name {
    font-size: 16px;
    font-weight: bold;
    color: rgb(92, 89, 89);
  }
  &__description {
    font-size: 12px;
    color: grey;
  }
}
.sidebar {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  z-index: 1040;
  background-color: white;
  transform: translateX(-100%);
  transition: transform 0.2s ease-in-out;
  &__header {
    height: 70px;
  }
  &__menu {
    ul {
      height: calc(100vh - 70px);
      justify-content: space-between;
    }
    &--top {
      margin-top: 20px;
    }
    &--bottom {
      margin-bottom: 15px;
      width: 100%;
    }
  }
  @media (max-width: 767.98px) {
    &--open {
      transform: translateX(0);
    }
  }
}
</style>
