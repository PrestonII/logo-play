import React, { useState, useRef, useEffect } from 'react';
import Two from 'two.js';
import styles from './canvas.module.scss';

const params = {
  autostart: true,
  fullscreen: true,
}

const canvasTwo: React.FC = () => {
  var stageRef = useRef();
  const [two, setTwo] = React.useState<Two>();
  const [shapes, setShapes] = React.useState<Element>(null);
  const [isLoaded, setLoaded] = React.useState(false);

  useEffect(mount, []);
  useEffect(makeStage, [two]);
  useEffect(confirmLoad, [isLoaded]);

  function mount() {
    console.log('mounting...');
    const newTwo = new Two(params);
    setTwo(newTwo);

    return unmount(newTwo);
  }

  function unmount(passedTwo: Two) {
    if(!two)
      return;

    console.log('unmounting...');
    setLoaded(false);
    passedTwo.unbind('update', update);
    passedTwo.unbind('resize', resize);
    console.log('UNMOUNT COMPLETE!');
  }

  function makeStage() {
    if(two)
      loadStage();

    return function() {
      if(!two)
        return;

      console.log('Detaching stage...');
    }
  }

  function loadStage() {
    const stage = stageRef.current as HTMLDivElement;
    if(stage.children.length < 1)
      two.appendTo(stageRef.current);

    const grid = makePixelGrid(two, two.width, two.height, 40);
    console.log(grid)
    const group = two.makeGroup(grid);
    

    // const rects = document.querySelector('.stage > svg > g > g');
    // const limit = rects.length;
    // const ranNums = Array.from(Array(limit).keys());
    // console.log(ranNums);
    // console.log(rects.length);
    // console.log(rects);
    two.bind(Two.Events.update.toString(), update);
    two.bind(Two.Events.resize.toString(), resize);
    setLoaded(true);
  }

  function confirmLoad() {
    if(isLoaded)
      console.log('LOAD COMPLETE!');
  }

  function makePixelGrid(two: Two, width: number, height: number, size: number): Two.Rectangle[] {
    const grid: Two.Rectangle[] = [];

    for(let index = 0; index < height; index += size) {
      const row = makeRowOfPixels(two, width, index, size);
      grid.push(...row);
    }

    return grid;
  }

  function makeRowOfPixels(two: Two, width: number, position: number, size: number): Two.Rectangle[] {
    const rectangles: Two.Rectangle[] = [];

    for(let index = 0; index < width; index += size) {
      const rect = two.makeRectangle(index, position, size, size);

      rect.translation
      rect.fill = '#1c75bc';
      // rect.noStroke();
      rectangles.push(rect)
    }

    return rectangles;
  }

  function resize() {
    // Resize logic here
    if(!two)
      return;

    console.log('resizing!');
    const stage = stageRef.current as HTMLElement;
    
    console.log(`Stage is: ${stage.clientWidth} by ${stage.clientHeight}`);
    console.log(`Two is: ${two.width} by ${two.height}`);
    // group.translation.set(twoRef.current.width / 2, twoRef.current.height / 2);
  }

  function update() {
    if(!two)
      return;

    // console.log('updating!');
  }

  return (
    <div className="stage" ref={ stageRef } />
  );
}

export default canvasTwo;