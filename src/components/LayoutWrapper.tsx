import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const LayoutWrapper = (props: Props) => {
  return (
    <div className="bg-gray-300">
      <div className="container mx-auto grid grid-rows-[auto, 1fr,auto] min-h-screen">
        <Header />
        <main className="px-4 text-gray-600 bg-gray-100">
          <div>{props.children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
