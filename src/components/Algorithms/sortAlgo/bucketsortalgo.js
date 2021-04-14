import React from 'react'
import ReactDOM, { render } from 'react-dom';

function doBucket(props){
  const array=[];
  if(props.length<=1){
    return props;
  }else{
  const auxiliaryArray = props.slice();
  bucketSort(auxiliaryArray, array);
  {console.log('DoCounting Length:',array.length)} 
  return array;
  }
}

function bucketSort(auxiliaryArray, array){
  let c=[[],[],[],[],[],[],[],[],[],[]];
  let idx=0;
  for(let i=0; i<auxiliaryArray.length;i++){
    c[Math.floor(auxiliaryArray.length*auxiliaryArray[i])].push(auxiliaryArray[i]); 
    array.push([i,Math.floor(auxiliaryArray.length*auxiliaryArray[i]),'one']);
    array.push([i,Math.floor(auxiliaryArray.length*auxiliaryArray[i]),'one']);
    array.push([i,Math.floor(auxiliaryArray.length*auxiliaryArray[i]),'one']);
  }
  for(let i=0; i<auxiliaryArray.length; i++){
    if(c[i].length>0){
      c[i].sort(function(a, b){return a - b});
      array.push([i,c[i],'Two']);
      array.push([i,c[i],'Two']);
      array.push([i,c[i],'Two']);
    } 
  }
  for(let i=0; i<auxiliaryArray.length; i++){
    {console.log('c[i].length:',c[i].length, i)} 
    if(c[i].length>0){
      array.push([i,c[i],'ThreeStart']);
      array.push([i,c[i],'ThreeStart']);
      array.push([i,c[i],'ThreeStart']);
     
      for(let j=0; j<c[i].length; j++){
        {console.log('temp:',i, idx)} 
        array.push([i,idx,'Three']);
        array.push([i,idx,'Three']);
        array.push([i,idx,'Three']);
        idx=idx+1;
      }
    }
  }
}
 
export default doBucket;