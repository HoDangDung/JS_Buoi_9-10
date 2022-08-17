// =============== Validation =================

// Validation kiểm tra tài khoản 
function validateAcc() {
    let account = dom("#tknv").value,
        spanEl = dom("#tbTKNV");
    spanEl.style.display = "block";
    // Kiểm tra rỗng
    if (!account) {
        spanEl.innerHTML = "Tài khoản không được để trống";
        return false;
    }

    // Kiểm tra số lượng ký tự
    if (account.length < 4 || account.length > 6) {
        spanEl.innerHTML = "Tài khoản phải từ 4 - 6 ký tự";
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

// Validation kiểm tra tên nhân viên
function validateName() {
    let name = dom("#name").value,
        spanEl = dom("#tbTen");
    spanEl.style.display = "block";

    // Kiểm tra rỗng
    if (!name) {
        spanEl.innerHTML = "Tên không được để trống";
        return false;
    }

    // Kiểm tra định dạng name
    let regex = /^[1-9]{2,}/;
    if (regex.test(name)) {
        spanEl.innerHTML = "Tên không được có ký tự số";
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

// Validation kiểm tra email
function validateEmail() {
    let email = dom("#email").value,
        spanEl = dom("#tbEmail");
    spanEl.style.display = "block";

    // Kiểm tra rỗng
    if (!email) {
        spanEl.innerHTML = "Email không được để trống"
        return false;
    }

    // Kiểm tra định dạng của email
    let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    if (!regex.test(email)) {
        spanEl.innerHTML = "Email không đúng định dạng"
        return false;
    }

    spanEl.innerHTML = "";
    return true;
}

// Validation kiểm tra mật khẩu
function validatePass() {
    let pass = dom("#password").value,
        spanEl = dom("#tbMatKhau");
    spanEl.style.display = "block";

    // Kiểm tra rỗng
    if (!pass) {
        spanEl.innerHTML = "Mật khẩu không được để trống"
        return false;
    }

    // Kiểm tra đinh dạng mật khẩu
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!regex.test(pass)) {
        spanEl.innerHTML = "Mật khẩu từ 6-10 ký tự (chứa ký tự số, ký tự in hoa, ký tự đặc biệt)"
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

// Validation kiểm tra ngày làm
function validateDate() {
    let date = dom("#datepicker").value,
        spanEl = dom("#tbNgay");
    spanEl.style.display = "block";

    // Kiểm tra rỗng
    if (!date) {
        spanEl.innerHTML = "Ngày làm không để trống";
        return false;
    }

    // Kiểm tra định dạng ngày làm
    let regex = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/
    if (!regex.test(date)) {
        spanEl.innerHTML = "Ngày làm định dạng mm/dd/yyyy";
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

// Validation kiểm tra lương cơ bản
function validateSalary() {
    let salary = dom("#luongCB").value,
        spanEl = dom("#tbLuongCB");
    spanEl.style.display = "block";

    // Kiểm tra rỗng
    if (!salary) {
        spanEl.innerHTML = "Lương không được để trống"
        return false;
    }

    // Kiểm tra số tiền nhập vào
    if (salary < 1000000 || salary > 20000000) {
        spanEl.innerHTML = "Lương từ 1 000 000 - 20 000 000"
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

// Validation kiểm tra chức vụ
function validatePosition() {
    let position = dom("#chucvu").value,
        spanEl = dom("#tbChucVu");
    spanEl.style.display = "block";

    // Kiểm tra chức vụ
    if (position === "Chọn chức vụ") {
        spanEl.innerHTML = "Chọn chức vụ hợp lệ";
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

// Validation kiểm tra số giờ làm trong tháng
function validateHour() {
    let hour = dom("#gioLam").value,
        spanEl = dom("#tbGiolam");
    spanEl.style.display = "block";

    // Kiểm tra rỗng
    if (!hour) {
        spanEl.innerHTML = "Giờ làm không để trống"
        return false;
    }

    // Kiểm tra số giờ làm
    if (hour < 80 || hour > 200) {
        spanEl.innerHTML = "Giờ làm hợp lệ 80 - 200"
        return false;
    }
    spanEl.innerHTML = "";
    return true;
}

// Hàm kiểm tra form có hợp lệ hay không, return về true/false
function validateForm() {
    let isValid = true;
    isValid = validateAcc() & validateName() & validateEmail() & validatePass()
        & validateDate() & validateSalary() & validatePosition() & validateHour();
    if (!isValid) {
        return false;
    }
    return true;
}