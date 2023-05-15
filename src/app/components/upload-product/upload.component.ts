import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-upload-component',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  private user: User = {} as User
  // BOOLEANO PARA IDENTIFICAR LA CARGA DE USUARIOS
  private imageString: string = "none"

  private loaded = false
  // EN EL CONSTRUCTOR INICIALIZAMOS EL SERVICIO QUE CONTIENE LOS DATOS / FUNCIONES
  constructor(
    private readonly authService: AuthService,
    private readonly productService: ProductService,
    private router: Router
  ) { }

  // AL CREAR EL COMPONENTE NOS SUSCRIBIMOS AL OBSERVABLE QUE RETORNA LA FUNCION GETUSERS
  ngOnInit(): void {

    this.authService.getUsers().subscribe(() => {

      if (this.authService.getUserByCookie()) {
        this.authService.user.subscribe((us: User) => {
          this.user = us
          this.loaded = true
        })
      }
      else {
        this.authService.user.subscribe((us: User) => {
          if (!(us.username)) {
            this.router.navigate(['/login']);
          }
          else {
            this.user = us
            this.loaded = true

          }
        })

      }
    })
  }
  public sendProduct(): void {
    if (this.loaded == true) {
      const radioButtons = <HTMLInputElement>document.querySelector('input[name="state"]:checked');
      const selectedValue = radioButtons ? radioButtons.value : null;
      const productName = <HTMLInputElement>document.getElementById("name");
      const productDescription = <HTMLInputElement>document.getElementById("description");
      const productPrice = <HTMLInputElement>document.getElementById("price");
      const categoryId = 0;
      if (productName.value != "" && productDescription.value != "" && selectedValue != null && productPrice.value != "") {
        const now = new Date();
        const product: Product = {
          created_at: now,
          updated_at: now,
          name: productName.value,
          description: productDescription.value,
          state: selectedValue!,
          photo: this.imageString,
          price: parseFloat(productPrice.value).toFixed(2),
          categoryId: categoryId,
          userId: this.user.id!,
          likes: 0,
          active: true

        };
        console.log(product)
        this.productService.postProduct(product).subscribe(() => {
          console.log("Posted")
        })


      }
    }
  }
  public updatePhoto(event: Event): void {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageString = reader.result as string;

    };
  }
}


