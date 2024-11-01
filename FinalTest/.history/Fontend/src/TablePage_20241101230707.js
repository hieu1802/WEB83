import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style.css";

const TablePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    des: "",
    isActive: true, // Hoặc false, tùy vào lựa chọn mặc định
  });
  const [showModal, setShowModal] = useState(false); // State để điều khiển hiển thị modal

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    // Hàm lấy dữ liệu từ API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/teacher-positions");
        setData(response.data);
        setError("");
      } catch (error) {
        setError("Có lỗi xảy ra khi lấy dữ liệu.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:8080/api/teacher-positions", formData);
        fetchData(); // Lấy lại dữ liệu sau khi tạo thành công
        setFormData({ code: "", name: "", description: "", isActive: true });
      } catch (error) {
        setError("Có lỗi xảy ra khi tạo mới vị trí.");
        console.error("Error creating position:", error);
      }
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  return (
    <div className="table-container">
      <h1>Giao diện</h1>
      <div className="table-actions">
        <input type="text" placeholder="Tìm kiếm thông tin" />
        <button onClick={() => setShowModal(true)}>Tạo mới</button>
      </div>
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

      {/* Modal tạo mới */}
      {showModal && (
        <div className="modal">
          <h2>Tạo Mới Vị Trí Công Tác</h2>
          <form onSubmit={handleSubmit}>
            <label>Mã:</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
            />
            <label>Tên:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label>Mô tả:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <label>Trạng thái:</label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleInputChange}
            >
              <option value={true}>Hoạt động</option>
              <option value={false}>Không hoạt động</option>
            </select>
            <button type="submit">Lưu</button>
            <button type="button" onClick={() => setShowModal(false)}>Hủy</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TablePage;




