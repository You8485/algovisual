import React from 'react'
import ReactDOM, { render } from 'react-dom';
import './sortui2.css';
import doMerge from './mergesortalgo.js';


const ANIMATION_SPEED_MS = 800;

const PRIMARY_COLOR = 'white';


const SECONDARY_COLOR = 'red';


export default class MergeSort extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      arrayTrans: [],
      mLeftarray : 0,
      mLeftarrayTrans :0,
      ANIMATION_SPEED_MS : 800,
      isAnimationOn:true,
      arrayPrev:[],
      flag:0,
    };

    this.getRandomArray = this.getRandomArray.bind(this);
    this.prevState = this.prevState.bind(this);
    this.prevStateSorting = this.prevStateSorting.bind(this);
    this.getUpdatedArray = this.getUpdatedArray.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.deleteArray = this.deleteArray.bind(this);
    this.divide = this.divide.bind(this);
    this.mergesort = this.mergesort.bind(this);
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
        this.setState({mLeftarray : 0});
      }, ANIMATION_SPEED_MS/2); 
    }
  }

  prevStateSorting(){
    setTimeout(() => {
      const array = this.state.arrayPrev.slice();
      this.setState({array:array});
      this.setState({flag:0});
      this.setState({mLeftarray : 0});
    }, ANIMATION_SPEED_MS/2); 
    setTimeout(() => {
      this.mergesort();
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
    this.setState({arrayTrans:array});
  }

  getUpdatedArray(){
    const i = this.state.flag;
    this.prevState();
    setTimeout(() => {
      const array = this.state.array.slice();
      array.splice(array.length-1);
      this.setState({array:array});
      this.setState({arrayTrans:array});
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
      this.setState({arrayTrans:array});
    }, 2*i*ANIMATION_SPEED_MS);
  }

  deleteArray(){
    const array = [];
    this.setState({array:array});
    this.setState({arrayTrans:array});
  }


  divide(leftIndex, rightIndex,barwidth){ 
    if(leftIndex<rightIndex){
      setTimeout(() => {
        const middleIndex = Math.floor((leftIndex + rightIndex)/2);
        const arrayBars = document.getElementsByClassName('array');
        const middle=arrayBars[middleIndex].style;
        middle.marginRight= `${barwidth}%`;
        let mLeftarray = this.state.mLeftarray-barwidth/1.675;
        this.setState({mLeftarray:mLeftarray}); 
        this.divide(leftIndex,middleIndex,barwidth);
        this.divide(middleIndex+1,rightIndex,barwidth);
      },ANIMATION_SPEED_MS/1.5);
    }
  }

  mergesort(){
    const minNum = Math.min.apply(null,this.state.array);
    const maxNum = Math.max.apply(null,this.state.array);
    let barheight = 0;
    let temparray=this.state.array.slice();
    let j=0;
    let barwidth = 0;
    let flag=true;
    let temp=0;
    temp = temparray.length;
    let barwidthD = 0;
    if (minNum!==maxNum){
      barheight = 265/(maxNum-minNum);
    }else{
      barheight = 270;
    }
    if(this.state.array.length>=6){
      barwidth = 100/(this.state.array.length*2+1);
      barwidthD = 100/(this.state.array.length*2+4);
    }else{
      barwidth = 100/(11);
      barwidthD = 100/(11);
    }

    const arrayPrev = this.state.array.slice();
    this.setState({arrayPrev:arrayPrev});
    this.setState({flag:1});

    this.setState(state => ({
      isAnimationOn: !state.isAnimationOn
    }));

    let mLeftarray=(100-this.state.array.length*barwidth)/2;
    let mLeftarrayFirst=mLeftarray;
    let mLeftarrayDivide=0;
    this.setState({mLeftarray:mLeftarray});
    const sortarray=doMerge(temparray);
    const arrayBars = document.getElementsByClassName('array');
    const arrayTransBars = document.getElementsByClassName('arrayTrans');
    this.divide(0,this.state.array.length-1,barwidthD);
    
    for (let i = 0; i < sortarray.length; i++) {
      const isColorChange = i % 3 !== 2;
      
      if (isColorChange) {
        const [barOneIdx, barTwoIdx,] = sortarray[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          if(i===0){
            mLeftarrayDivide=this.state.mLeftarray;
          }
          let barTwoIdx=0;
          let nextCalled=0;
          const arrayTrans = this.state.arrayTrans.slice();
          if(i+2<sortarray.length){
            [,barTwoIdx,  nextCalled] = sortarray[i+2];
          }
          const [smallIdx, ,  iCalled] = sortarray[i+1];

          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;


          if(iCalled!==nextCalled){
            const [barOneIdx, newHeight,] = sortarray[i+1];
            const barOneStyle = arrayTransBars[barOneIdx].style;
            barOneStyle.height = `${(minNum!==maxNum)?(((newHeight-minNum)*barheight)+15):(barheight)}px`;
            barOneStyle.backgroundColor = `white`;
            barOneStyle.color = `black`;
            barOneStyle.border=`solid`;
            barOneStyle.boxShadow=`0 8px 8px -6px black`;
            arrayTrans[barOneIdx] = newHeight;
          }
          this.setState({arrayTrans:arrayTrans});
        }, (temp+i)*ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          let barTwoIdx=0;
          let nextCalled=0;
          const array = this.state.array.slice();
          const arrayTrans = this.state.arrayTrans.slice();
          if(i+1<sortarray.length){
            [,barTwoIdx,  nextCalled] = sortarray[i+1];
          }
          const [, ,  iCalled] = sortarray[i];
          const [barOneIdx, newHeight,] = sortarray[i];
          const barOneStyle = arrayTransBars[barOneIdx].style;
          barOneStyle.height = `${(minNum!==maxNum)?(((newHeight-minNum)*barheight)+15):(barheight)}px`;
          barOneStyle.backgroundColor = `white`;
          barOneStyle.color = `black`;
          barOneStyle.border=`solid`;
          barOneStyle.boxShadow=`0 8px 8px -6px black`;
          arrayTrans[barOneIdx] = newHeight;
          this.setState({arrayTrans:arrayTrans});
          if(iCalled!==nextCalled){
            while(j!==i+1){
              if(j % 3 === 2){
                const [barOneIdx, newHeight,] = sortarray[j];
                const barOneStyle = arrayTransBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barOneIdx].style;
                let mLeftarray = this.state.mLeftarray;
                //mLeftarray = mLeftarray+barwidthD/3; 
                
                barTwoStyle.height = `${barOneStyle.height}`;
                barTwoStyle.marginRight=`1px`;

                //barTwoStyle.marginLeft=`1px`;
                barOneStyle.backgroundColor = `transparent`;
                barOneStyle.color = `transparent`;
                barOneStyle.border=`0px`;
                barOneStyle.boxShadow=`0 0px 0px 0px transparent`;
                array[barOneIdx] = newHeight;
                if(j===i){
                  barTwoStyle.marginRight=`${barwidthD}%`;
                  mLeftarray = mLeftarray+((mLeftarrayFirst-mLeftarrayDivide)/(this.state.array.length-1));
                  //mLeftarray = mLeftarray-barwidthD/1.675 ;
                 // barTwoStyle.marginLeft=`${barwidth}%`;
                }
                j++;
                this.setState({mLeftarray:mLeftarray});
              }
              else{
                j++;
              }
            }
          }
          if(i===sortarray.length-1){
            this.setState(state => ({
              isAnimationOn: !state.isAnimationOn
            }));
          }
          this.setState({array:array});
        }, (temp+i)*ANIMATION_SPEED_MS);
        
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
    let mLeftarray = 0;
    let mLeftarrayTrans = 0;
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
    
    if(this.state.mLeftarray!==0){
      mLeftarray=this.state.mLeftarray;
      mLeftarrayTrans=(100-this.state.arrayTrans.length*barwidth)/2;
    }
    else{
      mLeftarray=(100-this.state.array.length*barwidth)/2;
      mLeftarrayTrans=(100-this.state.arrayTrans.length*barwidth)/2;
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
                fontWeight: `bold`,
                fontSize: `small`,
                marginLeft:`${(idx===0)?(mLeftarray):(null)}%`,
              }}>{this.state.array[idx]}</div>
            ))
          :<p style={{fontSize:`30px`,height:`265px`, textAlign:`center`,margin:`${0}%`,fontWeight:'bold',position:`relative`}}>Insert Array</p>
          }
          </div>
          <div className="animationcanvas">
           {
           arrayTrans.map((val, id) => (
              <div
                className="arrayTrans"
                key={id}
                style={{
                  height: `${(minNum!==maxNum)?(((val-minNum)*barheight)+15):(barheight)}px`,
                  width:`${barwidth}%`,
                  backgroundColor:`transparent`,
                  textAlign:`center`,
                  verticalAlign:`bottom`,
                  fontWeight: `bold`,
                  color:`transparent`,
                  fontSize: `small`,
                  boxShadow:`0 0px 0px 0px transparent`,
                  marginLeft:`${(id===0)?(mLeftarrayTrans):(null)}%`,
                }}>{this.state.arrayTrans[id]}</div>
              ))
              }
          </div>
          {console.log('array:',array)}
          {console.log('Transarray:',arrayTrans)}
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
          ((this.state.flag===0)?this.mergesort:this.prevStateSorting):null}>Start Merge Sorting</button>
        </div>
      </div>
    );
  }
}

function getRandomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

