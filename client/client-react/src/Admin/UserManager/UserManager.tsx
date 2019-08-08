import React from 'react';

class UserManager extends React.Component {
  render() {
    return (
      <div className="row">
          <div className="col s8">
            <div className="card horizontal z-depth-4" 
            // *ngFor="let user of users"
            >`
              <div className="card-image col s4">
                <img src="{{user.image || 'https://cdn.dribbble.com/users/219762/screenshots/2351573/saitama.png'}}" className="user-image" alt="user`s img"/>
                <button 
                // (click)="selectUser(user)"
                className="btn edite-btn rework-btn">
                    <i className="material-icons">edite</i>
                </button>
                <button 
                // (click)="deleteUser(user._id)"
                className="btn delete-btn rework-btn">
                    <i className="material-icons">delete</i>
                </button>
              </div>
              <div className="card-stacked col s8">
                <div className="card-content">
                  <div className="card-title">
                    <b>user.name</b>
                    <br/>
                    <span><small>(user.role === 1) ? 'admin' : 'user'</small></span>
                  </div>
                  <p><b>E-mail: </b>user.email</p>
                  <ul> 
                    <span><b>List of books:</b></span>
                    <li 
                    // *ngFor="let book of user.book_list"
                    >book.title</li>
                  </ul>
                </div>
              </div>
              </div>
          </div>  
          <form className="col s4"
          //  [formGroup]="form" (ngSubmit)="onSubmit()"
          >
            <hr/>
            <div className="input-field">
              <input type="text" id="name" 
              // [(ngModel)]='userForEdite.name'
              // formControlName='name'
              />
              <label htmlFor="name" 
              // [ngClass]="{active: userForEdite.name}"
              >Name</label>
            </div>
            <div className="input-field">
              <input type="text" id="email" 
              // [(ngModel)]="userForEdite.email"
              // formControlName='email'
              />
              <label htmlFor="email" 
              // [ngClass]="{active: userForEdite.email}"
              >E-mail</label>
            </div>
            {/* // <!-- <div className="input-field">
            //     <input type="text" id="password" 
            //      [(ngModel)]="userForEdite.password"
            //     // formControlName='password'
            //     >
            //     <label for="password" [ngClass]="{active: userForEdite.password}">Password</label>
            // </div> --> */}
            <div className="input-field">
              <input type="number" id="role" 
              min="1"
              max="2"
              // [(ngModel)]="userForEdite.role"
              // formControlName='role'
              />
              <label htmlFor="role" 
              // [ngClass]="{active: userForEdite.role}"
              >Role</label>
            </div>
            <div className="input-field">
              <input type="text" id="id"
              //  [(ngModel)]="userForEdite._id" [ngModelOptions]="{standalone: true}"
              />
              <label htmlFor="id"
              //  [ngClass]="{active: userForEdite._id}"
              >id</label>
            </div>
            <div className="input-field">
              <input type="file" id="image"
              //  [(ngModel)]="userForEdite.image" [ngModelOptions]="{standalone: true}"
              />
              <label htmlFor="image">Image</label>
            </div>
            <div className="container center">
              <button type="button" className="btn waves-effect" 
                // (click)="addAction()" *ngIf="!okBtnStatus"
                // [disabled]="form.invalid"
                >Add
              </button>
              <button type="button" className="btn waves-effect" 
                // (click)="okAction()" *ngIf="okBtnStatus"
                // [disabled]="form.invalid"
                >OK
              </button>
            </div>
          </form>
      </div>
    )
  }
}

export default UserManager;