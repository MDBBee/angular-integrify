import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnDialogClose } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { FormFieldError } from '../form-field-error/form-field-error';
import { Store } from '../../services/store';

@Component({
  selector: 'app-product-form',
  imports: [
    HlmInputImports,
    HlmFormFieldImports,
    ReactiveFormsModule,
    BrnSelectImports,
    HlmSelectImports,
    BrnDialogClose,
    HlmButton,
    FormFieldError,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  storeService = inject(Store);
  categories = computed<string[]>(() => this.storeService.categories());

  productForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    category: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    image: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (!this.productForm.valid) return;

    this.storeService.createOneProduct(this.productForm.getRawValue()).subscribe((p) => {
      p.rating = {
        rate: 0,
        count: 0,
      };
      this.storeService.products.update((prevState) => [...prevState, p]);
    });
  }
}
