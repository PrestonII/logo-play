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

  useEffect(setup, []);

  function setup() {
    const stage = stageRef.current as HTMLDivElement;
    twoRef.current = new Two(params);

    if(stage.children.length < 1)
      twoRef.current.appendTo(stageRef.current);

    // Add any shapes you'd like here
    var circle = twoRef.current.makeCircle(-70, 0, 50);
    var rect = twoRef.current.makeRectangle(70, 0, 100, 100);
    circle.fill = '#FF8000';
    rect.fill = 'rgba(0, 200, 255, 0.75)';

    var group = twoRef.current.makeGroup(circle, rect);
    group.translation.set(twoRef.current.width / 2, twoRef.current.height / 2);
    group.scale = 0;
    group.noStroke();

    twoRef.current.bind('update', () => update(group));
    twoRef.current.bind('resize', () => resize(group));

    return function() {
      // Unmount handler
      twoRef.current.unbind('update', update);
      twoRef.current.unbind('resize', resize);
    }
  }

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
    if (group.scale > 0.9999) {
      group.scale = group.rotation = 0;
    }
    var t = (1 - group.scale) * 0.125;
    group.scale += t;
    group.rotation += t * 4 * Math.PI;
  }

  return (
    <div className="stage" ref={ stageRef } />
  );
}

export default canvasTwo;