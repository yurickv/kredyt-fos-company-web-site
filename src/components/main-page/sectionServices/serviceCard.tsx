import { PointerIcon } from "@/components/icons/contactsPage/pointerIcon";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  text: string;
  foto: string;
  route: string;
  styleFoto: string;
}

export const ServiceCard = ({
  title,
  text,
  foto,
  route,
  styleFoto,
}: ServiceCardProps) => {
  return (
    <Link
      href={route}
      className="w-[332px] h-[208px] md:max-w-[844px] md:w-full md:h-[368px] rounded-md md:bg-[url('/background-for-services.webp')] bg-[url('/mobile-background-for-services.webp')] 
      flex justify-end items-end group relative bg-cover bg-center"
    >
      <div className="absolute z-10 top-[16px] md:top-[34px] left-[21px] md:left-[34px]">
        <h2 className="text-primary_400 text-[20px] md:text-[48px] font-semibold">
          {title}
        </h2>
        <p className="text-primary_700 max-w-[170px] min-h-[104px] md:max-w-[260px] pt-2 md:pt-4 ">
          {text}
        </p>
        <div className="bg-gradient_1 flex gap-2 items-center text-transparent opacity-100 font-bold tracking-wide bg-clip-text relative pt-3 md:pt-[89px]">
          <p>Ознайомитись</p>{" "}
          <div
            className={`text-primary_400 group-hover:text-primary_300 transition-all duration-200 rotate-90 group-hover:scale-125 w-6`}
          >
            <PointerIcon />
          </div>
          <span className="absolute pointer-events-none z-20 top-9 md:top-[89px] inset-0 bg-gradient_2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-focus:opacity-100 text-transparent bg-clip-text">
            Ознайомитись
          </span>
        </div>
      </div>
      <div className={`relative ${styleFoto} transition-all duration-300`}>
        <Image src={foto} fill alt="Picture of the service offer" />
      </div>
    </Link>
  );
};
