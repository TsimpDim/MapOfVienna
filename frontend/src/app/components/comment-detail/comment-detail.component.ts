import { Component, Output, EventEmitter, OnInit, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService, Comment, Reply } from '../../services/comment.service';

@Component({
  selector: 'app-comment-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="comment-detail-container">
      <button class="btn-back" (click)="onBack()">← Back to comments</button>

      @if (loading()) {
        <div class="loading">Loading comment...</div>
      } @else if (comment()) {
        <div class="comment-content">
          <div class="comment-meta">
            <span class="date">{{ formatDate(comment()!.created_at) }}</span>
            @if (isMyComment(comment()!.id)) {
              <button class="btn-delete" type="button" (click)="deleteComment()">Delete</button>
            }
          </div>

          <div class="comment-body">
            {{ comment()!.content }}
          </div>

          <div class="replies-section">
            <h3>{{ (comment()!.replies || []).length }} {{ ((comment()!.replies || []).length) === 1 ? 'Reply' : 'Replies' }}</h3>

            @if ((comment()!.replies || []).length > 0) {
              <div class="replies-list">
                @for (reply of comment()!.replies!; track reply.id) {
                  <div class="reply-item">
                    <div class="reply-header">
                      <span class="reply-meta-right">
                        <span class="reply-date">{{ formatDate(reply.created_at) }}</span>
                        @if (isMyReply(reply.id)) {
                          <button class="btn-delete" type="button" (click)="deleteReply(reply.id)">Delete</button>
                        }
                      </span>
                    </div>
                    <div class="reply-content">{{ reply.content }}</div>
                  </div>
                }
              </div>
            }

            <div class="reply-form">
              <h4>Add your reply</h4>
              <textarea
                placeholder="Your reply..."
                class="textarea-field"
                [(ngModel)]="replyContent"
              ></textarea>
              <button
                class="btn-submit"
                (click)="submitReply()"
                [disabled]="submitting() || !replyContent"
              >
                {{ submitting() ? 'Posting...' : 'Post Reply' }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .comment-detail-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-bottom: 10px;
    }

    .btn-back {
      background: none;
      border: none;
      padding: 15px 20px;
      color: #667eea;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      border-bottom: 1px solid #f0f0f0;
    }

    .btn-back:hover {
      background: #f9f9f9;
    }

    .loading {
      padding: 30px 20px;
      text-align: center;
      color: #999;
    }

    .comment-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .comment-meta {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;
      font-size: 12px;
      color: #999;
    }

    .date {
      color: #bbb;
    }

    .btn-delete {
      margin-left: auto;
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

    .comment-body {
      margin-bottom: 30px;
      line-height: 1.6;
      color: #333;
      font-size: 14px;
      white-space: pre-wrap;
      word-break: break-word;
      padding-bottom: 15px;
      border-bottom: 1px solid #e0e0e0;
    }

    .replies-section h3 {
      margin: 0 0 15px 0;
      font-size: 15px;
      color: #333;
    }

    .replies-list {
      margin-bottom: 30px;
    }

    .reply-item {
      background: #f9f9f9;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 10px;
      border-left: 3px solid #667eea;
    }

    .reply-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      margin-bottom: 8px;
    }

    .reply-meta-right {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .reply-date {
      color: #bbb;
    }

    .reply-content {
      color: #333;
      font-size: 13px;
      line-height: 1.5;
    }

    .reply-form {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
    }

    .reply-form h4 {
      margin: 0 0 12px 0;
      font-size: 14px;
      color: #333;
    }

    .input-field, .textarea-field {
      width: 100%;
      padding: 8px 12px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: inherit;
      font-size: 13px;
      box-sizing: border-box;
    }

    .input-field:focus, .textarea-field:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
    }

    .textarea-field {
      resize: vertical;
      min-height: 80px;
    }

    .btn-submit {
      width: 100%;
      background: #667eea;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      transition: background 0.2s;
    }

    .btn-submit:hover:not(:disabled) {
      background: #5568d3;
    }

    .btn-submit:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class CommentDetailComponent implements OnInit {
  commentId = input.required<number>();
  @Output() back = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  comment = signal<Comment | null>(null);
  loading = signal(true);
  submitting = signal(false);
  replyContent = '';

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComment();
  }

  private loadComment(): void {
    this.loading.set(true);
    this.commentService.getCommentDetail(this.commentId()).subscribe({
      next: (comment) => {
        this.comment.set(comment);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading comment:', error);
        this.loading.set(false);
      }
    });
  }

  submitReply(): void {
    if (!this.replyContent) return;

    this.submitting.set(true);
    this.commentService.addReply(this.commentId(), {
      content: this.replyContent
    }).subscribe({
      next: (reply) => {
        const comment = this.comment();
        if (comment) {
          if (!comment.replies) comment.replies = [];
          comment.replies.push(reply);
          this.comment.set({ ...comment });
        }
        this.commentService.markReplyMine(reply.id);
        this.replyContent = '';
        this.submitting.set(false);
        this.changed.emit();
      },
      error: (error) => {
        console.error('Error posting reply:', error);
        this.submitting.set(false);
      }
    });
  }

  onBack(): void {
    this.back.emit();
  }

  isMyComment(commentId: number): boolean {
    return this.commentService.isMyComment(commentId);
  }

  isMyReply(replyId: number): boolean {
    return this.commentService.isMyReply(replyId);
  }

  deleteComment(): void {
    const comment = this.comment();
    if (!comment) return;
    this.commentService.deleteComment(comment.id).subscribe({
      next: () => {
        this.commentService.unmarkComment(comment.id);
        this.changed.emit();
        this.back.emit();
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      }
    });
  }

  deleteReply(replyId: number): void {
    this.commentService.deleteReply(replyId).subscribe({
      next: () => {
        this.commentService.unmarkReply(replyId);
        const comment = this.comment();
        if (comment) {
          comment.replies = (comment.replies || []).filter(r => r.id !== replyId);
          this.comment.set({ ...comment });
        }
        this.changed.emit();
      },
      error: (error) => {
        console.error('Error deleting reply:', error);
      }
    });
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