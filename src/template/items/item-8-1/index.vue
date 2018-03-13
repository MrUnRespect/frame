<template>
    <item-container>
        <div class="item-8">
            <div class="item-8-title" :style="{fontSize:unit(18),height:unit(40),lineHeight:unit(40),minWidth:unit(180)}">
                {{struct.title}}
            </div>
            <div class="item-8-box" :style="{fontSize:unit(16)}">
                <div class="item-8-num">
                    <div :style="{fontSize:unit(25)}" class="item-8-font">{{struct.num1}}</div>
                    <span>目标任务数</span>
                </div>
                <div class="item-8-num">
                    <div :style="{fontSize:unit(25)}" class="item-8-font">{{struct.num2}}</div>
                    <span>已完成目标任务数</span>
                </div>
            </div>
        </div>
    </item-container>
</template>
<script>
    export default {
        data() {
            return {
                struct: {
                    title: "一流专业建设",
                    num1: "1",
                    num2: "1"
                }
            }
        },
        props: {
            sourcekey: {
                type: String,
                default: "data1"
            }
        },
        methods: {
            update() {
                DataUtil.getData(this.source, this, data => {
                    this.struct = data[this.sourcekey];

                });
            }
        }
    };

</script>
<style>
    .item-8 {
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .item-8-title {
        color: rgb(213, 213, 213);
        background: rgb(56, 87, 35);
        display: inline-block;
        border-radius: 5px;
    }

    .item-8-box {
        margin-top: 5%;
    }

    .item-8-num {
        display: inline-block;
        margin: 0 3%;
    }

    .item-8-font {
        color: rgb(237, 125, 49);
    }
</style>