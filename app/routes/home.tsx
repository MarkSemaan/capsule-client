import LandingPage from "../pages/landing/LandingPage";

export function meta() {
  return [
    { title: "Time Capsule" },
    { name: "description", content: "Time Capsule" },
  ];
}

export default function Home() {
  return <LandingPage />;
}
