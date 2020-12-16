import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { team } from '../interfaces/team';

export const TeamsTableHeaders = ['Name', 'Country', 'Players'];

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsDb: AngularFireList<team>;
  
  constructor(private db: AngularFireDatabase) { 
    this.teamsDb = this.db.list('/teams', ref => ref.orderByChild('name'))
  }

  getTeams(): Observable<team[]> {
    return this.teamsDb.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      })
    )
  }

  addTeam(team: team){
    return this.teamsDb.push(team);
  }

  deleteTeam(id: string){
    this.db.list('/teams').remove(id);
  }

  editTeams(newTeamDate) {
    const $key = newTeamDate.$key;
    delete(newTeamDate.$key);
    this.db.list('/teams').update($key, newTeamDate);
  }
}
