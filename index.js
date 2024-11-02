const express = require("express");
const app = express();
const QRCode = require("qrcode");
const BodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));   
app.use(BodyParser.json())


app.get("/", (req, res) => {
    res.send(`
        <form action="/" method="post">
            <input type="text" name="nama" placeholder="Nama" required />
            <button type="submit">Generate QR Code</button>
        </form>
    `);
});

app.post("/", (req, res) => {
    const nama = req.body.nama;

    if (typeof nama !== 'string' || nama.trim() === '') {
        return res.status(400).send('Nama harus berupa string yang valid');
    }

    QRCode.toString(nama, { type: 'svg', width: 500 }, (err, url) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).send('Error generating QR code');
        }

        res.send(`
            <div>
                ${url}
                <p>Telah membuat QR code untuk ${nama}</p>
            </div>
        `);
    });
});


// app.get("/", (req, res) => {
//     res.send(`
//         <form action="/hasil" method="post" >
//             <input type="text" name="nama" placeholder="Nama" required />
//             <button type="submit">Generate QR Code</button>
//         </form>`
//     )
// })

// app.post("/hasil", (req, res) => {
//     const  nama  = req.body.nama;

//     QRCode.toString( nama , { type:'svg', width:500 }, function (err, url) {
//         if (err) {
//             console.error('Error generating QR code:', err);
//             res.status(500).send('Error generating QR code');
//         } 
//         res.send(
//             url,
//         `telah membuat qr code untuk ${nama}`
            
//         );
        
//     })
// })


app.get("/qrcode", (req, res) => {
    QRCode.toDataURL(req.query.data, (err, url) => {
        if (err) {
            console.log(err);
        } else {
            res.send(url);
        }
    });
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})