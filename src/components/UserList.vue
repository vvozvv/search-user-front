<template>
  <div class="user-list">
    <h1 class="user-list__title">
      Запрос <p class="uk-text-bold">"{{ text }}"</p>
      по <span class="uk-text-bold">{{ textType }}</span>
    </h1>
    <p
      class="uk-text-meta user-list__subtitle"
      v-if="findUsers.length"
    >
      найдено {{ findUsers.length }} записей
    </p>
    <div class="uk-grid-column-small uk-grid-row-large uk-child-width-1-3@s" uk-grid>
      <template v-if="findUsers.length">
        <user-card
          v-for="(item, index) in findUsers"
          :key="index"
          :name="item.name"
          :username="item.username"
          :email="item.email"
          :phone="item.phone"
          :ip="item.ip"
        />
      </template> 
      <div v-else class="user-list__desc">
        <h2 class="uk-text uk-text-bolder uk-text-danger">Ничего не найдено</h2>
        <router-link class="uk-link-text" to="/">Попробовать еще </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserCard from './UserCard'
export default {
  components: {
    UserCard,
  },
  mounted() {
    if (this.findUsers.length === 0 && this.text === null) {
      this.$router.push({ name:'Home' })
    }
  },
  computed: {
    ...mapGetters(['findUsers', 'textType', 'text'])
  }
}
</script>
<style lang="scss" scoped>
.user-list {
  &__title {
    display: inline-flex;
    margin: 0;
    line-height: 100%;
    p, span {
      padding: 0 10px;
      display: block;
    }
  }
  &__subtitle {
    margin: 0;
    line-height: 100%;
    margin-bottom: 40px;
  }
}
</style>