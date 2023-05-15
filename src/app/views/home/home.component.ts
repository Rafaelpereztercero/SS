import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Pagination } from 'src/app/models/pagination.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: Product[] = []
  public categories: Category[] = []
  public pagination: Pagination = {} as Pagination

  private readonly categorySize = 8
  private readonly categoryBlank = [0, 1, 2, 3]

  constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService) {

  }
  ngOnInit() {
    this.productService.getProducts().subscribe(() => {
      this.products = this.productService.productList
    })
    this.categoryService.getCategories().subscribe(() => {
      this.categories = this.categoryService.categoryList
    })
    this.pagination.pageSize = 8
    this.pagination.categorySize = 8
    this.pagination.categroyBlank = [0, 1, 2, 3]
    this.pagination.categoryDisplay = false
  }
  public showCategories(): void {
    if (this.pagination.categoryDisplay === false) {
      document.getElementById("show")!.classList.add("nonMarginTop")
      this.pagination.categorySize = this.categories.length
      this.pagination.categroyBlank = []
      this.pagination.categoryDisplay = true
    }
    else {
      document.getElementById("show")!.classList.remove("nonMarginTop")
      this.pagination.categorySize = this.categorySize
      this.pagination.categroyBlank = this.categoryBlank
      this.pagination.categoryDisplay = false
    }
  }
  public productRedirect(productId: number) {
    const proute = `/product/${productId}`
    this.router.navigate([proute])
  }

}
