import React from 'react'
import ReactDOM, { render } from 'react-dom';

function doRandomQuick(props){
  const array=[];
  let funcalled=0;
  if(props.length<=1){
    return props;
  }else{
  const auxiliaryArray = props.slice();
  funcalled=randomQuickSort(0, props.length - 1, auxiliaryArray, array, funcalled);

  return array;
  }
}

function randomQuickSort(low, high, auxiliaryArray, array, funcalled){
  if(low<high){
    funcalled=funcalled+1;
    const q = randomPartition(low, high,auxiliaryArray,array,funcalled);
    funcalled=randomQuickSort(low, q-1, auxiliaryArray, array, funcalled);

    funcalled=randomQuickSort(q+1, high, auxiliaryArray, array,funcalled);

  }
  return funcalled;
}

function randomPartition(low, high,auxiliaryArray,array,funcalled){
  let temp=0;
  const i = getRandomInt(low,high);
  array.push([i, high, funcalled,high]);
  array.push([i, high, funcalled,high]);
  array.push([i, high, funcalled,high]);
  temp=auxiliaryArray[i];
  auxiliaryArray[i]=auxiliaryArray[high];
  auxiliaryArray[high]=temp;
  return partition(low, high,auxiliaryArray,array,funcalled);
}

function partition(low,high,auxiliaryArray,array,funcalled){

  let pivot = auxiliaryArray[high];
  let i = (low-1);
  let temp=0;

  for(let j=low; j<=high-1; j++){
    if(auxiliaryArray[j]<=pivot){
       i++;
       array.push([i, j, funcalled,high]);
       array.push([i, j, funcalled,high]);
       array.push([auxiliaryArray[j], auxiliaryArray[i], funcalled]);
       temp=auxiliaryArray[i];
       auxiliaryArray[i]=auxiliaryArray[j];
       auxiliaryArray[j]=temp;
    }
    else{
      array.push([j, j, funcalled,high]);
      array.push([j, j, funcalled,high]);
      array.push([auxiliaryArray[j], 'else', funcalled]);
    }
  }
  array.push([i+1, high, funcalled,high]);
  array.push([i+1, high, funcalled,high]);
  array.push([auxiliaryArray[high], auxiliaryArray[i+1], funcalled]);
  temp=auxiliaryArray[i+1];
  auxiliaryArray[i+1]=auxiliaryArray[high];
  auxiliaryArray[high]=temp;

  return (i+1);
}
export default doRandomQuick;

function getRandomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}