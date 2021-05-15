import React, { useEffect, useState,useMemo } from "react";
import { Row, Col, Button, FormCheck, Form,Card } from "react-bootstrap";
import Board from "./Board";
import {RangeStepInput} from 'react-range-step-input';
//import Slider from 'react-rangeslider';
import sudokuService, { EMPTY_GRID, EMPTY_START_GRID } from "./sudokuAlgo";
import StorageService from "./stringGrid";
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { makeStyles ,classes} from '@material-ui/core/styles';
import RangeSlider from 'react-bootstrap-range-slider';
//import InputRange from 'react-input-range';

export default function SudokuSolver() 
{
  

  const [grid, setGrid] = useState(EMPTY_GRID);
  const [startGrid, setStartGrid] = useState(EMPTY_START_GRID);
  const [isGridDisabled, setIsGridDisabled] = useState(false);
  const [isShowProcessChecked, setIsShowProcessChecked] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [progressSpeed,setProgressSpeed] = React.useState(30);
  //const [speed,setSpeed] = useState(5);
 // const [value,onChange]=useState(1);

 
  useEffect(() => {
    const storageBoard = StorageService.getBoard();
    if (storageBoard) setGrid(storageBoard);  
  }, []);

  


    // const handleChange = e => {
    //   setProgressSpeed(e.target.value);
    // };
    // const speed = useMemo(() => progressSpeed => progressSpeed , [progressSpeed]);

    

  const showProgress = async (progress) => {
   const speed = progressSpeed;

    setIsGridDisabled(true);
    for (const grid of progress) {
      setGrid(grid);
      await new Promise((resolve) => setTimeout(resolve, progressSpeed  ));
      
     // console.log(progressSpeed);
      //onchange();
    }
    setIsSolved(true);
    setIsSolving(false);
  };


  const undo = () => {
    setIsGridDisabled(false);
    setGrid(startGrid);
    setStartGrid(EMPTY_START_GRID);
    setIsSolved(false);
  };

  const handleValueChange = (e, id) => {
    const { value } = e.target;
    if ((value <= 9 && value > 0) || value === "") 
    {
      const position = id.split(",");
      const newGrid = grid.map((arr) => arr.slice());
      if (value === "") newGrid[position[0]][position[1]] = 0;
      else newGrid[position[0]][position[1]] = Number(value);
      setGrid(newGrid);
      StorageService.setBoard(newGrid);
    }
  };
  const getSpeed = () => {
    setProgressSpeed(progressSpeed=>progressSpeed);
    console.log(progressSpeed);
    return Number(progressSpeed);
  };

  const handleSliderChange = (event, newValue) => {
    setProgressSpeed(progressSpeed=>newValue);
    console.log(newValue,progressSpeed);

  };

  const handleInputChange = (event) => {
    setProgressSpeed(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (progressSpeed < 0) {
      setProgressSpeed(0);
    } else if (progressSpeed > 100) {
      setProgressSpeed(100);
    }
  };
  


  
  const reset = () => {
    setGrid(EMPTY_GRID);
    setStartGrid(EMPTY_START_GRID);
    setIsGridDisabled(false);
    setIsSolved(false);
    StorageService.setBoard(EMPTY_GRID());
  };


  const handleSolveButtonClicked = () => {
    setIsSolving(true);
    setIsSolved(false);
    setStartGrid(grid.map((arr) => arr.slice()));
    const progress = sudokuService.solve(grid);
    if (isShowProcessChecked) {
      showProgress(progress);
    } else {
      setIsGridDisabled(true);
      setGrid(progress[progress.length - 1]);
      setIsSolved(true);
      setIsSolving(false);
    }
  };

  //const speed = () => setProgressSpeed(progressSpeed);

  return (
    <Row className="mt-4">
      <Col sm={8} className="mb-5">
        <Board
          startGrid={startGrid}
          grid={grid}
          onChange={handleValueChange}
          disabled={isGridDisabled}
        />
      </Col>
      <Col lg className="mb-5">
        <Card className="shadow">
          <Card.Body>
            <Button
              variant="dark"
              disabled={isSolving}
              onClick={() => {
                reset();
                const randomGrid = sudokuService.getRandomExample();
                setGrid(randomGrid);
                StorageService.setBoard(randomGrid);
              }}
            >
              Random Board
            </Button>
            <br />
            {isSolving ? (
              <Button
                className="mt-3"
                variant="dark"
                onClick={() => window.location.reload()}
              >
                Stop
              </Button>
            ) : (
              <Button
                className="mt-3"
                variant="dark"
                onClick={handleSolveButtonClicked}
              >
                Solve
              </Button>
            )}
            <Button
              className="mt-3 mr-1"
              variant="dark"
              disabled={isSolving}
              onClick={reset}
            >
              Clear
            </Button>
            <Button
              className="mt-3 ml-1"
              variant="dark"
              disabled={!isSolved}
              onClick={undo}
            >Undo
              <i className="fas fa-undo" />
            </Button>
           
     
           <div>
      {/* <input type="range" className="custom-range" min="0" max="200" 
      //  onChange={e => setProgressSpeed(e.target.value )} 
       onChange={handleChange}
       /> */}
       <Slider
            value={typeof progressSpeed === 'number' ? progressSpeed : Number(progressSpeed)}
            onChange={handleSliderChange}
            min={0}
            max={500}
            aria-labelledby="input-slider"
          />
          <Input
            //className={classes.input}
            value={progressSpeed}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 10,
              max: 500,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
     
      {/* <h5>Animation Delay {progressSpeed}</h5> */}
      </div> 
              
              
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );


  
}
