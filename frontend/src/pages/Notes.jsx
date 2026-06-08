import { useEffect, useState } from "react";
import axios from "axios";
import "./Notes.css";

const API_URL = "https://sanalbahceproje.onrender.com";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");
  const plantId = localStorage.getItem("selectedPlantId");

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/notes/${plantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (plantId) fetchNotes();
  }, [plantId]);

  const addNote = async () => {
    if (!text) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/notes`,
        { plantId, text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes([res.data, ...notes]);
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="notes-page">

      <h1>📝 Bahçe Günlüğüm</h1>

      <div className="note-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Bugün ne yaptın?"
        />
        <button onClick={addNote}>Ekle</button>
      </div>

      <div className="notes-grid">

        {notes.map((note) => (
          <div className="note-card" key={note._id}>

            <div className="note-header">
              <span>📩 Günlük Not</span>

              <button onClick={() => deleteNote(note._id)}>
                🗑
              </button>
            </div>

            <p className="note-text">{note.text}</p>

            <small className="note-date">
              {new Date(note.createdAt).toLocaleString("tr-TR")}
            </small>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Notes;