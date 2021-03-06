import Component from '@glimmer/component';
import move from 'ember-animated/motions/move';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';

export default class SideMenuMenuComponent extends Component {

  slide = function* ({ insertedSprites, keptSprites, removedSprites }) {

    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ x: window.innerWidth });
      sprite.applyStyles({ 'z-index': 1 });
      move(sprite, { easing: easeOut });
    });

    keptSprites.forEach(sprite => {
      sprite.applyStyles({ 'z-index': 1 });
      move(sprite);
    });

    removedSprites.forEach(sprite => {
      sprite.applyStyles({ 'z-index': 1 });
      sprite.endAtPixel({ x: window.innerWidth });
      move(sprite, { easing: easeIn });
    });
  }
}
