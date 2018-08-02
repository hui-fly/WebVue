<template>
    <div class="search-container">
        <el-autocomplete
            class="search-input"
            v-model="inputValue"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"   
            @keyup.enter.native="submit"
            @select = 'submit'
            >                              
        </el-autocomplete>
        <span class="iconfont search-btn" @click="submit">&#xe632;</span>
    </div>
</template>
<script>
import util from "./util"
import EarthTool from "./earth_tool"
export default {
  name: "SearchInput",
  props:{
    url:{
        type:String,
        default:"https://nominatim.openstreetmap.org"
    },
    format:{
        type:String,
        default:'json'
    },
    dataType:{
        type:String,
        default:'polygon_geojson'
    }
  },
  data() {
    return {
        prompts:[],        //用作存储后台数据的仓库，使得本组件的每个方法都能取
        inputValue: "",
        queryUrl:this.url,
        queryFormat:this.format,
        queryDataType:this.dataType,
    };
  },
  methods: {
    querySearch:async function(queryString,cb) {
        this.prompts=[];    //每次change之后把之前的仓库清空
        cb([{value:'请稍等...'}])
        console.log(this.queryUrl);
        this.prompts=await this.request(queryString); //异步请求将数据放进仓库
        if(this.prompts.length===0){
            cb([{value:'无数据...'}]);
            return;
        }
        console.log(this.prompts.length)
        cb(this.prompts);
    },
    submit: function(){
        util.clearPolygon();//先清除边界和marker
        var point = this.getParam();//获得用户输入的location和polygonpoints、name
        // console.log(point.polygonpoints)
        if(!point)  {//如果用户什么都没有输入
            console.log('请稍等')
            return 0;  
        }
        var lineStyle = {
            fillColor:"#512da8",
            outlineColor:"#00acc1",
        }
        //相机飞到目标点并划线描点
        this.flyTo(point,lineStyle);
        console.log('submit成功')
    },
    flyTo:function(point,lineStyle){
        util.polygonpointsToVector2(point.polygonpoints)//用于fromPoints(vector)
        var bd = this.fromPoints(point.polygonpoints);                                //得到BoudingRectangle
        console.log(bd);
        var x=(bd.width===0?bd.x-0.005:bd.x);
        var y=(bd.height===0?bd.y-0.005:bd.y);
        var width=(bd.width===0?0.01:bd.width);
        var height=(bd.height===0?0.01:bd.height);
        var polygon = util.setLine(point.polygonpoints,lineStyle);        //划线
        var marker = util.setMarker(point.location,point.name)                 //描点
        earth.camera.flyTo({                                                   //飞到目标
            destination:GeoVis.Rectangle.fromDegrees(x,y,x+width,y+height),
        });
        console.log('飞行成功')
    },
    getParam: function() {          //从prompts中获取用户输入的地点坐标{location:[a,b],polygonpoints:[[a,b],[b,c],...]}
        let len = this.prompts.length;
        let i = 0;
        for(i = 0;i<len;i++){
            if(this.prompts[i].value.indexOf(this.inputValue)!==-1){//匹配用户输入
                console.log('getParam成功')
                return {
                    location: this.prompts[i].location,
                    polygonpoints:this.prompts[i].polygonpoints,
                    name:this.prompts[i].value,
                }
            }
        }
        //如果用户的输入全都没有匹配到但是有数据，就返回第一个
        if(i===len){
            if(this.prompts.length!==0){
                return {
                    location:this.prompts[0].location,
                    polygonpoints:this.prompts[0].polygonpoints
                }
            } 
            //如果用户什么都没有输入或者无数据
            else return false;
        }
    },
    fromPoints:function(positions){
       return GeoVis.BoundingRectangle.fromPoints(positions)
       console.log('fromPoints成功')
    },
    request:async function(placeName){                  //请求数据
        let url = `${this.queryUrl}/search.php?q=${placeName}&format={this.queryFormat}&${this.queryDataType}=1`;
        // let url = that.queryUrl+"/search.php?format=json&polygon_geojson=1&q="+placeName;
        let json = await util.getData(url) //请求polygon_geojson格式数据
        console.log('请求成功')
        // 将place处理为[
        //     {display_name:['xx','xx','xx','xx',...],     
        //     place_id:"xxx",polygonpoints:[[a,b],[c,d],...]}
        //     '''
        //     ...
        // ]
        const place = [];    
        json.forEach((item,index) => {
            place[index]={};                               
            place[index].value = item.display_name; 
            place[index].place_id = item.place_id;
            place[index].location = [Number(item.lon),Number(item.lat)];
            if(item.geojson.type==='MultiPolygon'){
                place[index].polygonpoints = item.geojson.coordinates[0][0];
                console.log(item.display_name+'1MultiPolygon')
            }
            else if(item.geojson.type==='LineString'){
                place[index].polygonpoints = item.geojson.coordinates;
                console.log(item.display_name+'LineString')
            }
            else if(item.geojson.type==='Polygon'){
                place[index].polygonpoints = item.geojson.coordinates[0];
                console.log(item.display_name+'Polygon')
            }
            else if(item.geojson.type==='Point'){
                place[index].polygonpoints=[item.geojson.coordinates,item.geojson.coordinates];
                console.log(item.display_name+'Point')
            }
            else{
                console.log('其他'+item.display_name+item.geojson.type)
            }      
        });
        console.log("json处理成功")
        return place;
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
    font-size: 3rem;
    cursor:pointer
}
</style>