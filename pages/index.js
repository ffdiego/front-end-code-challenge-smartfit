import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState(-1);

  async function search(form) {
    const period = form.period.value;
    const showClosed = form.showClosed.checked;
    const address = form.address.value;

    let queryRes = [];
    const response = await fetch("/location.json");
    const data = await response.json();
    const locations = data.locations;
    locations.map((item) => {
      const location = item?.content || null;
      const opened = item.opened;
      if (!location?.toLowerCase().includes(address.toLowerCase())) return;
      if (showClosed || opened) queryRes.push(item);
    });

    //Essa função coloca os lugares fechados por último
    if (showClosed) {
      queryRes.sort((a, b) => b.opened - a.opened);
    }
    setResults(queryRes);
  }

  return (
    <>
      <TopBar />
      <div className="mx-auto max-w-4xl">
        <Header />
        <TimeForm search={search} />
        <SearchLegend />
        <SearchResults results={results} />
      </div>
      <Footer />
    </>
  );
}

function SearchResults({ results }) {
  return results === -1 ? null : results.length === 0 ? (
    <p className="text-center font-gotham">Nenhum resultado encontrado</p>
  ) : (
    <div className="flex gap-4 justify-start flex-wrap">
      {results.map((item) => (
        <ResultCard
          key={item.id}
          opened={item.opened}
          title={item.title}
          content={item.content}
          schedules={item.schedules}
          mask={item.mask}
          towel={item.towel}
          fountain={item.fountain}
          locker_room={item.locker_room}
        />
      ))}
    </div>
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
    <>
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
    </>
  );
}

function TimeForm({ search }) {
  function handleForm(event) {
    event.preventDefault();
    const form = event.target;
    if (form.address.value.length > 1) {
      search(form);
    }
  }
  function clearForm(event) {
    event.preventDefault();
    const form = event.target;
    console.log(form);
  }

  return (
    <div className="my-4 border-4 rounded border-sf-light-grey p-4 font-gotham text-sf-dark-grey">
      <p className="font-gotham mb-3">
        <img src="/images/icon-hour.png" className="inline h-6 mr-2" />
        Horário
      </p>
      <p className="border-b-2 text-lg mb-3">Qual período quer treinar?</p>
      <form onSubmit={handleForm}>
        <table class="table-auto w-full">
          <tbody>
            <tr className="border-b">
              <td>
                <input
                  type="radio"
                  id="manha"
                  name="period"
                  value="manha"
                  className="mr-2 my-3"
                />
                <label htmlFor="manha">Manhã</label>
              </td>
              <td className="text-right">06:00 às 12:00</td>
            </tr>
            <tr className="border-b">
              <td>
                <input
                  type="radio"
                  id="tarde"
                  name="period"
                  value="tarde"
                  className="mr-2 my-3"
                />
                <label htmlFor="tarde">Tarde</label>
              </td>
              <td className="text-right">12:01 às 18:00</td>
            </tr>
            <tr className="border-b">
              <td>
                <input
                  type="radio"
                  id="noite"
                  name="period"
                  value="noite"
                  className="mr-2 my-3"
                />
                <label htmlFor="noite">Noite</label>
              </td>
              <td className="text-right">18:01 às 23:00</td>
            </tr>
          </tbody>
        </table>

        <input
          className="w-full border-2 rounded my-2 p-4 outline-none focus:border-sf-yellow transition duration-300"
          placeholder="Insira aqui um endereço..."
          name="address"
        />
        <input
          type="checkbox"
          id="showClosed"
          name="showClosed"
          className="mr-2 mt-3"
        />
        <label htmlFor="showClosed">Exibir unidades fechadas</label>
        <div className="flex justify-evenly">
          <button className="w-64 border-2 border-sf-yellow bg-sf-yellow text-black font-gotham font-bold py-2 px-4 rounded mt-4">
            ENCONTRAR UNIDADE
          </button>
          <input
            value="LIMPAR"
            type="reset"
            className="w-64 border-2 border-sf-light-grey text-black font-gotham font-bold py-2 px-4 rounded mt-4 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

function SearchLegend() {
  return (
    <div className="bg-sf-light-grey flex justify-evenly font-gotham my-6 p-6">
      <div>
        <p className="text-center font-bold">Máscara</p>
        <div className="flex">
          <Icon name="mask" status="required" />
          <Icon name="mask" status="recommended" />
        </div>
      </div>
      <div>
        <p className="text-center font-bold">Toalha</p>
        <div className="flex">
          <Icon name="towel" status="required" />
          <Icon name="towel" status="recommended" />
        </div>
      </div>
      <div>
        <p className="text-center font-bold">Bebedouro</p>
        <div className="flex">
          <Icon name="fountain" status="partial" />
          <Icon name="fountain" status="forbidden" />
        </div>
      </div>
      <div>
        <p className="text-center font-bold">Vestiário</p>
        <div className="flex items-center">
          <Icon name="lockerroom" status="required" />
          <Icon name="lockerroom" status="partial" />
          <Icon name="lockerroom" status="forbidden" />
        </div>
      </div>
    </div>
  );
}

function Icon({ name, status, disableText }) {
  function getLabel(state) {
    switch (state) {
      case "required":
        return "Obrigatório";
      case "recommended":
        return "Recomendado";
      case "partial":
        return "Parcial";
      case "forbidden":
        return "Proibido";
    }
  }

  return (
    <div className="flex flex-col items-center w-24">
      <img src={`/images/${status}-${name}.png`} className="h-16" />
      <p className="text-sm">{disableText || getLabel(status)}</p>
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

function ResultCard({
  opened,
  title,
  content,
  mask,
  towel,
  fountain,
  locker_room,
  schedules,
}) {
  return (
    <>
      <div className="bg-sf-light-grey [width:32%] [height:28rem] px-4 py-6 font-gotham drop-shadow-md">
        <p className={`font-bold text-sf-${opened ? "green" : "red"}`}>
          {opened ? "Aberto" : "Fechado"}
        </p>
        <p className="text-sf-dark-grey font-bold text-2xl h-16">{title}</p>
        <div
          className="text-sf-dark-grey  mb-2"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <hr className="border-sf-medium-grey border-t" />
        {opened && (
          <>
            <div className="flex my-6">
              <Icon name="mask" status={mask} disableText={true} />
              <Icon name="towel" status={towel} disableText={true} />
              <Icon name="fountain" status={fountain} disableText={true} />
              <Icon name="lockerroom" status={locker_room} disableText={true} />
            </div>
            <div className="grid grid-cols-2">
              {schedules.map((item) => (
                <p className="text-sf-dark-grey font-bold text-xl">
                  {item.weekdays}
                  <p className="font-normal text-lg">{item.hour}</p>
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
