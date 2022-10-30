import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-[#3d4451] dark:bg-[#191d24] min-h-12 text-[#dddee1] dark:text-[#9da3b0]">
      <Container>
        <Link to="/">
          <h1 className="text-2xl">Hacker news</h1>
        </Link>
      </Container>
    </header>
  );
}
