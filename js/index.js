function dom(params) {
    return document.querySelector(params);
}

// =====================================
let nhanViens = [];

// Thêm mới nhân viên
function addNV() {
    // DOM
    let account = dom("#tknv").value,
        name = dom("#name").value,
        email = dom("#email").value,
        password = dom("#password").value,
        date = dom("#datepicker").value,
        salary = dom("#luongCB").value,
        position = dom("#chucvu").value,
        hour = dom("#gioLam").value;

    // tạo object nhan vien
    let nhanVien = new NhanVien(account, name, email, password, date, salary, position, hour);

    // Thêm nhân viên vào danh sách
    nhanViens.push(nhanVien);

    resetInput();

    // Xuất thông tin ra màn hình
    display(nhanViens);
}

// select nhan vien
function edit(account) {
    let nhanVien = nhanViens.find((result) => {
        return account === result.account;
    })

    if (!nhanVien) {
        return;
    }
    dom("#tknv").value = nhanVien.account,
        dom("#name").value = nhanVien.name,
        dom("#email").value = nhanVien.email,
        dom("#password").value = nhanVien.password,
        dom("#datepicker").value = nhanVien.date,
        dom("#luongCB").value = nhanVien.salary,
        dom("#chucvu").value = nhanVien.position,
        dom("#gioLam").value = nhanVien.hour;

    dom("#tknv").disabled = true;
    dom("#btnThemNV").disabled = true;
}

// Xóa nhân viên
function deleteNV(params) {
    nhanVien = nhanViens.filter((nhanVien) => {
        return params !== nhanVien.account;
    })
    display(nhanVien);
}

// Cập nhật nhân viên
function updateNV() {
    // DOM
    let account = dom("#tknv").value,
        name = dom("#name").value,
        email = dom("#email").value,
        password = dom("#password").value,
        date = dom("#datepicker").value,
        salary = dom("#luongCB").value,
        position = dom("#chucvu").value,
        hour = dom("#gioLam").value;

    // tạo object nhan vien
    let nhanVien = new NhanVien(account, name, email, password, date, salary, position, hour);

    let index = nhanViens.findIndex((item) => item.account === nhanVien.account)
    nhanViens[index] = nhanVien;

    display(nhanViens);

    resetInput();
}

// Search nhân vien
dom("#btnTimNV").onclick = function () {
    let searchValue = dom("#searchName").value;
    searchValue = searchValue.toLowerCase();
    if (!searchValue) {
        display(nhanViens);
        return;
    }
    let newNhanVien = nhanViens.filter((nhanVien) => {
        let xepLoai = nhanVien.rate().toLowerCase();
        return xepLoai.includes(searchValue);
    });
    display(newNhanVien);
}
// =====================================

// Contructors nhân viên
function NhanVien(account, name, email, password, date, salary, position, hour) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.date = date;
    this.salary = salary;
    this.position = position;
    this.hour = hour;
}

NhanVien.prototype.sumSalary = function () {
    let current = new Intl.NumberFormat("vn-VN");
    if (this.position === "Sếp") {
        return current.format(this.salary * 3)+" VNĐ";
    }
    if (this.position === "Trưởng phòng") {
        return current.format(this.salary * 2)+" VNĐ";
    }
    else {
        return current.format(this.salary * 1)+" VNĐ";
    }
}

// 
NhanVien.prototype.rate = function () {
    if (this.hour >= 192) {
        return "Xuất sắc"
    }
    if (this.hour >= 176) {
        return "Giỏi"
    }
    if (this.hour >= 160) {
        return "Khá"
    }
    else {
        return "Trung bình"
    }
}
// =====================================

// Xuất ra màn hình 
function display(params) {
    let html = params.reduce((result, nhanVien) => {
        return result + `<tr>
        <td>${nhanVien.account}</td>
        <td>${nhanVien.name}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.date}</td>
        <td>${nhanVien.position}</td>
        <td>${nhanVien.sumSalary()}</td>
        <td>${nhanVien.rate()}</td>
        <td>
            <button onclick="edit('${nhanVien.account}')" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Edit</button>
            <button onclick="deleteNV('${nhanVien.account}')" class="btn btn-danger">Delete</button>     
        </td> 
        </tr>`
    }, "")
    dom("#tableDanhSach").innerHTML = html;
}

// reset form inputs
function resetInput() {
    dom("#tknv").value = "",
        dom("#name").value = "",
        dom("#email").value = "",
        dom("#password").value = "",
        dom("#datepicker").value = "",
        dom("#luongCB").value = "",
        dom("#chucvu").value = "",
        dom("#gioLam").value = "";
}