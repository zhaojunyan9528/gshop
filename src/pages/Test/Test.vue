<!--  -->
<template>
  <div class="test">
      <p>{{date}}</p>

      <p>{{date | filterDate('YYYY-MM-DD')}}</p>
  </div>
</template>

<script>
import format from 'date-fns/format'
export default {
  data () {
    return {
        date:new Date()
    };
  },
  filters: {
        filterDate:function (value,fmt){
            return format(value,fmt || 'YYYY-MM-DD HH:mm:ss')
        }
    },
  components: {
      
  },

  computed: {
     
  },


  methods: {}
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
.test
    margin 0 auto
    text-align  center
    padding-top 50px
    .test-enter-active
        transition all .3s ease
        opacity 0.5
    .test-leave-active
        transition all .8s ease
        opacity 0.5
    .test-enter,.test-leave-to
        transform translateX(10px)

        p
            margin-top 20px
</style>