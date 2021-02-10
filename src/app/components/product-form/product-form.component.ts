import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    imageURL: ''
  }

  edit: boolean = false;
  formGroup: FormGroup;

  constructor(
    private productService: ProductService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required, Validators.nullValidator],
      imageURL: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    console.log(this.edit);
    const params = this.activatedRoute.snapshot.params;

    if (!this.formGroup.valid) {
      console.log('Dados inválidos');
      return;
    }

    console.log('Dados válidos')
    this.formGroup.getRawValue();
    
    if (params) {
      this.productService.getProduct(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.product = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  submitProduct() {
    this.productService.createProduct(this.product)
      .subscribe(
        res => {
          console.log(res),
          this.router.navigate(['/product']);
        },
        err => console.log(err)
      )
  }

  updateProduct() {
    delete this.product.createdAt;
    this.productService.updateProduct(this.product._id, this.product)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/product'])
        },
        err => console.log(err)
      )
  }

}
