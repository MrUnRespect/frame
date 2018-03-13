<template>
    <item-container>
        <div class="msg-3-box" :style="{fontSize:unit(16),paddingLeft:unit(20),paddingRight:unit(20),paddingTop:unit(40),paddingBottom:unit(40),}">
            <div class="msg-3-contentBox" :style="{height:unit(280)}">
                <ul class="msg-3-content" ref="msgbox2">
                    <li v-for="item in data" :style="{paddingTop:unit(10),paddingBottom:unit(10)}">
                        <i class="msg-3-icon" :style="{width:unit(10),height:unit(10)}"></i>
                        <span :style="{minWidth:unit(100)}" class="msg-3-l">
                            {{item.time}}     
                        </span>
                        <span>
                            {{item.msg}}
                       </span>
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
                data: {
                    time: "",
                    msg: ""
                },
                struct: [
                    {
                        time: "2010年11月",
                        msg: "XXXXXX主持XXXXXXXXXXX；"
                    },
                    {
                        time: "2010年11月",
                        msg: "XXXXXX主持XXXXXXXXXXX；"
                    },
                    {
                        time: "2010年11月",
                        msg: "XXXXXX主持XXXXXXXXXXX；"
                    },
                    {
                        time: "2010年11月",
                        msg: "XXXXXX主持XXXXXXXXXXX；"
                    },
                    {
                        time: "2010年11月",
                        msg: "XXXXXX主持XXXXXXXXXXX；"
                    },
                    {
                        time: "2010年11月",
                        msg: "XXXXXX主持XXXXXXXXXXX；"
                    },
                    {
                        time: "2010年11月",
                        msg: "XXXXXX主持XXXXXXXXXXX；"
                    },
                    {
                        time: "2010年11月",
                        msg: "XXXXXX主持XXXXXXXXXXX；"
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
                    this.data = data[this.sourcekey];
                    this.init();
                });
            },
            init() {
                this.$nextTick(() => {
                    var box = $(this.$refs.msgbox2)
                    box.stop();
                    box.css({ marginTop: '0px' })
                    var boxLi = $(this.$refs.msgbox2).find("li")
                    var num = boxLi.length
                    if (num > 7) {
                        scroll()
                    }
                    function scroll() {
                        let step = boxLi.height() + parseFloat(boxLi.css('paddingTop')) + + parseFloat(boxLi.css('paddingBottom'))
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
    .msg-3-box h1,
    .msg-3-box ul,
    .msg-3-box li,
    .msg-3-box p {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .msg-3-box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .msg-3-contentBox {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .msg-3-content {
        width: 100%;
        color: rgb(185, 193, 175);
    }

    .msg-3-content li .msg-3-icon {
        display: inline-block;
        border-radius: 50%;
        background: rgb(185, 193, 175);
    }

    .msg-3-l {
        display: inline-block;
    }
</style>