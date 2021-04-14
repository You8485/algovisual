import React from 'react'
import ReactDOM, { render } from 'react-dom';

function doCounting(props){
  const array=[];
  if(props.length<=1){
    return props;
  }else{
  const auxiliaryArray = props.slice();
  countingSort(auxiliaryArray, array);
  {console.log('DoCounting Length:',array.length)} 
  return array;
  }
}

function countingSort(auxiliaryArray, array){
  let c=[0,0,0,0,0,0,0,0,0,0];
  for(let i=0; i<auxiliaryArray.length;i++){
    c[auxiliaryArray[i]]=c[auxiliaryArray[i]]+1;
    array.push([i,c[auxiliaryArray[i]],'one']);
    array.push([i,c[auxiliaryArray[i]],'one']);
    array.push([i,c[auxiliaryArray[i]],'one']);
  }
  for(let i=1; i<10; i++){
    c[i]=c[i]+c[i-1];
    array.push([i,c[i],'Two']);
    array.push([i,c[i],'Two']);
    array.push([i,c[i],'Two']);
  }
  for(let i=auxiliaryArray.length-1; i>=0; i--){
    c[auxiliaryArray[i]]=c[auxiliaryArray[i]]-1;
    array.push([i,auxiliaryArray[i],'Three']);
    array.push([i,auxiliaryArray[i],'Three']);
    array.push([i,auxiliaryArray[i],'Three']);
  }
}
 
export default doCounting;