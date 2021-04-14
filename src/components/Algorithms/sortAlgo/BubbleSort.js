import React from 'react'
import ReactDOM, { render } from 'react-dom';
import './sort.css';
import doBubble from './bubblesortalgo.js';



const ANIMATION_SPEED_MS = 800;

const PRIMARY_COLOR = 'white';

const SECONDARY_COLOR = 'red';


export default class BubbleSort extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      ANIMATION_SPEED_MS:800,
    };

    this.getRandomArray = this.getRandomArray.bind(this);
    this.getUpdatedArray = this.getUpdatedArray.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.deleteArray = this.deleteArray.bind(this);
    this.bubblesort = this.bubblesort.bind(this);
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
    for (let i = 0; i <getRandomInt(5,20); i++) {
      array.push(getRandomInt(5,100));
    }
    this.setState({array:array});
  }

  getUpdatedArray(){
    const array = this.state.array.slice();
    array.splice(array.length-1);
    this.setState({array:array});
  }

  addToArray(){
    const array = this.state.array.slice();
    const Num = Number(prompt('Enter a Number'));
    array.push(Num);
    this.setState({array:array});
  }

  deleteArray(){
    const array = [];
    this.setState({array:array});
  }

  bubblesort(){
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
    const sortarray=doBubble(this.state.array);
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
          barTwoStyle.backgroundColor = color;
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
          if(array[barOneIdx]!==barOneHeight){
            temp=array[barOneIdx];
            array[barOneIdx]=array[barTwoIdx];
            array[barTwoIdx]=temp;
            this.setState({array:array});
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
      <div className="maindiv" style={{alignContent:`center`}}>
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
                marginLeft:`${(idx===0)?((100-this.state.array.length*barwidth)/2):(null)}%`
              }}>{this.state.array[idx]}</div>
            ))
          :<p style={{fontSize:`30px`,height:`265px`, textAlign:`center`,margin:`${0}%`,fontWeight:'bold',position:`relative`}}>Insert Array</p>
          }
          </div>
          {console.log('array:',array)}
        </div>
        <div className="buttons_back">
          <button className="buttons" onClick={this.getRefreshArray}>Generate Random Array</button>
          <button className="buttons" onClick={this.getUpdatedArray}>Delete Last Number</button>
          <button className="buttons" onClick={this.addToArray}>Add Number to Array</button>
          <button className="buttons" onClick={this.deleteArray}>Delete Array</button>
          <button className="playbutton" onClick={this.bubblesort}>Start Bubble Sorting</button>
        </div>
      </div>
    );
  }
}

function getRandomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
