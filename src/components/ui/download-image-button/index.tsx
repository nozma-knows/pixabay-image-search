"use client";

import { ClipLoader } from "react-spinners";
import { BiDownload } from "react-icons/bi";
// import { motion } from "framer-motion";
import useDownloader from "react-use-downloader";
import Button from "@/components/ui/button";

export default function DownloadImageButton({ url }: { url: string }) {
  const { download, isInProgress } = useDownloader();
  const fileName = url.split("/").pop();
  return (
    <Button
      className="w-14 h-14"
      onClick={() => download(url, fileName!)}
      tooltip={{
        title: "Download Image",
        placement: "bottom",
      }}
    >
      {isInProgress ? (
        <ClipLoader size={20} />
      ) : (
        <BiDownload className="w-8 h-8" />
      )}
    </Button>
  );
}
