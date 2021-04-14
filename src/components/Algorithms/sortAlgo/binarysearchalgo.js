import React from 'react'
import ReactDOM, { render } from 'react-dom';

function doBinarySearch(props,key){
    {console.log('In DoSearch:')} 
  const array=[];
  if(props.length<=1){
    return props;
  }else{
    {console.log('DoSearch:',key)} 
  const auxiliaryArray = props.slice();
  binarySearch(auxiliaryArray, array, key);
  {console.log('DoSearch length:',array.length)} 
  return array;
  }
}

function binarySearch(auxiliaryArray, array, key){
  let low=0;
  let high=auxiliaryArray.length-1;
  let count=0;

  while(high>=low){
    let mid = Math.ceil((low + high)/2);
    array.push([mid,auxiliaryArray[mid],'darkblue']);
    count++;

    if(auxiliaryArray[mid]<key){
        array.push([mid,auxiliaryArray[mid],'red']);
        count++;
        if(high<(mid+1)){
            array.push([mid,auxiliaryArray[mid],'Not Found !!!','white']);
        }
        else{
            array.push([mid,auxiliaryArray[mid],low,mid,'white']);
        }
        count++;
        low=mid+1;
    }
    if(auxiliaryArray[mid]>key){
        array.push([mid,auxiliaryArray[mid],'red']);
        count++;
        if((mid-1)<low){
            array.push([mid,auxiliaryArray[mid],'Not Found !!!','white']);
        }
        else{
            array.push([mid,auxiliaryArray[mid],mid,high,'white']);
        }
        count++;
        high=mid-1;
    }
    if(auxiliaryArray[mid]===key){
        array.push([mid,auxiliaryArray[mid],'white']);
        count++;
        array.push([mid,auxiliaryArray[mid],'green']);
        count++;
        break;
    }
    
  }
   
}

export default doBinarySearch;