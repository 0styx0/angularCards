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
  @Input() deckNumber = 0;

  @ViewChild('container') container: ElementRef;

  minimized = false;

  ngOnInit() {}

  constructor(private renderer: Renderer2) {}

  moveToTop(e: Event, i: number) {

    const cardToMove = this.cards.splice(i, 1)[0];
    this.cards.push(cardToMove);
    console.log(this.cards);
  }

  changeAmount(e: Event) {

    this.cards = [];

    const amount = +(e.target as HTMLInputElement).value;

    for (let i = 0; i < amount; i++) {
      this.cards.push(i);
    }
  }

  /**
   * @return value for use as card's top and left positioning
   */
  calculateCardPosition(indexOfCard: number) {
    return indexOfCard * 5 + '%';
  }

  onDragCard(event: DragEvent, indexOfCard: number) {

      event.dataTransfer.setData('data', JSON.stringify(this.cards[indexOfCard]));
      event.dataTransfer.dropEffect = 'move';
  }

  onDragDeck(event: DragEvent) {

      event.dataTransfer.setData('data', JSON.stringify(this.cards));
      event.dataTransfer.dropEffect = 'move';
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

    if (cardWasMoved) {
      this.cards.splice(indexOfCard, 1);
    }
  }

  removeDeck(event: DragEvent, indexOfCard: number) {

    const cardWasMoved = event.dataTransfer.dropEffect === 'move';

    if (cardWasMoved) {
      this.cards = [];
      this.minimized = false;
    }
  }

  /**
   * Does the animation that minimizes or maximizes deck
   */
  toggleMinimization() {

      const container = this.container.nativeElement;

      let i = 0;
      const animationDuration = 1000;

      for (const card of container.querySelectorAll('.minimizable')) {

        const distanceToMove = this.calculateCardPosition(i);

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
            duration: animationDuration,
            // fill: 'forwards'
        });

        i++;
      }

      // show summary card after minimization is complete and remove it before doing maximizing animation
      if (this.minimized) {
        this.minimized = false;
      } else {
        window.setTimeout(() => this.minimized = true, animationDuration);
      }
  }

}
