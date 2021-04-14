import React from 'react'
import ReactDOM, { render } from 'react-dom';
import './sort.css';
import doBinarySearch from './binarysearchalgo.js';



const ANIMATION_SPEED_MS = 800;


const PRIMARY_COLOR = 'white';


const SECONDARY_COLOR = 'darkblue';



export default class BinarySearch extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      status:'Search A Number',
      ANIMATION_SPEED_MS : 800,
    };

    this.getRandomArray = this.getRandomArray.bind(this);
    this.getUpdatedArray = this.getUpdatedArray.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.deleteArray = this.deleteArray.bind(this);
    this.binarysearch=this.binarysearch.bind(this);
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
    array.sort(function(a, b){return a - b});
    this.setState({array:array});
  }

  getUpdatedArray(){
    const array = this.state.array.slice();
    array.splice(array.length-1);
    this.setState({array:array});
  }

  addToArray(){
    const array = this.state.array.slice();
    let Num = Number(prompt('Enter a Number'));
    if(array.length>0){
      while(Num<array[array.length-1]){
        Num = Number(prompt('Enter a Number larger or equal to last one !!'));
      }
    }
    array.push(Num);
    this.setState({array:array});
  }

  deleteArray(){
    const array = [];
    this.setState({array:array});
  }



  binarysearch(){
    const minNum = Math.min.apply(null,this.state.array);
    const maxNum = Math.max.apply(null,this.state.array);
    let barheight = 0;
    let j=0;
    let barwidth = 0;
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
    const key = Number(prompt('Enter a Number you want to find'));
    {console.log('In binarysearch')}
    const sortarray=doBinarySearch(this.state.array,key);
    {console.log('In Out binarysearch')}
    {console.log('Length',sortarray.length)}
    const arrayBars = document.getElementsByClassName('array');
    
    for (let i = 0; i < sortarray.length; i++) {
      const isColorChange = i % 3 !== 2;
      {console.log('In for')}
      if (isColorChange) {
        const [barOneIdx, ,barcolor] = sortarray[i];
        {console.log('Here:',i)}
        const barOneStyle = arrayBars[barOneIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : barcolor;
        setTimeout(() => {

          barOneStyle.backgroundColor = color;

        }, i*ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          if(i===sortarray.length-1){
            const [barOneIdx, ,barflag] = sortarray[i];
            if(barflag==='green'){
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.backgroundColor = barflag;
                this.setState({status:`Number Found at Potision ${(barOneIdx + 1)}!`});
            } 
            else{
                const [barOneIdx, ,] = sortarray[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.backgroundColor = 'transparent';
                this.setState({status:`Number Not Found!`});
            }
          }
          else{
            const [barOneIdx, ,barHideLow,barHideHigh,color] = sortarray[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.backgroundColor = color;
            for(let j=barHideLow; j<barHideHigh+1; j++){
                const barOneStyle = arrayBars[j].style;
                barOneStyle.backgroundColor = 'transparent';
            }
          }
         
        }, i*ANIMATION_SPEED_MS);
        
      }
    }
  }



  

  render(){
    let array = this.state.array.slice();
    let arrayTrans = array.slice();
    const minNum = Math.min.apply(null,array);
    const maxNum = Math.max.apply(null,array);
    let barheight = 0;
    let barwidth = 0;
    {console.log('Print min value:',minNum)}
    {console.log('Print max value:',maxNum)}
    if (minNum!==maxNum){
      barheight = 265/(maxNum-minNum);
    }else{
      barheight = 270;
    }
    
    if(array.length>=6){
      barwidth = 100/(array.length*2+1);
    }else{
      barwidth = 100/(11);
    }
    
    return(
      <div className="maindiv">
        <div className="animationcanvas">
          <div className="animationcanvas" style={{minHeight: `275px`}}>
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
              }}>{array[idx]}</div>
            ))
          :<p style={{fontSize:`30px`,height:`265px`, textAlign:`center`,margin:`${0}%`,fontWeight:'bold',position:`relative`}}>Insert Array</p>
          }
          </div>
          <div className="animationcanvas" style={{minHeight: `${100}%`}}>
           {
           <p className="status" style={{fontSize:`30px`,textAlign:`center`,fontWeight:'bold',position:`relative`}}>{array.length!==0?this.state.status:''}</p>
            }
          </div>
          {console.log('array:',array)}
          {console.log('Transarray:',arrayTrans)}
        </div>
        <div className="buttons_back" style={{marginTop:`${0}%`}}>
          <button className="buttons" onClick={this.getRefreshArray}>Generate Random Array</button>
          <button className="buttons" onClick={this.getUpdatedArray}>Delete Last Number</button>
          <button className="buttons" onClick={this.addToArray}>Add Number to Array</button>
          <button className="buttons" onClick={this.deleteArray}>Delete Array</button>
          <button className="playbutton" onClick={this.binarysearch}>Search a Number</button>
        </div>
      </div>
    );
  }
}

function getRandomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}


