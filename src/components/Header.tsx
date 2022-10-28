import React from "react";
import Container from "./Сontainer";
export default function Header() {
  return (
    <header className="bg-[#3d4451] dark:bg-[#191d24] h-12 text-[#dddee1] dark:text-[#9da3b0]">
      <Container className="flex items-center">
        <h1 className="text-2xl">Hacker news</h1>
      </Container>
    </header>
  );
}
