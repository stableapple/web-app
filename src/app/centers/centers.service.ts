/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';

/**
 * Clients service.
 */
@Injectable({
    providedIn: 'root'
})
export class CentersService {
  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * @param {any} filterBy Properties by which entries should be filtered.
   * @param {string} orderBy Property by which entries should be sorted.
   * @param {string} sortOrder Sort order: ascending or descending.
   * @param {number} offset Page offset.
   * @param {number} limit Number of entries within the page.
   * @returns {Observable<any>} Centers.
   */
  getCenters(filterBy: any, orderBy: string, sortOrder: string, offset: number, limit: number): Observable<any> {
    let httpParams = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString())
      .set('sortOrder', sortOrder)
      .set('orderBy', orderBy)
      .set('paged', 'true');
    // filterBy: name, externalId
    filterBy.forEach(function (filter: any) {
      if (filter.value) {
        console.log(filter.value);
        httpParams = httpParams.set(filter.type, filter.value);
      }
    });
    return this.http.get('/centers', { params: httpParams });
  }

    /**
     * @param {any} center Center to be created.
     * @returns {Observable<any>}
     */
    createCenter(center: any): Observable<any> {
        return this.http.post('/centers', center);
    }

    /**
     * @param {number} officeId Office Id of office to get staff for.
     * @returns {Observable<any>}
     */
    getStaff(officeId: number): Observable<any> {
        const httpParams = new HttpParams()
            .set('officeId', officeId.toString())
            .set('staffInSelectedOfficeOnly', 'true');
        return this.http.get('/centers/template', { params: httpParams });
    }

}
