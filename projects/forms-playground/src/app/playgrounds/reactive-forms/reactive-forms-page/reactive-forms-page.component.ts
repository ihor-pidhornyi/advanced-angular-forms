import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {banWords} from "../validators/ban-words.validator";
import {passwordShouldMatch} from "../validators/password-should-match.validator";

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './reactive-forms-page.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormsPageComponent implements OnInit {

  phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];

  public form = new FormGroup({
    firstName: new FormControl('Dmytro', [Validators.required, Validators.minLength(2), banWords(['test', 'dummy'])]),
    lastName: new FormControl('Mezhenskyi', [Validators.required, Validators.minLength(2)]),
    nickname: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[\w.]+$/),
        banWords(['dummy', 'anonymous'])
      ]
    ),
    email: new FormControl('dmytro@decodedfrontend.io', [Validators.email, Validators.required]),
    yearOfBirth: new FormControl(this.years[this.years.length - 1], Validators.required),
    passport: new FormControl('', [Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)]),
    address: new FormGroup({
      fullAddress: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postCode: new FormControl(0, Validators.required),
    }),
    phones: new FormArray([new FormGroup({
      label: new FormControl(this.phoneLabels[0]),
      phone: new FormControl('')
    })]),
    password: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('')
    }, {
      validators: passwordShouldMatch
    })
  });

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  addPhone() {
    this.form.controls.phones.insert(0, new FormGroup({
      label: new FormControl(this.phoneLabels[0]),
      phone: new FormControl('')
    }))
  }

  removePhone(index: number) {
    this.form.controls.phones.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.form.value)
  }

}
