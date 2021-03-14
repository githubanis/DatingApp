import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;
  private baseUrl = 'https://localhost:44313/api/Values';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
    console.log(this.values);
  }

  getValues() {
    this.http.get(`${this.baseUrl}`).subscribe(
      (res) => {
        console.log(res);
        this.values = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
