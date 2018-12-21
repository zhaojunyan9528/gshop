<!-- MSite 首页组件-->
<template>
    <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
            <span class="header_search" slot="left">
                <i class="iconfont icon-gs-search"></i>
            </span>
            <span class="header_login" slot="right">
                <span class="header_login_text">登录|注册</span>
            </span>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
            <div class="swiper-container" v-if="categorys.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(category,index) in categorysArr" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(type,index) in category" :key="index">
                            <div class="food_container">
                                <img :src="baseImgUrl+type.image_url">
                            </div>
                            <span>{{type.title}}</span>
                        </a>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination swiper-pagination-bullets"></div>
            </div>
            <img src="./images/msite_back.svg" alt="" v-else style="width:100%;height:100%">
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-gs-option"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList></ShopList>
        </div>
    </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import HeaderTop from "../../components/HeaderTop/HeaderTop"
import ShopList from "../../components/ShopList/ShopList"

import Swiper from 'swiper'
import "swiper/dist/css/swiper.css"
export default {
    data() {
        return {
            baseImgUrl: 'https://fuss10.elemecdn.com'
        };
    },
    components: {
        HeaderTop,
        ShopList
    },
    computed:{
        ...mapState(['address','categorys']),
        //生成2维数组
        categorysArr () {
            const {categorys} = this;
            const arr = [] 
            let minArr = []
            categorys.forEach(c => {
                if(minArr.length == 8){
                    minArr = []
                }
                if(minArr.length == 0){
                    arr.push(minArr)
                }
                minArr.push(c)
            });
            return arr
        }
    },
    mounted(){
        this.getAddress();
        this.getCategorys();
        this.getShops();
    },
    watch:{
        categorys (value) {
            this.$nextTick(()=>{//界面异步更新，随着数据改变而改变的Dom结构时使用此方法
                new Swiper('.swiper-container',{
                    loop:true,
                    pagination: {
                        el:'.swiper-pagination',
                        clickable:true
                    }
                })
            })
        }
    },
    methods: {
        ...mapActions(['getAddress','getCategorys','getShops'])
    }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl'

.msite // 首页
    width 100%
    .header
        background-color #02a774
        position fixed
        z-index 100
        left 0
        top 0
        width 100%
        height 45px
        .header_search
            position absolute
            left 15px
            top 50%
            transform translateY(-50%)
            width 10%
            height 50%
            .icon-gs-search
                font-size 25px
                color #fff
        .header_title
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 50%
            color #fff
            text-align center
            .header_title_text
                font-size 20px
                color #fff
                display block
        .header_login
            font-size 14px
            color #fff
            position absolute
            right 15px
            top 50%
            transform translateY(-50%)
            .header_login_text
                color #fff
    .msite_nav
        bottom-border-1px(#e4e4e4)
        margin-top 45px
        height 200px
        background #fff
        .swiper-container
            width 100%
            height 100%
            .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                    display flex
                    justify-content center
                    align-items flex-start
                    flex-wrap wrap
                    .link_to_food
                        width 25%
                        .food_container
                            display block
                            width 100%
                            text-align center
                            padding-bottom 10px
                            font-size 0
                            img
                                display inline-block
                                width 50px
                                height 50px
                        span
                            display block
                            width 100%
                            text-align center
                            font-size 13px
                            color #666
            .swiper-pagination
                >span.swiper-pagination-bullet-active
                    background #02a774
    .msite_shop_list
        top-border-1px(#e4e4e4)
        margin-top 10px
        background #fff
        .shop_header
            padding 10px 10px 0
            .icon-gs-option
                margin-left 5px
                color #999
                font-size 10px
            .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>