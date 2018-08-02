<template>
    <div class="earth-tool">
      <span v-for="(item,index) in list" 
            :class="[{'active':ind===index},iconfont,item.className]" 
            @click='method(item.className)'
            @mouseover='iconOver(index)'@mouseout='iconOut(index)'
       ></span>
      <!-- <span :class="[iconfont add icon-add1]" @click='zoomIn'></span>
      <span :class="[iconfont jianhao icon-jianhao]" @click='zoomOut'></span> -->
    </div>
</template>
<script>
import util from "./util"
export default {
  name: "EarthTool",
  data(){
  	return{
  		list:[
	  		{className:'icon-earth',method:'goHome'},
	  		{className:'icon-add1',method:'zoomIn'},
	  		{className:'icon-jianhao',method:'zoomOut'}
  		],
  		iconfont:'iconfont',
  		ind:''
  	}
  },
  methods:{
  	method:function(className){
  		if(className==='icon-earth'){
  			util.goHome();
  		}
  		else if(className==='icon-add1'){
  			util.zoomIn();
  		}
  		else{
  			util.zoomOut();
  		}
  	},
    iconOver:function(index){
    	this.ind=index;
    },
    iconOut:function(index){
    	this.ind=-1;
    }
  },
  mounted(){   //这里将变量加载到全局
  	window.marker = 0
  	window.polygon = 0; //为了在用户点击home时不报错
  	window.util = util;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .earth-tool{
      position: absolute;
      display: inline-block;
      left: 4rem;
      top:2rem;
    }
    .iconfont{
      font-size: 3rem;
      margin-left: 2rem;
      color: #fff;
      cursor: pointer;
    }
    .active{
    	color: #999;
    }
</style>