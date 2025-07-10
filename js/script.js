// Array menyimpan semua tugas
let tasks = [];

// Mengambil elemen dari HTML berdasarkan ID-nya
const taskInput = document.getElementById("task-input"); // Input teks tugas
const dueDateInput = document.getElementById("due-date-input"); // Input tanggal
const todoForm = document.getElementById("todo-form"); // Formulir tambah tugas
const todoList = document.getElementById("todo-list"); // Tempat menampilkan daftar tugas
const showAllBtn = document.getElementById("show-all-btn"); // Tombol lihat semua tugas
const showCompletedBtn = document.getElementById("show-completed-btn"); // Tombol lihat tugas selesai
const deleteAllBtn = document.getElementById("delete-all-btn"); // Tombol hapus semua tugas

// Status filter saat ini: "all" untuk semua, "completed" untuk tugas selesai saja
let currentFilter = "all";

// Tombol Tambah diklik
todoForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Mencegah reload

  const title = taskInput.value.trim(); // Ambil dan rapikan teks tugas
  const dueDate = dueDateInput.value; // Ambil nilai tanggal

  // Validasi input kosong
  if (title === "" || dueDate === "") {
    alert("Harap isi semua kolom!");
    return;
  }

  // Buat objek tugas baru
  const newTask = {
    id: Date.now(), // ID unik berdasarkan waktu saat ini
    title,
    dueDate,
    completed: false // Status awal belum selesai
  };

  // Tambahkan ke array tugas
  tasks.push(newTask);

  // Reset form input
  taskInput.value = "";
  dueDateInput.value = "";

  // Render ulang daftar tugas
  renderTasks();
});

// Tombol Lihat Semua Tugas
showAllBtn.addEventListener("click", function () {
  currentFilter = "all";
  renderTasks();
});

// Tombol Lihat Tugas Selesai
showCompletedBtn.addEventListener("click", function () {
  currentFilter = "completed";
  renderTasks();
});

// Tombol Hapus Semua
deleteAllBtn.addEventListener("click", function () {
  if (confirm("Yakin ingin menghapus semua tugas?")) {
    tasks = []; // Kosongkan array tugas
    renderTasks();
  }
});

// Fungsi untuk menampilkan daftar tugas
function renderTasks() {
  todoList.innerHTML = ""; // Bersihkan tampilan sebelumnya

  // Filter tugas berdasarkan status
  let filteredTasks = currentFilter === "completed"
    ? tasks.filter((task) => task.completed)
    : tasks;

  // Jika tidak ada tugas, tampilkan pesan kosong
  if (filteredTasks.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="4" class="text-center py-4 text-gray-400">Tidak ada tugas ditemukan</td>
    `;
    todoList.appendChild(row);
    return;
  }

  // Tampilkan setiap tugas sebagai baris tabel
  filteredTasks.forEach((task) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="px-4 py-2 ${task.completed ? 'line-through text-green-400' : ''}">${task.title}</td>
      <td class="px-4 py-2">${task.dueDate}</td>
      <td class="px-4 py-2">
        ${task.completed ? "Selesai" : "Belum"}
      </td>
      <td class="px-4 py-2 space-x-2">
        <button onclick="toggleComplete(${task.id})" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs">
          Tandai ${task.completed ? "Belum" : "Selesai"}
        </button>
        <button onclick="deleteTask(${task.id})" 
          class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs">
          Hapus
        </button>
      </td>
    `;

    todoList.appendChild(row);
  });
}

// Fungsi untuk mengubah status tugas
function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks(); // Render ulang tampilan
}

// Fungsi untuk menghapus 1 tugas berdasarkan ID nya
function deleteTask(id) {
  if (confirm("Yakin ingin menghapus tugas ini?")) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks(); // Render ulang tampilan
  }
}
