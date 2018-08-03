import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import html2canvas from 'html2canvas'; 
import CircularProgress from 'material-ui/CircularProgress';

var sleep = function (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  })
};

export default class Capture extends React.Component {


  state = {                
    menuIndex: 1,
    size: '1366*768',
    loading: false,
    finish: false,
  }
  handleOpen = () => {                 //setState在哪   
    this.setState({ open: true });   //this是指capture??????
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  handleMenu = (event, index, value) => {//选择分辨率后调用
    this.setState({ menuIndex: value, size: event.target.innerText });
  }
  toggleConfirm = () => {             //点击截取后调用
    if (this.state.finish) {
      console.log('保存到本地')
      this.props.itemHandle('capture')
    } else {
      this.setState({
        loading: true
      })
      this.startCapture()
    }
  }

  async startCapture() {
    const size = this.state.size.split('*');
    const container = document.getElementById('container')
    const width = size[0] + 'px';
    const height = size[1] + 'px';
    container.style.width = width;
    container.style.height = height;
    console.log(width, height)
    earth.handleResize();             //handleResize？？？？截屏?
    const widgets = document.getElementById('widgets')      
    widgets.style.display = 'none';   //????栅栏消失？
    this.setState({
      loading: true
    });
    earth.globe.maximumScreenSpaceError = 1.5;
    await sleep(200);
    console.log(earth.globe.maximumScreenSpaceError)
    if (earth.globe._surface._lastTileLoadQueueLength === 0) { //已加载完成，通常是分辨率较小的情况
      setTimeout(() => this.generateCanvas(), 200)

    } else {
      earth.globe.tileLoadProgressEvent.addEventListener(e => {
        console.log(e)
        if (e === 0) {
          this.generateCanvas()
        }
      })
    }

  }

  generateCanvas() {//Promise
    html2canvas(earth._container).then(canvas => {
      this.canvas = canvas
      this.setState({
        loading: false,
        finish: true
      })
      earth.globe.maximumScreenSpaceError = 2
      widgets.style.display = 'block';
      container.style.width = "100%";
      container.style.height = "100%";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      earth.handleResize();
      document.getElementById('canvasNode').appendChild(canvas)
      this.forceUpdate()
    });
  }

  render() {

    const { loading, finish } = this.state;
    const { itemHandle } = this.props
    const actions = [(
    !finish &&
      <FlatButton
        label="取消"
        primary={true}
        onClick={() => { itemHandle('capture') }}
      />
    )
      ,
    <FlatButton
      label={finish ? "完成" : "截取"}
      primary={true}
      keyboardFocused={true}
      onClick={this.toggleConfirm}
    />,
    ];

    return (
      <div>

        <Dialog
          title="场景栅格化工具"
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.handleClose}
        >
          {
            !loading && !finish &&
            "请选择需要的分辨率" &&

            < DropDownMenu value={this.state.menuIndex} onChange={this.handleMenu}>
              <MenuItem value={2} primaryText="1334*750" />
              <MenuItem value={3} primaryText="1366*768" />
              <MenuItem value={4} primaryText="1920*1080" />
              <MenuItem value={5} primaryText="3840*2160" />
              <MenuItem value={6} primaryText="8000*6000" />
            </DropDownMenu>

          }

          {
            loading && "加载中" &&

            <CircularProgress size={60} thickness={7} />

          }
          {
            finish && <div id="canvasNode" />
          }


        </Dialog>
      </div >
    );
  }
}