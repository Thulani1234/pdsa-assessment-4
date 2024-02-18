import React, { useState } from "react";
import CircularLinkedList from "./CircularLinkedList";

function App() {
  const [playlist, setPlaylist] = useState(new CircularLinkedList()); // Initialize the playlist state

  // Function to add a new song to the playlist
  const addSong = (title, artist) => {
    const newPlaylist = new CircularLinkedList();
    newPlaylist.head = playlist.head;
    newPlaylist.tail = playlist.tail;
    newPlaylist.current = playlist.current;

    newPlaylist.addSong(title, artist); // Add the new song
    setPlaylist(newPlaylist);
  };

  // Function to remove a song from the playlist
  const removeSong = (title) => {
    const newPlaylist = new CircularLinkedList();
    newPlaylist.head = playlist.head;
    newPlaylist.tail = playlist.tail;
    newPlaylist.current = playlist.current;

    newPlaylist.removeSong(title); // Remove the song
    setPlaylist(newPlaylist);
  };

  // Function to play the next song in the playlist
  const playNextSong = () => {
    playlist.playNextSong();
    setPlaylist(playlist);
  };

  // Function to play the previous song in the playlist
  const playPreviousSong = () => {
    playlist.playPreviousSong();
    setPlaylist(playlist);
  };

  // Function to render the current playlist
  const renderPlaylist = () => {
    const songs = [];
    let current = playlist.head;

    if (!current) {
      return <p>Playlist is empty.</p>;
    }

    do {
      songs.push(
        <div key={current.data.title}>
          <p>
            {current.data.title} - {current.data.artist}
          </p>
          <button onClick={() => removeSong(current.data.title)}>Remove</button>
        </div>
      );
      current = current.next;
    } while (current !== playlist.head);

    return songs;
  };

  return (
    <div>
      <h1>Music Playlist Manager</h1>
      <div>
        <label>Title: </label>
        <input type="text" id="title" />
        <label>Artist: </label>
        <input type="text" id="artist" />
        <button
          onClick={() =>
            addSong(
              document.getElementById("title").value,
              document.getElementById("artist").value
            )
          }
        >
          Add Song
        </button>
      </div>
      <div>
        <button onClick={playPreviousSong}>Previous</button>
        <button onClick={playNextSong}>Next</button>
      </div>
      <div>
        <h2>Current Playlist</h2>
        {renderPlaylist()}
      </div>
    </div>
  );
}

export default App;