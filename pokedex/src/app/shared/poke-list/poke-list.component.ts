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
  public isLoadingErro: boolean = false;
  public offsetPoke: number = 143;
  public allPoke: number = 100;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons(this.offsetPoke, this.allPoke).subscribe(
      (res) => {
        this.setAllPokemon = res.results;
        this.getAllPokemon = this.setAllPokemon;
      },
      (error) => {
        this.isLoadingErro = true;
      }
    );
  }
  public getSearch(value: string): void {
    const filter = this.setAllPokemon.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });
    this.getAllPokemon = filter;
  }
}
