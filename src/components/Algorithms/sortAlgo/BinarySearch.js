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
      isAnimationOn:true,
      status:'Search A Number',
      flag:0,
      ANIMATION_SPEED_MS : 800,
    };

    this.getRandomArray = this.getRandomArray.bind(this);
    this.prevState = this.prevState.bind(this);
    this.prevStateSearching = this.prevStateSearching.bind(this);
    this.getUpdatedArray = this.getUpdatedArray.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.deleteArray = this.deleteArray.bind(this);
    this.binarysearch=this.binarysearch.bind(this);
  }

  componentDidMount() {
    this.getRandomArray(); 
  }

  prevState(){
    if(this.state.flag===1){
      setTimeout(() => {
        const arrayBars = document.getElementsByClassName('array');
        for(let j=0; j<arrayBars.length; j++){
          const barStyle = arrayBars[j].style;
          barStyle.backgroundColor = 'white';
        }
        this.setState({status:'Search A Number'});
        this.setState({flag:0});
      }, ANIMATION_SPEED_MS/2); 
    }
  }

  prevStateSearching(){
    setTimeout(() => {
      const arrayBars = document.getElementsByClassName('array');
        for(let j=0; j<arrayBars.length; j++){
          const barStyle = arrayBars[j].style;
          barStyle.backgroundColor = 'white';
        }
        this.setState({status:'Search A Number'});
        this.setState({flag:0});
    }, ANIMATION_SPEED_MS/2); 
    setTimeout(() => {
      this.binarysearch();
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
    array.sort(function(a, b){return a - b});
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
      let Num = Number(prompt('Enter a Number'));
      if(array.length>0){
        while(Num<array[array.length-1]||isNaN(Num)){
          Num = Number(prompt('Enter a Number larger or equal to last one !!'));
        }
      }
      array.push(Num);
      this.setState({array:array});
    }, 2*i*ANIMATION_SPEED_MS);
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

    this.setState({flag:1});
    this.setState(state => ({
      isAnimationOn: !state.isAnimationOn
    }));

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
    let key = Number(prompt('Enter a Number you want to find'));
    while(isNaN(key)){
      key = Number(prompt('Enter a valid Number'));
    }
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
          <button className="buttons" onClick={this.state.isAnimationOn?
          this.getRefreshArray:null}>Generate Random Array</button>
          <button className="buttons" onClick={this.state.isAnimationOn?
          this.getUpdatedArray:null}>Delete Last Number</button>
          <button className="buttons" onClick={this.state.isAnimationOn?
          this.addToArray:null}>Add Number to Array</button>
          <button className="buttons" onClick={this.state.isAnimationOn?
          this.deleteArray:null}>Delete Array</button>
          <button className="playbutton" onClick={this.state.isAnimationOn?
          ((this.state.flag===0)?this.binarysearch:this.prevStateSearching):null}>Search a Number</button>
          <a href="/branchandbound">
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


