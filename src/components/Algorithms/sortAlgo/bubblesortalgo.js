import React from 'react'
import ReactDOM, { render } from 'react-dom';

function doBubble(props){
  const array=[];
  if(props.length<=1){
    return props;
  }else{
  const auxiliaryArray = props.slice();
  bubbleSort(auxiliaryArray, array);
  return array;
  }
}

function bubbleSort(auxiliaryArray, array){
  let i=0;
  let j=0;
  let temp=0;
  for(j=1; j<auxiliaryArray.length; j++){
    for(i=0; i<auxiliaryArray.length-1; i++){
      if(auxiliaryArray[i]>auxiliaryArray[i+1]){
        array.push([i,i+1]);
        array.push([i,i+1]);
        array.push([auxiliaryArray[i+1],auxiliaryArray[i]]);
        temp=auxiliaryArray[i];
        auxiliaryArray[i]=auxiliaryArray[i+1];
        auxiliaryArray[i+1]=temp;
      }else{
        array.push([i,i+1]);
        array.push([i,i+1]);
        array.push([auxiliaryArray[i],auxiliaryArray[i+1]]);
      }
    }
  }
}

export default doBubble;