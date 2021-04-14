import React from 'react'
import ReactDOM, { render } from 'react-dom';
import './sortui2.css';
import doBucket from './bucketsortalgo.js';



const ANIMATION_SPEED_MS = 800;


const PRIMARY_COLOR = 'white';


const SECONDARY_COLOR = 'red';


export default class BucketSort extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      arrayPrev:[],
      bucket:[[],[],[],[],[],[],[],[],[],[]],
      arrayCounter:[0,1,2,3,4,5,6,7,8,9],
      arrayTrans: [0,1,2,3,4,5,6,7,8,9],
      ANIMATION_SPEED_MS : 800,
      flag:false,
    };

    this.getRandomArray = this.getRandomArray.bind(this);
    this.getUpdatedArray = this.getUpdatedArray.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.deleteArray = this.deleteArray.bind(this);
    this.bucketsort = this.bucketsort.bind(this);
    
  }

  componentDidMount() {
    this.getRandomArray(); 
  }

  getRefreshArray(){
    window.location.reload();
    this.getRandomArray();
  }

  getRandomArray(){
    const array = [];
    for (let i = 0; i <getRandomInt(10,10); i++) {
      array.push(Math.random().toFixed(3));
    }
    this.setState({array:array});
    this.setState({arrayPrev:array});
  }

  getUpdatedArray(){
    const array = this.state.array.slice();
    array.splice(array.length-1);
    this.setState({array:array});
    this.setState({arrayPrev:array});
  }

  addToArray(){
    const array = this.state.array.slice();
    let Num = Number(prompt('Enter a Decimal Number'));
    if(array.length>0){
      while(Num<0 || Num>=1){
        Num = Number(prompt('Enter a Number between 0 to 1 !!'));
      }
    }
    array.push(Num.toFixed(3));
    this.setState({array:array});
    this.setState({arrayPrev:array});
  }

  deleteArray(){
    const array = [];
    this.setState({array:array});
    this.setState({arrayPrev:array});
  }

  bucketsort(){
    const minNum = Math.min.apply(null,this.state.array);
    const maxNum = Math.max.apply(null,this.state.array);
    let barheight = 0;
    let j=0;
    let barwidth = 0;
    let flag=true;
    let temp=0;
    if (minNum!==maxNum){
      barheight = 265/(maxNum-minNum);
    }else{
      barheight = 270;
    }
    if(this.state.array.length>=6){
      barwidth = 100/(this.state.array.length*2+2);
    }else{
      barwidth = 100/(11);
    }
    const sortarray=doBucket(this.state.array);
    const arrayBars = document.getElementsByClassName('array');
    const arrayTransBars = document.getElementsByClassName('arrayTrans');
    const arrayCounter = document.getElementsByClassName('arrayCounter');
    const arrayUnsorted = document.getElementsByClassName('arrayUnsorted');
    const arrayPrev = this.state.array.slice();

    for (let i = 0; i < sortarray.length; i++) {
      const [,,part]=sortarray[i];
      {console.log('Part:',part)}
      if(part==='one'){
        if(i%3===0){
          setTimeout(() => {
            const [index,,]=sortarray[i];
            const arrayUnsortedBar = arrayUnsorted[index].style;
            arrayUnsortedBar.backgroundColor='green';
          }, i*ANIMATION_SPEED_MS);
        }
        if(i%3===1){
          setTimeout(() => {
            const [index,idx,]=sortarray[i];
            const arrayUnsortedBar = arrayUnsorted[index].style;
            const arrayTransBar = arrayTransBars[idx].style;
            arrayUnsortedBar.backgroundColor='white';
            arrayTransBar.backgroundColor='green';
          }, (i)*ANIMATION_SPEED_MS);
        }
        if(i%3===2){
          setTimeout(() => {
            let bucketArray = this.state.bucket.slice();
            const [index,idx,]=sortarray[i];
            const arrayTransBar = arrayTransBars[idx].style;
            arrayTransBar.backgroundColor='white';
            bucketArray[idx].push(this.state.array[index]);
            this.setState({bucket:bucketArray});
          }, (i)*ANIMATION_SPEED_MS);
        }
      }
      else if(part==='Two'){
        if(i%3===0){
          setTimeout(() => {
            const [index,,]=sortarray[i];
            const arrayTransBar = arrayTransBars[index].style;
            arrayTransBar.backgroundColor='green';
          }, i*ANIMATION_SPEED_MS);
        }
        if(i%3===1){
          setTimeout(() => {
            let bucketArray = this.state.bucket.slice();
            const [index,buckets,]=sortarray[i];
            const arrayTransBar = arrayTransBars[index].style;
            arrayTransBar.backgroundColor='white';
            bucketArray[index]=[];
            bucketArray[index]=buckets;
            this.setState({bucket:bucketArray});
          }, (i)*ANIMATION_SPEED_MS);
        }
        if(i%3===2){
          setTimeout(() => {
            //Nothing
          }, (i)*ANIMATION_SPEED_MS);
        }
      }
      else{
        if(part==='ThreeStart'){
          if(i%3===0){
            setTimeout(() => {
              const [index,,]=sortarray[i];
              const arrayTransBar = arrayTransBars[index].style;
              arrayTransBar.backgroundColor='green';
            }, i*ANIMATION_SPEED_MS);
          }
          if(i%3===1){
            setTimeout(() => {
              const [index,,]=sortarray[i];
              const arrayTransBar = arrayTransBars[index].style;
              arrayTransBar.backgroundColor='white';
            }, (i)*ANIMATION_SPEED_MS);
          }
          if(i%3===2){
            setTimeout(() => {
              //Nothing
            }, (i)*ANIMATION_SPEED_MS);
          }
        }
        else{
          if(i%3===0){
            setTimeout(() => {
              let bucketArray = this.state.bucket.slice();
              const [index,,]=sortarray[i];
              temp=bucketArray[index].shift();
              {console.log('Shift',temp)}
              this.setState({bucket:bucketArray});
            }, i*ANIMATION_SPEED_MS);
          }
          if(i%3===1){
            setTimeout(() => {
              let array=this.state.array.slice();
              const [index,idx,]=sortarray[i];
              const arrayBar = arrayBars[idx].style;
              arrayBar.backgroundColor='green';
              arrayBar.fontWeight='bold';
              arrayBar.color='black';
              arrayBar.textAlign=`center`;
              array[idx]=temp;
              this.setState({array:array});
            }, (i)*ANIMATION_SPEED_MS);
          }
          if(i%3===2){
            setTimeout(() => {
              const [index,idx,]=sortarray[i];
              const arrayBar = arrayBars[idx].style;
              arrayBar.backgroundColor='white';
            }, (i)*ANIMATION_SPEED_MS);
          }
        }
      }
    }
  }


  render(){
    let array = this.state.array.slice();
    let arrayPrev = this.state.arrayPrev.slice();
    let arrayCounter=this.state.arrayCounter.slice();
    let arrayTrans = this.state.arrayTrans.slice();
    let bucket = this.state.bucket.slice();
    const minNum = Math.min.apply(null,array);
    const maxNum = Math.max.apply(null,array);
    let barheight = 0;
    let barwidth = 0;
    let barheightTrans = 0;
    let barwidthTrans = 0;
    if (minNum!==maxNum){
      barheight = 265/(maxNum-minNum);
    }else{
      barheight = 270;
    }
    barheightTrans = 265/9;

    if(array.length>=6){
      barwidth = 100/(array.length*2+1);
    }else{
      barwidth = 100/(11);
    }
    barwidth = 100/15;
    barwidthTrans = 100/18;
    return(
      <div className="maindiv">
        <div className="animationcanvas" style={{height:`${95}%`}}>
          <div className="animationcanvas" style={{height:`150px`, minHeight:`${0}%`}}>
          {array.length!==0
          ?<div>
          {array.map((value, idx) => (
            <div
              className="array"
              key={idx}
              style={{
                height: `25px`,
                marginTop: "3%",
                width:`${barwidth}%`,
                backgroundColor:`transparent`,
                textAlign:`center`,
                fontSize:`medium`,
                verticalAlign:`bottom`,
                color:`transparent`,
                marginLeft:`${(idx===0)?((100-this.state.array.length*barwidth)/2):(null)}%`,
              }}>{this.state.array[idx]}</div>
            ))}
            <br></br>
            {arrayPrev.map((val, id) => (
              <div
                className="arrayUnsorted"
                key={id}
                style={{
                  marginTop: "3%",
                  height: `25px`,
                  width:`${barwidth}%`,
                  backgroundColor:`White`,
                  textAlign:`center`,
                  verticalAlign:`bottom`,
                  fontWeight: `bold`,
                  color:`black`,
                  marginLeft:`${(id===0)?((100-this.state.arrayPrev.length*barwidth)/2):(null)}%`
                }}>{val}</div>
              ))
              }
            </div> 
          :<p style={{fontSize:`30px`,height:`265px`, textAlign:`center`,margin:`${0}%`,fontWeight:'bold',position:`relative`}}>Insert Array</p>
          }
          </div>
          <div className="animationcanvas" style={{height:`${80}%`,minHeight:`150px`}}>
           {
           bucket.map((val, id) => (
              <div
                className="arrayTrans"
                key={id}
                style={{
                  height: `${((val.length)*25)}px`,
                  width:`${barwidthTrans}%`,
                  backgroundColor:`white`,
                  textAlign:`center`,
                  verticalAlign:`bottom`,
                  fontWeight: `bold`,
                  border:`transparent`,
                  marginRight:`3px`,
                  marginLeft:`3px`,
                  marginTop:`150px`,
                  color:`black`,
                  fontSize:`small`,
                  boxShadow:`0 4px 6px -4px black`,
                  borderRadius: `0px 0px 10px 10px`,
                  bottom:0,
                  marginLeft:`${(id===0)?((100-this.state.bucket.length*barwidthTrans)/2):(null)}%`,
                }}>{val.map((value,idx)=>(<li style={{listStyleType:`none`}}>{value}</li>))}</div>
              ))
              }
              <br></br>
              {
            arrayCounter.map((val, id) => (
              <div
                className="arrayCounter"
                key={id}
                style={{
                  marginTop: "1%",
                  height: `25px`,
                  width:`${barwidthTrans}%`,
                  backgroundColor:`transparent`,
                  textAlign:`center`,
                  verticalAlign:`bottom`,
                  fontWeight: `bold`,
                  color:`black`,
                  alignContent:`bottom`,
                  border:`transparent`,
                  marginRight:`3px`,
                  marginLeft:`3px`,
                  bottom:0,
                  fontSize:`larger`,
                  boxShadow:`0 -4px 6px -4px black`,
                  marginLeft:`${(id===0)?((100-this.state.arrayCounter.length*barwidthTrans)/2):(null)}%`,
                }}>{this.state.arrayCounter[id]}</div>
              ))
          }
          </div>
        </div>
        <div className="buttons_back">
          <button className="buttons" onClick={this.getRefreshArray}>Generate Random Array</button>
          <button className="buttons" onClick={this.getUpdatedArray}>Delete Last Number</button>
          <button className="buttons" onClick={this.addToArray}>Add Number to Array</button>
          <button className="buttons" onClick={this.deleteArray}>Delete Array</button>
          <button className="playbutton" onClick={this.bucketsort}>Start Bucket Sorting</button>
        </div>
      </div>
    );
  }
}

function getRandomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
