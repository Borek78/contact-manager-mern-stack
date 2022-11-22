import { useNavigate } from "react-router-dom";

function UpdateData() {
  const navigate = useNavigate();
  function update() {
    //code to update database
    navigate(0);
    navigate("/");
  }

  update();

  return "This is the UpdateData component";
}

export default UpdateData;
