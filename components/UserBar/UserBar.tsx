"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider/AuthProvider";
import css from "./UserBar.module.css";
import { User } from "lucide-react";

export default function UserBar() {
  const { logout, currentUser } = useAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    if (currentUser) {
      await logout();
      router.push("/");
    }
  };
  return (
    <div className={css.user_bar_container}>
      <div className={css.user_info_container}>
        <div className={css.user_img_container}>
          <User className={css.user_img} />
        </div>
        <span className={css.user_name}>{currentUser?.displayName}</span>
      </div>
      <button type="button" className={css.log_out_btn} onClick={handleLogOut}>
        Log out
      </button>
    </div>
  );
}
