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
  // const [stateGroup, setGroup] = React.useState<Two.Group>();

  useEffect(setup, []);

  function setup() {
    twoRef.current = new Two(params);
    const stage = stageRef.current as HTMLDivElement;
    const two = twoRef.current;

    if(stage.children.length < 1)
      two.appendTo(stageRef.current);

    // Add any shapes you'd like here
    // createShapes(two);
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
    // const rects = makeRowOfPixels(two, two.width, 0, 40);
    const rects = makePixelGrid(two, two.width, two.height, 40);
    const group = two.makeGroup(rects);

    two.bind('update', () => update(group));
    two.bind('resize', () => resize(group));
    // two.bind('update', () => update(stateGroup));
    // two.bind('resize', () => resize(stateGroup));

    return function() {
      // Unmount handler
      two.unbind('update', update);
      two.unbind('resize', resize);
    }
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

  function resize(group) {
    // Resize logic here
    console.log('resizing!');
    const stage = stageRef.current as HTMLElement;
    const two = twoRef.current as Two;
    
    console.log(`Stage is: ${stage.clientWidth} by ${stage.clientHeight}`);
    console.log(`Two is: ${two.width} by ${two.height}`);
    group.translation.set(twoRef.current.width / 2, twoRef.current.height / 2);
  }

  function update(group: Two.Group) {
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