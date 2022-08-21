function dom(params) {
    return document.querySelector(params);
}

// =====================================
let nhanViens = [];
init();

function init() {
    // Lấy dữ liệu từ localStorage
    nhanViens = JSON.parse(localStorage.getItem("nhanVien")) || [];
    nhanViens = nhanViens.map((nhanVien) => {
        return new NhanVien(nhanVien.account, nhanVien.name, nhanVien.email, nhanVien.password,
            nhanVien.date, nhanVien.salary, nhanVien.position, nhanVien.hour);
    })
    console.log(nhanViens);
    display(nhanViens);
}



// Button thêm mới nhân viên
dom("#btnThem").onclick = () => {
    dom("#tknv").disabled = false;
    dom("#btnThemNV").disabled = false;
    return resetInput();
}

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

    let isValid = validateForm();
    // Kiểm tra nếu form không hợp lệ => kết thúc hàm
    if (!isValid) {
        return;
    }

    // tạo object nhan viên
    let nhanVien = new NhanVien(account, name, email, password, date, salary, position, hour);

    // Thêm nhân viên vào danh sách
    nhanViens.push(nhanVien);
    localStorage.setItem("nhanVien", JSON.stringify(nhanViens));

    resetInput();

    // Xuất thông tin ra màn hình
    display(nhanViens);
}

// select nhan vien
function selecterNV(account) {
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
    // Disable input taikhoan và nút thêm nhân viên
    dom("#tknv").disabled = true;
    dom("#btnThemNV").disabled = true;
}

// Xóa nhân viên
function deleteNV(params) {
    nhanViens = nhanViens.filter((nhanVien) => {
        return params !== nhanVien.account;
    })
    localStorage.setItem("nhanVien", JSON.stringify(nhanViens));
    display(nhanViens);
}

// Cập nhật nhân viên
function updateNV() {
    // DOM
    let account = dom("#tknv").value,
        name = dom("#name").value,
        email = dom("#email").value,
        password = dom("#password").value,
        date = dom("#datepicker").value,
        salary = dom("#luongCB").value * 1,
        position = dom("#chucvu").value,
        hour = dom("#gioLam").value * 1;

    let isValid = validateForm();
    // Kiểm tra nếu form không hợp lệ => kết thúc hàm
    if (!isValid) {
        return;
    }

    // tạo object nhan vien
    let nhanVien = new NhanVien(account, name, email, password, date, salary, position, hour);

    let index = nhanViens.findIndex((item) => item.account === nhanVien.account)
    nhanViens[index] = nhanVien;

    localStorage.setItem("nhanVien", JSON.stringify(nhanViens));
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
            <button onclick="selecterNV('${nhanVien.account}')" class="btn btn-primary mb-2" data-toggle="modal" data-target="#myModal">Edit</button>
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
        dom("#chucvu").value = "Chọn chức vụ",
        dom("#gioLam").value = "";
}

