import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FaSearch } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { GLOBAL_SEARCH_PLACEHOLDER_TEXT } from "~~/constants";

const MobileSearch = () => {
  return (
    <Dialog>
      <DialogTrigger className="lg:hidden flex bg-transparent hover:bg-accent/90 py-3 px-3 rounded-md">
        <FaSearch className="text-primary lg:text-white " />
      </DialogTrigger>
      {/* </Button> */}
      <DialogContent className={`pt-6`}>
        <h6 className="text-xl font-semibold mb-4">Search</h6>
        <div className=" w-full flex flex-row">
          <div className="flex-1 ">
            <Input
              type="search"
              placeholder={GLOBAL_SEARCH_PLACEHOLDER_TEXT}
              className="flex lg:hidden w-full rounded-tr-none rounded-br-none outline-none focus-visible:ring-0 focus-visible:outline-none"
            />
          </div>
          <Button
            size={`icon`}
            className="flex lg:hidden rounded-tl-none rounded-bl-none "
          >
            <FaSearch className="text-white" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileSearch;
