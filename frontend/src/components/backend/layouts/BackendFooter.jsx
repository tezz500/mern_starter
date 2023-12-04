import { Link } from "react-router-dom";
const BackendFooter = () => {
  return (
    <div>
      <aside className="control-sidebar control-sidebar-dark">
        <div className="p-3">
          <h5>Title</h5>
          <p>Sidebar content</p>
        </div>
      </aside>

      <footer className="main-footer">
        <div className="float-right d-none d-sm-inline">Anything you want</div>
        <strong>
          Copyright &copy; 2014-2021{" "}
          <Link to="https://adminlte.io">AdminLTE.io</Link>.
        </strong>{" "}
        All rights reserved.
      </footer>
    </div>
  );
};


export default BackendFooter;