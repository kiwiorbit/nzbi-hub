/**
 * PrayerTimesDisplay.js
 * Handles the display and updating of prayer times
 */

class PrayerTimesDisplay {
  constructor(options = {}) {
    this.container = options.container || document.getElementById('prayer-times-container');
    this.city = options.city || 'Auckland';
    this.country = options.country || 'New Zealand';
    this.method = options.method || 2; // 2 = ISNA
    this.updateInterval = options.updateInterval || 60000; // 1 minute
    this.prayerTimes = null;
    this.currentDate = new Date();
    
    // Initialize the display
    this.init();
  }
  
  init() {
    // Set up the date display
    this.updateDateDisplay();
    
    // Load prayer times
    this.loadPrayerTimes();
    
    // Set up automatic updates
    setInterval(() => {
      this.currentDate = new Date();
      this.updateDateDisplay();
      this.updateNextPrayerHighlight();
    }, this.updateInterval);
  }
  
  updateDateDisplay() {
    const dateElement = document.querySelector('.prayer-date');
    if (dateElement) {
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      dateElement.textContent = `${this.city}, ${this.country} • ${this.currentDate.toLocaleDateString('en-US', options)}`;
    }
  }
  
  loadPrayerTimes() {
    // In a real implementation, this would fetch prayer times from an API
    // For this demo, we'll use static times
    this.prayerTimes = {
      fajr: '5:30 AM',
      dhuhr: '12:30 PM',
      asr: '4:45 PM',
      maghrib: '7:15 PM',
      isha: '8:45 PM'
    };
    
    // Display the prayer times
    this.displayPrayerTimes();
    
    // Highlight the next prayer
    this.updateNextPrayerHighlight();
  }
  
  displayPrayerTimes() {
    const prayerElements = {
      fajr: document.querySelector('.prayer-time-fajr'),
      dhuhr: document.querySelector('.prayer-time-dhuhr'),
      asr: document.querySelector('.prayer-time-asr'),
      maghrib: document.querySelector('.prayer-time-maghrib'),
      isha: document.querySelector('.prayer-time-isha')
    };
    
    // Update each prayer time element
    for (const prayer in this.prayerTimes) {
      if (prayerElements[prayer]) {
        prayerElements[prayer].textContent = this.prayerTimes[prayer];
      }
    }
  }
  
  updateNextPrayerHighlight() {
    // This would calculate which prayer is next and highlight it
    // For simplicity in this demo, we'll just add a class to a random prayer
    
    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const prayerContainers = document.querySelectorAll('.prayer-time-container');
    
    // Remove existing highlights
    prayerContainers.forEach(container => {
      container.classList.remove('next-prayer');
    });
    
    // Determine next prayer based on current time
    // This is a simplified implementation
    const now = new Date();
    const hours = now.getHours();
    
    let nextPrayer;
    if (hours < 5) nextPrayer = 'fajr';
    else if (hours < 12) nextPrayer = 'dhuhr';
    else if (hours < 16) nextPrayer = 'asr';
    else if (hours < 19) nextPrayer = 'maghrib';
    else nextPrayer = 'isha';
    
    // Add highlight to next prayer
    const nextPrayerElement = document.querySelector(`.prayer-time-${nextPrayer}`);
    if (nextPrayerElement) {
      nextPrayerElement.closest('.prayer-time-container').classList.add('next-prayer');
    }
  }
}

// Initialize on page load if container exists
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prayer-times-container');
  if (container) {
    new PrayerTimesDisplay({ container });
  }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = PrayerTimesDisplay;
} else {
  window.PrayerTimesDisplay = PrayerTimesDisplay;
}
