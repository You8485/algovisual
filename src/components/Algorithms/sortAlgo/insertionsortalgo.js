import React from 'react'
import ReactDOM, { render } from 'react-dom';

function doInsertion(props){
  const array=[];
  if(props.length<=1){
    return props;
  }else{
  const auxiliaryArray = props.slice();
  insertionSort(auxiliaryArray, array); 
  return array;
  }
}

function insertionSort(auxiliaryArray, array){
  let i=0;
  let j=0;
  let key=0;
  let temp=0;
  for(j=1; j<auxiliaryArray.length; j++){
    key=auxiliaryArray[j];
    i=j-1;
    while((i>-1) && (auxiliaryArray[i]>key) ){
      array.push([i,i+1]);
      array.push([i,i+1]);
      array.push([auxiliaryArray[i+1],auxiliaryArray[i]]);
      temp=auxiliaryArray[i+1];
      auxiliaryArray[i+1]=auxiliaryArray[i];
      auxiliaryArray[i]=temp;
      i=i-1;
    }
    array.push([i+1,i+1]);
    array.push([i+1,i+1]);
    array.push([key,key]);
  }
}

export default doInsertion;