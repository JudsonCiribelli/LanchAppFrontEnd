import { redirect } from "next/navigation";

const DashboardPage = async () => {
  redirect("/dashboard/orders");
};

export default DashboardPage;
