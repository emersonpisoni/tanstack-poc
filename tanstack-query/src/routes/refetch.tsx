import { useQuery } from "@tanstack/react-query";

type TimeResponse = {
  datetime: string;
};

export default function RefetchPage() {
  const { data, isPending, isFetching, refetch } = useQuery<TimeResponse>({
    queryKey: ["utc-time"],
    queryFn: async () => {
      console.log("Fetch started...");
      const res = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC");
      const json = await res.json();
      console.log("Fetch finished!");
      return json;
    },

    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 5000,

    staleTime: 0,
  });

  return (
    <div>
      <h2>3️⃣ Automatic Refetch</h2>

      <p>
        This demo shows how React Query automatically refetches when:
      </p>
      <ul>
        <li>Browser tab gains focus</li>
        <li>Connection is restored</li>
        <li>Refetch interval triggers (every 5s)</li>
      </ul>

      {isPending && <p>Loading initial time...</p>}

      {data && (
        <pre style={{ background: "#eee", padding: "12px" }}>
          {data.datetime}
        </pre>
      )}

      {isFetching && <p>Refreshing in the background...</p>}

      <button onClick={() => refetch()}>Manual Refetch</button>
    </div>
  );
}
