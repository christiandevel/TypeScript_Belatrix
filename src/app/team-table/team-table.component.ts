import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Country } from '../interfaces/player';
import { team } from '../interfaces/team';
import { TeamService, TeamsTableHeaders } from '../services/team.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.css']
})
export class TeamTableComponent implements OnInit {

  public teams$: Observable<team[]>;
  public tableHeaders = TeamsTableHeaders;

  constructor(private teamService: TeamService) { 

  }

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams();
    this.teamService.getTeams().pipe(take(1)).subscribe(teams => {
      if(teams.length === 0){
        const Team: team = {
          name: 'Mi Increible Equipo',
          country: Country.Colombia,
          players: null
        };
        this.teamService.addTeam(Team); 
      }
    });
  }

}
