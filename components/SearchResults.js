import ResultCard from "components/ResultCard";

export default function SearchResults({ results, refResults }) {
  return (
    <div ref={refResults}>
      {results === -1 ? null : results.length === 0 ? (
        <p className="text-center font-gotham">Nenhum resultado encontrado</p>
      ) : (
        <div className="flex gap-x-2 gap-y-4 lg:gap-4 justify-start flex-wrap items-stretch transition-all">
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
      )}
    </div>
  );
}
