<template>
    <item-container>
        <div class="top-bar-2">
            <h1 class="top-bar-2-title" :style="{lineHeight:unit(60),fontSize:unit(25)}">
                {{struct.areaTitle}}
            </h1>
            <div class="top-bar-2-content" v-for="item in struct.boxTitle" :style="{lineHeight:unit(60),fontSize:unit(16)}" v-if='isBoxTitle'>
                <span>{{item.name}}</span>
                <span class="top-bar-2-c1">{{item.num}}</span>
                <span>{{item.name2}}</span>
                <span class="top-bar-2-c2">{{item.num2}}</span>
                <img :src="item.icon" :style="{width:unit(11),top:unit(-2)}" class="topbar-2-icn">
            </div>
        </div>
    </item-container>
</template>
<script>
    export default {
        props: {

            sourcekey: {
                type: String,
                default: "data1"
            }
        },
        computed: {
            isBoxTitle() {
                if (this.struct.boxTitle) {
                    return true
                } else {
                    return false
                }
            }
        },
        data() {
            return {
                struct: {
                    areaTitle: "专业概况",
                    boxTitle: [
                        {
                            name: "专业总数1 ",
                            num: "XX个 ",
                            name2: "专业群数量",
                            num2: "XX个%",
                        },
                    ]
                },

            }
        },
        methods: {
            update() {
                DataUtil.getData(this.source, this, data => {
                    this.struct = data[this.sourcekey];
                    console.log(this.struct)
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

    .top-bar-2 {
        color: rgb(213, 213, 213);
        background: rgba(108, 176, 243, 0.5);
    }

    .top-bar-2-title {
        display: inline-block;
        margin-left: 2%;
        /* padding: 0 2%; */
        /* background: rgba(108, 176, 243, 0.5); */
    }

    .top-bar-2-content {
        display: inline-block;
        margin-left: 2%
    }

    .top-bar-2-c1 {
        color: rgb(228, 112, 172)
    }

    .top-bar-2-c2 {
        color: rgb(162, 131, 46)
    }
    .topbar-2-icn{
        position: relative;
        display: inline-block;
        vertical-align: middle;
    }
</style>