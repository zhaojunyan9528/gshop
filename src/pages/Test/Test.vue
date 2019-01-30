<!--  -->
<template>
    <div class="test">
        <p>{{date}}</p>

        <p>{{date | filterDate('YYYY-MM-DD')}}</p>
        <div v-upper-text="msg">{{msg}}</div>
        <div v-lower-text="msg">{{msg}}</div>
        <Button @click="handleClick">按钮</Button>
        <ComponentA ref="comA" @click.native="comA">click</ComponentA>

    </div>
    
</template>

<script>
import format from 'date-fns/format'
import Vue from 'vue'
import Button from '../../components/Button/Button'
import {MessageBox,Toast} from 'mint-ui'
import ComponentA from '../../components/ComponentA/ComponentA'
Vue.directive('upper-text', function(el,binding){
    el.innerHTML = binding.value.toUpperCase()
})
export default {
  data () {
    return {
        date:new Date(),
        msg:'Today is sunday'
    };
  },
  directives: {
      'lower-text':function(el,binding){
            el.innerHTML = binding.value.toLowerCase()
        }
  },
  filters: {
        filterDate:function (value,fmt){
            return format(value,fmt || 'YYYY-MM-DD HH:mm:ss')
        }
    },
  components: {
      Button,
      ComponentA
  },

  computed: {
     
  },


  methods: {
      handleClick(e){
        MessageBox.confirm('提示').then(action=>{
            console.log('confirm')
        },
            cancel=>{
                console.log('cancel')
            }
        )
      },
      comA() {
          const comA = this.$refs.comA;
          comA.sayHello();
      }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
.test {
    margin: 0 auto;
    text-align: center;
    padding-top: 50px;

    .test-enter-active {
        transition: all 0.3s ease;
        opacity: 0.5;
    }

    .test-leave-active {
        transition: all 0.8s ease;
        opacity: 0.5;
    }

    .test-enter, .test-leave-to {
        transform: translateX(10px);

        p {
            margin-top: 20px;
        }
    }
}
</style>