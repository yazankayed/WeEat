import React from "react";
const style = require("../../styles/modal");

const SuccessModal = (props) => {
  const closeModal = () => {
    props.close();
  };

  return (
    <React.Fragment>
      <div style={{ width: "100%" }}>
        <button onClick={closeModal} style={style.customStyles.closebar}>
          ×
        </button>
      </div>
      <div style={style.customStyles.success}>Order Placed Successfully!</div>
    </React.Fragment>
  );
};

export default SuccessModal;
