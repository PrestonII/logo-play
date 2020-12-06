import React, { useState, useRef, useEffect } from 'react';
import Two from 'two.js';
import { TimelineMax as Timeline, Power4, gsap } from 'gsap';
import styles from './canvas.module.scss';
import { shuffle } from '../../shared/lib/utils';

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

    setShapes(grid);
    setLoaded(true);
  }

  function confirmLoad() {
    if(!isLoaded) 
      return;
    console.log('LOAD COMPLETE!');
    animateGrid();
  }

  function animateGrid() {
    const children = Array.from(document.querySelector('.stage > svg > g').children);
    const rects = shuffle(children);
    const limit = rects.length;
    const timeline = new Timeline({paused: true});
    
    timeline.from(rects, { opacity: 0, stagger: .001, scale: 1.25, ease: Power4.easeOut, duration: 5 }, 1)
    
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