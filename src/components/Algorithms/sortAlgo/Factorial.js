import React from 'react'
import ReactDOM, { render } from 'react-dom';
import './sortui2.css';



const ANIMATION_SPEED_MS = 800;


const PRIMARY_COLOR = 'white';


const SECONDARY_COLOR = 'red';


export default class Factorial extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      array: [0,1,2,3,4,5,6,7,8,9,10],
      arrayPrev:['-','-','-','-','-','-','-','-','-','-','-'],
      ANIMATION_SPEED_MS : 800,
      isAnimationOn:true,
      arrayPrevstate:[],
      flag:0,
    };

  
    this.prevStatefactorial = this.prevStatefactorial.bind(this);
    this.factorial = this.factorial.bind(this);
    
  }

  componentDidMount() {
    //window.location.reload();
  }


  prevStatefactorial(){
    setTimeout(() => {
        this.setState({array:[0,1,2,3,4,5,6,7,8,9,10]});
        this.setState({arrayPrev:['-','-','-','-','-','-','-','-','-','-','-']});
        this.setState({flag:0});
    }, ANIMATION_SPEED_MS/2); 
    setTimeout(() => {
      this.factorial();
    }, 2*ANIMATION_SPEED_MS);
  }
 
  getRefreshArray(){
    window.location.reload();
  }


  factorial(){
    const minNum = Math.min.apply(null,this.state.array);
    const maxNum = Math.max.apply(null,this.state.array);
    let barwidth = 0;
    if(this.state.array.length>=6){
      barwidth = 100/(this.state.array.length*2+2);
    }else{
      barwidth = 100/(11);
    }

    this.setState({flag:1});

    this.setState(state => ({
      isAnimationOn: !state.isAnimationOn
    }));
    const arrayBars = document.getElementsByClassName('array');
    const arrayUnsorted = document.getElementsByClassName('arrayUnsorted');
    let temp=this.state.array.length;
    temp=temp-1;
    for(let i=0; i<60; i++){
      if(i<30){
        if(i%3===0){
          setTimeout(() => {
            let array = this.state.array.slice();
            const arrayLineOne = arrayBars[temp].style;
            const arrayLineTwo = arrayUnsorted[temp].style;
            arrayLineOne.backgroundColor='green';
            arrayLineTwo.backgroundColor='green';
            array[temp]= temp+'!';
            this.setState({array:array});
            temp=temp-1;
          }, (i)*ANIMATION_SPEED_MS);
        }
        else if(i%3===1){
          setTimeout(() => {
            let array = this.state.array.slice();
            let arrayPrev = this.state.arrayPrev.slice();
            const arrayLineOne = arrayBars[temp].style;
            const arrayLineTwo = arrayUnsorted[temp].style;
            const arrayLineOneP = arrayBars[temp+1].style;
            const arrayLineTwoP = arrayUnsorted[temp+1].style;
            arrayLineOne.backgroundColor='green';
            arrayLineTwo.backgroundColor='green';
            arrayLineOneP.backgroundColor='white';
            arrayLineTwoP.backgroundColor='white';
            array[temp]= temp+'!';
            array[temp+1]= temp+1;
            arrayPrev[temp+1]=temp+1;
            this.setState({array:array});
            this.setState({arrayPrev:arrayPrev});
          }, (i)*ANIMATION_SPEED_MS);
        }
        else{
          setTimeout(() => {
            let arrayPrev = this.state.arrayPrev.slice();
            const arrayLineOne = arrayBars[temp].style;
            const arrayLineTwo = arrayUnsorted[temp].style;
            arrayLineOne.backgroundColor='white';
            arrayLineTwo.backgroundColor='white';
            if(temp===0){
              arrayPrev[temp]=1;
            }
            this.setState({arrayPrev:arrayPrev});
          }, (i)*ANIMATION_SPEED_MS);
        }
      }
      else{
        if(i%3===0){
          setTimeout(() => {
            {console.log('In else',temp,i)}
            const arrayLineOne = arrayBars[temp].style;
            const arrayLineTwo = arrayUnsorted[temp].style;
            arrayLineOne.backgroundColor='green';
            arrayLineTwo.backgroundColor='green';
            temp=temp+1;
          }, (i)*ANIMATION_SPEED_MS);
        }
        else if(i%3===1){
          setTimeout(() => {
            {console.log('In else',temp,i)}
            let array = this.state.array.slice();
            let arrayPrev = this.state.arrayPrev.slice();
            const arrayLineOne = arrayBars[temp].style;
            const arrayLineTwo = arrayUnsorted[temp].style;
            arrayLineOne.backgroundColor='green';
            arrayLineTwo.backgroundColor='green';
            array[temp]=array[temp]+'!';
            arrayPrev[temp]=temp*arrayPrev[temp-1];
            this.setState({array:array});
            this.setState({arrayPrev:arrayPrev});
          }, (i)*ANIMATION_SPEED_MS);
        }
        else{
          setTimeout(() => {
            const arrayLineOne = arrayBars[temp].style;
            const arrayLineTwo = arrayUnsorted[temp].style;
            const arrayLineOneP = arrayBars[temp-1].style;
            const arrayLineTwoP = arrayUnsorted[temp-1].style;
            arrayLineOne.backgroundColor='white';
            arrayLineTwo.backgroundColor='white';
            arrayLineOneP.backgroundColor='white';
            arrayLineTwoP.backgroundColor='white';
            if(i===59){
              this.setState(state => ({
                isAnimationOn: !state.isAnimationOn
              }));
            }
          }, (i)*ANIMATION_SPEED_MS);
        }
      }
    }
  }


  render(){
    let array = this.state.array.slice();
    let arrayPrev = this.state.arrayPrev.slice();
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
        <div className="animationcanvas" style={{minHeight:`${100}%`}}>
          <div className="animationcanvas"style={{height:`${100}%`}}>
          {array.length!==0
          ?<div>
          {array.map((value, idx) => (
            <div
              className="array"
              key={idx}
              style={{
                marginTop: "17%",
                  height: `25px`,
                  width:`${barwidth}%`,
                  backgroundColor:`White`,
                  textAlign:`center`,
                  verticalAlign:`bottom`,
                  fontWeight: `bold`,
                  color:`black`,
                  marginLeft:`${(idx===0)?((100-this.state.array.length*barwidth)/2):(null)}%`
              }}>{this.state.array[idx]}</div>
            ))}
            <br></br>
            {arrayPrev.map((val, id) => (
              <div
                className="arrayUnsorted"
                key={id}
                style={{
                  marginBottom: "17%",
                  marginTop: "3%",
                  height: `25px`,
                  width:`${barwidth}%`,
                  backgroundColor:`White`,
                  textAlign:`center`,
                  verticalAlign:`bottom`,
                  fontWeight: `bold`,
                  color:`black`,
                  marginLeft:`${(id===0)?((100-this.state.arrayPrev.length*barwidth)/2):(null)}%`
                }}>{this.state.arrayPrev[id]}</div>
              ))
              }
            </div> 
          :<p style={{fontSize:`30px`,height:`265px`, textAlign:`center`,margin:`${0}%`,fontWeight:'bold',position:`relative`}}>Insert Array</p>
          }
          </div>
        </div>
        <div className="buttons_back">
          <button className="playbutton" onClick={this.state.isAnimationOn?
          ((this.state.flag===0)?this.factorial:this.prevStatefactorial):null}>Start Factorial Recursion</button>
          <a href="/recursion">
            <button className="playbutton" style={{width:`${25}%`,}}>Back</button>
          </a>
        </div>
      </div>
    );
  }
}
