import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";

const TablePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/teachers");
        console.log("Dữ liệu nhận được:", response.data); // In ra dữ liệu để kiểm tra
        setData(response.data);
      } catch (error) {
        setError("Có lỗi xảy ra khi lấy dữ liệu.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
            <th>STT</th>
            <th>MÃ</th>
            <th>TÊN</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.code}>
                <td>{item.code}</td>
                <td>{item.name || "Chưa có tên"}</td> {/* Nếu có trường tên */}
                <td>{item.education[0]?.type || "Chưa có trình độ"}</td>
                <td>{item.positions.length > 0 ? item.positions.join(", ") : "Chưa có bộ môn"}</td>
                <td>{item.isActive ? "Đang làm việc" : "Không hoạt động"}</td>
                <td>{item.address || "Chưa có địa chỉ"}</td>
                <td>
                  <span className="status">{item.isActive ? "Hoạt động" : "Không hoạt động"}</span>
                </td>
                <td>
                  <button>Chi tiết</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Không có dữ liệu để hiển thị</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">Tổng: 1 2 3 ... 10 / trang</div>
    </div>
  );
};

export default TablePage;

