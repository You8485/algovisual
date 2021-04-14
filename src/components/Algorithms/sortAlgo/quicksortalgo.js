import React from 'react'
import ReactDOM, { render } from 'react-dom';

function doQuick(props){
  const array=[];
  let funcalled=0;
  if(props.length<=1){
    return props;
  }else{
  const auxiliaryArray = props.slice();
  {console.log('DoQuick:',props)} 
  funcalled=quickSort(0, props.length - 1, auxiliaryArray, array, funcalled);

  {console.log('DoQuick aux:',auxiliaryArray)} 
  {console.log('DoQuick prop:',props)} 
  return array;
  }
}

function quickSort(low, high, auxiliaryArray, array, funcalled){
  if(low<high){
    const pi = partition(low, high,auxiliaryArray,array,funcalled);
    funcalled=funcalled+1;
    funcalled=quickSort(low, pi-1, auxiliaryArray, array, funcalled);

    funcalled=quickSort(pi+1, high, auxiliaryArray, array,funcalled);
  }
  return funcalled;
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
export default doQuick;