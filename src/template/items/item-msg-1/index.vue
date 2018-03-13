<template>
    <item-container>
        <div class="msg-1-box" :style="{paddingLeft:unit(40),paddingRight:unit(40),paddingTop:unit(40),paddingBottom:unit(40),}">
            <img :src="struct.img" class="msg-1-face" :style="{width:'45%'}">
            <ul class="msg-1-person" :style="{fontSize:unit(16),marginLeft:'5%',width:'50%'}">
                <li :style="{paddingTop:unit(15),paddingBottom:unit(15)}">姓名：{{struct.name}}</li>
                <li :style="{paddingTop:unit(15),paddingBottom:unit(15)}">部门：{{struct.department}}</li>
                <li :style="{paddingTop:unit(15),paddingBottom:unit(15)}">账号：{{struct.account}}</li>
                <li :style="{marginTop:unit(10),paddingTop:unit(15),paddingBottom:unit(15)}" class="msg-1-login">
                    <i class="msg-1-circle blue" :style="{width:unit(10),height:unit(10)}"></i> 本次登录时间:{{struct.timeNow}}
                </li>
                <li class="msg-1-login">
                    <i class="msg-1-circle yellow" :style="{width:unit(10),height:unit(10)}"></i> 上次登录时间:{{struct.timeLast}}
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
                default: "data1"
            }
        },
        data() {
            return {
                struct: {
                    name: "X",
                    img:"",
                    department: "XXXXX",
                    account: "XXXXXXXXXXX",
                    timeNow: "XXX",
                    timeLast: "XXXX"
                }
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
    .msg-1-box h1,
    .msg-1-box ul,
    .msg-1-box li,
    .msg-1-box p {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .msg-1-box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .msg-1-face {
        float: left;
    }

    .msg-1-person {
        float: left;
        color: rgb(172, 142, 64);
        overflow: hidden;
    }


    .msg-1-circle {
        display: inline-block;
        border-radius: 50%;
        vertical-align: middle;
    }

    .msg-1-login {
        color: rgb(186, 186, 186);
    }

    .msg-1-circle.blue {
        background: rgb(108, 176, 243);
    }

    .msg-1-circle.yellow {
        background: rgb(232, 190, 75);
    }
</style>