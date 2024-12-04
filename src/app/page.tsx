"use client"
import Image from "next/image";
import Calculator from "./components/Calculator";
export default function Home() {
  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
    <h1>Welcome to the Calculator App</h1>
    <p>Perform basic mathematical operations and track your history.</p>
    <Calculator />
</div>
  );
}
