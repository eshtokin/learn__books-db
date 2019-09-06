import React from 'react'

export class Filter extends React.Component {

  render() {
    return (
      <div className="col s2 filters">
        <div className="input-field">
          {/* // [(ngModel)]="this.searchField"
          // (ngModelChange)="this.searchStringUpdate.next($event)" */}
          <input type="text" id="searchField" />
          <label //for="searchField"
          // [ngClass]="{active: this.searchField}"      
          >Search Field</label>
        </div>
        <div className="category-input" //*ngFor="let category of categories"
        >
          <input type="checkbox" id={category._id}// [checked]="category.checked" (change)="filtering(category)"/
          />
          <label //for={category._id}
          >{category.name}</label>
        </div>
        <hr/>
        {/* *ngFor="let author of authors" */}
        {/*  // [(checked)]="author.checked" (change)="filtering(author)"/ */}
        <div className="author-input">
          <input type="checkbox" id={author._id} />
          <label //for={author._id}
          >{author.name}</label>
        </div>
        <hr/>
      </div>
    )
  }
}
