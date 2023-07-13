"use client";

import { ClipLoader } from "react-spinners";
import { BiDownload } from "react-icons/bi";
import useDownloader from "react-use-downloader";
import Button from "@/components/ui/button";

interface DownloadImageButtonProps {
  url: string;
}

export default function DownloadImageButton({
  url,
}: DownloadImageButtonProps): JSX.Element {
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
        <ClipLoader size={30} color="#FFF" />
      ) : (
        <BiDownload className="w-8 h-8" />
      )}
    </Button>
  );
}
