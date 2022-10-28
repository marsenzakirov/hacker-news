import React from "react";
import { Footer as FooterComponent } from "react-daisyui";
import Container from "./Сontainer";
export default function Footer() {
  return (
    <FooterComponent className="p-10 bg-neutral text-neutral-content">
      <div>
        <FooterComponent.Title>Services</FooterComponent.Title>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </div>
      <div>
        <FooterComponent.Title>Company</FooterComponent.Title>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <FooterComponent.Title>Legal</FooterComponent.Title>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </FooterComponent>
  );
}
