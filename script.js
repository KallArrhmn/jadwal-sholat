// Fungsi untuk mendapatkan jadwal sholat berdasarkan lokasi
function getPrayerTimes(lat, lon) {
    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`; // method=2 adalah MWL

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                displayPrayerTimes(data.data.timings);
            } else {
                alert("Tidak dapat menemukan data waktu sholat.");
            }
        })
        .catch(error => {
            console.error("Terjadi kesalahan:", error);
            alert("Terjadi kesalahan saat mengambil data.");
        });
}

// Fungsi untuk menampilkan waktu sholat di halaman
function displayPrayerTimes(times) {
    document.getElementById("fajr").textContent = times.Fajr;
    document.getElementById("dhuhr").textContent = times.Dhuhr;
    document.getElementById("asr").textContent = times.Asr;
    document.getElementById("maghrib").textContent = times.Maghrib;
    document.getElementById("isha").textContent = times.Isha;
}

// Fungsi untuk mendapatkan nama kota menggunakan OpenWeatherMap API
function getCityName(lat, lon) {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Gantilah dengan API Key OpenWeatherMap Anda
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const cityName = data.name;
            document.getElementById("city-name").textContent = cityName;
        })
        .catch(error => {
            console.error("Terjadi kesalahan mendapatkan nama kota:", error);
            document.getElementById("city-name").textContent = "Lokasi tidak ditemukan";
        });
}

// Fungsi untuk mendapatkan lokasi pengguna menggunakan Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Menampilkan latitude dan longitude
            document.getElementById("latitude").textContent = lat;
            document.getElementById("longitude").textContent = lon;

            // Mendapatkan nama kota
            getCityName(lat, lon);

            // Mendapatkan waktu sholat berdasarkan lokasi
            getPrayerTimes(lat, lon);
        }, function(error) {
            alert("Tidak dapat mendeteksi lokasi.");
        });
    } else {
        alert("Geolocation tidak didukung oleh browser ini.");
    }
}

// Memanggil fungsi getLocation saat halaman dimuat
getLocation();