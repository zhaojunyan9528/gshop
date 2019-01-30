<!-- ComponentA -->
<template>
  <div>
      comA:<slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
        title:'ComponentA'
    };
  },

  components: {},

  computed: {},

  mounted(){},

  methods: {
      sayHello() {
          window.alert(this.title)
      }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
</style>