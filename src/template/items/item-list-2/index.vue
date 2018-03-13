<template>
    <item-container>
        <div class="list-2-msg" :style="{fontSize:unit(14)}">
            <ul class="list-2-msg-title" :style="{height:unit(60)}">
                <li :style="{height:unit(60),lineHeight:unit(60)}" v-for="item in data.title">{{item}}</li>

            </ul>
            <div class="list-2-scroll" :style="{height:unit(400)}">
                <ul class="list-2-scroll-main" ref="msgbox3">
                    <li v-for="item in data.table" :style="{height:unit(50)}">
                        <span :style="{height:unit(50),lineHeight:unit(50)}">{{item.zb}}</span>
                        <span :style="{height:unit(50),lineHeight:unit(50)}">{{item.evalute}}</span>
                        <span :style="{height:unit(50),lineHeight:unit(50)}">
                            <img :src="item.tb">
            
                        </span>
                        <span :style="{height:unit(50),lineHeight:unit(50)}" class="list-2-long">{{item.num}}</span>
                    </li>


                </ul>
            </div>
        </div>
    </item-container>
</template>
<script>
    export default {
        props: {

            sourcekey: {
                type: String,
                default: "data3"
            }
        },
        data() {
            return {
                struct: {
                    title: ["指标", "个人评价", "相比去年", "全院该等级以上教师人数"],
                    table: [
                        {
                            zb: "专业建设1",
                            evalute: "A",
                            tb: "/static/assets/icon-add.png",
                            num: 56
                        },
                        {
                            zb: "专业建设",
                            evalute: "A",
                            tb: "/static/assets/icon-add.png",
                            num: 56
                        },
                        {
                            zb: "专业建设",
                            evalute: "A",
                            tb: "/static/assets/icon-add.png",
                            num: 56
                        },
                        {
                            zb: "专业建设",
                            evalute: "A",
                            tb: "/static/assets/icon-add.png",
                            num: 56
                        },
                        {
                            zb: "专业建设",
                            evalute: "A",
                            tb: "/static/assets/icon-add.png",
                            num: 56
                        },
                        {
                            zb: "专业建设",
                            evalute: "A",
                            tb: "/static/assets/icon-add.png",
                            num: 56
                        },
                        {
                            zb: "专业建设",
                            evalute: "A",
                            tb: "/static/assets/icon-add.png",
                            num: 56
                        },
                        {
                            zb: "专业建设",
                            evalute: "A",
                            tb: "/static/assets/icon-add.png",
                            num: 56
                        },

                    ]
                },
                data: {
                    title: ["", "", "", ""],
                    table: [
                        {
                            zb: "",
                            evalute: "",
                            tb: "",
                            num: ""
                        },
                    ]
                }
            }
        },
        methods: {
            update() {
                DataUtil.getData(this.source, this, data => {
                    this.data = data[this.sourcekey];
                    this.init();
                });
            },
            init() {
                this.$nextTick(() => {
                    var box = $(this.$refs.msgbox3)
                    box.stop();
                    box.css({ marginTop: '0px' })
                    var boxLi = $(this.$refs.msgbox3).find("li")

                    var num = boxLi.length
                    if (num > 7) {
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

    .list-2-msg {
        width: 100%;
        height: 100%;
        color: black;
        text-align: center;
    }

    .list-2-scroll-main li span.list-2-long {
        width: 35% !important;
    }

    .list-2-msg-title li {
        float: left;
        width: 20%;
        color: rgb(64, 131, 229);
    }

    .list-2-scroll {
        overflow: hidden;
    }

    .list-2-scroll-main li span {
        float: left;
        width: 20%;
    }

    .list-2-scroll-main li span:last-child {
        float: left;
        width: 40%;
    }

    .list-2-scroll-main li span img {
        display: inline-block;
        vertical-align: middle;
        position: relative;
    }

    .list-2-scroll-main li:nth-child(1) {
        color: rgb(144, 83, 175);
    }

    .list-2-scroll-main li:nth-child(2) {
        color: rgb(131, 82, 168);
    }

    .list-2-scroll-main li:nth-child(3) {
        color: rgb(128, 86, 170);
    }

    .list-2-scroll-main li:nth-child(4) {
        color: rgb(124, 92, 172);
    }

    .list-2-scroll-main li:nth-child(5) {
        color: rgb(119, 98, 175);
    }

    .list-2-scroll-main li:nth-child(6) {
        color: rgb(114, 105, 178);
    }

    .list-2-scroll-main li:nth-child(7) {
        color: rgb(106, 114, 183);
    }

    .list-2-scroll-main li:nth-child(8) {
        color: rgb(82, 112, 165);
    }

    .list-2-scroll-main li:nth-child(9) {
        color: rgb(92, 148, 206);
    }

    .list-2-msg-title li:last-child {
        width: 40%;
    }
</style>