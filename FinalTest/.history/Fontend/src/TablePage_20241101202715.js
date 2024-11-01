import React, { useEffect, useState } from "react"; // Import useEffect và useState
import axios from "axios"; // Import axios
import "./Style.css";

const TablePage = () => {
  const [data, setData] = useState([]); // State để lưu trữ dữ liệu giáo viên
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải
  const [error, setError] = useState(null); // State để lưu thông báo lỗi

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/teachers"); // Gọi API
        setData(response.data); // Cập nhật dữ liệu vào state
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu giáo viên."); // Cập nhật lỗi nếu có
      } finally {
        setLoading(false); // Đánh dấu đã hoàn thành tải
      }
    };

    fetchTeachers(); // Gọi hàm fetchTeachers khi component được render
  }, []); // Mảng phụ thuộc rỗng để gọi một lần khi mount

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị khi đang tải
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị thông báo lỗi
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
            <tr key={item.code}> {/* Sử dụng code làm key */}
              <td>{item.code}</td>
              <td>{item.name}</td> {/* Sử dụng name từ response */}
              <td>{item.education.type}</td> {/* Sử dụng loại bằng từ thông tin giáo viên */}
              <td>{item.position.map(pos => pos.name).join(', ')}</td> {/* Hiển thị tên vị trí */}
              <td>{item.department || "Chưa có"}</td> {/* Hiển thị bộ môn nếu có, nếu không hiển thị "Chưa có" */}
              <td>{item.address}</td>
              <td>
                <span className={`status ${item.isActive ? 'active' : 'inactive'}`}>
                  {item.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                </span>
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

