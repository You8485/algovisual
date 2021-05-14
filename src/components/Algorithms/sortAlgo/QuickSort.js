import React from 'react'
import ReactDOM, { render } from 'react-dom';
import './sortui2.css';
import doQuick from './quicksortalgo.js';



const ANIMATION_SPEED_MS = 800;


const PRIMARY_COLOR = 'white';


const SECONDARY_COLOR = 'red';


export default class QuickSort extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      arrayTrans: [],
      ANIMATION_SPEED_MS : 800,
      mLeftarray : 0,
      mLeftarrayTrans :0,
      isAnimationOn:true,
      arrayPrev:[],
      mLeftarrayPrev : 0,
      flag:0,
    };

    this.getRandomArray = this.getRandomArray.bind(this);
    this.prevState = this.prevState.bind(this);
    this.prevStateSorting = this.prevStateSorting.bind(this);
    this.getUpdatedArray = this.getUpdatedArray.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.deleteArray = this.deleteArray.bind(this);
    this.quicksort = this.quicksort.bind(this);
  }

  componentDidMount() {
    this.getRandomArray(); 
  }

  prevState(){
    if(this.state.flag===1){
      setTimeout(() => {
        const array = this.state.arrayPrev.slice();
        const mLeftarray = this.state.mLeftarrayPrev;
        this.setState({array:array});
        this.setState({flag:0});
        this.setState({mLeftarray : mLeftarray});
        const arrayBars = document.getElementsByClassName('array');
        for(let j=0; j<arrayBars.length; j++){
          const barStyle = arrayBars[j].style;
          barStyle.backgroundColor = 'white';
          if(j===0){
            barStyle.marginLeft= mLeftarray;
            barStyle.marginRight= `1px`;
          }
          else{
            barStyle.margin= `1px`;
          }
        }
      }, ANIMATION_SPEED_MS/2); 
    }
  }

  prevStateSorting(){
    setTimeout(() => {
      const array = this.state.arrayPrev.slice();
      const mLeftarray = this.state.mLeftarrayPrev;
        this.setState({array:array});
        this.setState({flag:0});
        this.setState({mLeftarray : mLeftarray});
        const arrayBars = document.getElementsByClassName('array');
        for(let j=0; j<arrayBars.length; j++){
          const barStyle = arrayBars[j].style;
          barStyle.backgroundColor = 'white';
          if(j===0){
            barStyle.marginLeft= mLeftarray;
            barStyle.marginRight= `1px`;
          }
          else{
            barStyle.margin= `1px`;
          }
        }
    }, ANIMATION_SPEED_MS/2); 
    setTimeout(() => {
      this.quicksort();
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
      let Num = Number(prompt('Enter a Number'));
      while(isNaN(Num)){
        Num = Number(prompt('Enter a valid Number'));
      }
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

  

  quicksort(){
    const minNum = Math.min.apply(null,this.state.array);
    const maxNum = Math.max.apply(null,this.state.array);
    let barheight = 0;
    let j=0;
    let barwidth = 0;
    let flag=true;
    let temp=0;
    let temparray=this.state.array.slice();
    if (minNum!==maxNum){
      barheight = 265/(maxNum-minNum);
    }else{
      barheight = 270;
    }
    if(this.state.array.length>=6){
      barwidth = 100/(this.state.array.length*2+1);
    }else{
      barwidth = 100/(11);
    }

    const arrayPrev = this.state.array.slice();
    this.setState({arrayPrev:arrayPrev});
    this.setState({flag:1});

    this.setState(state => ({
      isAnimationOn: !state.isAnimationOn
    }));

    let mLeftarray=(100-this.state.array.length*barwidth)/2;
    this.setState({mLeftarray:mLeftarray});
    this.setState({mLeftarrayPrev:mLeftarray});
    const sortarray=doQuick(temparray);
    const arrayBars = document.getElementsByClassName('array');
    const arrayTransBars = document.getElementsByClassName('arrayTrans');
     
    for (let i = 0; i < sortarray.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx,,pivot] = sortarray[i];
        {console.log('Pivot',pivot)}
        {console.log('In swap1 I:',i)}
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const barPivotStyle = arrayBars[pivot].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          let barTwoIdx=0;
          let nextCalled=0;
          if(i+2<sortarray.length){
            [,barTwoIdx,  nextCalled] = sortarray[i+2];
          }
          const [smallIdx, ,  iCalled] = sortarray[i+1];
        
          barTwoStyle.backgroundColor = color;
          barPivotStyle.backgroundColor = `lightgreen`;
          
          if(iCalled!==nextCalled){
            const arrayTrans = this.state.arrayTrans.slice();
            const [barOneIdx, barTwoIdx,,pivot] = sortarray[i];
            const [barOneHeight, barTwoHeight,] = sortarray[i+1];
            const barOneStyle = arrayTransBars[barOneIdx].style;
            const barTwoStyle = arrayTransBars[barTwoIdx].style;
            const barPivotStyle = arrayBars[pivot].style;
            const barDivideStyle = arrayBars[barOneIdx].style;
            let mLeftarray = this.state.mLeftarray;
            {console.log('In left margin:',mLeftarray)}
            barOneStyle.height = `${(minNum!==maxNum)?(((barOneHeight-minNum)*barheight)+15):(barheight)}px`;
            barOneStyle.backgroundColor = `white`;
            barOneStyle.color = `black`;
            barPivotStyle.backgroundColor = `white`;
            barDivideStyle.backgroundColor = `green`;
            barDivideStyle.marginRight=`${barwidth/2}%`;
            barDivideStyle.marginLeft =`${barwidth/2}%`;
            mLeftarray = mLeftarray-(barwidth/2) ; 
            barOneStyle.border=`solid`;
            barOneStyle.boxShadow=`0 8px 8px -6px black`;

            barTwoStyle.height = `${(minNum!==maxNum)?(((barTwoHeight-minNum)*barheight)+15):(barheight)}px`;
            barTwoStyle.backgroundColor = `white`;
            barTwoStyle.color = `black`;
            barTwoStyle.border=`solid`;
            barTwoStyle.boxShadow=`0 8px 8px -6px black`;
            
            arrayTrans[barOneIdx]=barOneHeight;
            arrayTrans[barTwoIdx]=barTwoHeight;
            this.setState({mLeftarray:mLeftarray});
            this.setState({arrayTrans:arrayTrans});
          }
        }, i*ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          let nextCalled=0;
          const array = this.state.array.slice();
          const arrayTrans = this.state.arrayTrans.slice();
          if(i+1<sortarray.length){
            [, ,  nextCalled] = sortarray[i+1];
          }
          const [, ,  iCalled] = sortarray[i];
          const [barOneIdx, barTwoIdx,] = sortarray[i-1];
          const [barOneHeight, barTwoHeight,] = sortarray[i];
          let barOneStyle;
          let barTwoStyle;
          let barColor;
          if(barTwoHeight==='else'){
            barOneStyle = arrayTransBars[barOneIdx].style;
            barTwoStyle = arrayTransBars[barOneIdx].style;
            barColor='red';
            barTwoStyle.height = `${(minNum!==maxNum)?(((barOneHeight-minNum)*barheight)+15):(barheight)}px`;
            arrayTrans[barTwoIdx]=barOneHeight;
          }
          else{
            barOneStyle = arrayTransBars[barOneIdx].style;
            barTwoStyle = arrayTransBars[barTwoIdx].style;
            barColor='white';
            barTwoStyle.backgroundColor = 'red';
            barTwoStyle.height = `${(minNum!==maxNum)?(((barTwoHeight-minNum)*barheight)+15):(barheight)}px`;
            arrayTrans[barTwoIdx]=barTwoHeight;
          }
          
          barOneStyle.height = `${(minNum!==maxNum)?(((barOneHeight-minNum)*barheight)+15):(barheight)}px`;
          barOneStyle.backgroundColor = barColor;
          barOneStyle.color = `black`;
          barOneStyle.border=`solid`;
          barOneStyle.boxShadow=`0 8px 8px -6px black`;

          barTwoStyle.color = `black`;
          barTwoStyle.border=`solid`;
          barTwoStyle.boxShadow=`0 8px 8px -6px black`;
          arrayTrans[barOneIdx]=barOneHeight;
          this.setState({arrayTrans:arrayTrans});
          
          if(iCalled!==nextCalled){
            const array = this.state.array.slice();
            const arrayTrans = this.state.arrayTrans.slice();

            while(j!==i+1){
              if(j % 3 === 2){
                const [barOneIdx, barTwoIdx,] = sortarray[j-1];
                const [barOneHeight, barTwoHeight,] = sortarray[j];
                const barOneTStyle = arrayTransBars[barOneIdx].style;
                const barTwoTStyle = arrayTransBars[barTwoIdx].style;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.height = `${barOneTStyle.height}`;
                barTwoStyle.height = `${barTwoTStyle.height}`;
                array[barOneIdx]=arrayTrans[barOneIdx];
                array[barTwoIdx]=arrayTrans[barTwoIdx];
                
                barOneTStyle.backgroundColor = `transparent`;
                barOneTStyle.color = `transparent`;
                barOneTStyle.border=`0px`;
                barOneTStyle.boxShadow=`0 0px 0px 0px transparent`;

                barTwoTStyle.backgroundColor = `transparent`;
                barTwoTStyle.color = `transparent`;
                barTwoTStyle.border=`0px`;
                barTwoTStyle.boxShadow=`0 0px 0px 0px transparent`;
                j++;
              }
              else{
                j++;
              }
            }
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
    let arrayTrans = array.slice();
    let mLeftarray = 0;
    let mLeftarrayTrans = 0;
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
          ((this.state.flag===0)?this.quicksort:this.prevStateSorting):null}>Start Quick Sorting</button>
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
