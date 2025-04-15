/**
 * TypewriterRTL.js
 * A simple typewriter effect for right-to-left text (Arabic)
 */

class TypewriterRTL {
  constructor(options) {
    this.element = options.element;
    this.text = options.text || '';
    this.speed = options.speed || 100;
    this.delay = options.delay || 0;
    this.cursor = options.cursor || true;
    this.cursorChar = options.cursorChar || '|';
    this.cursorSpeed = options.cursorSpeed || 500;
    
    this.currentText = '';
    this.isDeleting = false;
    this.loopNum = 0;
    this.isWaiting = false;
    
    // Start the animation after the specified delay
    setTimeout(() => {
      this.init();
    }, this.delay);
  }
  
  init() {
    // Add cursor if enabled
    if (this.cursor) {
      this.addCursor();
    }
    
    // Start typing
    this.type();
  }
  
  addCursor() {
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typewriter-cursor';
    cursorSpan.innerHTML = this.cursorChar;
    cursorSpan.style.animation = `blink-caret ${this.cursorSpeed}ms step-end infinite`;
    
    // Add cursor styles if not already present
    if (!document.getElementById('typewriter-cursor-style')) {
      const style = document.createElement('style');
      style.id = 'typewriter-cursor-style';
      style.innerHTML = `
        @keyframes blink-caret {
          from, to { opacity: 1 }
          50% { opacity: 0 }
        }
        .typewriter-cursor {
          display: inline-block;
          margin-right: 0.1em;
          color: inherit;
        }
      `;
      document.head.appendChild(style);
    }
    
    this.element.appendChild(cursorSpan);
  }
  
  type() {
    // Get the current text to display
    const fullText = this.text;
    const currentLength = this.currentText.length;
    
    // Check if we're done typing
    if (currentLength === fullText.length) {
      // Remove cursor after typing is complete
      if (this.cursor) {
        const cursor = this.element.querySelector('.typewriter-cursor');
        if (cursor) {
          cursor.style.display = 'none';
        }
      }
      return;
    }
    
    // Calculate typing speed with some randomness
    const typeSpeed = this.speed + Math.random() * 50;
    
    // Add next character
    this.currentText = fullText.substring(0, currentLength + 1);
    this.element.textContent = this.currentText;
    
    // Add cursor back if it was removed
    if (this.cursor) {
      const cursor = this.element.querySelector('.typewriter-cursor');
      if (!cursor) {
        this.addCursor();
      }
    }
    
    // Schedule next typing step
    setTimeout(() => {
      this.type();
    }, typeSpeed);
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = TypewriterRTL;
} else {
  window.TypewriterRTL = TypewriterRTL;
}
