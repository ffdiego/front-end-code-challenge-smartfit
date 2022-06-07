import Icon from "components/Icon";

export default function SearchLegend() {
  return (
    <div className="bg-sf-light-grey flex flex-wrap lg:flex-nowrap justify-evenly font-gotham my-6 mx-6 md:mx-0 p-6">
      <div>
        <p className="text-center font-bold">Máscara</p>
        <div className="flex">
          <Icon name="mask" status="required" text="Obrigatório" />
          <Icon name="mask" status="recommended" text="Recomendado" />
        </div>
      </div>
      <div>
        <p className="text-center font-bold">Toalha</p>
        <div className="flex">
          <Icon name="towel" status="required" text="Obrigatório" />
          <Icon name="towel" status="recommended" text="Recomendado" />
        </div>
      </div>
      <div>
        <p className="text-center font-bold">Bebedouro</p>
        <div className="flex">
          <Icon name="fountain" status="partial" text="Parcial" />
          <Icon name="fountain" status="forbidden" text="Probido" />
        </div>
      </div>
      <div>
        <p className="text-center font-bold">Vestiários</p>
        <div className="flex items-center">
          <Icon name="lockerroom" status="required" text="Liberado" />
          <Icon name="lockerroom" status="partial" text="Parcial" />
          <Icon name="lockerroom" status="forbidden" text="Fechado" />
        </div>
      </div>
    </div>
  );
}
