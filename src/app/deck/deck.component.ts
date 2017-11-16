import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeckComponent implements OnInit {

  @Input() cards = [0, 1, 2, 3];

  minimizedCards = [];

  ngOnInit() {}

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

    event.dataTransfer.setData('data', this.cards[indexOfCard] as any); // setData expects string, but nothing went wrong when not a string
    event.dataTransfer.dropEffect = 'move';
  }

  /**
   * Adds card to deck when card is dropped
   */
  onDrop(event, data) {

    const dataTransfer = event.dataTransfer.getData('data');
    this.cards.push(dataTransfer);
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

  minimize() {

    if (this.minimizedCards.length > 0) {

      this.cards.unshift(...this.minimizedCards);
      this.minimizedCards = [];
    } else {

      this.minimizedCards = this.cards.slice(0, this.cards.length - 1);
      this.cards.splice(0, this.cards.length - 1);
    }
  }

}
