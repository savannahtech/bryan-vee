import { DatabaseZapIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import {useMemo, useState} from "react";
import FeedbackModal from "@/components/FeedbackModal";
import {formatDate} from "@/utils/helpers";

export interface MatchesCardProps {
  id?: string;
  foundationName: string;
  grantName: string;
  averageAmount: number;
  location: string;
  matchDate: string;
  deadline: string;
  status: string;
  areaOfFunding?: string[];
  onFeedbackSubmit: (id: string, feedback: string, isPositive: boolean) => void;
}

function MatchesCard({
  id,
  foundationName,
  grantName,
  averageAmount,
  location,
  deadline,
  areaOfFunding = [],
  onFeedbackSubmit,
}: MatchesCardProps) {
  const areasOfFundingInfo = useMemo(() => {
    const info = {
      array: [] as Array<string>,
      numRemaining: 0,
    };
    if (areaOfFunding.length <= 5) {
      info.array = areaOfFunding;
      info.numRemaining = 0;
    } else {
      info.array = areaOfFunding.slice(0, 5);
      info.numRemaining = areaOfFunding.length - 5;
    }
    return info;
  }, [areaOfFunding]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isPositive, setIsPositive] = useState(true);

  const handleThumbsUp = () => {
    setIsPositive(true);
    setModalOpen(true);
  };

  const handleThumbsDown = () => {
    setIsPositive(false);
    setModalOpen(true);
  };

  const handleSubmit = async (feedback: string) => {
    onFeedbackSubmit(id, feedback, isPositive);
    setModalOpen(false);
  };

  return (
    <div className="group overflow-hidden border p-5 border-gray-400 rounded-2xl  hover:border-orange-600">
      <div className="relative ">
        <div className="flex mb-5 justify-between">
          <p className="flex justify-center items-center w-10 h-10 bg-orange-200 text-orange-600 rounded-full">
            {foundationName.charAt(0).toUpperCase()}
          </p>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center border w-8 h-8 border-gray-400 rounded-sm" onClick={handleThumbsUp}>
              <ThumbsUpIcon width={16} height={16} />
            </button>
            <button className="flex items-center justify-center border w-8 h-8 border-gray-400 rounded-sm" onClick={handleThumbsDown}>
              <ThumbsDownIcon width={16} height={16} />
            </button>
          </div>
        </div>
        <p>{foundationName}</p>
        <h3 className=" font-semibold text-2xl">{grantName}</h3>
        <div className="grid grid-cols-2 my-5 items-center gap-2">
          <div className="flex-1 bg-orange-100 rounded-lg p-4 pb-5">
            <p className="mb-8">
              <DatabaseZapIcon
                className=" text-orange-600"
                width={18}
                height={18}
              />
            </p>

            <h3 className=" text-2xl text-orange-600">{averageAmount}</h3>
            <p className=" text-black">Avg Amount</p>
          </div>
          <div className="flex-1 bg-gray-100 rounded-lg p-4 pb-5">
            <div className="flex flex-col gap-1 border-b pb-1">
              <p className=" text-gray-500">Deadline</p>
              <p className="text-black font-medium">{formatDate(deadline)}</p>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <p className=" text-gray-500">Getting started</p>
              <p className="text-black font-medium">Apply Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className=" text-gray-400">Location</p>
          <p className=" font-medium">{location}</p>
        </div>
        {areasOfFundingInfo.array.length > 0 && (
            <div className="flex mt-2 flex-col gap-2">
              <p className="text-gray-400 font-medium">Area of funding</p>
              <ul className="flex items-center gap-x-1 gap-y-0.5 flex-wrap">
                {areasOfFundingInfo.array.map((item, i) => (
                    <li key={i} className="bg-gray-100 font-medium text-gray-600 text-xs py-1 px-2 rounded-lg">
                      {item}
                    </li>
                ))}
                {areasOfFundingInfo.numRemaining > 0 && (
                    <li className="bg-gray-100 font-medium text-gray-600 text-xs py-1 px-2 rounded-lg">
                      +{areasOfFundingInfo.numRemaining}
                    </li>
                )}
              </ul>
            </div>
        )}
        <div className=" opacity-0 select-none pointer-events-none absolute bg-gradient-to-t from-white to-transparent w-full h-full top-0 left-0 transition-all duration-700 group-hover:opacity-100 " />
        <button className="absolute z-10 bottom-0 rounded-lg py-3 w-full h-fit text-white text-center left-0 bg-orange-500 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ">
          Apply here
        </button>
      </div>
      {isModalOpen && <FeedbackModal onSubmit={handleSubmit} onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default MatchesCard;
