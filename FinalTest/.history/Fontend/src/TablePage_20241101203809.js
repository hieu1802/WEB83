import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";

const TablePage = () => {
  const [data, setData] = useState([]); // Khởi tạo state cho dữ liệu
  const [loading, setLoading] = useState(true); // Thêm state cho việc tải dữ liệu
  const [error, setError] = useState(null); // Thêm state cho lỗi

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/teachers");
        setData(response.data);
      } catch (error) {
        setError("Có lỗi xảy ra khi lấy dữ liệu."); // Cập nhật state lỗi
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Đặt loading là false sau khi hoàn tất
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading khi đang tải dữ liệu
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị thông báo lỗi nếu có
  }

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

export default TablePage
