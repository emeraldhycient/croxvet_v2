import "../styles.css";
import { logout } from "../../auth/auth";

function Layout(props) {
  const { Sidebar } = props;
  return (
    <div className="dash_container bg-dark">
      <div className="sidebar">
        <center className="my-3">
          <i
            className="fa fa-sign-out-alt icon fa-2x"
            onClick={(e) => logout()}
          ></i>
        </center>
        <hr className="hr" />
        <div className="hold">{<Sidebar />}</div>
      </div>
      <div className="main_container">{props.children}</div>
    </div>
  );
}

export default Layout;
