export default function TimeForm({ search, results }) {
  function handleForm(event) {
    event.preventDefault();
    const form = event.target;
    if (form.address.value.length > 1) {
      search(form);
    }
  }

  return (
    <div className="my-4 border-4 rounded border-sf-light-grey p-4 font-gotham text-sf-dark-grey">
      <p className="font-gotham mb-3">
        <img src="/images/icon-hour.png" className="inline h-6 mr-2" />
        Horário
      </p>
      <p className="border-b-2 text-lg mb-3">Qual período quer treinar?</p>
      <form onSubmit={handleForm}>
        <table className="table-auto w-full">
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
        <div className="flex flex-col sm:flex-row justify-between">
          <span>
            <input
              type="checkbox"
              id="showClosed"
              name="showClosed"
              className="mr-2 mt-3"
            />
            <label htmlFor="showClosed">Exibir unidades fechadas</label>
          </span>
          <p>
            Resultados encontrados: <b>{results.length || 0}</b>
          </p>
        </div>
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
