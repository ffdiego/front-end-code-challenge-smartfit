import Icon from "@/Icon";

export default function ResultCard({
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
      <div className="bg-sf-light-grey md:[width:32%] md:mx-0 [height:28rem] w-11/12 mx-auto md:px-2 lg:px-4 px-4 py-6 font-gotham drop-shadow-md rounded-md overflow-hidden">
        <p className={`font-bold ${opened ? "text-sf-green" : "text-sf-red"}`}>
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
              <Icon name="mask" status={mask} />
              <Icon name="towel" status={towel} />
              <Icon name="fountain" status={fountain} />
              <Icon name="lockerroom" status={locker_room} />
            </div>
            <div className="grid grid-cols-2">
              {schedules.map((item, index) => (
                <div key={index}>
                  <p className="text-sf-dark-grey font-bold text-xl">
                    {item.weekdays}
                  </p>
                  <p className="font-normal text-lg">{item.hour}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
