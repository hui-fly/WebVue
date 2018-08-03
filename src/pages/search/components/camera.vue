<template>
  <div class="camera-container">
      <span @click="cameraOpen" class="camera">
          <a class="iconfont icon-xiangji1"></a>
      </span>
      <div class="camera-menu" v-if='isShow'>
          <p class="tip">选择您需要的分辨率</p>
          <ul>
              <li v-for="(item,index) in list" 
                  class="camera-menu-item" 
                  @click='menuItem(index)'
              ><a class="a-item">{{item.width+" X "+item.height}}</a></li>
          </ul>
          <div class="camera-btn-container">
              <a class="btn confirm" @click="screenShot">确定</a>
              <a class="btn cancel" @click="cameraClose">取消</a>
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
          this.html2canvas();
      },
      html2canvas:function(){
          html2canvas(earth._container).then(canvas=>{
              document.body.appendChild(canvas);
              container.style.width = "100%";
              container.style.height = "100%";
              canvas.style.width = "100%";
              canvas.style.height = "100%";
              earth.handleResize();
          })
      },
      menuItem:function(index){//选择分辨率
          this.width=this.list[index].width;
          this.height=this.list[index].height;
          console.log(this.width)
      },
      setCanvas:function(){
          let container=document.getElementById('container')
          console.log(container)
          console.log(container.style.width,container.style.height)
          const width=this.width+'px';
          const height=this.height+'px';
          container.style.width = width;
          container.style.height = height;
          earth.handleResize();
          console.log(container.style.width,container.style.height)
      },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .camera{
      position: absolute;
      color: aliceblue;
      display: inline-block;
      left: 2.5rem;
      top:2rem;
  }
  .icon-xiangji1{
      font-size: 3rem;
      color: #fff;
  }
  .icon-xiangji1:hover{
      color: #999;
  }
  .camera-menu{
      position: absolute;
      overflow: hidden;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width:50%;
      height: 45%;
      z-index:2000;
      background: aliceblue;
  }
  .tip{
      font-size: 1.8rem;
      margin-top: 1.8rem;
      margin-left: 1.8rem;
  }
  ul{
      margin-top: 1.5rem;
      margin-left: 3rem;
  }
  .camera-menu-item{
      font-size: 1.5rem;
      line-height: 2.2rem;
      letter-spacing: 3px;
      cursor: pointer;
  }
  .a-item:active{
      color:darkgoldenrod;
  }
  a:visited{
      color: darkgoldenrod;
  }
  
  .camera-btn-container{
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
      cursor: pointer;
  }
  .confirm:active{
      color: #999;
  }
  .cancel:active{
      color:#999;
  }
</style>