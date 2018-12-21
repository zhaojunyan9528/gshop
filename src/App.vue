// 应用根组件
<template>
    <div id="app">
        <router-view/>
        <FooterGuide v-show="$route.meta.showRooter"/>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import FooterGuide from "./components/FootGuide/FootGuide";
export default {
    name: "App",
    components: {
        FooterGuide
    },
    mounted(){
        // this.$store.dispatch('getAddress');
        // this.getAddress();
    },
    methods:{
        // ...mapActions(['getAddress'])
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

#app
    width 100%
    height 100%
    background #f5f5f5
</style>
