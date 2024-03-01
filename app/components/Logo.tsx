import Image from "next/image";
import logo from "../logo.svg";

export default function Logo(props: { width: number }) {
  return (
    <Image
      src={logo}
      width={props.width}
      style={{ aspectRatio: "1/1" }}
      alt="Randall"
    />
  );
}
