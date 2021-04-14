import React from 'react'
import ReactDOM, { render } from 'react-dom';

function doSelection(props){
  const array=[];
  if(props.length<=1){
    return props;
  }else{
  const auxiliaryArray = props.slice();
  selectionSort(auxiliaryArray, array);
  return array;
  }
}

function selectionSort(auxiliaryArray, array){
  let i=0;
  let j=0;
  let min=0;
  let temp=0;
  for(i=0; i<auxiliaryArray.length-1; i++){
    min = i;
    array.push([min,i,2]);
    array.push([min,i,2]);
    array.push([min,i,2]);
    for(j=i+1; j<auxiliaryArray.length; j++){
      if(auxiliaryArray[j]<auxiliaryArray[min]){
        min = j;
        array.push([min,j,2]);
        array.push([min,j,2]);
        array.push([min,j,2]);
      }
    }
    array.push([min, i, 1]);
    array.push([min, i, 1]);
    array.push([auxiliaryArray[i], auxiliaryArray[min], 1]);
    temp = auxiliaryArray[i];
    auxiliaryArray[i]=auxiliaryArray[min];
    auxiliaryArray[min]=temp;
  }
}

export default doSelection;