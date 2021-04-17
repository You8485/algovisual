import React from 'react'
import ReactDOM, { render } from 'react-dom';
import './sort.css';
import doInsertion from './insertionsortalgo.js';



const ANIMATION_SPEED_MS = 800;


const PRIMARY_COLOR = 'white';


const SECONDARY_COLOR = 'red';


export default class InsertionSort extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      isAnimationOn:true,
      arrayPrev:[],
      flag:0,
      ANIMATION_SPEED_MS:800,
    };

    this.getRandomArray = this.getRandomArray.bind(this);
    this.prevState = this.prevState.bind(this);
    this.prevStateSorting = this.prevStateSorting.bind(this);
    this.getUpdatedArray = this.getUpdatedArray.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.deleteArray = this.deleteArray.bind(this);
    this.insertionsort = this.insertionsort.bind(this);
  }

  componentDidMount() {
    this.getRandomArray(); 
  }

  prevState(){
    if(this.state.flag===1){
      setTimeout(() => {
        const array = this.state.arrayPrev.slice();
        this.setState({array:array});
        this.setState({flag:0});
      }, ANIMATION_SPEED_MS/2); 
    }
  }

  prevStateSorting(){
    setTimeout(() => {
      const array = this.state.arrayPrev.slice();
      this.setState({array:array});
      this.setState({flag:0});
    }, ANIMATION_SPEED_MS/2); 
    setTimeout(() => {
      this.insertionsort();
    }, 2*ANIMATION_SPEED_MS);
  }

  getRefreshArray(){
    window.location.reload();
    this.getRandomArray();
  }

  getRandomArray(){
    const array = [];
    for (let i = 0; i <getRandomInt(5,20); i++) {
      array.push(getRandomInt(5,100));
    }
    this.setState({array:array});
  }

  getUpdatedArray(){
    const i = this.state.flag;
    this.prevState();
    setTimeout(() => {
      const array = this.state.array.slice();
      array.splice(array.length-1);
      this.setState({array:array});
    }, 2*i*ANIMATION_SPEED_MS);
    
  }

  addToArray(){
    const i = this.state.flag;
    this.prevState();
    setTimeout(() => {
      const array = this.state.array.slice();
      const Num = Number(prompt('Enter a Number'));
      array.push(Num);
      this.setState({array:array});
    }, 2*i*ANIMATION_SPEED_MS);
  }

  deleteArray(){
    const array = [];
    this.setState({array:array});
  }

  


  insertionsort(){
    const minNum = Math.min.apply(null,this.state.array);
    const maxNum = Math.max.apply(null,this.state.array);
    let barheight = 0;
    let j=0;
    let barwidth = 0;
    let flag=true;
    let temp=0;
    if (minNum!==maxNum){
      barheight = 530/(maxNum-minNum);
    }else{
      barheight = 540;
    }
    if(this.state.array.length>=6){
      barwidth = 100/(this.state.array.length*2+2);
    }else{
      barwidth = 100/(11);
    }

    const arrayPrev = this.state.array.slice();
    this.setState({arrayPrev:arrayPrev});
    this.setState({flag:1});

    this.setState(state => ({
      isAnimationOn: !state.isAnimationOn
    }));

    const sortarray=doInsertion(this.state.array);
    const arrayBars = document.getElementsByClassName('array');
    
    
    for (let i = 0; i < sortarray.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = sortarray[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = `darkblue`;
          barTwoStyle.marginRight=`${barwidth/2}%`;
          if(barTwoIdx!==0){
            barTwoStyle.marginLeft =`${barwidth/2}%`;
          }
        }, i*ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const array = this.state.array.slice();
          const [barOneIdx, barTwoIdx] = sortarray[i-1];
          const [barOneHeight, barTwoHeight,] = sortarray[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${(minNum!==maxNum)?(((barOneHeight-minNum)*barheight)+15):(barheight)}px`;
          barTwoStyle.height = `${(minNum!==maxNum)?(((barTwoHeight-minNum)*barheight)+15):(barheight)}px`;
          barOneStyle.backgroundColor = `darkblue`;
          barOneStyle.marginRight=`${barwidth/2}%`;
          if(barOneIdx!==0){
            barOneStyle.marginLeft =`${barwidth/2}%`;
          }
          barTwoStyle.backgroundColor = `white`;
          barTwoStyle.marginRight=`1px`;
          if(barTwoIdx!==0){
            barTwoStyle.marginLeft =`1px`;
          }
          if(barOneIdx===barTwoIdx){
            barOneStyle.backgroundColor = `white`;
            barOneStyle.marginRight=`1px`;
            if(barOneIdx!==0){
              barOneStyle.marginLeft =`1px`;
            } 
          }
          if(array[barOneIdx]!==barOneHeight){
            temp=array[barOneIdx];
            array[barOneIdx]=array[barTwoIdx];
            array[barTwoIdx]=temp;
            this.setState({array:array});
          }
          if(i===sortarray.length-1){
            this.setState(state => ({
              isAnimationOn: !state.isAnimationOn
            }));
          }
        }, i*ANIMATION_SPEED_MS);
        
      }
    }
  }

  

    
  render(){
    let array = this.state.array.slice();
    const minNum = Math.min.apply(null,array);
    const maxNum = Math.max.apply(null,array);
    let barheight = 0;
    let barwidth = 0;
    {console.log('Print min value:',minNum)}
    {console.log('Print max value:',maxNum)}
    if (minNum!==maxNum){
      barheight = 530/(maxNum-minNum);
    }else{
      barheight = 540;
    }
    
    if(array.length>=6){
      barwidth = 100/(array.length*2+1);
    }else{
      barwidth = 100/(11);
    }
    
    return(
      <div className="maindiv">
        <div className="animationcanvas">
          <div className="animationcanvas">
          {array.length!==0
          ?array.map((value, idx) => (
            <div
              className="array"
              key={idx}
              style={{
                height: `${(minNum!==maxNum)?(((value-minNum)*barheight)+15):(barheight)}px`,
                width:`${barwidth}%`,
                backgroundColor:`white`,
                textAlign:`center`,
                verticalAlign:`bottom`,
                fontSize: `small`,
                fontWeight: `bold`,
                marginLeft:`${(idx===0)?((100-this.state.array.length*barwidth)/2):(null)}%`,
              }}>{this.state.array[idx]}</div>
            ))
          :<p style={{fontSize:`30px`,height:`265px`, textAlign:`center`,margin:`${0}%`,fontWeight:'bold',position:`relative`}}>Insert Array</p>
          }
          </div>
          {console.log('array:',array)}
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
          ((this.state.flag===0)?this.insertionsort:this.prevStateSorting):null}>Start Insertion Sorting</button>
        </div>
      </div>
    );
  }
}

function getRandomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
