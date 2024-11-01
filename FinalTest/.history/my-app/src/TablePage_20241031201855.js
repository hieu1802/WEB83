import React from "react";
import "./Style.css"

const TablePage = () => {
  const data = [
    {
      id: "0796333082",
      teacher: "Phạm Đức Trung",
      email: "phamductrung@school.edu.vn",
      phone: "0796333082",
      degree: "Thạc sĩ",
      major: "Chuyên ngành Y Đa Khoa",
      department: "Cán Bộ Y Tế",
      address: "Hà Nội",
      status: "Đang công tác",
    },
    // Thêm dữ liệu mẫu cho các hàng khác
  ];

  return (
    <div className="table-container">
      <h1>Giao diện</h1>
      <div className="table-actions">
        <input type="text" placeholder="Tìm kiếm thông tin" />
        <button>Tải lại</button>
        <button>Tạo mới</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Giáo viên</th>
            <th>Trình độ (cao nhất)</th>
            <th>Bộ môn</th>
            <th>TT Công tác</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.teacher}</td>
              <td>{item.degree}</td>
              <td>{item.major}</td>
              <td>{item.department}</td>
              <td>{item.address}</td>
              <td>
                <span className="status">{item.status}</span>
              </td>
              <td>
                <button>Chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">Tổng:1 2 3 ... 10 / trang</div>
    </div>
  );
};

export default TablePage;
