import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Chat } from 'src/app/models/chat.model';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // URL API
  private readonly CONFIG_URL = 'http://localhost:3000';

  // ARRAY DE CategoryOS
  public chatList: Chat[] = []

  constructor(public http: HttpClient) {

  }

  // FUNCIÓN PARA HACER POST DE UN CHAT
  public postChat(chat: Chat): Observable<Category> {
    return this.http.post<Category>(`${this.CONFIG_URL}/chats`, chat)
  }

  // FUNCIÓN PARA HACER PUT DE UN CHAT
  public putChat(chat: Chat): Observable<Category> {
    return this.http.put<Category>(`${this.CONFIG_URL}/chats/${chat.id}`, chat)
  }

  // FUNCIÓN PARA OBTENER LOS CHATS Y ALMACENARLOS EN LA VAR PRIVADA
  public getChats(): Observable<void> {
    return this.http.get<Chat[]>(`${this.CONFIG_URL}/chats`)
      .pipe(map(((chats: Chat[]) => {
        this.chatList = chats
      })))
  }

}
