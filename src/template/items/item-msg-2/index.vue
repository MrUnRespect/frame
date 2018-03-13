<template>
    <item-container>
        <div class="msg-2-box" :style="{fontSize:unit(16),paddingLeft:unit(20),paddingRight:unit(20),paddingTop:unit(40),paddingBottom:unit(40),}">
            <div class="msg-2-contentBox" :style="{height:unit(260)}">
                <ul class="msg-2-content" ref="msgbox">
                    <li :style="{paddingTop:unit(10),paddingBottom:unit(10)}" v-for="item in struct">
                        <p :style="{paddingBottom:unit(5)}">
                            <i class="msg-2-icon" :style="{width:unit(10),height:unit(10)}"></i> {{item.time}}
                        </p>
                        <p>
                            {{item.msg}}
                        </p>
                    </li>
                </ul>
            </div>

        </div>
    </item-container>
</template>
<script>
    export default {
        data() {
            return {
                struct: [
                    {
                        time: "2009年12月-2010年11月",
                        msg: "XXXXXXXXXXX单位      XXXXXXXX部门     任XXXXXXXXX"
                    },
                    {
                        time: "2009年12月-2010年11月",
                        msg: "XXXXXXXXXXX单位      XXXXXXXX部门     任XXXXXXXXX"
                    },
                    {
                        time: "2009年12月-2010年11月",
                        msg: "XXXXXXXXXXX单位      XXXXXXXX部门     任XXXXXXXXX"
                    },
                    {
                        time: "2009年12月-2010年11月",
                        msg: "XXXXXXXXXXX单位      XXXXXXXX部门     任XXXXXXXXX"
                    }
                ]


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
                    this.init();
                });
            },
            init() {
                this.$nextTick(() => {
                    var box = $(this.$refs.msgbox)
                    box.stop();
                    box.css({ marginTop: '0px' })
                    var boxLi = $(this.$refs.msgbox).find("li")

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
    .msg-2-box h1,
    .msg-2-box ul,
    .msg-2-box li,
    .msg-2-box p {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .msg-2-box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .msg-2-contentBox {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .msg-2-content {
        width: 100%;
        color: rgb(49, 170, 200);
    }

    .msg-2-content li p>.msg-2-icon {
        display: inline-block;
        border-radius: 50%;
        background: rgb(49, 170, 200);
    }
</style>