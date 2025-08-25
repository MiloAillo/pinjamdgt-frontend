<?php
header("Access-Control-Allow-Origin:http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

class Rental {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function tambahPelanggan($data) {
        $nama = $data['nama'] ?? "";
        $alamat = $data['alamat'] ?? "";
        $noTelp = $data['noTelp'] ?? "";
        $jenisMember = $data['jenisMember'] ?? "";

        if (empty($nama) || empty($alamat) || empty($noTelp) || empty($jenisMember)) {
            return ["status" => "error", "message" => "Semua field harus diisi"];
        }

        $query = "INSERT INTO pelanggan(nama,alamat,noTelp,jenisMember) VALUES ('$nama','$alamat','$noTelp','$jenisMember')";
        $cek = $this->db->execute($query);
        return $cek ? ["status" => "success"] : ["status" => "error", "message" => $this->db->conn->error];
    }

    public function pinjam($data) {
        $idPelanggan = $data['userId'] ?? null;
        $idItem = $data['itemId'] ?? null;
        $subtotal = $data['subtotal'] ?? 0;
        $jenisMember = $data['jenisMember'] ?? null;

        if (!$idPelanggan || !$idItem) {
            return ["status" => "error", "message" => "Data peminjaman tidak lengkap"];
        }

        // hitung total berdasarkan jenisMember
        $total = ($jenisMember === 'premium') ? $subtotal * 0.95 : $subtotal;

        $sql = "INSERT INTO peminjaman (idPelanggan, idItem, subtotal, status) VALUES ('$idPelanggan', '$idItem', '$total', 'dipinjam')";
        $cek = $this->db->execute($sql);

        if ($cek) {
            $status = "UPDATE item SET status = 'dipinjam' WHERE idItem = '$idItem'";
            $this->db->execute($status);
            return ["status" => "success"];
        }
        return ["status" => "error", "message" => $this->db->conn->error];
    }

    public function kembalikan($data) {
        $idPeminjaman = $data['pinjamanId'] ?? null;
        $itemId = $data['itemId'] ?? null;

        if ($idPeminjaman) {
            $sql = "UPDATE peminjaman SET status = 'selesai' WHERE idPeminjaman = '$idPeminjaman'";
            $this->db->execute($sql);
        }
        if ($itemId) {
            $sql = "UPDATE item SET status = 'tersedia' WHERE idItem = '$itemId'";
            $this->db->execute($sql);
        }
        return ["status" => "success"];
    }

    public function itemsAvailable() {
        $sql = "SELECT * FROM item WHERE status = 'tersedia'";
        return $this->db->getData($sql);
    }

    public function fetchingAwal() {
        $sql = "SELECT * FROM pelanggan";
        $response = $this->db->getData($sql);

        $pinjaman = "SELECT peminjaman.idPeminjaman, peminjaman.idPelanggan, peminjaman.idItem, 
                            item.brand, item.model, item.harga, peminjaman.subtotal 
                     FROM peminjaman 
                     JOIN item ON peminjaman.idItem = item.idItem 
                     WHERE peminjaman.status = 'dipinjam'";
        $peminjaman = $this->db->getData($pinjaman);

        return [
            "pelanggan" => $response,
            "pinjaman" => $peminjaman
        ];
    }
}

class db {
    private $host = "localhost";
    private $user = "root";
    private $pass = "yangtautauaja";
    private $db   = "rentaldgt";
    public $conn;

    public function __construct() {
        $this->connect();
    }

    private function connect() {
        $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->db);
        if ($this->conn->connect_error) {
            die("Koneksi gagal: " . $this->conn->connect_error);
        }
    }

    public function getData($sql) {
        $result = $this->conn->query($sql);
        $data = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    public function execute($sql) {
        return $this->conn->query($sql);
    }

    public function close() {
        $this->conn->close();
    }
}

// =================== CONTROLLER PART ===================
$db = new db();
$rental = new Rental($db);

$route = $_GET['route'] ?? null;
$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);

    if ($route === "tambahPelanggan") {
        echo json_encode($rental->tambahPelanggan($data));
    }
    if ($route === "pinjam") {
        echo json_encode($rental->pinjam($data));
    }
    if ($route === "kembalikan") {
        echo json_encode($rental->kembalikan($data));
    }
}

if ($method === "GET") {
    if ($route === "itemsAvailable") {
        echo json_encode($rental->itemsAvailable());
    }
    if ($route === "fetchingAwal") {
        echo json_encode($rental->fetchingAwal());
    }
}
