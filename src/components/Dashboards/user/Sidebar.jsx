import React from "react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";

import sidebarData from "../common/sidebardata";

function Sidebar() {
  const [userdata, setuserdata] = useAtom(sidebarData);

  const pagechanged = (i) => {
    setuserdata(
      userdata.map((item, index) => {
        if (index === i) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
        return item;
      })
    );
  };

  return (
    <>
      {userdata.map((item, i) => (
        <Link
          to={item.link}
          key={i}
          className={item.isActive ? "actives" : ""}
          onClick={(e) => pagechanged(i)}
        >
          <span className="iconshadow mr-2">
            <i className={`${item.icon} icon`}></i>
          </span>
          <span className="hide">{item.name}</span>
        </Link>
      ))}
    </>
  );
}

export default Sidebar;
