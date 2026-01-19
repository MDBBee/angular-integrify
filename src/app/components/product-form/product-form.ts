import { Component, computed, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnDialogClose } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { FormFieldError } from '../form-field-error/form-field-error';
import { Store } from '../../services/store';
import { Product, ProductUpdate } from '../../models/product.type';

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

  product = input<Product>({
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  });
  isUpdating = input(false);

  updateForm = effect(() => {
    this.productForm.patchValue(this.product());
  });

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

    if (this.isUpdating()) {
      const product = {
        ...this.product(),
        ...this.productForm.getRawValue(),
      };

      return this.storeService.updateOneProduct(product);
    }

    this.storeService.createOneProduct(this.productForm.getRawValue()).subscribe((p) => {
      p.rating = {
        rate: 0,
        count: 0,
      };

      this.storeService.products.update((prevState) => [...prevState, p]);
    });
  }
}
