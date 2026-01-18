import { Component, Input, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { HlmHint } from '@spartan-ng/helm/form-field';

@Component({
  selector: 'app-form-field-error',
  imports: [HlmHint],
  templateUrl: './form-field-error.html',
  styleUrl: './form-field-error.css',
})
export class FormFieldError {
  @Input() control!: AbstractControl;
  @Input() label!: string;
}

// control = input.required<AbstractControl>();
// label = input.required<string>();
