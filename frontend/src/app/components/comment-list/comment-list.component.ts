import { Component, Output, EventEmitter, signal, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService, Comment } from '../../services/comment.service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="comment-list-container">
      <div class="list-header">
        <button class="btn-new-comment" (click)="onNewComment()">+ New Comment</button>
      </div>

      @if (loading()) {
        <div class="loading">Loading comments...</div>
      } @else if (comments().length === 0) {
        <div class="empty-state">
          <p>No comments yet.</p>
          <p class="hint">Be the first to leave one!</p>
        </div>
      } @else {
        <div class="comments-list">
          @for (comment of comments(); track comment.id) {
            <div class="comment-item" (click)="onSelectComment(comment.id)">
              <div class="comment-header">
                @if (isMyComment(comment.id)) {
                  <button class="btn-delete" type="button" (click)="deleteComment(comment.id, $event)">Delete</button>
                }
                <span class="reply-count">{{ comment.reply_count || 0 }} {{ (comment.reply_count || 0) === 1 ? 'reply' : 'replies' }}</span>
              </div>
              <p class="comment-content">{{ comment.content }}</p>
              <div class="comment-meta">
                <span class="date">{{ formatDate(comment.created_at) }}</span>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .comment-list-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-bottom: 10px;
    }

    .list-header {
      padding: 16px 18px;
      border-bottom: 1px solid #e0e0e0;
    }

    .btn-new-comment {
      width: 100%;
      background: #667eea;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: background 0.2s;
    }

    .btn-new-comment:hover {
      background: #5568d3;
    }

    .loading, .empty-state {
      padding: 30px 20px;
      text-align: center;
      color: #999;
      font-size: 14px;
    }

    .empty-state p {
      margin: 10px 0;
    }

    .empty-state .hint {
      font-size: 12px;
      color: #bbb;
    }

    .comments-list {
      flex: 1;
      overflow-y: auto;
    }

    .comment-item {
      padding: 15px 18px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      transition: background 0.2s;
    }

    .comment-item:hover {
      background: #f9f9f9;
    }

    .comment-header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      margin-bottom: 6px;
    }

    .btn-delete {
      margin-right: auto;
      background: none;
      border: none;
      padding: 0;
      color: #c33;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-delete:hover {
      text-decoration: underline;
    }

    .comment-content {
      margin: 0 0 10px 0;
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .reply-count {
      background: #e8f0ff;
      color: #667eea;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
    }

    .comment-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #999;
    }

    .date {
      color: #bbb;
    }
  `]
})
export class CommentListComponent {
  districtId = input.required<number>();
  @Output() selectComment = new EventEmitter<number>();
  @Output() newComment = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  comments = signal<Comment[]>([]);
  loading = signal(true);

  constructor(private commentService: CommentService) {
    effect(() => {
      this.loadComments(this.districtId());
    });
  }

  private loadComments(districtId: number): void {
    this.loading.set(true);
    this.commentService.getCommentsByDistrict(districtId).subscribe({
      next: (response) => {
        this.comments.set(response.results || response as any);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading comments:', error);
        this.loading.set(false);
      }
    });
  }

  onSelectComment(commentId: number): void {
    this.selectComment.emit(commentId);
  }

  isMyComment(commentId: number): boolean {
    return this.commentService.isMyComment(commentId);
  }

  deleteComment(commentId: number, event: Event): void {
    event.stopPropagation();
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.commentService.unmarkComment(commentId);
        this.comments.update(list => list.filter(c => c.id !== commentId));
        this.changed.emit();
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      }
    });
  }

  onNewComment(): void {
    this.newComment.emit();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  }
}