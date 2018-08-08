<template>
  <div class="camera-container">
      <span @click="cameraOpen" class="camera">
          <a class="iconfont icon-xiangji1"></a>
      </span>
      <div class="camera-menu" v-if='isShow'>
          <div class="input-select">
              <input class="input-item" placeholder="选择您需要的分辨率" value="1920*1080" v-model='size' @change='setSize'/>
              <select class="select-item" v-model='size' @change='setSize'>
                  <option v-for="(item,index) in list" 
                      class="camera-menu-item" 
                  >{{item.width+"*"+item.height}}</option>
              </select>
          </div>
          <div class="camera-btn-container">
              <a class="btn confirm" @click="screenShot">确定</a>
              <a class="btn cancel" @click="cameraClose">取消</a>
          </div>
      </div>
      <div id="photo" v-if='canvasShow'>
        <div id="canvasNode" ref='canvasNode'></div>
        <div class="camera-btn-container">
            <a class="btn confirm" id="download">下载</a>
            <a class="btn cancel" @click="cancelDown">取消</a>
        </div>
      </div>   
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
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
          initSize:{
              width:1334,
              height:750,
          },
          isShow:false,
          size:'1920*1080',
          canvasShow:false,
          width:'',
          height:'',
      }
  },
  methods:{
      cameraOpen:function(){
          this.init();
          console.log('打开/关掉相机')
          this.canvasShow=false;
          this.isShow=!this.isShow; //打开相机
      },
      init:function(){
        var canvasNode=document.getElementById('canvasNode')
        let download =document.getElementById('download')
        if(canvasNode){
          console.log(canvasNode.childNodes.length)
        }
        if(canvasNode&&canvasNode.childNodes.length>0){
          console.log(canvasNode.childNodes.length)
          canvasNode.removeChild(canvasNode.childNodes[0]);
          console.log(canvasNode.childNodes.length)
        }
        if(download&&typeof(download.getAttribute('href'))!==undefined){
          console.log(typeof(download.getAttribute('href')))
          download.removeAttribute('href')
        }
      },
      cameraClose:function(){//关掉相机
          console.log("取消")
          this.isShow=false;
      },
      cancelDown:function(){
          this.canvasShow=false;
      },
      screenShot:function(){//截屏
          console.log("确定")
          this.isShow=false;
          this.setContainer();      //设置canvas
          this.canvasShow=true;//必须先渲染出来才能向其插入节点
          this.startCapture(); 
      },
      startCapture:function(){
        earth.globe.maximumScreenSpaceError = 1.5;
            // await sleep(200);
            console.log(earth.globe.maximumScreenSpaceError)
            if (earth.globe._surface._lastTileLoadQueueLength === 0) { 
              console.log(2)
              setTimeout(() => this.html2canvas(), 200)
            } else {
              const that = this;
              function doHtml2canvas(e){
                if (e === 0) {
                  that.html2canvas();
                  earth.globe.tileLoadProgressEvent.removeEventListener(doHtml2canvas)
                }
              }
              earth.globe.tileLoadProgressEvent.addEventListener(doHtml2canvas)
            }
      },
      html2canvas:function(){
          let container = document.getElementById('container')
          let download =document.getElementById('download')
          html2canvas(container).then(canvas=>{
            //截图之后回到初始大小
              container.style.width=this.initSize.width;
              container.style.height=this.initSize.height;
              earth.handleResize();
              download.setAttribute('href',canvas.toDataURL()); 
              download.setAttribute('download','截图.png');
              canvas.style.width = "100%";
              canvas.style.height = "100%";
              canvasNode.appendChild(canvas);
              console.log('结束');
          })
          this.init();
          earth.globe.tileLoadProgressEvent.removeEventListener((e)=>{
            this.doHtml2canvas(e)
            console.log('移除')
          });
      },
      setSize:function(){//选择分辨率
          const size = this.size.split('*');
          this.width=size[0];
          this.height=size[1];
      },
      setContainer:function(){
          let container=document.getElementById('container')
          //先把初始的大小存下来
          this.initSize.width=container.style.width;
          this.initSize.height=container.style.height;
          const width=this.width+'px';
          const height=this.height+'px';
          container.style.width=width;
          container.style.height=height;
          // $('#container').width(width);
          // $('#container').height(height);
          earth.handleResize();
          earth.globe.maximumScreenSpaceError = 1.5;
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
      top:40%;
      left: 50%;
      transform: translate(-50%,-50%);
      width:30%;
      z-index:2000;
      background: #d7880d;
  }
  #photo{
      position: absolute;
      overflow: hidden;
      padding: 1rem;
      top:40%;
      left: 50%;
      width: 40%;
      transform: translate(-50%,-50%);
      z-index:2010;
      background: aliceblue;
  }
  .input-select{
      text-align: center;
      margin: 1rem auto; 
      margin-bottom: 3rem;
  }
  .input-item{
      font-size: 2rem;
  }
  .select-item{
      height: 2.5rem;
  }
  .camera-menu-item{
      font-size: 1.5rem;
      line-height: 2.2rem;
      letter-spacing: 23px;
      cursor: pointer;
  }
  .camera-btn-container{
      position: absolute;
      background: #fff;
      bottom: 0rem;
      width: 100%;
      height: 2rem;
  }
  .btn{
      float: right;
      margin: 0 0.8rem;
      line-height: 2rem;
      border: none;
      padding: 0 0.5rem;
      cursor: pointer;
  }
  .setContainerSize{
    width: 1000px;
    height: 1000px;
  }
</style>