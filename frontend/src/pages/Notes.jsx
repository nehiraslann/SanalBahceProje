import { useEffect, useState } from "react";
import axios from "axios";
import "./Notes.css";

const API_URL = "https://sanalbahceproje.onrender.com";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [plants, setPlants] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState("");
  const [text, setText] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");


  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const token = localStorage.getItem("token");

  const fetchPlants = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/plants`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPlants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNotes = async (plantId) => {
    if (!plantId) return;

    try {
      const res = await axios.get(
        `${API_URL}/api/notes/${plantId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    if (selectedPlantId) fetchNotes(selectedPlantId);
  }, [selectedPlantId]);

 
  const addNote = async () => {
    if (!text || !selectedPlantId) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/notes`,
        { plantId: selectedPlantId, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotes([res.data, ...notes]);
      setText("");
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Bir hata oluştu");
      setShowError(true);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Silme işlemi başarısız");
      setShowError(true);
    }
  };

  
  const startEdit = (note) => {
    setEditingId(note._id);
    setEditText(note.text);
  };

  const updateNote = async (id) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/notes/${id}`,
        { text: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotes(notes.map((n) => (n._id === id ? res.data : n)));

      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Güncelleme başarısız");
      setShowError(true);
    }
  };

  return (
    <div className="notes-page">

      <h1> Bahçe Günlüğüm</h1>

     
      <div className="plant-select-box">
        <select
          value={selectedPlantId}
          onChange={(e) => setSelectedPlantId(e.target.value)}
        >
          <option value="">🌱 Bitki seç</option>
          {plants.map((plant) => (
            <option key={plant._id} value={plant._id}>
              {plant.name}
            </option>
          ))}
        </select>
      </div>

      
      <div className="note-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Bugün ne yaptın?"
          disabled={!selectedPlantId}
        />

        <button onClick={addNote} disabled={!selectedPlantId}>
          Ekle
        </button>
      </div>

      {!selectedPlantId && (
        <p className="warning">
          Lütfen önce bir bitki seç
        </p>
      )}

    
      <div className="notes-grid">

        {notes.map((note) => (
          <div className="note-card" key={note._id}>

            <div className="note-header">
              <span>📩 Günlük Not</span>

              <div>
                <button onClick={() => startEdit(note)}>✏️</button>
                <button onClick={() => deleteNote(note._id)}>🗑</button>
              </div>
            </div>

            {editingId === note._id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button onClick={() => updateNote(note._id)}>
                  Kaydet
                </button>

                <button onClick={() => setEditingId(null)}>
                  İptal
                </button>
              </>
            ) : (
              <p className="note-text">{note.text}</p>
            )}

            <small className="note-date">
              {new Date(note.createdAt).toLocaleString("tr-TR")}
            </small>

          </div>
        ))}

      </div>

      
      {showError && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>⚠️ Hata</h3>
            <p>{error}</p>

            <button onClick={() => setShowError(false)}>
              Tamam
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Notes;