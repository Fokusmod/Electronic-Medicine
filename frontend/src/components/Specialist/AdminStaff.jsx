import AdminStaffItem from "./AdminStaffItem";
import { useEffect, useState } from "react";

export default function AdminStaff() {
  const devApi = localStorage.getItem("host");

  const [isReadyAdmins, setReadyAdmins] = useState("false");
  let [adminData, setAdminData] = useState("");

  useEffect(() => {
    async function getAdmins() {
      const response = await fetch(
        devApi + "/staff/getAllAdminStaff/" + "ADMIN",
        {
          method: "GET",
        }
      );
      var responseBody = await response.json();
      if (response.status === 200) {
        setAdminData(responseBody);
        setReadyAdmins(true);
      } else {
      }
    }
    getAdmins();
  }, []);

  return (
    <>
      <div className="admin-staff-section">
        {isReadyAdmins === true
          ? adminData.map(function (data) {
              if (data.photoUrl != null) {
                return (
                  <AdminStaffItem
                    id={data.id}
                    key={data.id}
                    fullname={data.firstName + " " + data.lastName}
                    position={data.position}
                    photo={data.photoUrl}
                  />
                );
              }
            })
          : ""}
      </div>
    </>
  );
}
