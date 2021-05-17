<template>
  <div class="uk-position-center">
    <div class="uk-container uk-container-xlarge uk-flex uk-flex-center uk-flex-column">
      <h1 class="uk-text-center uk-text-bolder">Search Users</h1>
      <div class="uk-margin uk-flex">
        <input class="uk-input uk-form-width-large uk-form-large" type="text" placeholder="Введите ваш запрос" v-model="text" @keyup.enter="seachUser">
        <button @click.prevent="seachUser" :disabled="!disabledForm" class="uk-button uk-button-primary">
          <span uk-icon="search" v-if="!loader"></span>
          <div uk-spinner v-else></div>
        </button>
      </div>
      <div class="uk-flex" v-if="text">
        <p class="uk-text">Поиск по {{ currentType[0] }}: {{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      text: '',
      loader: false,
      currentType: null,
      //eslint-disable-next-line
      regEmail: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
      //eslint-disable-next-line
      regPhone: /[2-9]{1}\d{2}/,
      //eslint-disable-next-line
      regIp: /\./,
      // 0.0.0.0 template
      // regIp: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,
      //eslint-disable-next-line
      regUserName: /^([a-z\-]|@)+$/,
    }
  },
  watch: {
    text () {
      // console.log(oldCount, newCount);
      if (this.isEmail) {
        this.currentType = ['почте', 'email']
      } else if (this.isPhone) {
        this.currentType = ['телефону', 'phone']
      } else if (this.isIp) {
        this.currentType = ['ip', 'ip']
      } else if (this.isUserName) {
        this.currentType = ['юзернейму', 'username']
      } else {
        this.currentType = ['имени и Фамилии', 'name']
      }
    }
  },
  computed: {
    isEmail() {
      return this.regEmail.test(this.text)
    },
    isPhone() {
      return this.regPhone.test(this.text)
    },
    isIp() {
      return this.regIp.test(this.text)
    },
    isUserName() {
     return this.regUserName.test(this.text)
    },
    disabledForm() {
      return (this.text.split('').length != 0) ? true : false
    },
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch('getUser')
    },
    toggleLoader() {
      this.loader = !this.loader
    },
    seachUser() {
      const body = {
        textType: this.currentType[0],
        type: this.currentType[1],
        text: this.text,
      }
      this.toggleLoader()
      if (this.disabledForm) {
        this.$store.dispatch('seachUser', body)
        .then(() => {
          this.$router.push({ name:'result' })
          this.toggleLoader()
        })
        .catch(() => {
          alert('Произошла обишка. Перезагрузите страницу и попробуйте снова.')
          this.toggleLoader()
        })
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.uk-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>