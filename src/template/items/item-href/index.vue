<template>
    <item-container>
        <div class="item-href">
            <a :href="struct.href" :style="{fontSize:unit(18)}">
                学校目标考核标准链接                    
            </a>
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
                    href: "www.baidu.com"
                }
            }
        },
        methods: {
            update() {
                DataUtil.getData(this.source, this, data => {
                    this.struct = data[this.sourcekey];
                });
            },

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

    .item-href {
        width: 100%;
        height: 100%;
    }
    .item-href>a{
        float: right;
        margin-right: 2%;
        cursor: pointer;
        color: rgb(205,91,92);
    }
</style>