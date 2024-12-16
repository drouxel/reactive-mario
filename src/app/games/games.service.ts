import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {
  Device,
  GameDetail,
  PaginatedSearchResult,
  MarioUniversalisResponse,
  GameSearchItem, Sort
} from './game-search-result.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(private http: HttpClient) {}
  private _baseUrl: string = 'https://www.mariouniversalis.fr/graphql/';

  public getDevices$(): Observable<Device[]> {
    return this.http.post<MarioUniversalisResponse<{ devices: PaginatedSearchResult<Device> }>>(this._baseUrl, {query: this.getDevicesQuery()})
      .pipe(
        map((response) => response.data.devices.data)
      )
  }

  public getPaginated$(filter: string, device: string, sort: Sort): Observable<PaginatedSearchResult<GameSearchItem>> {
    return this.http.post<MarioUniversalisResponse<{ games: PaginatedSearchResult<GameSearchItem> }>>
    (this._baseUrl, {query: this.getGamesQuery(filter, device, sort)})
      .pipe(
        map((response) => response.data.games)
      )
  }

  public getSingle$(id: number): Observable<GameDetail | undefined> {
    return this.http.post<MarioUniversalisResponse<{game: GameDetail}>>(this._baseUrl, {query: this.getSingleGameQuery(id)})
      .pipe(
        map(response => response.data.game)
      );
  }

  private getSingleGameQuery(id: number): string {
    return `{
      game(id: "${id}") {
          id
          name
          release_date(region: eur)
          age(region: eur)
          device {
            name
            logo
            code
          }
        genres {
            name(lang: fr)
            icon
            code
          }
        image
        mariouniversalisURL
      }
    }`
  }

  private getGamesQuery(filter: string, device: string, sort: Sort): string {
    return `{
      games(search: "${filter}" ${device? ', device: '+ device : ''},
        order_by: { field: ${sort.field}, sort: ${sort.sort}},
        per_page: 12
      ) {
        pagination {
          total_count
          total_pages
        }
        data {
          id
        }
      }
    }`
  }

  private getDevicesQuery(): string {
    return `{
      devices(search: "", per_page: 30) {
        pagination {
          total_count,
          total_pages
        }
        data {
          code,
          description_fr
          logo,
          name
        }
      }
    }`
  }
}
