<template>
    <item-container>
        <div class="list-1-msg" :style="{fontSize:unit(14)}">
            <ul class="list-1-msg-title" :style="{height:unit(60)}">
                <li :style="{height:unit(60),lineHeight:unit(60)}" v-for="(item,i) in data.title">{{item}}</li>

            </ul>
            <div class="list-1-scroll" :style="{height:unit(280)}">
                <ul class="list-1-scroll-main">
                    <li v-for="(item,i) in data.table" :style="{height:unit(56)}">
                        <span :style="{height:unit(56),lineHeight:unit(56)}">{{item.zb}}</span>
                        <span :style="{height:unit(56),lineHeight:unit(56)}">{{item.number}}</span>
                        <span :style="{height:unit(56),lineHeight:unit(56)}">{{item.per}}</span>
                        <span :style="{height:unit(56),lineHeight:unit(56)}">
                            <img :src="item.tbIcon" :style="{top:unit(-2),width:unit(12)}" >
                            {{item.tb}}
                        </span>
                        <span :style="{height:unit(56),lineHeight:unit(56)}">
                            <img :src="item.changeIcon" :style="{top:unit(-2),width:unit(12)}">
                            {{item.bh}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </item-container>
</template>
<script>
    export default {
        props: {
            // source: {
            //     type: String,
            //     default: "page-1-3"
            // },
            sourcekey: {
                type: String,
                default: "data1"
            }
        },
        data() {
            return {
                data: {
                    title: [],
                    table: []
                },
                struct: {
                    title: ["指标1", "人数", "占比", "同比", "五年变化"],
                    table: [
                        { zb: '教学名师', number: 1423, per: '1%', tb: '2%', change: '3%', tbIcon: '/static/assets/icon-add.png', changeIcon: "/static/assets/icon-add.png" },
                        { zb: '专业群带头人', number: 546, per: '1%', tb: '2%', change: '3%', tbIcon: '/static/assets/icon-add.png', changeIcon: "/static/assets/icon-add.png" },
                        { zb: '专业领军人才', number: 456, per: '1%', tb: '2%', change: '3%', tbIcon: '/static/assets/icon-add.png', changeIcon: "/static/assets/icon-add.png" },
                        { zb: '骨干教师', number: 64, per: '1%', tb: '2%', change: '3%', tbIcon: '/static/assets/icon-add.png', changeIcon: "/static/assets/icon-add.png" },
                        { zb: '优秀青年教师', number: 64, per: '1%', tb: '2%', change: '3%', tbIcon: '/static/assets/icon-add.png', changeIcon: "/static/assets/icon-add.png" }
                    ]
                }
            }
        },
        methods: {
            update() {
                DataUtil.getData(this.source, this, data => {
                    this.data = data[this.sourcekey];

                });
            }
        }
    };

</script>
<style>
    h1,
    ul,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .list-1-msg {
        width: 100%;
        height: 100%;
        color: black;
        text-align: center;
    }

    .list-1-msg-title li {
        float: left;
        width: 20%;
        color: rgb(173, 94, 205);
    }

    .list-1-scroll {
        overflow: hidden;
    }

    .list-1-scroll-main li span {
        float: left;
        width: 20%;
    }

    .list-1-scroll-main li span img {
        display: inline-block;
        vertical-align: middle;
        position: relative;
    }

    .list-1-scroll-main li:nth-child(1) {
        color: rgb(90, 63, 128);
    }

    .list-1-scroll-main li:nth-child(2) {
        color: rgb(93, 101, 178)
    }

    .list-1-scroll-main li:nth-child(3) {
        color: rgb(44, 90, 144);
    }

    .list-1-scroll-main li:nth-child(4) {
        color: rgb(21, 143, 200);
    }

    .list-1-scroll-main li:nth-child(5) {
        color: rgb(4, 161, 217);
    }
</style>