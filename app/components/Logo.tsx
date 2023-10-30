import Image from "next/image";
import logo from "../logo.png";

export default function Logo() {
  return (
    <Image src={logo} width={30} style={{ aspectRatio: "1/1" }} alt="Randall" />
  );
}
