import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";

const TablePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false); // State để quản lý modal
  const [newPosition, setNewPosition] = useState({
    code: "",
    name: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/teacher-positions");
        console.log("Dữ liệu nhận được:", response.data);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPosition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    try {
      const response = await axios.post("http://localhost:8080/api/teacher-positions", newPosition);
      console.log("Vị trí mới đã được tạo:", response.data);
      setData((prev) => [...prev, response.data]); // Cập nhật danh sách vị trí mới
      setModalOpen(false); // Đóng modal sau khi tạo thành công
      setNewPosition({ code: "", name: "", description: "", isActive: true }); // Reset form
    } catch (error) {
      setError("Có lỗi xảy ra khi tạo vị trí mới.");
      console.error("Error creating new position:", error);
    }
  };

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
        <button onClick={() => setModalOpen(true)}>Tạo mới</button> {/* Mở modal */}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="modal">
          <h2>Tạo mới vị trí công tác</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Mã:</label>
              <input
                type="text"
                name="code"
                value={newPosition.code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Tên:</label>
              <input
                type="text"
                name="name"
                value={newPosition.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Mô tả:</label>
              <input
                type="text"
                name="description"
                value={newPosition.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Trạng thái:</label>
              <select
                name="isActive"
                value={newPosition.isActive}
                onChange={(e) => setNewPosition({ ...newPosition, isActive: e.target.value === "true" })}
              >
                <option value={true}>Hoạt động</option>
                <option value={false}>Không hoạt động</option>
              </select>
            </div>
            <button type="submit">Lưu</button>
            <button type="button" onClick={() => setModalOpen(false)}>Đóng</button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>MÃ</th>
            <th>TÊN</th>
            <th>Trạng thái</th>
            <th>MÔ TẢ</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.code}>
                <td>{index + 1}</td>
                <td>{item.code || "Chưa có mã"}</td>
                <td>{item.name || "Chưa có tên"}</td>
                <td>
                  <span className="status">{item.isActive ? "Hoạt động" : "Không hoạt động"}</span>
                </td>
                <td>{item.description || "Chưa có mô tả"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có dữ liệu để hiển thị</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">Tổng: 1 2 3 ... 10 / trang</div>
    </div>
  );
};

export default TablePage;



