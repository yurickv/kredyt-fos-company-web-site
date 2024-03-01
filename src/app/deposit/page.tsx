import { SectionDepositCalc } from "@/components/deposit-page/sectionDepositCalc";
import { SectionAdvantage } from "@/components/main-page/sectionAdvantage/sectionAdvantage";
import { SectionMilitary } from "@/components/main-page/sectionMilitary";
import { SectionPartners } from "@/components/main-page/sectionPartners";
import Link from "next/link";

const Deposit = () => {
  return (
    <main>
      <section className="bg-transparent h-[300px] pt-20 pb-10 md:py-[100px]">
        <div className="fixed -top-[1px] -z-10 bg-[url('/Main-screen1.webp')] bg-center bg-cover w-full h-[500px]"></div>
        <div className="div-container">
          <h1 className="text-primary_400 text-[40px] md:text-[64px] font-extrabold">
            Депозити
          </h1>
          <div className="text-primary_400 font-extrabold flex gap-2 mt-6 mx">
            <Link href="/">Домашня</Link>
            <span>&#8250;</span>
            <p>Депозити</p>
          </div>
        </div>
      </section>
      <SectionDepositCalc />
      <SectionAdvantage />
      <SectionMilitary />
      <SectionPartners />
    </main>
  );
};
export default Deposit;
