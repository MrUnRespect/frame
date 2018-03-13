<template>
    <item-container>
        <div class="msg-5-box" :style="{fontSize:unit(16)}">
            <ul class="msg-5-top" :style="{lineHeight:unit(40),height:unit(40)}">
                <li v-for="x in 5">2013</li>
            </ul>
            <ul class="msg-5-msg">
                <li :style="{lineHeight:unit(60)}">
                    <span>项目 </span>
                    <span>完成情况</span>
                </li>
                <li v-for="item in struct.msg" :style="{lineHeight:unit(60)}">
                    <span>{{item.item}} </span>
                    <span :style="{lineHeight:unit(60)}">
                        {{item.situation}}
                        <img v-if="icon(item.icon)" :src="item.icon" class="msg-5-icon" :style="{width:unit(11),top:unit(31)}">
                    </span>
                </li>

            </ul>
        </div>
    </item-container>
</template>
<script>
    export default {
        data() {
            return {
                struct: {
                    time: ["2013", "2014", "2015", "2016", "2017"],
                    msg: [
                        {
                            item: "接入互联网出口宽带（Mbps1）",
                            situation: "XXM"
                        },
                        {
                            item: "接入互联网出口宽带（Mbps1）",
                            situation: "XXM"
                        },
                        {
                            item: "接入互联网出口宽带（Mbps1）",
                            situation: "XXM"
                        },
                        {
                            item: "接入互联网出口宽带（Mbps1）",
                            situation: "XXM"
                        },
                        {
                            item: "接入互联网出口宽带（Mbps1）",
                            situation: "XXM"
                        },
                        {
                            item: "接入互联网出口宽带（Mbps1）",
                            situation: "XXM"
                        },
                        {
                            item: "接入互联网出口宽带（Mbps1）",
                            situation: "XXM"
                        },
                        {
                            item: "接入互联网出口宽带（Mbps1）",
                            situation: "XXM"
                        }
                    ]
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
            icon(o) {
                if (o) {
                    return true
                } else {
                    return false
                }
            },
            update() {
                DataUtil.getData(this.source, this, data => {
                    this.struct = data[this.sourcekey];
                });
            },

        }
    };

</script>
<style>
    .msg-5-box h1,
    .msg-5-box ul,
    .msg-5-box li,
    .msg-5-box p {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .msg-5-box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
    }

    .msg-5-box .msg-5-top {
        width: 80%;
        margin: 0 auto !important;
        text-align: center;
        padding-top: 3%;
    }

    .msg-5-top li {
        width: 15%;
        color: rgb(213, 213, 213);
        text-align: center;
        float: left;
        background: rgb(32, 54, 88);
        border-radius: 5px;
        /* margin: 0 2%; */
        margin-right: 6%;
    }

    .msg-5-top li:last-child {
        margin-right: 0;
    }

    .msg-5-icon {
        float: right;
    }

    .msg-5-box .msg-5-msg {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 3%;
    }

    .msg-5-msg:after {
        clear: both;
        content: "";
        display: table;
    }

    .msg-5-msg li span:nth-child(1) {
        width: 75%;
        float: left;
        border: 1px solid rgb(32, 54, 88);
        box-sizing: border-box;
        padding-left: 3%;
        padding-right: 3%;
    }

    .msg-5-msg li span:nth-child(2) {
        width: 25%;
        float: left;
        border-right: 1px solid rgb(32, 54, 88);
        border-top: 1px solid rgb(32, 54, 88);
        border-bottom: 1px solid rgb(32, 54, 88);
        box-sizing: border-box;
        padding-left: 3%;
        padding-right: 3%;
    }

    .msg-5-msg li span:nth-child(2) img {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        transform: translateY(-50%)
    }
</style>