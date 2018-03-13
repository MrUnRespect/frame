<template>
    <item-container>
        <div class="top-bar">
            <h1 class="top-bar-title" :style="{lineHeight:unit(60),fontSize:unit(25)}">
                {{struct.areaTitle}}
            </h1>
            <div class="top-bar-content" :style="{lineHeight:unit(60),fontSize:unit(16)}" v-if='isBoxTitle'>
                <span>{{struct.boxTitle.name}}</span>
                <span class="top-bar-c1">{{struct.boxTitle.num}}</span>
                <span>{{struct.boxTitle.name2}}</span>
                <span class="top-bar-c2">{{struct.boxTitle.num2}}</span>
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
                    boxTitle: {
                        name: "专业总数1 ",
                        num: "XX个 ",
                        name2: "专业群数量",
                        num2: "XX个%",
                    },
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

    .top-bar {
        background: rgba(108, 176, 243, 0.5);
        color: rgb(213, 213, 213);
    }

    .top-bar-title {
        display: inline-block;
        margin-left: 2%;
        /* padding: 0 2%; */
        /* background: rgba(108, 176, 243,.5) */
    }

    .top-bar-content {
        display: inline-block;
        margin-left: 2%
    }

    .top-bar-c1 {
        color: rgb(228, 112, 172)
    }

    .top-bar-c2 {
        color: rgb(162, 131, 46)
    }
</style>