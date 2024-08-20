import { ChevronsUpDownIcon } from "lucide-react";
import GrantTableRow, {GrantTableRowProps} from "@/components/GrantTableRow";


function GrantOpportunitiesTable({rows}: GrantTableRowProps[]) {
  return (
    <div className="border overflow-auto border-gray-400 rounded-2xl">
      <table className=" overflow-hidden w-full min-w-[1200px] border-collapse">
        <thead>
          <tr>
            <th className="border p-2 border-gray-400">
              <div className="flex items-center gap-2">
                <span> Foundation name</span>
                <ChevronsUpDownIcon
                  className=" text-gray-400"
                  width={14}
                  height={14}
                />
              </div>
            </th>
            <th className="border p-2 border-gray-400">
              <div className="flex items-center gap-2">
                <span>Grant name</span>
                <ChevronsUpDownIcon
                  className=" text-gray-400"
                  width={14}
                  height={14}
                />
              </div>
            </th>
            <th className="border p-2 border-gray-400">Average amount</th>
            <th className="border p-2 border-gray-400">Status</th>
            <th className="border p-2 border-gray-400">Deadline</th>
            <th className="border p-2 border-gray-400">Match date</th>
          </tr>
        </thead>
        <tbody>
          {
            rows.map((row) => {
              return <GrantTableRow key={row.id} {...row} />
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default GrantOpportunitiesTable;
