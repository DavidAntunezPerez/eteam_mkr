import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PlayerService {
  private player : Player[] = [  
    {
      id: 0,
      name:  'Oleksandr',
      surname: 'Kostyliev',
      nick: 's1mple',
      age: 25,
      kda: 1.25,
      role: 'Awper',
      picture: 'https://img-cdn.hltv.org/playerbodyshot/Q2u6AgnDNYQ3dyObwN4JBX.png?ixlib=java-2.1.0&w=400&s=5e19fa63867872bd78409f6e757ff6c3',
    },
  ]
}