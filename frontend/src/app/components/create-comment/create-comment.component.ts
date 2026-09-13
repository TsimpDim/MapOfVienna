import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService, Comment } from '../../services/comment.service';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-comment-container">
      <div class="form-header">
        <h2>Leave a comment</h2>
      </div>

      <form (ngSubmit)="submitForm()">
        <div class="form-group">
          <label for="content">Comment</label>
          <textarea
            id="content"
            placeholder="Share your thoughts, questions, or observations..."
            class="textarea-field"
            [(ngModel)]="formData.content"
            name="content"
            required
          ></textarea>
        </div>

        @if (error()) {
          <div class="error-message">{{ error() }}</div>
        }

        <div class="form-actions">
          <button
            type="button"
            class="btn-cancel"
            (click)="onCancel()"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn-submit"
            [disabled]="submitting() || !isFormValid()"
          >
            {{ submitting() ? 'Posting...' : 'Post Comment' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .create-comment-container {
      padding: 20px;
      height: 100%;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .form-header {
      margin-bottom: 25px;
    }

    .form-header h2 {
      margin: 0;
      font-size: 18px;
      color: #333;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #333;
    }

    .input-field, .textarea-field {
      width: 100%;
      padding: 10px 12px;
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
      min-height: 120px;
    }

    .error-message {
      background: #fee;
      color: #c33;
      padding: 10px;
      border-radius: 4px;
      font-size: 13px;
      margin-bottom: 20px;
      border: 1px solid #fcc;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: auto;
      padding-top: 10px;
      border-top: 1px solid #e0e0e0;
    }

    .btn-cancel, .btn-submit {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      transition: all 0.2s;
    }

    .btn-cancel {
      background: #f0f0f0;
      color: #666;
    }

    .btn-cancel:hover {
      background: #e0e0e0;
    }

    .btn-submit {
      background: #667eea;
      color: white;
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
export class CreateCommentComponent {
  @Input() districtId!: number;
  @Output() created = new EventEmitter<Comment>();
  @Output() cancelled = new EventEmitter<void>();

  formData = {
    content: ''
  };

  submitting = signal(false);
  error = signal('');

  constructor(private commentService: CommentService) {}

  isFormValid(): boolean {
    return this.formData.content.trim().length > 0;
  }

  submitForm(): void {
    if (!this.isFormValid()) return;

    this.submitting.set(true);
    this.error.set('');

    const data = {
      ...this.formData,
      district_id: this.districtId
    };

    this.commentService.createComment(data).subscribe({
      next: (comment) => {
        this.submitting.set(false);
        this.commentService.markCommentMine(comment.id);
        this.created.emit(comment);
      },
      error: (error) => {
        console.error('Error creating comment:', error);
        this.error.set('Failed to post comment. Please try again.');
        this.submitting.set(false);
      }
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}