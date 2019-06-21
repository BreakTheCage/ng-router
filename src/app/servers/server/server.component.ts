import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private activatedRout: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit() {
    //because we defined: resolve: {server: ServerResolver} inside app-routing.module.ts
    this.activatedRout.data.subscribe((data: Data) => {
      this.server = data['server'];
    })
    // const id = +this.activatedRout.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // console.log("server fetched from service: " ,this.server);

    // this.activatedRout.params.subscribe((params: Params ) =>{
    //   this.server = this.serversService.getServer(+params['id']);
    // })
  }

  onEdit() {
    //routing by navigation method: more inside method
    this.router.navigate(['edit'] , { relativeTo: this.activatedRout, queryParamsHandling: 'preserve'});

  }
 // queryParams: { 'allowEdit': '1' }, fragment: 'loading' 
  //
}
 

