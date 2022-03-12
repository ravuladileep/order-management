import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.checkUser();
    this.loginForm();
  }

  private loginForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.value.rememberMe) {
      localStorage.setItem('order-mgt-value', `${this.form.value.email}`);
    }
    this.form.reset();
    this.router.navigate(['/orders']);
  }

  private checkUser(): void {
    const item = localStorage.getItem('order-mgt-value');
    if (item) {
      this.router.navigate(['/orders']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
