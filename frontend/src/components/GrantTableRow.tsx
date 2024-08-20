import {formatDate} from "@/utils/helpers.ts";


export interface GrantTableRowProps {
    id: string;
    foundationName: string;
    grantName: string;
    averageAmount: number;
    matchDate: string;
    deadline: string;
    status: string;
}

function GrantTableRow({
   foundationName,
   grantName,
   averageAmount,
   matchDate,
   deadline,
   status,
}: GrantTableRowProps) {

    const getStatusClass = (status: string) => {
        if (status === 'Accepted') {
            return "py-1 px-2 rounded-2xl w-fit text-sm bg-green-100 text-green-600"
        }
        else if (status === 'Rejected') {
            return "py-1 px-2 rounded-2xl w-fit text-sm bg-red-100 text-red-600"
        }
        else {
            return "py-1 px-2 rounded-2xl w-fit text-sm bg-yellow-100 text-yellow-600"
        }
    }

    return (
        <tr>
            <td className="border p-2 border-gray-400">{foundationName}</td>
            <td className="border p-2 border-gray-400">{grantName}</td>
            <td className="border p-2 border-gray-400">{averageAmount}</td>
            <td className="border p-2 border-gray-400">
                <div className={getStatusClass(status)}>
                    {status}
                </div>
            </td>
            <td className="border p-2 border-gray-400">{formatDate(deadline)}</td>
            <td className="border p-2 border-gray-400">{formatDate(matchDate)}</td>
        </tr>
    )
}

export default GrantTableRow;