import React, { useState, useRef, useEffect } from 'react';
import Two from 'two.js';
import { TimelineMax as Timeline, Power1, gsap } from 'gsap';
import styles from './canvas.module.scss';

const params = {
  autostart: true,
  fullscreen: true,
}

const canvasTwo: React.FC = () => {
  var stageRef = useRef();
  const [two, setTwo] = React.useState<Two>();
  const [shapes, setShapes] = React.useState<Two.Object[]>(null);
  const [isLoaded, setLoaded] = React.useState(false);

  useEffect(mount, []);
  useEffect(attachStage, [two]);
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

  function attachStage() {
    if(two)
      loadStage();

    return detachStage();
  }

  function detachStage() {
    if(!two)
      return;

    console.log('Detaching stage...');
    console.log('STAGE DETACHMENT COMPLETE!');
  }

  function loadStage() {
    const stage = stageRef.current as HTMLDivElement;
    two.bind(Two.Events.update.toString(), update);
    two.bind(Two.Events.resize.toString(), resize);
    // two.bind(Two.Events.insert.toString(), () => console.log('insert'));
    // two.bind(Two.Events.load.toString(), () => console.log('load'));
    // two.bind(Two.Events.change.toString(), () => console.log('change'));
    // two.bind(Two.Events.play.toString(), () => console.log('play'));
    // two.bind(Two.Events.order.toString(), () => console.log('order'));

    two.clear()
    two.appendTo(stageRef.current);

    const pixelSize = 40;
    const grid = makePixelGrid(two, two.width, two.height, pixelSize);
    // const element = grid[501];
    // element.scale = 0;

    setShapes(grid);
    
    // setShapes(grid)
    // const group = two.makeGroup(grid);
    setLoaded(true);
  }

  function confirmLoad() {
    if(!isLoaded) 
      return;
    console.log('LOAD COMPLETE!');
    animateGrid();
  }

  function animateGrid() {
    const rects = document.querySelector('.stage > svg > g').children;
    const limit = rects.length;
    const nums = Array.from(Array(limit).keys());

    const element = rects[501];

    const timeline = new Timeline({paused: true});
    console.log(element);
    timeline
      .from(rects, { opacity: 0, stagger: .005 , y: 150 , ease: Power1.easeInOut }, 1)
    
    // setShapes(element);
    timeline.play();
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
      // rect.scale = 0;
      rect.noStroke();
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
    if(!two || !shapes)
      return;

  }

  return (
    <div className="stage" ref={ stageRef } />
  );
}

export default canvasTwo;