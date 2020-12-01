<template>
  <b-container fluid class="px-0">
    <b-navbar fixed="top" class="navbar" :class="{ 'navbar--shadow': scrollPosition }">
      <b-container class="px-0 px-sm-3">
        <b-col cols="4" class="d-block d-md-none">
          <base-button variant="secondary" size="small" icon="list" icon-only @click="toggleSidebar" />
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
    <aside v-if="$route.path === '/'" class="sidebar" :class="{ 'sidebar--open': isSidebarOpen }">
      <b-container class="px-0">
        <b-navbar class="sidebar__header px-0">
          <b-col cols="4" class="d-block d-md-none">
            <base-button variant="secondary" size="small" icon="x" icon-only @click="toggleSidebar" />
          </b-col>
          <b-col cols="4" md="2" class="d-flex px-0 px-md-3">
            <a class="mx-auto mx-md-0">
              <b-img src="~/assets/img/logo-confere.png" fluid />
            </a>
          </b-col>
          <b-col cols="4" class="text-right">
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
                <template v-if="!isAdmin">
                  <p class="profil__name pl-2 py-2 mb-0">
                    Kartika Eka Putri
                  </p>
                  <p class="profil__description pl-2 pb-2 mt-0">
                    kartikaaekap@gmail.com
                  </p>
                </template>
                <b-link class="dropdown__item p-2" to="/signout">
                  Sign Out
                </b-link>
              </div>
            </dropdown-menu>
          </b-col>
        </b-navbar>
        <div class="sidebar__menu px-3">
          <b-nav vertical>
            <div class="sidebar__menu--top">
              <template
                v-if="$route.path === '/' || $route.path === '/pricing' || $route.path === '/features' || $route.path.includes('/help')
                  || $route.path === '/aboutUs' || $route.path === '/terms'"
              >
                <base-button variant="text" is-full to="/pricing">
                  Home
                </base-button>
                <base-button variant="text" is-full to="/help">
                  Class
                </base-button>
              </template>
              <div v-else class="sidebar__menu--bottom">
                <base-button variant="secondary" to="/signout" is-full>
                  Sign Out
                </base-button>
              </div>
            </div>
          </b-nav>
        </div>
      </b-container>
    </aside>
  </b-container>
</template>

<script>
import { mapMutations } from 'vuex'
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
      openModal: ''
    }
  },
  // computed: {
  //   isStudent () {
  //     return this.state.user.roles === 'student'
  //   }
  // },
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
  // computed: {
  //   ...mapState(['isSidebarOpen']),
  //   listMenu () {
  //     return this.user ? [{ name: 'Profile', path: '/profile' }] : [{ name: 'About us', path: '#' }, { name: 'Features', path: '#' }, { name: 'Pricing', path: '#' }]
  //   },
  //   isAdmin () {
  //     return this.user && this.user.isAdmin
  //   },
  //   credits () {
  //     return this.user ? (this.user.credits ? this.user.credits.amount / this.qoinBasePrice : 0) : null
  //   },
  //   checkCompany () {
  //     return this.user && this.user.company.length
  //   },
  //   checkReceipt () {
  //     return this.$store.state.haveReceipt
  //   },
  //   variables () {
  //     return this.$store.state.variables
  //   }
  // },
  // mounted () {
  //   if (this.user && !this.isAdmin) {
  //     this.$store.dispatch('getVariables').then(variables => this.$store.commit('updateVariables', variables))
  //   }
  //   window.addEventListener('scroll', this.updateScroll)
  // },
  // destroy () {
  //   window.removeEventListener('scroll', this.updateScroll)
  // }
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
