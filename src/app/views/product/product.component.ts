import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { create } from 'domain';
import { Chat, Message } from 'src/app/models/chat.model';

import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ChatService } from 'src/app/services/chat.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: Product = {} as Product
  public user: User = {} as User
  public seller: User = {} as User
  public products: Product[] = []
  public chatList: Chat[] = []
  public prodid!: string
  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute, private productService: ProductService, private authService: AuthService, private categoryService: CategoryService) {

  }
  ngOnInit() {
    this.authService.getUsers().subscribe(() => {

      if (this.authService.getUserByCookie()) {
        this.authService.user.subscribe((us: User) => {
          this.user = us
        })
      }
      else {
        this.authService.user.subscribe((us: User) => {
          if (!(us.username)) {
            this.router.navigate(['/login']);
          }
          else {
            this.user = us

          }
        })

      }
    })

    this.productService.getProducts().subscribe(() => {

      this.prodid = this.route.snapshot.paramMap.get('id')!;

      if (this.prodid != undefined && parseInt(this.prodid) && this.prodid != null) {
        let tempID: number = parseInt(this.prodid)
        let temp = this.productService.productList.find(product => product.id === tempID);
        if (temp != undefined) {
          this.product = temp
          this.authService.getUser(this.product.userId).subscribe((us: User) => {
            this.seller = us
            this.products = this.productService.productList
            this.chatService.getChats().subscribe(() => {
              this.chatList = this.chatService.chatList
            })
          })
        }
      }
    })


  }
  public showMessageDirect() {
    document.getElementById("chat")!.classList.remove("displayed")
  }
  public hideMessageDirect() {
    document.getElementById("chat")!.classList.add("displayed")

  }
  public sendMessage() {
    const chat = this.chatList.find(
      (chat) => chat.emit === this.user.id && chat.recept === this.seller.id
    );
    const messageInput = document.getElementById("chat-msg") as HTMLTextAreaElement | null;

    const created = Boolean(chat);
    let message: Message = {
      emit: this.user!.id!,
      message: messageInput!.value,
      seen: false,
      created_at: new Date()
    }
    if (created) {


      chat!.conversation.push(message)
      this.chatService.putChat(chat!).subscribe(() => {
      })
    }
    else {
      let chat: Chat = {
        emit: this.user!.id!,
        recept: this.seller!.id!,
        conversation: [message],
        productID: parseInt(this.prodid),
      }
      this.chatService.postChat(chat).subscribe(() => { })
    }

  }
  public productRedirect(productId: number) {
    const proute = `/product/${productId}`
    this.router.navigate([proute])


    this.prodid = String(productId);
    if (this.prodid != undefined && parseInt(this.prodid) && this.prodid != null) {
      let tempID: number = parseInt(this.prodid)
      let temp = this.productService.productList.find(product => product.id === tempID);
      if (temp != undefined) {
        this.product = temp
        this.authService.getUser(this.product.userId).subscribe((us: User) => {
          this.seller = us
          this.products = this.productService.productList

        })
      }
    }

  }
}
