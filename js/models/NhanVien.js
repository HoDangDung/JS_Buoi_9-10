// =========== Contructors nhân viên =================
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
        return current.format(this.salary * 3) + " VNĐ";
    }
    if (this.position === "Trưởng phòng") {
        return current.format(this.salary * 2) + " VNĐ";
    }
    else {
        return current.format(this.salary * 1) + " VNĐ";
    }
}

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