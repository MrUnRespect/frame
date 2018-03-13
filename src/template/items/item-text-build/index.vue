<template>
    <item-container>
        <div class="cont-build-wrap" :style="{fontSize:unit(14)}">
            <div class="cont-build-box">
                <div :style="{lineHeight:unit(30),paddingTop:unit(20)}">
                    {{struct.small.name}} {{struct.small.num}} {{struct.small.name2}} {{struct.small.per}} {{struct.small.name3}}
                    <img :src="struct.small.icon" :style="{width:unit(11),top:unit(-1)}"> {{struct.small.tb}}
                </div>
                <div v-for="item in struct.title">
                    <p :style="{fontSize:unit(17),color:'rgb(173,94,205)',lineHeight:unit(30)}">
                        <i class="cont-build-icon" :style="{width:unit(7),height:unit(15),top:unit(-1)}"></i> {{item.title}}
                    </p>
                    <p :style="{lineHeight:unit(30),paddingBottom:unit(20)}">
                        人数：<span style="color:rgb(87,165,159)">{{item.num}}</span> ，占比： <span style="color:rgb(223,183,73)">{{item.per}}</span>，同比：
                        <img :src="item.icon" :style="{width:unit(11),top:unit(-1)}"> <span style="color:rgb(112,212,200)"> {{item.tb}} </span>
                    </p>
                </div>

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
            },
        },
        data() {
            return {

                struct: {
                    title: [
                        {
                            title: "主持专业建设项目2",
                            num: 412,
                            per: "20%",
                            tb: "30%",
                            icon: "/static/assets/icon-add.png"
                        },
                        {
                            title: "主持专业建设项目2",
                            num: 412,
                            per: "20%",
                            tb: "30%",
                            icon: "/static/assets/icon-add.png"
                        }
                    ],
                    small: {
                        name: "人数",
                        num: "XX",
                        name2: "占比",
                        per: "XX%",
                        name3: "同比",
                        icon: "/static/assets/icon-add.png",
                        tb: "XX%"
                    }
                }
            }
        },
        methods: {
            update() {
                DataUtil.getData(this.source, this, res => {
                    this.struct = res[this.sourcekey];
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

    .cont-build-wrap {
        height: 100%;
        width: 100%;
        position: relative;
    }

    .cont-build-box {
        position: absolute;
        top: 50%;
        transform: translateY(-50%)
    }

    .cont-build-box>img {
        display: inline-block;
        position: relative;
        vertical-align: middle;
    }

    .cont-build-icon {
        display: inline-block;
        vertical-align: middle;
        background: rgb(64, 67, 85);
        position: relative;
    }
</style>