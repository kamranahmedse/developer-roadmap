const express = require('express');
const cors = require('cors');
const compression = require('compression');
const jwt = require('jsonwebtoken'); // JWT kütüphanesini ekleyin

const app = express();
const SECRET_KEY = 'your_secret_key'; // Güvenli bir anahtar belirleyin

// Middleware'ler
app.use(cors({
    origin: ['https://legendary-disco-pjww576pvjpq37xg7-4321.app.github.dev', 'https://legendary-disco-pjww576pvjpq37xg7-5500.app.github.dev'], // İzin verilen kökenler
    methods: ['GET', 'POST'], // İzin verilen HTTP metodları
    credentials: true, // Çerezlerin gönderilmesine izin ver
}));
app.use(express.json()); // JSON gövdesini ayrıştırmak için
app.use(compression());
app.use((req, res, next) => {
    res.cookie('exampleCookie', 'value', {
        httpOnly: true,
        secure: true,
        sameSite: 'None', // Üçüncü taraf çerezler için gerekli
    });
    next();
});

// Kök URL için bir uç nokta
app.get('/', (req, res) => {
    res.send('Welcome to the AI Tutor API!');
});

// Login uç noktası
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Basit bir kullanıcı doğrulama (örnek)
    if (username === 'admin' && password === 'password') {
        // Kullanıcı bilgileriyle bir JWT oluştur
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// JWT doğrulama middleware'i
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1] || req.query.token; // Bearer token veya URL parametresi

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user; // Doğrulanmış kullanıcıyı isteğe ekle
        next();
    });
}

// Korunan bir uç nokta
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}! This is a protected route.` });
});

// AI Tutor uç noktası
app.get('/ai-tutor', authenticateToken, (req, res) => {
    res.json({ message: `Welcome to AI Tutor, ${req.user.username}!` });
});

// Yeni bir AI Tutor fonksiyonu
app.post('/ai-tutor/calculate', authenticateToken, (req, res) => {
    const { input } = req.body;
    if (!input) {
        return res.status(400).json({ message: 'Input is required' });
    }

    // Örnek bir hesaplama işlemi
    const result = `Processed input: ${input}`;
    res.json({ result });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3001; // 3001 numaralı portu kullan
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));