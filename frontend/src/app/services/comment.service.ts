import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Comment {
  id: number;
  content: string;
  district_id: number | null;
  created_at: string;
  reply_count?: number;
  replies?: Reply[];
  location_key?: string | null;
  location_type?: string | null;
  location_name?: string | null;
  location_lat?: number | null;
  location_lng?: number | null;
}

export interface Reply {
  id: number;
  content: string;
  created_at: string;
}

/** A district or a searched (non-district) location that can receive comments. */
export type CommentTarget =
  | { kind: 'district'; districtId: number; label: string }
  | { kind: 'location'; key: string; type: string; name: string; lat: number; lng: number };

export interface LocationSelection {
  key: string;
  type: string; // 'landmark' | 'station' | 'place'
  name: string;
  lat: number;
  lng: number;
}

export interface LocationMarker {
  location_key: string;
  location_type: string;
  location_name: string;
  location_lat: number;
  location_lng: number;
  count: number;
}

export interface CreateReplyRequest {
  content: string;
}

/** Stable identity for a searched location, derived from type + coordinates. */
export function locationKeyFor(type: string, lat: number, lng: number): string {
  return `${type}:${Math.round(lat * 1e5)}:${Math.round(lng * 1e5)}`;
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

  getComments(target: CommentTarget): Observable<{ results: Comment[] }> {
    let params = new HttpParams();
    if (target.kind === 'district') {
      params = params.set('district_id', target.districtId.toString());
    } else {
      params = params.set('location_key', target.key);
    }
    return this.http.get<{ results: Comment[] }>(`${this.apiUrl}/`, { params });
  }

  getCommentDetail(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${id}/`);
  }

  getCommentCounts(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/counts/`);
  }

  getLocationMarkers(): Observable<{ markers: LocationMarker[] }> {
    return this.http.get<{ markers: LocationMarker[] }>(`${this.apiUrl}/location_markers/`);
  }

  createComment(target: CommentTarget, content: string): Observable<Comment> {
    const payload: Record<string, unknown> = { content };
    if (target.kind === 'district') {
      payload['district_id'] = target.districtId;
    } else {
      payload['location_key'] = target.key;
      payload['location_type'] = target.type;
      payload['location_name'] = target.name.slice(0, 255);
      payload['location_lat'] = target.lat;
      payload['location_lng'] = target.lng;
    }
    return this.http.post<Comment>(`${this.apiUrl}/`, payload);
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