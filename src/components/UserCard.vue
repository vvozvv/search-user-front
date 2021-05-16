<template>
  <div class="uk-card uk-card-default uk-card-body">
    <div class="uk-card-header">
      <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom">{{ name }}</h3>
              <p class="uk-text-meta uk-margin-remove-top">{{ username }}</p>
          </div>
      </div>
    </div>
    <div class="uk-card-body">
      <p>{{ email }}</p>
      <p>{{ phone }}</p>
      <p>{{ ip }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    username: String,
    email: String,
    phone: String, 
    ip: String,
  }
}
</script>