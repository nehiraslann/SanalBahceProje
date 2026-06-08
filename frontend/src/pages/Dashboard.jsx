import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

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
          "http://localhost:5000/api/plants",
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

  const addPlant = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/plants",
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
      alert("Hata oluştu");
    }
  };

  const deletePlant = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/plants/${id}`,
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
                setWaterInterval(e.target.value)
              }
            />

            <div className="modal-buttons">

              <button onClick={addPlant}>
                Kaydet
              </button>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                İptal
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;