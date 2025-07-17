import Dashboard from "../pages/dashboard/dashboard";

export function meta() {
  return [
    { title: "Time Capsule - Wall" },
    { name: "description", content: "Time Capsule" },
  ];
}

export default function DashboardRoute() {
  return <Dashboard />;
}
