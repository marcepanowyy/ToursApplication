import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {countries} from "../models/countries";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

import {NonNullableFormBuilder} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  options = this._formBuilder.group({
    color: this._formBuilder.control('primary' as ThemePalette),
    fontSize: this._formBuilder.control(16, Validators.min(10)),
  });

  constructor(private _formBuilder: NonNullableFormBuilder) {
  }

  countries = countries;
  selectedCountry = "";
  @Output() countryChange = new EventEmitter<string>();

  selectedBottomPrice = ""
  @Output() priceBottomChange = new EventEmitter<string>();

  selectedTopPrice = ""
  @Output() priceTopChange = new EventEmitter<string>();

  selectedVotes = ""
  @Output() votesChange = new EventEmitter<string>();

  filters = ["country", "price", "votes"]
  selectedFilter = ""

  @Output() filterReset = new EventEmitter<null>();

  ngOnInit(): void {
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter
  }

  resetFilter() {
    this.selectedFilter = "";
    this.selectedBottomPrice = "";
    this.selectedTopPrice = "";
    this.selectedCountry = "";
    this.selectedVotes = "";
    this.filterReset.emit();
  }

  onCountryChange(country: string) {
    this.countryChange.emit(country)
  }

  onBottomPriceChange(price: string) {
    this.priceBottomChange.emit(price)
  }

  onTopPriceChange(price: string) {
    this.priceTopChange.emit(price)
  }

  onVotesChange(votes: string) {
    this.votesChange.emit(votes);
  }

}


