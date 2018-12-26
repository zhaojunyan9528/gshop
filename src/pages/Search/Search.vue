<!-- search 搜索组件-->
<template>
    <section class="search">
        <HeaderTop :title="title"></HeaderTop>
        <form class="search_form" @submit.prevent="search">
            <input
                type="search"
                name="search"
                v-model="keyword"
                placeholder="请输入商家或美食名称"
                class="search_input"
            >
            <input type="submit" name="submit" class="search_submit">
        </form>

        <section class="list" v-if="!noSearchShops">
            <ul class="list_container">
                <!--:to="'/shop?id='+item.id"-->
                <router-link
                    :to="{path:'/shop', query:{id:item.id}}"
                    tag="li"
                    v-for="item in searchShops"
                    :key="item.id"
                    class="list_li"
                >
                    <section class="item_left">
                        <img
                            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=467364219,1485499899&fm=200&gp=0.jpg"
                            class="restaurant_img"
                        >
                    </section>
                    <section class="item_right">
                        <div class="item_right_text">
                            <p>
                                <span>{{item.name}}</span>
                            </p>
                            <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
                            <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
                        </div>
                    </section>
                </router-link>
            </ul>
        </section>

        <div class="search_none" v-else>很抱歉！无搜索结果</div>
    </section>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import { mapState } from "vuex";
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            title: "搜索",
            keyword: "",
            imgBaseUrl: "http://cangdu.org:8001/img/",
            noSearchShops: false
        };
    },

    components: {
        HeaderTop
    },

    computed: {
        ...mapState(["searchShops"])
    },
    watch: {
        searchShops(value) {
            if (!value.length) {
                // 没有数据
                this.noSearchShops = true;
            } else {
                // 有数据
                this.noSearchShops = false;
            }
        }
    },
    methods: {
        search() {
            const keyword = this.keyword.trim();
            if (keyword) {
                this.$store.dispatch("searchShops", keyword);
            }
        }
    }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl'

.search
    width 100%
    overflow hidden
    margin-bottom 50px
    .search_form
        clearFix()
        margin-top 45px
        background-color #fff
        padding 12px 8px
        input
            height 35px
            padding 0 4px
            border-radius 2px
            font-weight bold
            outline none
            &.search_input
                float left
                width 79%
                border 4px solid #f2f2f2
                font-size 14px
                color #333
                background-color #f2f2f2
            &.search_submit
                float right
                width 18%
                border 4px solid #02a774
                font-size 16px
                color #fff
                background-color #02a774
    .list
        .list_container
            background-color #fff
            .list_li
                display flex
                justify-content center
                padding 10px
                border-bottom 1px solid #e4e4e4
                .item_left
                    margin-right 10px
                    .restaurant_img
                        width 50px
                        height 50px
                        display block
                .item_right
                    font-size 12px
                    flex 1
                    .item_right_text
                        p
                            line-height 12px
                            margin-bottom 6px
                            &:last-child
                                margin-bottom 0
    .search_none
        margin 0 auto
        color #333
        background-color #fff
        text-align center
        margin-top 0.125rem
</style>