const CheckBox = (props) => {
  return (
    props.label &&
    props.label.map((label, i) => (
      <div key={i}>
        <label>{label && label.prefName}</label>
        <input type="checkbox"></input>
      </div>
    ))
  );
};

export default CheckBox;
