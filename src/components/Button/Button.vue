<!-- button -->
<template>
  <div class="button" @click="handleClick">
      <button>
          <slot></slot>
      </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted(){},

  methods: {
      handleClick(event) {
          this.$emit('on-click',event)
      }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl'
.button
    button
        width 20vw
        height 10vw
        border-radius 5px
        color #333
        border 1px solid #cccccc
        text-align center
        line-height 25px

</style>