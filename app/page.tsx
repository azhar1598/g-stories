import { redirect } from "next/navigation";
import React from "react";

function page() {
  redirect("/stories");
}

export default page;
