import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeckComponent implements OnInit {

  cards = [0, 1, 2, 3];

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

}
