import React, { useState } from "react";
import ModalWarning from "./ModalWarning";

export default function Todolist() {
  const [inputValue, setInputValue] = useState("");
  const [isShowModalWarning, setIsShowModalWarning] = useState(false);
  const [allJobs, setAllJobs] = useState(() => {
    // Lấy danh sách công việc trên localStorage
    const jobLocals = JSON.parse(localStorage.getItem("jobs")) || [];

    return jobLocals;
  });
  const [typeForm, setTypeForm] = useState("ADD");
  const [baseId, setBaseId] = useState(null);

  // Hàm lấy giá trị trong input khi onchange
  const handleChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  // Hàm đóng modal cảnh báo lỗi
  const handleCloseModalWarning = () => {
    setIsShowModalWarning(false);
  };

  // Hàm submit form
  const handleSubmit = (event) => {
    // Ngăn chặn sự kiện mặc định của form
    event.preventDefault();

    if (typeForm === "ADD") {
      // Thêm công việc
      // Validate dữ liệu đầu vào
      if (!inputValue) {
        // Cập nhật lại trạng thái của modal warning
        setIsShowModalWarning(true);
        return;
      }

      // Nếu  điều kiện thỏa mãn thì tiến hành thêm mới

      // Gom nhóm tất cả dữ liệu thành 1 object
      const newJob = {
        id: Math.ceil(Math.random() * 1000000),
        name: inputValue,
        status: false,
      };

      // Push object trên vào trong 1 mảng
      const newListjob = [...allJobs, newJob];

      // Lưu dữ liệu lên localStorage
      localStorage.setItem("jobs", JSON.stringify(newListjob));

      // Clear giá trị trong input
      setInputValue("");

      // Render lại giao diện
      setAllJobs(newListjob);
    } else {
      // Cập nhật công việc
      const updateListJob = allJobs.map((job) => {
        if (job.id === baseId) {
          // Cập nhật trạng thái
          return { ...job, name: inputValue };
        }

        return job;
      });

      // Lưu dữ liệu lên localStorage
      localStorage.setItem("jobs", JSON.stringify(updateListJob));

      // Clear giá trị trong input
      setInputValue("");

      // Render lại giao diện
      setAllJobs(updateListJob);

      // Cập nhật lại loại form
      setTypeForm("ADD");
    }
  };

  // Hàm cập nhật trạng thái công việc
  const handleChangeStatus = (id) => {
    // Tiến hành lặp qua từng phần tử của mảng và cập nhật trạng thái của cv theo id
    const updateListJob = allJobs.map((job) => {
      if (job.id === id) {
        // Cập nhật trạng thái
        return { ...job, status: !job.status };
      }

      return job;
    });

    // Lưu dữ liệu lên local
    localStorage.setItem("jobs", JSON.stringify(updateListJob));

    // Render lại giao diện
    setAllJobs(updateListJob);
  };

  // Hàm dùng để fill giá trị lên input
  const handleGetJobInfo = (job) => {
    // Cập nhật giá trị của input
    setInputValue(job.name);

    // Cập nhật lại loại của Form thành EDIT
    setTypeForm("EDIT");

    // Lấy ra id của công việc cần cập nhật
    setBaseId(job.id);
  };

  return (
    <>
      {/* Modal cảnh báo lỗi */}
      <ModalWarning
        title="Cảnh báo"
        content="Tên công việc không được để trống"
        btnText="Đóng"
        onCloseModalWarning={handleCloseModalWarning}
        open={isShowModalWarning}
      />

      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form
                    onSubmit={handleSubmit}
                    className="d-flex justify-content-center align-items-center mb-4"
                  >
                    <div className="flex-fill">
                      <input
                        value={inputValue}
                        onChange={handleChangeInput}
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên công việc"
                      />
                    </div>
                    <button type="submit" className="btn btn-info ms-2">
                      {typeForm === "ADD" ? "Thêm" : "Lưu"}
                    </button>
                  </form>
                  {/* Tabs navs */}
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li className="nav-item" role="presentation">
                      <a className="nav-link active">Tất cả</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Đã hoàn thành</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Chưa hoàn thành</a>
                    </li>
                  </ul>
                  {/* Tabs navs */}
                  {/* Tabs content */}
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {allJobs.map((job) => (
                          <li
                            key={job.id}
                            className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                            style={{ backgroundColor: "#f4f6f7" }}
                          >
                            <div>
                              <input
                                onChange={() => handleChangeStatus(job.id)}
                                className="form-check-input me-2"
                                type="checkbox"
                                checked={job.status}
                              />
                              {job.status ? (
                                <s>{job.name}</s>
                              ) : (
                                <span>{job.name}</span>
                              )}
                            </div>
                            <div className="d-flex gap-3">
                              <i
                                onClick={() => handleGetJobInfo(job)}
                                className="fas fa-pen-to-square text-warning"
                              />
                              <i className="far fa-trash-can text-danger" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal xác nhận xóa */}
      <div className="overlay" hidden>
        <div className="modal-custom">
          <div className="modal-header-custom">
            <h5>Xác nhận</h5>
            <i className="fas fa-xmark" />
          </div>
          <div className="modal-body-custom">
            <p>Bạn chắc chắn muốn xóa công việc quét nhà?</p>
          </div>
          <div className="modal-footer-footer">
            <button className="btn btn-light">Hủy</button>
            <button className="btn btn-danger">Xóa</button>
          </div>
        </div>
      </div>
    </>
  );
}