import React from "react";

export default function ModalWarning({
  title = "Thông báo",
  content = "Nội dung của modal",
  btnText = "Đóng",
  open = false,
  onCloseModalWarning,
}) {
  return (
    <>
      {/* Modal cảnh báo lỗi */}

      {open && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>{title}</h5>
              <i onClick={onCloseModalWarning} className="fas fa-xmark" />
            </div>
            <div className="modal-body-custom">
              <p>{content}</p>
            </div>
            <div className="modal-footer-footer">
              <button onClick={onCloseModalWarning} className="btn btn-light">
                {btnText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}