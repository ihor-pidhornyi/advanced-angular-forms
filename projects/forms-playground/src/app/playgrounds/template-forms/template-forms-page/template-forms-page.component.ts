import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from "@angular/forms";
import {UserInfo} from "../../../core/user-info";
import {BanWordsDirective} from "../validators/ban-words.directive";
import {PasswordShouldMatchDirective} from "../validators/password-should-match.directive";
import {UniqueNicknameDirective} from "../validators/unique-nickname.directive";

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BanWordsDirective, PasswordShouldMatchDirective, UniqueNicknameDirective],
  templateUrl: './template-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './template-forms-page.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormsPageComponent implements OnInit {
  userInfo: UserInfo = {
    firstName: "Ihor",
    lastName: "Pidhornyi",
    city: "",
    email: "",
    fullAddress: "",
    nickname: "",
    passport: "",
    postCode: 0,
    yearOfBirth: 0,
    password: '',
    confirmPassword: ''
  }

  constructor() {
  }

  get isAdult() {
    const currentYear = new Date().getFullYear()
    return (currentYear - this.userInfo.yearOfBirth) >= 18
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  ngOnInit(): void {
  }

  public onSubmitForm(form: NgForm): void {
    form.resetForm()
    console.log(form.value)
  }

}
