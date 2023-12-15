const multer = require("multer");
const { firestore, bucket } = require("../Firebase.js");
const { v4: uuidv4 } = require("uuid");

// Konfigurasi multer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  fileFilter: function (req, file, cb) {
    const allowedImageExtensions = ["jpg", "jpeg", "png"];

    // Check if the file extension is in the allowed list
    const fileExtension = file.originalname.split(".").pop().toLowerCase();
    if (allowedImageExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, JPEG, PNG, and GIF images are allowed."));
    }
  },
});

// Fungsi untuk menambahkan data product
async function AddProduct(req, res) {
  try {
    // Gunakan middleware multer untuk menangani upload gambar
    upload.single("image")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ success: false, error: "File size exceeds the maximum limit (2MB)." });
      } else if (err) {
        return res.status(500).json({ success: false, error: "Error uploading file." });
      }

      try {
        // Dapatkan data dari body request
        const {
          active,
          product_category,
          product_description,
          product_name,
          product_price,
          username,
        } = req.body;

        // Validate required fields
        if (!product_category || !product_name || !product_price || !username) {
          return res.status(400).json({ success: false, error: "Harap isi seluruh form" });
        }

        // Generate unique product_id using uuid
        const product_id = uuidv4();

        // Simpan gambar ke penyimpanan bucket
        const imageBuffer = req.file.buffer;
        const imageFileName = `${product_id}.jpg`; // Nama file unik menggunakan UUID
        const imageFile = bucket.file(imageFileName);
        const imageStream = imageFile.createWriteStream({
          metadata: {
            contentType: "image/jpeg",
          },
        });

        imageStream.on("error", (error) => {
          return res.status(500).json({ success: false, error: "Error uploading image." });
        });

        imageStream.on("finish", async () => {
          // Dapatkan URL gambar setelah diunggah
          const imageUrl = `https://storage.googleapis.com/${bucket.name}/${imageFileName}`;

          // Buat data untuk disimpan di Firestore
          const productData = {
            active: false,
            created_at: new Date(),
            image_url: imageUrl,
            product_category,
            product_description,
            product_id,
            product_name,
            product_price,
            username,
          };

          // Tambahkan data ke koleksi produk di Firestore
          await firestore.collection("product").add(productData);

          return res.status(201).json({ success: true, message: "Product added successfully." });
        });

        imageStream.end(imageBuffer);
      } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error." });
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error." });
  }
}

module.exports = {
  AddProduct,
};
