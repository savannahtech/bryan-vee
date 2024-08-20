import HeaderSection from "@/components/HeaderSection";
import MatchesCard, {MatchesCardProps} from "@/components/MatchesCard";
import GrantOpportunitiesTable from "@/components/GrantOpportunitiesTable";
import { useGrants } from "@/hooks/useGrants";


function App() {
  const { grants, loading, error, handleFeedbackSubmit } = useGrants();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || "Something went wrong. Please ensure the backend is running."}</p>;

  const newMatches = grants.filter((grant: MatchesCardProps) => grant.status === 'Applied');
  const previousGrants = grants.filter((grant: MatchesCardProps) => grant.status !== 'Applied');

  return (
      <div>
        <HeaderSection />
        <main className="py-10 px-5 flex flex-col gap-10 max-w-[1330px] mx-auto">
          <section className="flex flex-col gap-2">
            <h2 className=" text-xl font-semibold">New Matches</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
              {newMatches.map((grant: Grant) => (
                  <MatchesCard
                      key={grant.id}
                      id={grant.id}
                      grantName={grant.grantName}
                      foundationName={grant.foundationName}
                      location={grant.location}
                      matchDate={grant.matchDate}
                      averageAmount={grant.averageAmount}
                      deadline={grant.deadline}
                      status={grant.status}
                      areaOfFunding={grant.areaOfFunding}
                      onFeedbackSubmit={handleFeedbackSubmit}
                  />
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className=" text-xl font-semibold">All Grant Opportunities</h2>
            <GrantOpportunitiesTable rows={previousGrants} />
          </section>
        </main>
      </div>
  );
}

export default App;
