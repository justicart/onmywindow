import p5 from 'p5';

export default function perlinNoise (p) {
  let phase = 0;
  let zoff = 0;
  let width = 1280;
  let height = 720;
  let max = 500;
  let noiseMax = .05;
  let count = 16;
  let spacing = 8;
  let smooth = 1;
  let outerResolution = 1;
  let innerResolution = 100;
  let twist = 0.05;
  let rotate = 0;
  let strokeWidth = 2;
  let strokeWidthDecay = 1;
  let strokeOpacityDecay = 1;
  let zOffset = 0.025;

  // Setup function
  p.setup = () => {
    p.createCanvas(width, height);
  }

  // Heart
  function calcX(a, phase = 0) {
    return 16 * p.pow(p.sin(a + phase), 3);
  }
  function calcY(a, phase = 0) {
    return -1 * (13 * p.cos(a + phase) - 5*p.cos(2*(a + phase)) - 2*p.cos(3*(a + phase)) - p.cos(4*(a + phase)));
  }

  // Draw function
  p.draw = () => {
    p.resizeCanvas(width, height, true);
    p.translate(width / 2, (height / 2) - 100);
    Array(count).fill().forEach((c, index) => {
      const calcStrokeWeight = strokeWidth - (((strokeWidth / count) * index) * strokeWidthDecay);
      const calcPhase = phase + (index * twist);
      const calcZoff = zoff - (index * zOffset);
      p.noFill();
      const decayRate = ((1 / count) * index) * strokeOpacityDecay;
      let strokeColor = `rgba(255,${Math.floor(150 - 100*decayRate)},${Math.floor(200 - 100*decayRate)},${1 - decayRate})`;
      p.stroke(strokeColor);
      p.strokeWeight(strokeWidth);
      const outerHeight = (max * (outerResolution / 100)) - (spacing * index);
      p.beginShape();
      for (let a = 0; a < (2 * Math.PI); a += p.radians(smooth)) {
        let xoff = p.map(calcX(a, calcPhase), -1, 1, 0, noiseMax);
        let yoff = p.map(calcY(a, calcPhase), -1, 1, 0, noiseMax);
        let r = p.map(p.noise(xoff, yoff, calcZoff), 0, 1, 100, outerHeight / 2);
        let x = r * (calcX(a));
        let y = r * (calcY(a));
        p.vertex(x, y);
      }
      p.endShape(p5.CLOSE);
      // inner heart
      strokeColor = `rgba(255,${Math.floor(100 - 100*decayRate)},${Math.floor(150 - 100*decayRate)},1)`;
      p.stroke(strokeColor);
      p.strokeWeight(calcStrokeWeight);
      p.beginShape();
      const innerHeight = (max * (innerResolution / 100)) - (spacing * index);
      for (let a = 0; a < (2 * Math.PI); a += p.radians(smooth)) {
        let xoff = p.map(calcX(a, calcPhase), -1, 1, 0, noiseMax);
        let yoff = p.map(calcY(a, calcPhase), -1, 1, 0, noiseMax);
        let r = p.map(p.noise(xoff, yoff, calcZoff), 0, 1, 100, innerHeight / 2) * 0.1;
        let x = r * (calcX(a));
        let y = r * (calcY(a));
        p.vertex(x, y);
      }
      p.endShape(p5.CLOSE);
      return false;
    })
    phase += rotate || 0;
    zoff += 0.01;
  }
}
