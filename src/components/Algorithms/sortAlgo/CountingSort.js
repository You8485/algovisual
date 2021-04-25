import React from 'react'
import ReactDOM, { render } from 'react-dom';
import './sortui2.css';
import doCounting from './countingsortalgo.js';



const ANIMATION_SPEED_MS = 800;


const PRIMARY_COLOR = 'white';


const SECONDARY_COLOR = 'red';


export default class CountingSort extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      arrayPrev:[],
      arrayCounter:[0,0,0,0,0,0,0,0,0,0],
      arrayTrans: [0,1,2,3,4,5,6,7,8,9],
      ANIMATION_SPEED_MS : 800,
      isAnimationOn:true,
      arrayPrevstate:[],
      flag:0,
    };

    this.getRandomArray = this.getRandomArray.bind(this);
    this.prevState = this.prevState.bind(this);
    this.prevStateSorting = this.prevStateSorting.bind(this);
    this.getUpdatedArray = this.getUpdatedArray.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.deleteArray = this.deleteArray.bind(this);
    this.countingsort = this.countingsort.bind(this);
    
  }

  componentDidMount() {
    this.getRandomArray(); 
  }

  prevState(){
    if(this.state.flag===1){
      setTimeout(() => {
        const array = this.state.arrayPrevstate.slice();
        this.setState({array:array});
        this.setState({flag:0});
        this.setState({arrayCounter:[0,0,0,0,0,0,0,0,0,0]});
        const arrayBars = document.getElementsByClassName('array');
        const arrayUnsorted = document.getElementsByClassName('arrayUnsorted');
        for(let j=0; j<arrayBars.length; j++){
          const barStyle = arrayBars[j].style;
          const barUnsortStyle = arrayUnsorted[j].style;
          barStyle.backgroundColor = 'transparent';
          barUnsortStyle.backgroundColor = 'white';
          barStyle.color = 'transparent';
          barUnsortStyle.color = 'black';
        }
      }, ANIMATION_SPEED_MS/2); 
    }
  }

  prevStateSorting(){
    setTimeout(() => {
      const array = this.state.arrayPrevstate.slice();
        this.setState({array:array});
        this.setState({flag:0});
        this.setState({arrayCounter:[0,0,0,0,0,0,0,0,0,0]});
        const arrayBars = document.getElementsByClassName('array');
        const arrayUnsorted = document.getElementsByClassName('arrayUnsorted');
        for(let j=0; j<arrayBars.length; j++){
          const barStyle = arrayBars[j].style;
          const barUnsortStyle = arrayUnsorted[j].style;
          barStyle.backgroundColor = 'transparent';
          barUnsortStyle.backgroundColor = 'white';
          barStyle.color = 'transparent';
          barUnsortStyle.color = 'black';
        }
    }, ANIMATION_SPEED_MS/2); 
    setTimeout(() => {
      this.countingsort();
    }, 2*ANIMATION_SPEED_MS);
  }

  getRefreshArray(){
    window.location.reload();
    this.getRandomArray();
  }

  getRandomArray(){
    const array = [];
    for (let i = 0; i <getRandomInt(5,20); i++) {
      array.push(getRandomInt(0,9));
    }
    this.setState({array:array});
    this.setState({arrayPrev:array});
  }

  getUpdatedArray(){
    const i = this.state.flag;
    this.prevState();
    setTimeout(() => {
      const array = this.state.array.slice();
      array.splice(array.length-1);
      this.setState({array:array});
      this.setState({arrayPrev:array});
    }, 2*i*ANIMATION_SPEED_MS);  
  }

  addToArray(){
    const i = this.state.flag;
    this.prevState();
    setTimeout(() => {
      const array = this.state.array.slice();
      let Num = Number(prompt('Enter a Number'));
      if(array.length>0){
        while(Num<0 || Num>9){
          Num = Number(prompt('Enter a Number between 0 to 9 !!'));
        }
      }
      array.push(Num);
      this.setState({array:array});
      this.setState({arrayPrev:array});
    }, 2*i*ANIMATION_SPEED_MS);
  }

  deleteArray(){
    const array = [];
    this.setState({array:array});
    this.setState({arrayPrev:array});
  }

  countingsort(){
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

    const arrayPrevstate = this.state.array.slice();
    this.setState({arrayPrevstate:arrayPrevstate});
    this.setState({flag:1});

    this.setState(state => ({
      isAnimationOn: !state.isAnimationOn
    }));

    const sortarray=doCounting(this.state.array);
    const arrayBars = document.getElementsByClassName('array');
    const arrayTransBars = document.getElementsByClassName('arrayTrans');
    const arrayCounter = document.getElementsByClassName('arrayCounter');
    const arrayUnsorted = document.getElementsByClassName('arrayUnsorted');
    const arrayPrev = this.state.array.slice();
    
    for (let i = 0; i < sortarray.length; i++) {
      const [,,part]=sortarray[i];
      if(i===sortarray.length-1){
        setTimeout(() => {
          this.setState(state => ({
            isAnimationOn: !state.isAnimationOn
          }));
        }, (i)*ANIMATION_SPEED_MS);
      }
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
            const [index,,]=sortarray[i];
            const arrayUnsortedBar = arrayUnsorted[index].style;
            const arrayTransBar = arrayTransBars[this.state.array[index]].style;
            const arrayCounterBar = arrayCounter[this.state.array[index]].style;
            arrayUnsortedBar.backgroundColor='white';
            arrayTransBar.backgroundColor='green';
            arrayCounterBar.backgroundColor='green';
          }, (i)*ANIMATION_SPEED_MS);
        }
        if(i%3===2){
          setTimeout(() => {
            let counterArray = this.state.arrayCounter.slice();
            const [index,counter,]=sortarray[i];
            const arrayTransBar = arrayTransBars[this.state.array[index]].style;
            const arrayCounterBar = arrayCounter[this.state.array[index]].style;
            arrayTransBar.backgroundColor='white';
            arrayCounterBar.backgroundColor='white';
            counterArray[this.state.array[index]]=counter;
            this.setState({arrayCounter:counterArray});
          }, (i)*ANIMATION_SPEED_MS);
        }
      }
      else if(part==='Two'){
        if(i%3===0){
          setTimeout(() => {
            const [index,,]=sortarray[i];
            const arrayCounterBarC = arrayCounter[index-1].style;
            arrayCounterBarC.backgroundColor='green';
          }, i*ANIMATION_SPEED_MS);
        }
        if(i%3===1){
          setTimeout(() => {
            const [index,,]=sortarray[i];
            const arrayCounterBar = arrayCounter[index].style;
            const arrayCounterBarC = arrayCounter[index-1].style;
            arrayCounterBarC.backgroundColor='white';
            arrayCounterBar.backgroundColor='green';
          }, (i)*ANIMATION_SPEED_MS);
        }
        if(i%3===2){
          setTimeout(() => {
            let counterArray = this.state.arrayCounter.slice();
            const [index,counter,]=sortarray[i];
            const arrayCounterBar = arrayCounter[index].style;
            arrayCounterBar.backgroundColor='white';
            counterArray[index]=counter;
            this.setState({arrayCounter:counterArray});
          }, (i)*ANIMATION_SPEED_MS);
        }
      }
      else{
        if(i%3===0){
          setTimeout(() => {
            const [index,,]=sortarray[i];
            const arrayUnsortedBar = arrayUnsorted[index].style;
            arrayUnsortedBar.backgroundColor='green';
          }, i*ANIMATION_SPEED_MS);
        }
        if(i%3===1){
          setTimeout(() => {
            const [index,CounterIdx,]=sortarray[i];
            const arrayUnsortedBar = arrayUnsorted[index].style;
            const arrayCounterBar = arrayCounter[CounterIdx].style;
            arrayCounterBar.backgroundColor='green';
            arrayUnsortedBar.backgroundColor='white';
          }, (i)*ANIMATION_SPEED_MS);
        }
        if(i%3===2){
          setTimeout(() => {
            let array = this.state.array.slice();
            let counterArray = this.state.arrayCounter.slice();
            const [index,CounterIdx,]=sortarray[i];
            const arrayBar = arrayBars[counterArray[CounterIdx]-1].style;
            const arrayUnsortedBar = arrayUnsorted[index].style;
            const arrayCounterBar = arrayCounter[CounterIdx].style;
            arrayUnsortedBar.backgroundColor='transparent';
            arrayUnsortedBar.color='transparent';
            arrayCounterBar.backgroundColor='white';
            arrayBar.backgroundColor='white';
            arrayBar.fontWeight='bold';
            arrayBar.color='black';
            arrayBar.textAlign=`center`;
            array[counterArray[CounterIdx]-1]=arrayPrev[index];
            counterArray[CounterIdx]=counterArray[CounterIdx]-1;
            this.setState({arrayCounter:counterArray});
            this.setState({array:array});
          }, (i)*ANIMATION_SPEED_MS);
        }
      }
    }
  }


  render(){
    let array = this.state.array.slice();
    let arrayPrev = this.state.arrayPrev.slice();
    let arrayCounter=this.state.arrayCounter.slice();
    let arrayTrans = this.state.arrayTrans.slice();
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
    barwidthTrans = barwidth = 100/21;
    return(
      <div className="maindiv">
        <div className="animationcanvas" style={{height:`${95}%`}}>
          <div className="animationcanvas">
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
                verticalAlign:`bottom`,
                color:`transparent`,
                marginLeft:`${(idx===0)?((100-this.state.array.length*barwidth)/2):(null)}%`
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
                  width:`${barwidthTrans}%`,
                  backgroundColor:`White`,
                  textAlign:`center`,
                  verticalAlign:`bottom`,
                  fontWeight: `bold`,
                  color:`black`,
                  marginLeft:`${(id===0)?((100-this.state.arrayPrev.length*barwidthTrans)/2):(null)}%`,
                }}>{val}</div>
              ))
              }
            </div> 
          :<p style={{fontSize:`30px`,height:`265px`, textAlign:`center`,margin:`${0}%`,fontWeight:'bold',position:`relative`}}>Insert Array</p>
          }
          </div>
          <div className="animationcanvas" >
           {
           arrayTrans.map((val, id) => (
              <div
                className="arrayTrans"
                key={id}
                style={{
                  height: `${(((val)*barheightTrans)+5)}px`,
                  width:`${barwidthTrans}%`,
                  backgroundColor:`White`,
                  textAlign:`center`,
                  verticalAlign:`bottom`,
                  fontWeight: `bold`,
                  color:`black`,
                  marginLeft:`${(id===0)?((100-this.state.arrayTrans.length*barwidthTrans)/2):(null)}%`,
                }}>{this.state.arrayTrans[id]}</div>
              ))
              }
              <br></br>
              {
            arrayCounter.map((val, id) => (
              <div
                className="arrayCounter"
                key={id}
                style={{
                  marginTop: "3%",
                  height: `25px`,
                  width:`${barwidthTrans}%`,
                  backgroundColor:`White`,
                  textAlign:`center`,
                  verticalAlign:`bottom`,
                  fontWeight: `bold`,
                  color:`black`,
                  marginLeft:`${(id===0)?((100-this.state.arrayCounter.length*barwidthTrans)/2):(null)}%`,
                }}>{this.state.arrayCounter[id]}</div>
              ))
          }
          </div>
        </div>
        <div className="buttons_back">
          <button className="buttons" onClick={this.state.isAnimationOn?
          this.getRefreshArray:null}>Generate Random Array</button>
          <button className="buttons" onClick={this.state.isAnimationOn?
          this.getUpdatedArray:null}>Delete Last Number</button>
          <button className="buttons" onClick={this.state.isAnimationOn?
          this.addToArray:null}>Add Number to Array</button>
          <button className="buttons" onClick={this.state.isAnimationOn?
          this.deleteArray:null}>Delete Array</button>
          <button className="playbutton" onClick={this.state.isAnimationOn?
          ((this.state.flag===0)?this.countingsort:this.prevStateSorting):null}>Start Counting Sorting</button>
          <a href="/divideandconquer">
            <button className="playbutton" style={{width:`${12.5}%`,marginLeft:`${25}%`}}>Back</button>
          </a>
        </div>
      </div>
    );
  }
}

function getRandomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
