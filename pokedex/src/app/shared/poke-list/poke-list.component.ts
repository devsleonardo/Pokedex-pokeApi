import { Component, OnInit } from '@angular/core';

//Service
import { PokeApiService } from './../../service/poke-api.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  private setAllPokemon: any;
  public getAllPokemon: any;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons().subscribe((res) => {
      this.setAllPokemon = res.results;
      this.getAllPokemon = this.setAllPokemon;
    });
  }
  public getSearch(value: string): void {
    const filter = this.setAllPokemon.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });
    this.getAllPokemon = filter;
  }
}
