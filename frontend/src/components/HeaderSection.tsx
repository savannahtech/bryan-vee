import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";

function HeaderSection() {
  return (
    <header className="flex py-4 px-10 border-b items-center justify-between">
      <div className="flex items-center gap-5">
        <img src="/logo.jpeg" className="w-10 h-10" />
        <button>Social media</button>
        <Popover>
          <PopoverTrigger>Grant</PopoverTrigger>
          <PopoverContent className="flex flex-col w-fit p-0">
            <button className="px-5 py-2 pr-20 hover:bg-gray-200 border-b">
              Posts approval
            </button>
            <button className="px-5 pr-20 hover:bg-gray-200 py-2">
              Social Calender
            </button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center text-sm justify-center w-8 h-8 rounded-full bg-orange-200 text-orange-600">
        D
      </div>
    </header>
  );
}

export default HeaderSection;
