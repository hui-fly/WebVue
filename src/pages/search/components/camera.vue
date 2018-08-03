<template>
  <div class="camera-container">
      <span @mouseover='iconOver'
            @mouseout='iconOut'
            @click="cameraOpen"
            :class="[{'hover':isHover},iconfont,iconXiangji,camera]"
            ></span>
      <div class="cameraMenu" v-if='isShow'>
          <ul>
              <li v-for="(item,index) in list" 
                  :class="[{'hover':hoverIndex===index},{'active':activeIndex===index},cameraMenuItem]" 
                  @mouseover='itemOver(index)'
                  @mouseout="itemOut(index)"
                  @click="menuItem(index)"
              >{{item.width+" X "+item.height}}</li>
          </ul>
          <div class="cameraBtnContainer">
              <button class="btn confirm" @click="screenShot">确定</button>
              <button class="btn cancel" @click="cameraClose">取消</button>
          </div>
      </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import util from 'util';
// import func from './vue-temp/vue-editor-bridge';
const GeoVis = window.GeoVis;
export default {
  name: "Camera",
  data(){
      return{
          list:[
              {width:1334,height:750},
              {width:1366,height:768},
              {width:1920,height:1080},
              {width:3840,height:2160},
              {width:8000,height:6000},
          ],
          canvas:{
              width:1334,
              height:750,
          },
          isShow:false,
          activeIndex:'',
          hoverIndex:'',
          isHover:false,
          iconfont:'iconfont',
          cameraMenuItem:'cameraMenuItem',
          camera:'camera',
          iconXiangji:'icon-xiangji1',
      }
  },
  methods:{
      cameraOpen:function(){
          console.log('打开/关掉相机')
          this.isShow=!this.isShow; //打开相机
      },
      cameraClose:function(){//关掉相机
          console.log("取消")
          this.isShow=false;
      },
      screenShot:function(){//截屏
          console.log("确定")
          this.setCanvas();      //设置canvas
      },
      menuItem:function(index){//选择分辨率
          this.activeIndex = index;
          this.width=this.list[index].width;
          this.height=this.list[index].height;
          console.log(this.width)
      },
      setCanvas:function(){
          
      },
      itemOver:function(index){
    	  this.hoverIndex=index;
      },
      itemOut:function(index){
          this.hoverIndex=-1;
      },
      iconOver:function(){
          this.isHover=true;
      },
      iconOut:function(){
          this.isHover=false;
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .camera-container{
      position: absolute;
      top:0;
  }
  .camera{
      position: absolute;
      color: aliceblue;
      font-size: 3rem;
      display: inline-block;
      left: 2.5rem;
      top:2rem;
  }
  .camera.hover{
      color: #999;
  }
  .cameraMenu{
      position: relative;
      overflow: hidden;
      top:10rem;
      left: 30rem;
      width:20rem;
      height: 18rem;
      z-index:2000;
      background: aliceblue;
  }
  ul{
      margin-top: 1.5rem;
      margin-left: 3rem;
  }
  .cameraMenuItem{
      font-size: 1.5rem;
      line-height: 2.2rem;
      letter-spacing: 3px;
      cursor: pointer;
  }
  .cameraMenuItem.hover{
      color: #999;
  }
  .cameraMenuItem.active{
      color: cornflowerblue;
  }
  .cameraBtnContainer{
      position: absolute;
      bottom: 2rem;
      width: 100%;
      height: 2rem;
  }
  .btn{
      /* display: inline-block; */
      float: right;
      margin: 0 0.8rem;
      line-height: 2rem;
      border: none;
      padding: 0 0.5rem;
  }
</style>