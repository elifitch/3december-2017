import * as TweenMax from 'gsap/TweenMax';

function Animate(container) {
  TweenMax.to(container.position, 3, { x: 0, y: 0, z: 0, yoyo: true, repeat: -1, ease: Power2.easeInOut })
  container.children.forEach(obj => {
    TweenMax.to(obj.position, 3, { x: 0, y: 0, z: 0, yoyo: true, repeat: -1, ease: Power2.easeInOut })
  })
}

export default Animate;