import React from 'react'
import ReactDOM, { render } from 'react-dom';
import './sortui2.css';
import doRandomQuick from './randomquicksortalgo.js'; 



const ANIMATION_SPEED_MS = 800;


const PRIMARY_COLOR = 'white';


const SECONDARY_COLOR = 'red';


export default class RQuickSort extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      arrayTrans: [],
      mLeftarray : 0,
      mLeftarrayTrans :0,
      ANIMATION_SPEED_MS : 800,
      flag:false,
    };

    this.getRandomArray = this.getRandomArray.bind(this);
    this.getUpdatedArray = this.getUpdatedArray.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.deleteArray = this.deleteArray.bind(this);
    this.randomQuicksort = this.randomQuicksort.bind(this);
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
    this.setState({arrayTrans:array});
  }

  getUpdatedArray(){
    const array = this.state.array.slice();
    array.splice(array.length-1);
    this.setState({array:array});
    this.setState({arrayTrans:array});
  }

  addToArray(){
    const array = this.state.array.slice();
    const Num = Number(prompt('Enter a Number'));
    array.push(Num);
    this.setState({array:array});
    this.setState({arrayTrans:array});
  }

  deleteArray(){
    const array = [];
    this.setState({array:array});
    this.setState({arrayTrans:array});
  }

  


  randomQuicksort(){
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
      barwidth = 100/(this.state.array.length*2+1);
    }else{
      barwidth = 100/(11);
    }
    let mLeftarray=(100-this.state.array.length*barwidth)/2;
    this.setState({mLeftarray:mLeftarray});
    const sortarray=doRandomQuick(this.state.array);
    const arrayBars = document.getElementsByClassName('array');
    const arrayTransBars = document.getElementsByClassName('arrayTrans');
    const barColor = document.getElementsByClassName('buttons_back');
     
  
    for (let i = 0; i < sortarray.length; i++) {
      let prevI = 0;
      const [,,currCall,]=sortarray[i];
      let prevCall=0;
      if((i-1) > 0){
        [,,prevCall,]=sortarray[i-1];
      }
      {console.log('I ',i)}
      if(currCall!==prevCall){
        
        for(let x=i; x<i+3; x++){
            if(x % 3 == 0){
              setTimeout(() => {
                
                const [barOneIdx, barTwoIdx,,] = sortarray[x];
                {console.log('random I',barOneIdx)}
                {console.log('High',barTwoIdx)}
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.backgroundColor = `darkblue`;
                barTwoStyle.backgroundColor = `darkblue`;
                {console.log('random pivot COLOR',barOneStyle.backgroundColor)}
              }, x*ANIMATION_SPEED_MS);
            }
            if(x % 3 == 1){
              setTimeout(() => {
                const array = this.state.array.slice();
                const [barOneIdx, barTwoIdx,,] = sortarray[x];
                {console.log('random I+1',barOneIdx)}
                {console.log('High',barTwoIdx)}
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const barTwoSwap=barOneStyle.height
                barOneStyle.height = `${barTwoStyle.height}`;
                barTwoStyle.height = `${barTwoSwap}`;
                temp=array[barOneIdx];
                array[barOneIdx]=array[barTwoIdx];
                array[barTwoIdx]=temp;
                this.setState({array:array});
              }, x*ANIMATION_SPEED_MS);
            }
    
            if(x % 3 == 2){
              setTimeout(() => {
                const [barOneIdx, barTwoIdx,,] = sortarray[x];
                {console.log('random I+2',barOneIdx)}
                {console.log('High',barTwoIdx)}
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.backgroundColor = `white`;
                barTwoStyle.backgroundColor = `white`;
              }, x*ANIMATION_SPEED_MS);
            }
        }
        i=i+2;
      }else{
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx,,pivot] = sortarray[i];
          {console.log('In swap1 I:',i)}
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const barPivotStyle = arrayBars[pivot].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            let barTwoIdx=0;
            let nextCalled=0;
            const arrayTrans = this.state.arrayTrans.slice();
            if(i+2<sortarray.length){
              [,barTwoIdx,  nextCalled] = sortarray[i+2];
            }
            const [smallIdx, ,  iCalled] = sortarray[i+1];

            barTwoStyle.backgroundColor = color;
            barPivotStyle.backgroundColor = `lightgreen`;
            
            if(iCalled!==nextCalled){
              const [barOneIdx, barTwoIdx,,pivot] = sortarray[i];
              const [barOneHeight, barTwoHeight,] = sortarray[i+1];
              const barOneStyle = arrayTransBars[barOneIdx].style;
              const barTwoStyle = arrayTransBars[barTwoIdx].style;
              const barPivotStyle = arrayBars[pivot].style;
              const barDivideStyle = arrayBars[barOneIdx].style;
              let mLeftarray = this.state.mLeftarray;

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
          }, i*ANIMATION_SPEED_MS);
          
        }
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
                  fontSize: `small`,
                  boxShadow:`0 0px 0px 0px transparent`,
                  color:`transparent`,
                  marginLeft:`${(id===0)?(mLeftarrayTrans):(null)}%`,
                }}>{this.state.arrayTrans[id]}</div>
              ))
              }
          </div>
          {console.log('array:',array)}
          {console.log('Transarray:',arrayTrans)}
        </div>
        <div className="buttons_back">
          <button className="buttons" onClick={this.getRefreshArray}>Generate Random Array</button>
          <button className="buttons" onClick={this.getUpdatedArray}>Delete Last Number</button>
          <button className="buttons" onClick={this.addToArray}>Add Number to Array</button>
          <button className="buttons" onClick={this.deleteArray}>Delete Array</button>
          <button className="playbutton" onClick={this.randomQuicksort}>Start RandomQuick Sorting</button>
        </div>
      </div>
    );
  }
}

function getRandomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}