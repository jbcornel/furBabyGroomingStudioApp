import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.css'
})
export class ContactModalComponent implements OnChanges {
  @Input()  isOpen  = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  /** Lock body scroll when modal is open — only runs in the browser */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }
  }

  close(): void {
    this.closeModal.emit();
  }

  /** Close on Escape key */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) this.close();
  }
}
