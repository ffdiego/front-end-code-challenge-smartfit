import { useState, useRef } from "react";

import TimeForm from "@/TimeForm";
import SearchLegend from "@/SearchLegend";
import SearchResults from "@/SearchResults";

export default function Home() {
  const refResults = useRef(null);
  const [results, setResults] = useState(-1);

  async function search(form) {
    const period = form.period.value;
    const showClosed = form.showClosed.checked;
    const address = form.address.value.toLowerCase();

    let queryRes = [];
    const response = await fetch("/location.json");
    const data = await response.json();
    const locations = data.locations;
    locations.map((item) => {
      const location = item?.content?.toLowerCase() || null;
      const title = item?.title?.toLowerCase() || null;
      const opened = item.opened;
      if (!location?.includes(address) && !title?.includes(address)) return;
      if (showClosed || opened) queryRes.push(item);
    });

    //Essa função coloca os lugares fechados por último
    if (showClosed) {
      queryRes.sort((a, b) => b.opened - a.opened);
    }
    setResults(queryRes);
    refResults.current.scrollIntoView();
  }

  return (
    <>
      <TopBar />
      <div className="mx-auto max-w-4xl">
        <Header />
        <TimeForm search={search} results={results} />
        <SearchLegend />
        <SearchResults results={results} refResults={refResults} />
      </div>
      <Footer />
    </>
  );
}

function TopBar() {
  return (
    <div className="bg-black flex justify-center p-6">
      <img src="/images/logo.svg" alt="logo" className="h-12" />
    </div>
  );
}

function Header() {
  return (
    <div className="mx-3">
      <h1 className="font-gotham font-black text-4xl mt-8 mb-4">
        REABERTURA
        <br /> SMART FIT
      </h1>
      <div className="bg-black h-2 w-20 ml-2 mb-6"></div>
      <p className="font-gotham font-light">
        O horário de funcionamento das nossas unidades está seguindo os decretos
        de cada município. Por isso, confira aqui se a sua unidade está aberta e
        as medidas de segurança que estamos seguindo.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-sf-dark-grey flex flex-col justify-center mt-6 p-10 pb-20">
      <img src="/images/logo.svg" alt="logo" className="h-10" />
      <p className="mt-2 font-gotham text-center text-white">
        Todos os direitos reservados - 2020
      </p>
    </div>
  );
}
