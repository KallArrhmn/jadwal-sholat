//Ambil waktu secara realtime
const currentTime = new Date()
const getYear = currentTime.getFullYear()
const getMont = currentTime.getMonth() + 1
const getDate = currentTime.getDate()

function formattedMont() {
    if (getMont < 10) {
        mont = `0${getMont}`
    } else {
        mont = getMont
    }
    return mont
}

function formattedDate() {
    if (getDate < 10) {
        date = `0${getDate}`
    } else {
        date = getDate
    }
    return date
}

const tanggal = `${getYear}-${formattedMont()}-${formattedDate()}`
console.log(`${getYear}-${formattedMont()}-${formattedDate()}`)

function getJadwalSholat() {
    fetch('https://api.myquran.com/v2/sholat/jadwal/1104/' + tanggal)

    .then(res => res.json())
        .then(data => {
            const jadwal = data.data.jadwal
            document.getElementById('imsak').textContent = jadwal.imsak
            document.getElementById('shubuh').textContent = jadwal.subuh
            document.getElementById('terbit').textContent = jadwal.terbit
            document.getElementById('dhuha').textContent = jadwal.dhuha
            document.getElementById('dzuhur').textContent = jadwal.dzuhur
            document.getElementById('ashar').textContent = jadwal.ashar
            document.getElementById('maghrib').textContent = jadwal.maghrib
            document.getElementById('isya').textContent = jadwal.isya
        })
}

getJadwalSholat()

// Tetapkan tahun saat ini di footer secara dinamis
document.getElementById('current-year').textContent = new Date().getFullYear();