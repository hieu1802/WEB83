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
    description: "",
    isActive: true,
  });

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
      {/* Form tạo mới */}
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Mã"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tên"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mô tả"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <select
          value={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
        >
          <option value="true">Hoạt động</option>
          <option value="false">Không hoạt động</option>
        </select>
        <button type="submit">Tạo mới</button>
      </form>

      {/* Bảng dữ liệu */}
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
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.code || "Chưa có mã"}</td>
                <td>{item.name || "Chưa có tên"}</td>
                <td>{item.isActive ? "Hoạt động" : "Không hoạt động"}</td>
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





