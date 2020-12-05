import React, { useState, useRef, useEffect } from 'react';
import Two from 'two.js';
import styles from './canvas.module.scss';

const params = {
  autostart: true,
  fullscreen: true,
}

const canvasTwo: React.FC = () => {
  var stageRef = useRef();
  var twoRef = useRef<Two>();
  const [two, setTwo] = React.useState<Two>();
  const [shapes, setShapes] = React.useState<Element>(null);
  const [isLoaded, setLoaded] = React.useState(false);

  useEffect(setup, []);
  useEffect(makeStage, [two]);
  useEffect(confirmLoad, [isLoaded]);

  function confirmLoad() {
    if(isLoaded)
      console.log('LOAD COMPLETE!');
  }

  function makeStage() {
    if(two)
      loadStage();

    return function() {
      console.log('Detaching stage...');
    }
  }

  function setup() {
    console.log('loading...');
    twoRef.current = new Two(params);
    
    const two = twoRef.current;
    setTwo(twoRef.current);

    return function() {
      // Unmount handler
      console.log('unmounting...');
      setLoaded(false);
      two.unbind('update', update);
      two.unbind('resize', resize);
      console.log('UNMOUNT COMPLETE!');
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

  // function createShapes(two: Two) {
    // var circle = two.makeCircle(-70, 0, 50);
    // var rect = two.makeRectangle(70, 0, 100, 100);
    // circle.fill = '#FF8000';
    // circle.stroke = 'orangered';
    // rect.fill = 'rgba(0, 200, 255, 0.75)';
    // rect.stroke = '#1C75BC';

    // var group = two.makeGroup(circle, rect);
    // // two.add(group);
    // group.translation.set(two.width / 2, two.height / 2);
    // group.scale = 1;
    // // group.noStroke();
    // group.linewidth = 7;
    // // setGroup(group);
  // }

  function resize() {
    // Resize logic here
    console.log('resizing!');
    const stage = stageRef.current as HTMLElement;
    const two = twoRef.current as Two;
    
    console.log(`Stage is: ${stage.clientWidth} by ${stage.clientHeight}`);
    console.log(`Two is: ${two.width} by ${two.height}`);
    // group.translation.set(twoRef.current.width / 2, twoRef.current.height / 2);
  }

  function update(group?: Two.Group) {
    // console.log('updating!');
    // console.log(`The document loaded: ${isLoaded}`);
    // console.log(`The shapes loaded: ${shapes?.children.length}`);

    // const rects = document.querySelector('.stage > svg > g > g');

    // if(isLoaded && !shapes) {
    //   setShapes(rects)
    //   // console.log(rects);
    // }

    // if(shapes)
    //   console.log(shapes);

    // // console.log(isLoaded);
    // if(isLoaded) {
    //   console.log(shapes.children.length);
    // }
    
    // animate shapes here
    // console.log('updating');
    // if (group.scale > 0.9999) {
    //   group.scale = group.rotation = 0;
    // }
    // var t = (1 - group.scale) * 0.125;
    // group.scale += t;
    // group.rotation += t * 4 * Math.PI;
  }

  return (
    <div className="stage" ref={ stageRef } />
  );
}

export default canvasTwo;