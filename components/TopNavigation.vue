<template>
  <b-container fluid class="px-0">
    <b-navbar fixed="top" class="navbar" :class="{ 'navbar--shadow': scrollPosition }">
      <b-container class="px-0 px-sm-3">
        <b-row>
          <b-col cols="4" class="d-block d-md-none">
            <base-button variant="secondary" size="small" icon="list" icon-only @click="toggleSidebar" />
          </b-col>
          <b-col cols="4" md="2" class="d-flex px-0 px-md-3">
            <a :href="href" class="mx-auto mx-md-0">
              <b-img src="~/assets/img/logo-confere.png" fluid />
            </a>
          </b-col>
          <b-col cols="4" md="10" class="d-flex justify-content-end ml-auto">
            <b-navbar-nav>
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
                    <b-link class="dropdown__item p-2" to="/dashboard">
                      Home
                    </b-link>
                    <b-link class="dropdown__item p-2" to="/dashboard/profiles">
                      List Class
                    </b-link>
                  </template>
                  <b-link class="dropdown__item p-2" to="/signout">
                    Sign out
                  </b-link>
                </div>
              </dropdown-menu>
              <!-- <base-button id="notification" variant="text" icon="bell" size="small" class="ml-3" icon-only /> -->
            </b-navbar-nav>
          </b-col>
        </b-row>
      </b-container>
    </b-navbar>

    <aside v-if="$route.path === '/' || !isAdmin" class="sidebar" :class="{ 'sidebar--open': isSidebarOpen }">
      <b-container class="px-0">
        <b-navbar class="sidebar__header px-0">
          <b-col cols="4" class="d-block d-md-none">
            <base-button variant="secondary" size="small" icon="x" icon-only @click="toggleSidebar" />
          </b-col>
          <b-col cols="4" md="2" class="d-flex px-0 px-md-3">
            <a :href="href" class="mx-auto mx-md-0">
              <b-img src="~/assets/img/logo-confere.png" fluid />
            </a>
          </b-col>
          <b-col cols="4" class="text-right">
            <dropdown-menu v-if="user" v-model="isDropdownOpen" right hover>
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
                  <b-link class="dropdown__item p-2" to="/dashboard">
                    Home
                  </b-link>
                  <b-link class="dropdown__item p-2" to="/dashboard/profiles">
                    Class List
                  </b-link>
                </template>
                <b-link class="dropdown__item p-2" to="/signout">
                  Sign Out
                </b-link>
              </div>
            </dropdown-menu>
          </b-col>
        </b-navbar>
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
  data: () => {
    return {
      scrollPosition: null,
      isDropdownOpen: false,
      openModal: ''
    }
  },
  methods: {
    ...mapMutations(['toggleSidebar'])
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
    box-shadow: gray;
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
