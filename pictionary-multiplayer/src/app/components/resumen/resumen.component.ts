import { Component, OnInit } from '@angular/core';

interface Player {
  name: string;
  score: number;
}

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
  standalone: false
})
export class ResumenComponent implements OnInit {
  players: Player[] = [];
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

