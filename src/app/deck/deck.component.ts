import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeckComponent implements OnInit {

  @Input() cards = [0, 1, 2, 3];

  @ViewChild('container') container: ElementRef;

  minimized = false;

  ngOnInit() {}

  constructor(private renderer: Renderer2) {}

  moveToTop(e: Event, i: number) {

    const cardToMove = this.cards.splice(i, 1)[0];
    this.cards.push(cardToMove);
  }

  changeAmount(e: Event) {

    this.cards = [];

    const amount = +(e.target as HTMLInputElement).value;

    for (let i = 0; i < amount; i++) {
      this.cards.push(i);
    }
  }

  onDragStart(event: DragEvent, indexOfCard: number) {

    if (this.minimized) {

      event.dataTransfer.setData('data', JSON.stringify(this.cards));
      event.dataTransfer.dropEffect = 'move';

    } else {

      // setData expects string, but nothing went wrong when not a string
      event.dataTransfer.setData('data', JSON.stringify(this.cards[indexOfCard]));
      event.dataTransfer.dropEffect = 'move';
    }
  }

  /**
   * Adds card to deck when card is dropped
   */
  onDrop(event) {

    const dataTransfer = event.dataTransfer.getData('data');

    if (Array.isArray(JSON.parse(dataTransfer))) {

      this.cards.push(...JSON.parse(dataTransfer));
    } else {
      this.cards.push(JSON.parse(dataTransfer));
    }
  }

  allowDrop(event) {
    event.preventDefault();
  }

  /**
   * Removes card from deck once it's been dropped somewhere else
   */
  removeCard(event: DragEvent, indexOfCard: number) {

    const cardWasMoved = event.dataTransfer.dropEffect === 'move';

    if (this.minimized && cardWasMoved) {

      this.cards = [];
      this.minimized = false;

    } else if (cardWasMoved) {

      this.cards.splice(indexOfCard, 1);
    }

  }

  /**
   * Does the animation that minimizes or maximizes deck
   */
  toggleMinimization() {

      const container = this.container.nativeElement;

      let i = 0;

      for (const card of container.querySelectorAll('.minimizable')) {

        const distanceToMove = (5 * i) + '%';

        const positions = [
          {
            top: 0,
            left: 0
          },
          {
            top: distanceToMove,
            left: distanceToMove
          }];

          card.animate(this.minimized ? positions : positions.reverse(), {
              duration: 2000,
              fill: 'forwards'
          });

          i++;
      }

      this.minimized = !this.minimized;
  }

}
