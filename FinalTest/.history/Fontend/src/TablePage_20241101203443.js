import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";

const TablePage = () => {
  const [data, setData] = useState([]); // Khởi tạo state cho dữ liệu

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/teachers"); // Gọi API
        setData(response.data); // Cập nhật state với dữ liệu nhận được
      } catch (error) {
        console.error("Error fetching data:", error); // In lỗi nếu có
      }
    };

    fetchData(); // Gọi hàm fetchData khi component mount
  }, []);

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
            <tr key={item.code}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.education?.type}</td>
              <td>{item.position.map((pos) => pos.name).join(", ")}</td>
              <td>{item.isActive ? "Đang làm việc" : "Không hoạt động"}</td>
              <td>{item.address}</td>
              <td>
                <span className="status">{item.isActive ? "Hoạt động" : "Không hoạt động"}</span>
              </td>
              <td>
                <button>Chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">Tổng: 1 2 3 ... 10 / trang</div>
    </div>
  );
};

export default TablePage;


