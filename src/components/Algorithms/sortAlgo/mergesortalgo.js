import React from 'react'
import ReactDOM, { render } from 'react-dom';

function doMerge(props){
  const array=[];
  let funcalled=0;
  if(props.length<=1){
    return props;
  }else{
  const auxiliaryArray = props.slice(); 
  funcalled=mergeSort(props, 0, props.length - 1, auxiliaryArray, array, funcalled);
  return array;
  }
}

function mergeSort(sortArray, leftIndex, rightIndex, auxiliaryArray, array, funcalled){
  if(rightIndex>leftIndex){
    const middleIndex = Math.floor((leftIndex + rightIndex)/2);
    funcalled=mergeSort(auxiliaryArray, leftIndex, middleIndex, sortArray, array, funcalled);

    funcalled=mergeSort(auxiliaryArray, middleIndex + 1, rightIndex, sortArray, array,funcalled);

    funcalled=funcalled+1;
    merge(sortArray, leftIndex, middleIndex, rightIndex, auxiliaryArray, array, funcalled);
  }
  return funcalled;
}
function merge(sortArray,leftIndex,middleIndex,rightIndex,auxiliaryArray,array,funcalled){
  let k = leftIndex;
  let i = leftIndex;
  let j = middleIndex + 1;


  while (i <= middleIndex && j <= rightIndex) {
    array.push([i, j, funcalled]);
    array.push([i, j, funcalled]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      array.push([k, auxiliaryArray[i], funcalled]);
      sortArray[k++] = auxiliaryArray[i++];
    } else {
      array.push([k, auxiliaryArray[j], funcalled]);
      sortArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIndex) {
    array.push([i, i, funcalled]);
    array.push([i, i, funcalled]);
    array.push([k, auxiliaryArray[i], funcalled]);
    sortArray[k++] = auxiliaryArray[i++];
  }
  while (j <= rightIndex) {
    array.push([j, j, funcalled]);
    array.push([j, j, funcalled]);
    array.push([k, auxiliaryArray[j], funcalled]);
    sortArray[k++] = auxiliaryArray[j++];
  }
}
export default doMerge;