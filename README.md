#  Sanal Bahçem - MERN Stack Full Stack Proje

Sanal Bahçem, kullanıcıların bitkilerini dijital ortamda yönetebildiği, sulama takibi yapabildiği ve günlük notlar tutabildiği full-stack bir web uygulamasıdır.

---

##  Proje Özellikleri

- Kullanıcı kayıt / giriş sistemi (JWT Authentication)
- Bitki ekleme, güncelleme, silme ve listeleme (CRUD)
- Bitkiye özel günlük not sistemi
- Güvenli kullanıcı işlemleri (bcrypt + JWT)
- Responsive modern UI
- Gerçek zamanlı API entegrasyonu

---

##  Kullanılan Teknolojiler

### Frontend
- React.js
- React Router DOM
- Axios
- Context API / useState / useEffect
- CSS (Responsive Design)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcryptjs
- dotenv
- cors

### Database
- MongoDB Atlas

---

## Proje Yapısı

### Backend
controllers/
models/
routes/
middleware/
server.js

### Frontend
src/
  pages/
  components/
  utils/
  config.js


---

##  Kurulum Adımları

###  Projeyi klonla
```bash
git clone https://github.com/kullaniciadi/sanal-bahcem.git
cd backend
npm install

.env dosyası oluştur:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

npm start

cd frontend
npm install
npm run dev

Proje Mimarisi
MVC (Model - Controller - Routes)
RESTful API yapısı
Component-based React architecture
