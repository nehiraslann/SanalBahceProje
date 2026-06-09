import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const API_URL = "https://sanalbahceproje.onrender.com";

function Dashboard() {
  const navigate = useNavigate();

  const [plants, setPlants] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [waterInterval, setWaterInterval] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API_URL}/api/plants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlants(res.data);

      } catch (err) {
        console.log("Bitkiler alınamadı");
      }
    };

    fetchPlants();
  }, []);


  const [editMode, setEditMode] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const showError = (message) => {
  setErrorMessage(message);
  setShowErrorModal(true);
};

  const addPlant = async () => {
    try {

      if (!name.trim()) {
      showError("Bitki adı boş olamaz");
      return;
    }

    if (!type.trim()) {
      showError("Bitki türü boş olamaz");
      return;
    }

    if (!waterInterval) {
      showError("Sulama günü boş olamaz");
      return;
    }


      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/plants`,
        {
          name,
          type,
          waterInterval,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlants([...plants, res.data]);

      setShowModal(false);
      setName("");
      setType("");
      setWaterInterval("");

    } catch (err) {
      const message =
      err.response?.data?.message || "Bitki eklenemedi";

  showError(message);
}
  };

  const updatePlant = async () => {
  try {

    if (!name.trim()) {
      showError("Bitki adı boş olamaz");
      return;
    }

    if (!type.trim()) {
      showError("Bitki türü boş olamaz");
      return;
    }

    if (!waterInterval) {
      showError("Sulama günü boş olamaz");
      return;
    }


    const token = localStorage.getItem("token");

    const res = await axios.put(
      `${API_URL}/api/plants/${selectedPlantId}`,
      {
        name,
        type,
        waterInterval,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPlants(
      plants.map((p) =>
        p._id === selectedPlantId ? res.data : p
      )
    );

    setShowModal(false);
    setEditMode(false);
    setSelectedPlantId(null);

    setName("");
    setType("");
    setWaterInterval("");

  } catch (err) {
  const message =
    err.response?.data?.message || "Güncelleme hatası";

  showError(message);
}
};

  const deletePlant = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/plants/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlants(plants.filter((p) => p._id !== id));

    } catch (err) {
      alert("Silme hatası");
    }
  };

  const getIcon = (name) => {
    const lower = name.toLowerCase();

    if (lower.includes("domates")) return "🍅";
    if (lower.includes("salatalık")) return "🥒";
    if (lower.includes("biber")) return "🌶️";
    if (lower.includes("marul")) return "🥬";
    if (lower.includes("çilek")) return "🍓";
    if (lower.includes("limon")) return "🍋";
    if (lower.includes("lale")) return "🌷";
    if (lower.includes("maydanoz")) return "🌿";
    if (lower.includes("balkabağı")) return "🎃";

    return "🌱";
  };

  return (
    <div className="page">

      <div className="dashboard-card">

        <h1>🌿 Sanal Bahçem</h1>

        <button
          className="add-btn"
          onClick={() => setShowModal(true)}
        >
          + Yeni Bitki Ekle
        </button>

        <div className="plant-grid">

          {plants.length === 0 ? (
            <p>Henüz bitki yok 🌱</p>
          ) : (
            plants.map((plant) => (
              <div
                key={plant._id}
                className="plant-card"
              >

                <div className="plant-icon">
                  {getIcon(plant.name)}
                </div>

                <h3>{plant.name}</h3>

                <p>{plant.type}</p>

                <small>
                  Her {plant.waterInterval} günde bir sulanır
                </small>

                <button
                  className="note-btn"
                  onClick={() => {
                    localStorage.setItem(
                      "selectedPlantId",
                      plant._id
                    );

                    navigate("/notes");
                  }}
                >
                  📝 Günlük Aç
                </button>

                <button
                  className="edit-btn"
                  onClick={() => {
                  setEditMode(true);
                  setSelectedPlantId(plant._id);

                  setName(plant.name);
                  setType(plant.type);
                  setWaterInterval(plant.waterInterval);

                  setShowModal(true);
                  }}
>
                  Güncelle
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deletePlant(plant._id)}
                >
                  🗑 Sil
                </button>

              </div>
            ))
          )}

        </div>

      </div>

      {showModal && (
        <div className="modal-bg">

          <div className="modal">

            <h2>Yeni Bitki Ekle 🌱</h2>

            <input
              placeholder="Bitki adı"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Tür"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <input
              placeholder="Sulama günü"
              value={waterInterval}
              onChange={(e) =>
                setWaterInterval(Number(e.target.value))
              }
            />

            <div className="modal-buttons">

              <button
                onClick={
                 editMode
                  ? updatePlant
                  : addPlant
                }
              >
                 {editMode ? "Güncelle" : "Kaydet"}
              </button>

              <button
               onClick={() => {
                setShowModal(false);
                setEditMode(false);
                setSelectedPlantId(null);

                setName("");
                setType("");
                setWaterInterval("");
               }}
              >
                İptal
              </button>

            </div>

          </div>

        </div>
      )}

      {showErrorModal && (
  <div className="modal-bg">
    <div className="modal">

      <button
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
          background: "red",
          color: "white",
          border: "12px",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          cursor: "pointer"
        }}
        onClick={() => setShowErrorModal(false)}
      >
        ✖
      </button>

      <h3 style={{ color: "red" }}> Hata</h3>

      <p>{errorMessage}</p>

      <button className="ok-btn" onClick={() => setShowErrorModal(false)}>
        Tamam
      </button>

    </div>
  </div>
)}


    </div>
  );
}

export default Dashboard;