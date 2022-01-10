import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Observable
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(private http: HttpClient) {}

  public apiListAllPokemons(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.url}?offset=${offset}&limit=${limit}`).pipe(
      tap((res) => res),
      tap((res) =>
        res.results.map((resPokemon: any) => {
          this.apiGetPokemons(resPokemon.url).subscribe(
            (res: any) => (resPokemon.status = res)
          );
        })
      )
    );
  }

  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(map((res) => res));
  }
}
