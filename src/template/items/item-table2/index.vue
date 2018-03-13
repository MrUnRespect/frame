<template>
    <item-container>
        <table class="item-table-2" :style="{fontSize:unit(16)}">
            <tr :style="{lineHeight:unit(40)}">
                <th class="item-table-2-shallow">诊断项目</th>
                <th class="item-table-2-deep">a文化建设</th>
                <th class="item-table-2-deep">b专业建设</th>
            </tr>
            <tr v-for="item in struct.table">
                <td class="item-table-2-shallow" style="width:10%">{{item.name}}</td>
                <td class="item-table-2-a" :class="{tableOn2:item.result}">
                    <span v-html="item.d1">
               
                    </span>
                    <span v-html="item.d2">

                    </span>
                    <span v-html="item.d3">
                   

                    </span>
                    <span v-html="item.d4">
        
          
                    </span>
                    <span v-html="item.d5">
                            
                              
                    </span>
                </td>
                <td class="item-table-2-b" :class="{tableOn2:item.result}">
                    <span v-html="item.e1">
            
                    </span>
                    <span v-html="item.e2">
                   
                    </span>
                    <span v-html="item.e3">
                            
                     </span>
                    <span v-html="item.e4">
                                    
                     </span>
                    <span v-html="item.e5">
                                            
                    </span>
                    <span v-html="item.e6">
                                                    
                    </span>
                </td>

            </tr>
        </table>
    </item-container>
</template>
<script>
export default {
  data() {
    return {
      struct: {}
    };
  },
  props: {
    sourcekey: {
      type: String,
      default: "data5"
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
.item-table-2-deep {
  background: rgba(108, 176, 243, 0.5);
}

.item-table-2-shallow {
  background: rgba(64, 131, 229, 0.5);
}

.item-table-2 {
  width: 100%;
  text-align: center;
  white-space: normal;
  color: rgb(213, 213, 213);
}

.item-table-2 td {
  /* border: 1px solid red; */
}

.item-table-2 th {
  /* border: 1px solid red; */
}

.item-table-2 td:after {
  clear: both;
  display: table;
  content: "";
}

.item-table-2-a {
  width: 40%;
}

.item-table-2-a span {
  float: left;
  width: 20%;
}

.item-table-2-b {
  width: 50%;
}

.item-table-2-b span {
  float: left;
  width: 16.6%;
}
.tableOn2 {
  color: rgb(205, 91, 92);
}
</style>