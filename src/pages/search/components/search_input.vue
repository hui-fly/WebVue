<template>
    <div class="search-container">
        <el-autocomplete
            class="search-input"
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"   
            @keyup.enter="submit"
            >                              
        </el-autocomplete> 
        <input class="search-btn" @click="submit" type="button" value="搜索">
    </div>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
        prompts: [],
        inputValue: "",
    };
  },
  methods: {
    querySearch:async function(queryString,cb) {
        await this.request(queryString); //异步请求
        let prompts = this.prompts;
        this.prompts=[];
        cb(prompts);
    },
    submit: function() {
        var point = this.getParam();//获得用户的输入
        this.flyTo(point);
    },
    flyTo:function(point){
        //调用API
        // new Camera()
        // earth.flyTo(point)
    },
    getParam: function() {
        return [120.775034,31.28465,1000] ;
    },
    // setUrl: function(point) {
    //     var rootUrl = "/search";
    //     var url = rootUrl+"?" + "q=" + point;
    //     return url;
    // },
    request:async function(queryString){                  //请求数据
        const url = 'http://10.10.10.89:8080/search.php?q='+queryString+'&format=json'
        const res = await fetch(url);
        const json = await res.json();
        // console.log(json)
        // 将json_display_name处理为[
        //     {display_name:['xx','xx','xx','xx',...], place_id:"xxx"}
        //     '''
        //     ...
        // ]
        const json_display_name = [];         
        json.forEach((item,index) => {
            json_display_name[index]={};                               
            json_display_name[index].display_name = item.display_name//.split(','); 
            json_display_name[index].place_id = item.place_id;
        }); 
        //prompts=[
        //    {value:'XXX',place_id:'XXX'},
        //    ....
        //    ....
        //]
        json_display_name.forEach((item,index) => {
            this.prompts[index]={};   
            this.prompts[index].value = item.display_name//[0]; 
            this.prompts[index].place_id = item.place_id;
        }); 
        // json_display_name[index].display_name.filter((item,index)=>{
        //     return item.indexOf(queryString)===0;
        // });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 如果用element不能加scoped-->
<style>
.search-container {
    display: inline-block;
    position: absolute;
    color: #fff;
    top: 1.2rem;
    right: 1rem;
    height: 3rem;
    width:25rem
}
.search-input {
    display: inline-block;
    position: absolute;
    height: 36px;
    width: 20rem;
    left:-5rem;
    line-height: 36px;
    color: #fff;
    font-size: 2rem;
}
.el-input__inner{
    border: none;
    border-radius: 0px;
}
.search-btn {
    display: inline-block;
    position: absolute;
    padding: 0 1rem;
    top:0.05rem;
    left: 15rem;
    background: #0097a7cc;
    height: 40px;
    line-height: 40px;
    font-size: 2rem;
}
</style>