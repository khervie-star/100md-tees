import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full h-full lg:w-screen lg:min-h-screen">
      <div className="w-full h-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 bg-white100 px-[25px] py-[30px] lg:px-[42px] lg:py-[50px] font-outfit">
          <div className="relative mb-[52px] lg:mb-[60px]">
            <Link href="/">
              <Image
                src={"/logo.png"}
                alt="100MD Tees"
                width={150}
                height={40}
                className="ml-[-4px] lg:ml-0"
              />
            </Link>
          </div>
          <div className="lg:px-[50px]">{children}</div>
        </div>
        <div className="w-full lg:w-1/2 bg-green"></div>
      </div>
    </section>
  );
}
