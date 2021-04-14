import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
//import './App.css';
import HomePage from './components/HomePage';
import Recursion_list from './components/RecursionList';
import Bruteforce_List from './components/BruteForceList';
import DivideAndConquerList from './components/DivideandConquerList'
import Greedy_List from './components/GreedyList';
import DynamicProgramming_List from './components/DynamicProgrammingList';
import Backtracking_List from './components/BacktrackingList'
import BranchandBound_List from './components/BranchandBoundList'
import BFS_INDEX from './components/Algorithms/bfs/BFS';
import Dijkstra from './components/Algorithms/dijkstra/Dijkstra'
import BST_Index from './components/Algorithms/BinarySearchTree/BST_Index';
import TopologicalSort from './components/Algorithms/topologicalsort/TopologicalSort'

import BubbleSort from './components/Algorithms/sortAlgo/BubbleSort'
import InsertionSort from './components/Algorithms/sortAlgo/InsertionSort'
import SelectionSort from './components/Algorithms/sortAlgo/SelectionSort'
import BinarySearch from './components/Algorithms/sortAlgo/BinarySearch'
import MergeSort from './components/Algorithms/sortAlgo/MergeSort'
//import QuickSort from './components/Algorithms/sortAlgo/'
//import RQuickSort from './components/Algorithms/sortAlgo/'
//import RadixSort from './components/Algorithms/sortAlgo/'
import CountingSort from './components/Algorithms/sortAlgo/CountingSort'
import BucketSort from './components/Algorithms/sortAlgo/BucketSort'

import Factorial_f from './components/Algorithms/factorial/Factorial'



function App() {
  return (
   <>
    <Router>
      <>
        <Switch>
          <Route path='/' exact component={HomePage}></Route>

          <Route path="/recursion" exact component={Recursion_list}></Route>
          <Route path="/recursion/factorial" exact component={Factorial_f}></Route>

          
          <Route path="/bruteforce" exact component={Bruteforce_List}></Route>
          <Route path="/bruteforce/bfs" exact component={BFS_INDEX}></Route>
          <Route path="/bruteforce/bubblesort" exact component={BubbleSort}></Route>
          <Route path="/bruteforce/insertionsort" exact component={InsertionSort}></Route>
          <Route path="/bruteforce/selectionsort" exact component={SelectionSort}></Route>

          <Route path="/divideandconquer" exact component={DivideAndConquerList}></Route>
          <Route path="/divideandconquer/mergesort" exact component={MergeSort}></Route>
          {/*<Route path="/divideandconquer/quicksort" exact component={QuickSort}></Route>
          <Route path="/divideandconquer/randomizequick" exact component={RQuickSort}></Route>*/}
          <Route path="/divideandconquer/countingsort" exact component={CountingSort}></Route>
          <Route path="/divideandconquer/bucketsort" exact component={BucketSort}></Route>
          {/*<Route path="/divideandconquer/radix" exact component={RadixSort}></Route>*/}
          
          <Route path="/greedy" exact component={Greedy_List}></Route>
          <Route path="/greedy/dijkstra" exact component={Dijkstra}></Route>

          
          <Route path="/dynamicprogramming" exact component={DynamicProgramming_List}></Route>
          
          <Route path="/backtracking" exact component={Backtracking_List}></Route>
          
          <Route path="/branchandbound" exact component={BranchandBound_List}></Route>
          <Route path="/branchandbound/bst" exact component={BST_Index}></Route>
          <Route path="/branchandbound/topologicalsort" exact component={TopologicalSort}></Route>
          <Route path="/branchandbound/binarysearch" exact component={BinarySearch}></Route>
          

          
          

        </Switch>
      </>
    </Router>
   </>
  );
}

export default App;
