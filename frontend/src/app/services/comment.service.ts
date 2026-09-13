import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Comment {
  id: number;
  content: string;
  district_id: number;
  created_at: string;
  reply_count?: number;
  replies?: Reply[];
}

export interface Reply {
  id: number;
  content: string;
  created_at: string;
}

export interface CreateCommentRequest {
  content: string;
  district_id: number;
}

export interface CreateReplyRequest {
  content: string;
}

const MY_COMMENTS_KEY = 'mapofvienna:myComments';
const MY_REPLIES_KEY = 'mapofvienna:myReplies';

function readIds(key: string): number[] {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = `${environment.apiBaseUrl}/api/comments`;
  private repliesApiUrl = `${environment.apiBaseUrl}/api/replies`;

  // Ids of comments/replies created during the current browser session,
  // so the user can delete their own freshly-posted items.
  myCommentIds = signal<Set<number>>(new Set(readIds(MY_COMMENTS_KEY)));
  myReplyIds = signal<Set<number>>(new Set(readIds(MY_REPLIES_KEY)));

  constructor(private http: HttpClient) { }

  getCommentsByDistrict(districtId: number): Observable<{ results: Comment[] }> {
    let params = new HttpParams().set('district_id', districtId.toString());
    return this.http.get<{ results: Comment[] }>(`${this.apiUrl}/`, { params });
  }

  getCommentDetail(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${id}/`);
  }

  getCommentCounts(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/counts/`);
  }

  createComment(data: CreateCommentRequest): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/`, data);
  }

  addReply(commentId: number, data: CreateReplyRequest): Observable<Reply> {
    return this.http.post<Reply>(`${this.apiUrl}/${commentId}/add_reply/`, data);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  deleteReply(id: number): Observable<void> {
    return this.http.delete<void>(`${this.repliesApiUrl}/${id}/`);
  }

  isMyComment(id: number): boolean {
    return this.myCommentIds().has(id);
  }

  isMyReply(id: number): boolean {
    return this.myReplyIds().has(id);
  }

  markCommentMine(id: number): void {
    const next = new Set(this.myCommentIds());
    next.add(id);
    this.myCommentIds.set(next);
    this.persist(MY_COMMENTS_KEY, next);
  }

  markReplyMine(id: number): void {
    const next = new Set(this.myReplyIds());
    next.add(id);
    this.myReplyIds.set(next);
    this.persist(MY_REPLIES_KEY, next);
  }

  unmarkComment(id: number): void {
    const next = new Set(this.myCommentIds());
    next.delete(id);
    this.myCommentIds.set(next);
    this.persist(MY_COMMENTS_KEY, next);
  }

  unmarkReply(id: number): void {
    const next = new Set(this.myReplyIds());
    next.delete(id);
    this.myReplyIds.set(next);
    this.persist(MY_REPLIES_KEY, next);
  }

  private persist(key: string, set: Set<number>): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(Array.from(set)));
    } catch {
      // Ignore storage failures (e.g. private mode).
    }
  }
}