class Song {
    constructor(title, artist) {
      this.title = title;
      this.artist = artist;
    }
  }
  
  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class CircularLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.current = null; // Pointer to the current song
    }
  
    addSong(title, artist) {
      const newSong = new Song(title, artist);
      const newNode = new Node(newSong);
  
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        this.head.next = this.tail;
        this.tail.next = this.head;
        this.current = this.head; // Set current to the first song
      } else {
        this.tail.next = newNode;
        newNode.next = this.head;
        this.tail = newNode;
      }
    }
  
    removeSong(title) {
      if (!this.head) return;
  
      let current = this.head;
      let prev = null;
  
      do {
        if (current.data.title === title) {
          if (current === this.head) {
            this.head = this.head.next;
            this.tail.next = this.head;
          } else if (current === this.tail) {
            this.tail = prev;
            this.tail.next = this.head;
          } else {
            prev.next = current.next;
          }
          if (this.current === current) {
            this.current = current.next;
          }
          return true;
        }
        prev = current;
        current = current.next;
      } while (current !== this.head);
  
      return false;
    }
  
    playNextSong() {
      if (this.current) {
        this.current = this.current.next;
        this.playCurrentSong();
      }
    }
  
    playPreviousSong() {
      if (this.current) {
        let prev = this.head;
        while (prev.next !== this.current) {
          prev = prev.next;
        }
        this.current = prev;
        this.playCurrentSong();
      }
    }
  
    playCurrentSong() {
      if (this.current) {
        console.log(
          `Now Playing: ${this.current.data.title} - ${this.current.data.artist}`
        );
      }
    }
  }
  
  export default CircularLinkedList;
  