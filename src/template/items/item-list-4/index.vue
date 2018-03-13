<template>
    <item-container>
        <ul class="list-4-title" :style="{fontSize:unit(18)}">
            <li>
                <span :style="{width:'30%',lineHeight:unit(50)}">时间（年）</span>
                <span :style="{width:'70%',lineHeight:unit(50)}">奖项名称</span>
            </li>
        </ul>
        <div class="list-4-box" :style="{fontSize:unit(16),height:unit(200)}">
            <ul class="list-4-msg" ref="msgboxz">
                <li v-for="item in struct.msg">
                    <span :style="{width:'30%',lineHeight:unit(50)}">{{item.time}}</span>
                    <span :style="{width:'70%',lineHeight:unit(50)}">{{item.name}}</span>
                </li>
            </ul>
        </div>
    </item-container>
</template>
<script>
    export default {
        props: {

            sourcekey: {
                type: String,
                default: "data2"
            }
        },
        data() {
            return {
                struct: {
                    msg: [
                        {
                            time: "2017",
                            name: "国家XX示范学院"
                        }
                    ]
                }
            }
        },
        methods: {
            update() {
                DataUtil.getData(this.source, this, data => {
                    this.struct = data[this.sourcekey];
                    this.init();
                });
            },
            init() {
                this.$nextTick(() => {
                    var box = $(this.$refs.msgboxz)
                    box.stop();
                    box.css({ marginTop: '0px' })
                    var boxLi = $(this.$refs.msgboxz).find("li")

                    var num = boxLi.length
                    if (num > 4) {
                        scroll()
                    }
                    function scroll() {
                        let step = boxLi.height() + parseFloat(boxLi.css('paddingTop')) + + parseFloat(boxLi.css('paddingBottom'))
                        console.log(step);
                        box.animate({
                            marginTop: - step
                        }, 4000, "linear", function () {
                            $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
                            scroll()
                        })

                    }
                })
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

    .list-4-box {
        overflow: hidden;
    }

    .list-4-title>li>span {
        display: inline-block;
        padding-left: 10%;
        box-sizing: border-box;
        color: rgb(162, 131, 46);
    }

    .list-4-title>li>span:nth-child(2) {
        padding-left: 12%;
    }

    .list-4-msg>li>span {
        display: inline-block;
        padding-left: 10%;
        box-sizing: border-box;
        color: rgb(144, 83, 175);
    }

    .list-4-msg>li>span:nth-child(1) {
        padding-left: 12%;
    }
</style>